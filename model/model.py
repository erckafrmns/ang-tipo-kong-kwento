# model.py
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import os

# Load the model and tokenizer
def load_model():
    model_path = os.path.join(os.getcwd(), 'model', 'trained_model')
    model = GPT2LMHeadModel.from_pretrained(model_path)
    tokenizer = GPT2Tokenizer.from_pretrained(model_path)

    # Ensure tokenizer's pad token is set
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    return model, tokenizer

# Generate custom story 
def generate_custom_story(title, model, tokenizer):
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

# Generate random story
def generate_uncustom_story(model, tokenizer):
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
