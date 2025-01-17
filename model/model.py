from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import os
import torch
import logging
import time

app = Flask(__name__)

# LOAD MODEL AND TOKENIZER
model, tokenizer = None, None
logging.basicConfig(level=logging.INFO)

# LOAD MODEL
def load_model():
    global model, tokenizer
    model_path = os.getenv("MODEL_PATH", "./trained_model")
   
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model directory not found at {model_path}")

    model = GPT2LMHeadModel.from_pretrained(model_path)
    tokenizer = GPT2Tokenizer.from_pretrained(model_path)

    # Ensure tokenizer's pad token is set
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    special_tokens = ['[SEP]', '[END]']
    added = tokenizer.add_tokens(special_tokens)
    if added > 0:
        model.resize_token_embeddings(len(tokenizer))


# ENDPOINT FROM SERVER TO MODEL 
@app.route('/model-generate-story', methods=['POST'])
def generate_story():
    data = request.json
    title = data.get("title", "Default Title")
    genre = data.get("genre", "Default Genre")
    length = data.get("length", "Default Genre")

    prompt = f"Type of Literature: {genre} Length: {length} Title: {title} [SEP]"
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    
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
    story = story.split("[SEP]")[-1].strip()  # get part after SEP
    story = story.split('[END]')[0].strip()

    return jsonify({
        "genre": genre,
        "length": length,
        "title": title,
        "story": story
    })


# ENDPOINT FOR SERVER TO MODEL - RANDOM STORY
# @app.route('/model-generate-random', methods=['POST'])
# def generate_random_story():
#     prompt = "Generate a title and a story:"
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     model.to(device)

#     inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=1024).to(device)
#     outputs = model.generate(
#         inputs.input_ids,
#         do_sample=True,
#         max_length=700,
#         num_return_sequences=1,
#         top_k=50,
#         top_p=0.95,
#         temperature=0.7,
#         pad_token_id=tokenizer.eos_token_id,
#     )
#     generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

#     if "Story:" in generated_text:
#         title, story = generated_text.split("Story:", 1)
#         title = title.replace("Title:", "").strip()
#         story = story.strip()
#     else:
#         title = "Untitled Story"
#         story = generated_text

#     return jsonify({"title": title, "story": story})


if __name__ == "__main__":
    load_model()
    app.run(host="0.0.0.0", port=5001)
