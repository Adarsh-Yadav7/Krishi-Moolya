from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)

# Allow all origins or restrict to your frontend
CORS(app, resources={r"/croppredict": {"origins": "*"}})
# If you want to allow only your frontend:
# CORS(app, resources={r"/croppredict": {"origins": ["http://localhost:5174", "http://127.0.0.1:5174"]}})

# Load your model, scaler, encoder
model_path = r"C:\Users\vishw\OneDrive\Desktop\Krishi-Moolya\crop_recommendation\crop_recommendation\best_rf_model.joblib"
scaler_path = r"C:\Users\vishw\OneDrive\Desktop\Krishi-Moolya\crop_recommendation\crop_recommendation\scaler.joblib"
encoder_path = r"C:\Users\vishw\OneDrive\Desktop\Krishi-Moolya\crop_recommendation\crop_recommendation\label_encoder.joblib"

if os.path.exists(model_path) and os.path.exists(scaler_path) and os.path.exists(encoder_path):
    print("✅ Model, scaler, encoder loaded.")
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    label_encoder = joblib.load(encoder_path)
else:
    raise FileNotFoundError("❌ Model, scaler, or encoder files not found.")

@app.route('/croppredict', methods=['POST'])
def predict_crop():
    try:
        data = request.get_json()
        user_input = [[
            float(data.get('N', 0)),
            float(data.get('P', 0)),
            float(data.get('K', 0)),
            float(data.get('temperature', 0)),
            float(data.get('humidity', 0)),
            float(data.get('ph', 0)),
            float(data.get('rainfall', 0))
        ]]

        user_input_scaled = scaler.transform(user_input)
        prediction = model.predict(user_input_scaled)
        predicted_crop = label_encoder.inverse_transform(prediction)

        return jsonify({'recommended_crop': predicted_crop[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
