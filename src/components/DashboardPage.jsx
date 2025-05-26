import { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardPage.css";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [stateInput, setStateInput] = useState("Madhya Pradesh");
  const [city, setCity] = useState("Indore");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    setIsAnimating(true);
    try {
      const response = await axios.get("http://localhost:3500/weather", {
        params: { state: stateInput, city }
      });
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching weather data");
      setWeatherData(null);
    }
    setLoading(false);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="weather-dashboard">
      <div className="dashboard-grain-overlay"></div>
      
      <div className="content-wrapper">
        <h1 className="dashboard-title">
          Agricultural Weather Insights
          <span className="title-decoration"></span>
        </h1>
        
        <div className="input-form">
          <div className="input-group">
            <label>State</label>
            <input
              type="text"
              placeholder="Enter State"
              value={stateInput}
              onChange={(e) => setStateInput(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button 
            onClick={fetchWeatherData}
            className={`fetch-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Fetching...' : 'Get Weather Forecast'}
          </button>
        </div>

        {error && <div className="error-message">Error: {error}</div>}
        
        {weatherData && (
          <div className="weather-content">
            <h2 className="location-title">
              Weather Forecast for {weatherData.location}
            </h2>
            
            <div className={`forecast-container ${isAnimating ? 'animate' : ''}`}>
              {weatherData.forecast.map((day, index) => (
                <div 
                  key={index} 
                  className="forecast-box"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="forecast-date">{day.date}</div>
                  <img 
                    src={`https:${day.icon}`} 
                    alt={day.condition}
                    className="weather-icon"
                  />
                  <div className="forecast-details">
                    <div className="temp">
                      <span className="label">Temperature</span>
                      <span className="value">{day.avg_temperature}°C</span>
                    </div>
                    <div className="condition">
                      <span className="label">Condition</span>
                      <span className="value">{day.condition}</span>
                    </div>
                    <div className="humidity">
                      <span className="label">Humidity</span>
                      <span className="value">{day.humidity}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;