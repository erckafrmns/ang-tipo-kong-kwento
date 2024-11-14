from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS
import psycopg2
import random
from transformers import GPT2LMHeadModel, GPT2Tokenizer


app = Flask(__name__)
CORS(app)


# Load the model and tokenizer locally
model = GPT2LMHeadModel.from_pretrained("model/trained_model/")
tokenizer = GPT2Tokenizer.from_pretrained("model/trained_model/")

# Ensure tokenizer's pad token is set
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token


# GENERATE WITH CUSTOMIZATION
def generate_custom_story(title):
    prompt = f"Title: {title} [SEP]"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs.input_ids,
        do_sample=True,
        max_length=700,
        num_return_sequences=1,
        top_k=50,
        top_p=0.95,
        temperature=0.7,
        pad_token_id=tokenizer.eos_token_id,
    )
    story = tokenizer.decode(outputs[0], skip_special_tokens=False)
    story = story.split('[END]')[0].strip()  
    return story

# ENDPOINT FOR CUSTOM STORY
@app.route('/generate-custom-story', methods=['POST'])
def ggenerate_custom_story_endpoint():
    data = request.get_json()
    print("Received data:", data)  # Debug print
    title = data.get('title', "Default Title")
    print("Title for story generation:", title)  # Debug print
    print("Generating ...")  # Debug print
    story = generate_custom_story(title)
    print("Story:", story) # Debug print
    return jsonify({"story": story})



# GENERATE WITHOUT CUSTOMIZATION
def generate_uncustom_story():
    prompt = "Generate a title and a story:"

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs.input_ids,
        do_sample=True,
        max_length=700,
        num_return_sequences=1,
        top_k=50,
        top_p=0.95,
        temperature=0.7,
        pad_token_id=tokenizer.eos_token_id,
    )

    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

    
    if "Story:" in generated_text:
        title, story = generated_text.split("Story:", 1)
        title = title.replace("Title:", "").strip()  
        story = story.strip()  
    else:
        title = "Untitled Story"
        story = generated_text  
    
    return title, story

# ENDPOINT FOR UNCUSTOMIZE STORY
@app.route('/generate-story', methods=['POST'])
def generate_story():
    print("Generating ...")  # Debug print
    title, story = generate_uncustom_story()
    print("Generated Title:", title)  # Debug print
    print("Generated Story:", story)  # Debug print
    return jsonify({"title": title, "story": story})



@app.route("/users")
def users():
    return {"users": ["Ericka", "Grace", "Ernest", "Pao","Nino"]}


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
