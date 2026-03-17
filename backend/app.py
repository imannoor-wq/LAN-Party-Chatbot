from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) # This allows the Frontend to talk to the Backend

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_data = request.json.get('message', '').lower()
        
        # PRO+ Tip: Opening file with error handling
        with open('data.json', 'r') as file:
            knowledge = json.load(file)
        
        # Search for answer
        response = "I'm not sure about that. Can you ask something else?"
        for item in knowledge['faq']:
            if item['question'].lower() in user_data:
                response = item['answer']
                break
                
        return jsonify({"response": response})
    
    except FileNotFoundError:
        return jsonify({"response": "Error: Knowledge base missing!"}), 500
    except Exception as e:
        return jsonify({"response": "System error occurred."}), 500

if __name__ == '__main__':
    app.run(port=5000)
