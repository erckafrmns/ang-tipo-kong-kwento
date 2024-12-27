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
import re
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


# SIGNUP API 
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

    valPass_error = validate_password(password)
    if valPass_error:
        return jsonify(valPass_error[0]), valPass_error[1]

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
        return redirect(f"http://localhost:3000/verified-email?token={token}&status=success")
    else:
        return redirect(f"http://localhost:3000/verified-email?status=failure")


# LOGIN API
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
            #"message": "Logged in successfully!",
            "access_token": access_token
        }), 200
    
    return jsonify({"message": "Invalid credentials"}), 401


# VALIDATE PASSWORD IF IT PASSED THE MIN REQUIREMENT
def validate_password(password):
    if len(password) < 8:
        return {"message": "Password must be at least 8 characters long."}, 400
    
    if not re.search(r'\d', password): 
        return {"message": "Password must contain at least one number."}, 400
    
    return None


# LOGOUT ROUTE, though this will not be needed
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # For JWT, logout means simply not providing the token in the requests.
    return jsonify({"message": "Successfully logged out."}), 200


# GET USER INFORMATION API
@app.route('/get-user-info', methods=['GET'])
@jwt_required()
def get_user_info():
    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(user_id=user_id).first()
        
        if not user:
            return jsonify({"message": "User not found."}), 404
        
        user_info = {
            "user_id": user.user_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        }
        return jsonify(user_info), 200
        
    except Exception as e:
        logging.error(f"Error fetching user info: {str(e)}")
        return jsonify({"error": "An error occurred while fetching user info."}), 500


# RETRIEVE STORIES IN USER ACCOUNT
@app.route('/retrieve-user-stories', methods=['GET'])
@jwt_required()
def retrieve_user_stories():
    try:
        user_id = get_jwt_identity()
        stories = Story.query.filter_by(user_id=user_id).all()
        
        
        user_stories = [
            {
                "story_id": story.story_id,
                "title": story.title,
                "genre": story.genre,
                "content": story.content,
                "created_at": story.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            for story in stories
        ]
        return jsonify(user_stories), 200
    
    except Exception as e:
        logging.error(f"Error fetching user stories: {str(e)}")
        return jsonify({"error": "An error occurred while fetching user stories."}), 500


# SAVE GENERATED STORY TO CURRENT USER ACCOUNT
@app.route('/save-user-story', methods=['POST'])
@jwt_required()
def save_user_story():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        title = data.get('title')
        genre = data.get('genre')
        content = data.get('content')
        
        if not all([title, genre, content]):
            return jsonify({"error": "All fields (title, genre, content) are required."}), 400
        
        new_story = Story(user_id=user_id, title=title, genre=genre, content=content)
        db.session.add(new_story)
        db.session.commit()

        return jsonify({
            "message": "Story saved successfully.",
        }), 201
    
    except Exception as e:
        logging.error(f"Error saving user story: {str(e)}")
        return jsonify({"error": "An error occurred while saving the story."}), 500


# CHANGE PASSWORD API
@app.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        confirm_new_password = data.get('confirm_new_password')

        user = User.query.filter_by(user_id=user_id).first()

        if not user or not check_password_hash(user.password, current_password):
            return jsonify({"error": "Current password is incorrect."}), 400
        
        if new_password != confirm_new_password:
            return jsonify({"error": "New password and confirm password do not match."}), 400

        user.password = generate_password_hash(confirm_new_password, method='pbkdf2:sha256')
        db.session.commit()
        return jsonify({"message": "Password updated successfully."}), 200
    
    except Exception as e:
        logging.error(f"Error changing password: {str(e)}")
        return jsonify({"error": "An error occurred while changing the password."}), 500


# FORGOT PASSWORD API
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        email = data.get('email')
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "User with this email does not exist."}), 404

        reset_token = generate_verification_token() 
        user.verification_token = reset_token
        db.session.commit()

        smtp_server = Config.MAIL_SERVER 
        smtp_port = Config.MAIL_PORT 
        email_address = Config.MAIL_USERNAME 
        app_password = Config.MAIL_PASSWORD 

        reset_link = f"http://localhost:3000/reset-password/{reset_token}"

        subject = "Reset Password"
        body = f"Click the link to reset your password: {reset_link}"
        
        message = MIMEMultipart()
        message['From'] = email_address
        message['To'] = email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.set_debuglevel(1)  
            server.starttls() 
            server.login(email_address, app_password)
            server.send_message(message)

        logging.info(f"Verification email sent to {email}")
        return jsonify({"message": "Password reset link sent to your email."}), 200
    
    except Exception as e:
        logging.error(f"Error sending reset password email: {str(e)}")
        return jsonify({"error": "An error occurred while sending the reset password email."}), 500


# RESET PASSWORD API
@app.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    try:
        data = request.get_json()
        new_password = data.get('new_password')
        confirm_new_password = data.get('confirm_new_password')

        user = User.query.filter_by(verification_token=token).first()

        if not user:
            return jsonify({"error": "Invalid or expired token."}), 400
        
        if new_password != confirm_new_password:
            return jsonify({"error": "Passwords do not match."}), 400

        user.password = generate_password_hash(confirm_new_password, method='pbkdf2:sha256')
        user.verification_token = None
        db.session.commit()

        return jsonify({"message": "Password was successfully changed."}), 200
    
    except Exception as e:
        logging.error(f"Error resetting password: {str(e)}")
        return jsonify({"error": "An error occurred while resetting the password."}), 500


# GENERATE RANDOM STORY API
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


# GENERATE CUSTOM STORY API
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
