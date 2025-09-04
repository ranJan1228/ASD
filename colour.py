from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import sys
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow frontend requests

@app.route('/')
def home():
    return "Colour Recognition Server is running! Use POST /run to start the game."

@app.route('/run', methods=['POST'])
def run_script():
    try:
        data = request.get_json()

        if not data or "script" not in data:
            return jsonify({"error": "Invalid request, 'script' key is required"}), 400

        script_name = data["script"]

        if script_name == "colour.py":
            script_path = os.path.join("face", script_name)

            # Determine the correct command for different OS
            if sys.platform == "win32":
                command = ["python", script_path]
            else:
                command = ["python3", script_path]

            # Run the script in the background
            subprocess.Popen(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

            return jsonify({"message": "Colour recognition game started successfully!"})

        return jsonify({"error": "Invalid script name"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5003, debug=True)
