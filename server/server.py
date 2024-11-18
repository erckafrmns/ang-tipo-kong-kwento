import sys
import os
import logging
sys.path.insert(0, os.path.join(os.getcwd(), 'model'))
from model import load_model, generate_custom_story, generate_uncustom_story
from flask import Flask, request, jsonify
from flask_cors import CORS

# Set up logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# Load the model and tokenizer at the start
logging.info("LOADING MODEL AND TOKENIZER...")
model, tokenizer = load_model()
logging.info("MODEL AND TOKENIZER LOADED SUCCESSFULLY.")


# Endpoint for generating custom story
@app.route('/generate-custom-story', methods=['POST'])
def generate_custom_story_endpoint():
    data = request.get_json()
    title = data.get('title', "Default Title")
    logging.debug(f"GENERATING CUSTOM STORY WITH TITLE: {title}")
    story = generate_custom_story(title, model, tokenizer)
    logging.info(f"STORY GENERATED SUCCESSFULLY: {story[:100]}...") 
    return jsonify({"story": story})


# Endpoint for generating uncategorized story
@app.route('/generate-story', methods=['POST'])
def generate_story():
    logging.debug("GENERATING RANDOM STORY...")
    title, story = generate_uncustom_story(model, tokenizer)
    logging.info(f"STORY GENERATED SUCCESSFULLY: {title} - {story[:100]}...")  
    return jsonify({"title": title, "story": story})


@app.route("/users")
def users():
    return {"users": ["Ericka", "Grace", "Ernest", "Pao", "Nino"]}

# Database connection
# def get_db_connection():
#     conn = psycopg2.connect(
#         host="localhost",
#         database="ATKK_DB",
#         user="postgres",
#         password="admin"
#     )
#     return conn

# @app.route('/history', methods=['GET'])
# def get_history():
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM stories;")  # Adjust to your stories table structure
#     stories = cur.fetchall()
#     cur.close()
#     conn.close()
#     return jsonify(stories)

if __name__ == "__main__":
    app.run(debug=True)
