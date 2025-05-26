KrishiMoolya 🌾
Welcome to Krishi Moolya – A platform that leverages technology to predict crop prices, empowering farmers with actionable insights for a better tomorrow.
Home Page 🌾
![Screenshot 2025-05-26 163416](https://github.com/user-attachments/assets/c6b8881f-5f99-4cae-bba7-2d75a287887c)
![Screenshot 2025-05-26 163439](https://github.com/user-attachments/assets/81aeba0c-1bba-4a68-801e-c836616872c6)

Weather Insights 🌾
![Screenshot 2025-05-26 163453](https://github.com/user-attachments/assets/5b0a360d-e019-4caf-8839-90580c28b3b1)

Real-Time News 🌾
![Screenshot 2025-05-26 163640](https://github.com/user-attachments/assets/7aa6d572-9fe9-4b9d-8d26-5c4d138bf883)

Price Prediction of Crops 🌾
![Screenshot 2025-05-26 163510](https://github.com/user-attachments/assets/1ceea033-a65e-48c3-bdb3-c48cd7922c18)

Crop Prices Analysis 🌾
![Screenshot 2025-05-26 163527](https://github.com/user-attachments/assets/76c5f470-8f86-485d-9d8d-d2890734f1c6)

Next 12 Months Analysis 🌾
![Screenshot 2025-05-26 163537](https://github.com/user-attachments/assets/5fbfa743-889a-4fe6-9b55-2e04c947f077)

Fertilizer Recommendation 🌾
![image](https://github.com/user-attachments/assets/bcf41d58-64ff-4b84-aeef-a45cb7cac1b5)

Crop Recommendation 🌾
![image](https://github.com/user-attachments/assets/898c3fcd-3a77-406a-b6f4-47bb1e0e51c4)

🚀 Project Overview
KrishiMoolya is a crop price prediction tool designed to assist farmers, traders, and decision-makers in planning their agriculture-related activities. By utilizing historical data and advanced algorithms, this platform provides accurate price forecasts for various crops.

🛠 Features
State and District Selection: Choose your region to get localized predictions.
Crop Selection: Select from a list of popular crops to predict prices.
Date-based Forecasts: Get price predictions up to 3 months in the future.
Real-time Results: View minimum and maximum price ranges for better decision-making.
Error Alerts: Clear and concise error messages for any issues during prediction.
**Offline Chatbots
**Online Gemini Chatbot
**Crop and Fertilizer Recommendation
**Price Prediction considering all necessary factors with more than 96% Accuracy
**Weather Prediction of next 5 days
**Interactive Dashboard
📦 Tech Stack
Frontend
React: For building an intuitive user interface.
Material-UI: For sleek, responsive components and styling.
Backend
Flask: Serves the prediction API and handles business logic.
Python: Utilized for data processing and machine learning models.
Deployment
Localhost (Development): Hosted locally for testing and development purposes.
🖥️ Installation Guide
Follow these steps to set up the project on your local machine.

Prerequisites
Ensure you have the following installed:

Node.js and npm
Python 3.2 and above
Flask
Required Python libraries (flask, pandas, etc.)
Steps
Clone the repository:

git clone https://github.com/your-username/KrishiMoolya.git  
Navigate to the frontend directory and install dependencies:

cd frontend  
npm install  
Start the frontend:

npm start  
Navigate to the backend directory and set up Python environment:

cd backend  
pip install -r requirements.txt  
Run the Flask server:

python app.py  
Open your browser and access the app at:

http://localhost:3000  
🧩 API Endpoints
1. POST /predict
Predicts crop prices based on input parameters.

Request Body
{  
  "state": "Madhya Pradesh",  
  "district": "Indore",  
  "crop": "Wheat",  
  "date": "2024-12-31"  
}  
Response
{  
  "predicted_min_price": 2500,  
  "predicted_max_price": 2700  
}  
Error Response
{  
  "error": "Invalid input or server issue"  
}  
🎯 How It Works
The user selects the state, district, crop, and date through an interactive form.
The frontend sends the data to the Flask backend via a POST request.
The backend processes the input and queries a trained model to predict price ranges.
The frontend displays the predicted minimum and maximum prices to the user.
🌟 Contributing
We welcome contributions to improve KrishiMoolya!

Fork the repository.
Create a new branch for your feature:
git checkout -b feature-name  
Commit your changes:
git commit -m "Add feature description"  
Push your branch:
git push origin feature-name  
Open a Pull Request and explain your changes.
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

📬 Contact
Have questions or suggestions? Feel free to reach out!

Email: adarshyafdav88771@gmail.com
GitHub: Adarsh - Yadav7
Let’s build a brighter future for agriculture together! 🌱
