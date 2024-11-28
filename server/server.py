import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import time

# Configured Logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)

MODEL_SERVICE_URL = "http://model:5001"


# ENDPOINT FOR CLIENT TO SERVER - RANDOM STORY
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


# ENDPOINT FOR CLIENT TO SERVER - CUSTOM STORY
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
