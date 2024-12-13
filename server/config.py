import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY') 
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    MAIL_SERVER = 'smtp.gmail.com'  
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.getenv('MAIL_USERNAME') 
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD') 