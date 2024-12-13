import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import time
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash, check_password_hash
from db_models import db, User, Story
from config import Config


# Configured Logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
db.init_app(app)
mail = Mail(app)

MODEL_SERVICE_URL = "http://model:5001"


# User Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    password = data['password']

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Send activation email (simplified)
    activation_link = f'http://localhost:5000/activate/{new_user.id}'
    msg = Message('Activate your account', recipients=[email])
    msg.body = f'Click the following link to activate your account: {activation_link}'
    mail.send(msg)

    return jsonify({"message": "User created, check your email to activate your account"}), 201


# User Activation Route
@app.route('/activate/<int:user_id>', methods=['GET'])
def activate(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    user.is_active = True
    db.session.commit()
    return jsonify({"message": "Account activated successfully"}), 200


# USER LOGIN ROUTE
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401

    if not user.is_active:
        return jsonify({"message": "Account not activated"}), 403

    return jsonify({"message": "Login successful"}), 200


# GENERATE RANDOM STORY ROUTE
@app.route('/generate-story', methods=['POST'])
def generate_story():
    try:
        logging.info("RECEIVED REQUEST FOR RANDOM STORY.")
        
        start_time = time.time() #TO TRACK GENERATION TIME
        
        # REQUEST TO MODEL SERVICE
        response = requests.post(f"{MODEL_SERVICE_URL}/model-generate-random")

        if response.status_code == 200:
            result = response.json()
            logging.info("RANDOM STORY WAS SUCCESSFULLY GENERATED.")
            end_time = time.time()
            logging.info(f"STORY GENERATION TOOK {end_time - start_time} SECONDS")
            return jsonify(result)
        else:
            logging.error(f"FAILED TO GENERATE STORY. MODEL SERVICE RETURNED STATUS CODE: {response.status_code}")
            return jsonify({"error": "Failed to generate story."}), response.status_code
    
    except Exception as e:
        logging.error(f"ERROR GENERATING RANDOM STORY: {str(e)}")
        return jsonify({"error": str(e)}), 500


# GENERATE CUSTOM STORY ROUTE
@app.route('/generate-custom-story', methods=['POST'])
def generate_custom_story_endpoint():
    try:
        data = request.get_json()
        title = data.get('title', "Default Title")
        logging.info(f"RECEIVED REQUEST FOR CUSTOM STORY: {title}")
        start_time = time.time() #TO TRACK GENERATION TIME

        # REQUEST TO MODEL SERVICE
        response = requests.post(
            f"{MODEL_SERVICE_URL}/model-generate-custom",
            json={"title": title},
        )

        if response.status_code == 200:
            story = response.json().get("story", "No story generated.")
            logging.info("CUSTOM STORY WAS SUCCESSFULLY GENERATED.")
            end_time = time.time()
            logging.info(f"STORY GENERATION TOOK {end_time - start_time} SECONDS")
            return jsonify({"story": story})
        else:
            logging.error(f"FAILED TO GENERATE STORY. MODEL SERVICE RETURNED STATUS CODE: {response.status_code}")
            return jsonify({"error": "Failed to generate story."}), response.status_code
    
    except Exception as e:
        logging.error(f"ERROR GENERATING CUSTOM STORY: {str(e)}")
        return jsonify({"error": str(e)}), 500


# JUST TO TEST IF SERVER WORKS
@app.route("/developers")
def developers():
    return {"developers": ["Ericka", "Grace", "Ernest", "Pao", "Nino"]}

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "Pong! Server is reachable!"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
