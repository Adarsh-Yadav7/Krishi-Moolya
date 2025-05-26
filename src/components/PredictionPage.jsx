
import { useState } from 'react';
import "./PredictionPage.css";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Alert,
  CircularProgress
} from '@mui/material';

const PricePredictionForm = () => {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    crop: '',
    date: '',
    temperature: '',
    rainfall: '',
    moisture: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define your state districts
  const districts = {
    "Madhya Pradesh": [
      "Betul", "Bhopal", "Chhindwara", "Dewas", "Gwalior", "Indore", "Jabalpur",
      "Khargone", "Ratlam", "Rewa", "Sagar", "Satna", "Shivpuri", "Ujjain", "Vidisha"
    ]
  };

  // Define your commodities
  const crops = [
    'Wheat', 'Gram', 'Barley', 'Rice', 'Maize', 'Jowar', 'Soybean', 'Masoor', 'Groundnuts'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Log the request data
      console.log('Sending request with data:', {
        date: formData.date,
        crop: formData.crop,
        district: formData.district,
        temperature: formData.temperature,
        rainfall: formData.rainfall,
        moisture: formData.moisture,
      });

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'omit',
        body: JSON.stringify({
          date: formData.date,
          crop: formData.crop,
          district: formData.district,
          temperature: formData.temperature,
          rainfall: formData.rainfall,
          moisture: formData.moisture
        }),
      });

      console.log('Response status:', response.status);
      
      // Read the response as JSON
      let data;
      try {
        // Check if the response is okay before parsing
        if (!response.ok) {
          const responseText = await response.text(); // Read the response text if not ok
          console.log('Error response text:', responseText);
          throw new Error(`Failed to get prediction: ${responseText}`);
        }

        // Parse the response as JSON only if the response is ok
        data = await response.json();
        console.log('Parsed response data:', data);

      } catch (err) {
        console.error('Error parsing response:', err);
        throw new Error('Invalid response format or server error');
      }
      setPrediction(data);
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { districts: '' } : {}), // Reset district when state changes
    }));
  };
  

  // Get today's date for max date restriction
  const today = new Date().toISOString().split('T')[0];
  // Get date 3 months from today for max future prediction
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="farmer-prediction-container">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} className="farmer-form-paper">
          <Box className="farmer-header">
            <div className="header-decoration">🌾</div>
            <Typography variant="h4" component="h1" className="farmer-title">
              Crop Price Prediction
            </Typography>
            <Typography variant="subtitle1" className="farmer-subtitle">
              Smart farming with AI-powered price insights
            </Typography>
            <div className="header-decoration">🚜</div>
          </Box>
          
          <Box component="form" onSubmit={handleSubmit} className="farmer-form">
            <Box className="form-fields">
              {/* State Selection */}
              <FormControl fullWidth required className="farmer-field">
                <InputLabel className="farmer-label">🏞️ Select State</InputLabel>
                <Select
                  name="state"
                  value={formData.state}
                  label="🏞️ Select State"
                  onChange={handleChange}
                  className="farmer-select"
                >
                  {Object.keys(districts).sort().map((state) => (
                    <MenuItem key={state} value={state} className="farmer-option">
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* District Selection */}
              <FormControl fullWidth required disabled={!formData.state} className="farmer-field">
                <InputLabel className="farmer-label">🌍 Select District</InputLabel>
                <Select
                  name="district"
                  value={formData.district}
                  label="🌍 Select District"
                  onChange={handleChange}
                  className="farmer-select"
                >
                  {formData.state && districts[formData.state].sort().map((district) => (
                    <MenuItem key={district} value={district} className="farmer-option">
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {/* Commodity Selection */}
              <FormControl fullWidth required className="farmer-field">
                <InputLabel className="farmer-label">🌱 Select Crop</InputLabel>
                <Select
                  name="crop"
                  value={formData.crop}
                  label="🌱 Select Crop"
                  onChange={handleChange}
                  className="farmer-select"
                >
                  {crops.sort().map((crop) => (
                    <MenuItem 
                      key={crop} 
                      value={crop}
                      className="farmer-option"
                    >
                      {crop}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Date Selection */}
              <TextField
                fullWidth
                required
                type="date"
                name="date"
                label="📅 Select Date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: today,
                  max: maxDateString
                }}
                className="farmer-textfield"
              />

              {/* Temperature Input */}
              <TextField
                fullWidth
                required
                type="number"
                name="temperature"
                label="🌡️ Temperature (°C)"
                value={formData.temperature}
                onChange={handleChange}
                className="farmer-textfield"
              />

              {/* Rainfall Input */}
              <TextField
                fullWidth
                required
                type="number"
                name="rainfall"
                label="🌧️ Rainfall (mm)"
                value={formData.rainfall}
                onChange={handleChange}
                className="farmer-textfield"
              />

              {/* Moisture Input */}
              <TextField
                fullWidth
                required
                type="number"
                name="moisture"
                label="💧 Moisture (%)"
                value={formData.moisture}
                onChange={handleChange}
                className="farmer-textfield"
              />

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                className="farmer-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <div className="loading-content">
                    <CircularProgress size={24} className="loading-spinner" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="btn-content">
                    <span>🔮 Predict Crop Price</span>
                  </div>
                )}
              </Button>
            </Box>
          </Box>

          {/* Error Display */}
          {error && (
            <Box className="error-container">
              <Alert 
                severity="error"
                onClose={() => setError(null)}
                className="farmer-alert"
              >
                {error}
              </Alert>
            </Box>
          )}

          {/* Prediction Results */}
          {prediction && (
            <Box className="prediction-results">
              <div className="results-header">
                <Typography variant="h6" className="results-title">
                  🎯 Predicted Price Range
                </Typography>
              </div>
              <Box className="price-display">
                <div className="price-card min-price-card">
                  <div className="price-icon">💰</div>
                  <Typography variant="subtitle2" className="price-label">
                    Minimum Price
                  </Typography>
                  <Typography variant="h5" className="price-value">
                    ₹{prediction.min_price}
                  </Typography>
                </div>
                <div className="price-card max-price-card">
                  <div className="price-icon">💎</div>
                  <Typography variant="subtitle2" className="price-label">
                    Maximum Price
                  </Typography>
                  <Typography variant="h5" className="price-value">
                    ₹{prediction.max_price}
                  </Typography>
                </div>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default PricePredictionForm;