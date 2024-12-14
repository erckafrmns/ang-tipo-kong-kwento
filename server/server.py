from flask import Flask, request, jsonify, render_template, url_for, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from db_models import db, User, Story
from config import Config
import requests
import logging
import time
import random
import string
import smtplib
import os
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity



logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(Config)
db.init_app(app)
app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY
jwt = JWTManager(app)

MODEL_SERVICE_URL = "http://model:5001"

# CREATE TABLES
with app.app_context():
    db.create_all()
    print("Tables created successfully!")


# SIGNUP ROUTE 
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    logging.info(f"Received signup data: {data}")
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('signup_email')
    password = data.get('signup_password')

    if not first_name or not last_name or not email or not password:
        return jsonify({"message": "Missing required fields"}), 400
    
    if User.query.filter_by(email=email).first(): # Check if email already exists
        return jsonify({"message": "Email already exists!"}), 400


    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    verification_token = generate_verification_token() 

    verification_url = url_for('verify_email', token=verification_token, _external=True)
    send_verification_email(email, verification_url)  # Send email for verification


    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password,
        verification_token=verification_token
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully! Please check your email to verify your account."}), 201


# GENERATE EMAIL VERIFICATION TOKEN
def generate_verification_token():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=32))


# SEND EMAIL FOR VERIFICATION
def send_verification_email(to_email, verification_url):
    try:
        smtp_server = Config.MAIL_SERVER 
        smtp_port = Config.MAIL_PORT 
        email_address = Config.MAIL_USERNAME 
        app_password = Config.MAIL_PASSWORD  

        if not email_address or not app_password:
            raise ValueError("Missing email or app password configuration.")

        subject = "Please verify your email"
        body = f"Please click the following link to verify your email: {verification_url}"

        message = MIMEMultipart()
        message['From'] = email_address
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.set_debuglevel(1)  
            server.starttls() 
            server.login(email_address, app_password)
            server.send_message(message)

        logging.info(f"Verification email sent to {to_email}")
    except Exception as e:
        logging.error(f"Failed to send verification email: {str(e)}")


# EMAIL VERIFICATION ROUTE
@app.route('/verify-email/<token>', methods=['GET'])
def verify_email(token):
    user = User.query.filter_by(verification_token=token).first()

    if user:
        user.is_active = True
        user.verification_token = None  
        db.session.commit()
        return jsonify({"message": "Email verified successfully!"}), 200
    else:
        return jsonify({"message": "Invalid or expired token."}), 400


# LOGIN ROUTE
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('login_email')
    password = data.get('login_password')

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "User not found!"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid password!"}), 400

    if not user.is_active:
        return jsonify({"message": "Please verify your email before logging in."}), 400

    # Else all checks out
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.user_id)
        return jsonify({
            "message": "Logged in successfully!",
            "access_token": access_token
        }), 200
    
    return jsonify({"message": "Invalid credentials"}), 401


# GET USER DATA ROUTE
@app.route('/get-user-data', methods=['GET'])
@jwt_required()
def get_user_data():
    try:
        user_id = get_jwt_identity() # get user identity from jwt token

        user = User.query.filter_by(user_id=user_id).first()

        if not user:
            return jsonify({"message": "User not found."}), 404

        user_stories = Story.query.filter_by(user_id=user_id).all()

        user_data = {
            "user_id": user.user_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "stories": [
                {
                    "story_id": story.story_id,
                    "title": story.title,
                    "genre": story.genre,
                    "content": story.content,
                    "created_at": story.created_at.strftime('%Y-%m-%d %H:%M:%S')
                }
                for story in user_stories
            ]
        }

        return jsonify(user_data), 200

    except Exception as e:
        logging.error(f"Error fetching user stories: {str(e)}")
        return jsonify({"error": "An error occurred while fetching user stories."}), 500



# LOGOUT ROUTE, though this will not be needed
@app.route('/logout', methods=['POST'])
def logout():
    # For JWT, logout means simply not providing the token in the requests.
    return jsonify({"message": "Successfully logged out."}), 200


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



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
