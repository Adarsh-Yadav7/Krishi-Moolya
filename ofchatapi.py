from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "LLaMA API is running. Use the /query endpoint to interact."})

@app.route("/query", methods=["POST"])
def query():
    try:
        user_input = request.json.get("message", "")
        print(f"Received user input: {user_input}")  # Debug

        if not user_input:
            return jsonify({"error": "No message provided"}), 400

        model_name = "llama3"  # Update this if needed
        print(f"Using model: {model_name}")

        process = subprocess.Popen(
            ["ollama", "run", model_name],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8"
        )

        stdout, stderr = process.communicate(input=user_input)

        print(f"Subprocess stdout: {stdout}")
        print(f"Subprocess stderr: {stderr}")

        if process.returncode != 0:
            print(f"Subprocess error code: {process.returncode}")
            return jsonify({"error": f"Model error: {stderr.strip()}"}), 500

        response_text = " ".join(stdout.strip().splitlines())

        return jsonify({"response": response_text})

    except Exception as e:
        print(f"Unexpected exception: {e}")
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


if __name__ == "__main__":
    # Run on port 4040, accessible externally (change debug=True for dev)
    app.run(host="0.0.0.0", port=4040, debug=True)
