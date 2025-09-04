from flask import Flask, request, jsonify  # Import Flask modules for web server
from flask_cors import CORS  # Import CORS to allow frontend requests
import subprocess  # Import subprocess to run external scripts
import sys  # Import sys to determine OS type
import os  # Import os for handling file paths

# Initialize the Flask application
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable Cross Origin Resource Sharing CORS for all routes

# Define the home route
@app.route('/')
def home():
    return "Flask server is running! Use POST /run to execute scripts."

# Define the '/run' route to execute scripts
@app.route('/run', methods=['POST'])
def run_script():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Check if JSON data is provided and contains 'script' key
        if not data or "script" not in data:
            return jsonify({"error": "Invalid request, 'script' key is required"}), 400

        script_name = data["script"]  # Extract script name from request

        # Validate the script name
        if script_name == "emotion_game.py":
            script_path = os.path.join("face", script_name)  # Construct the script path

            # Determine the Python command based on the OS
            if sys.platform == "win32":
                command = ["python", script_path]  # Windows uses 'python'
            else:
                command = ["python3", script_path]  # Linux/macOS uses 'python3'

            # Execute the script in the background (suppress output)
            subprocess.Popen(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

            return jsonify({"message": "Emotion game started successfully!"})

        # Return an error if the script name is invalid
        return jsonify({"error": "Invalid script name"}), 400

    except Exception as e:
        # Catch and return any errors
        return jsonify({"error": str(e)}), 500

# Run the Flask application
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002, debug=True)  # Start the server on port 5002
