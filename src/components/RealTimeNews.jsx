import { useState, useEffect } from "react";
import axios from "axios";
import "./realtimenews.css";

const RealTimeNews = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNewsVisible, setIsNewsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:7070/real-time-news", {
          params: {
            query: "farming",
            page_size: 8,
          },
        });
        setNews(response.data.news);
      } catch (err) {
        setError("Unable to fetch latest farming news. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (autoPlay && isNewsVisible && news.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, isNewsVisible, news.length]);

  const handleNextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const handlePrevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="news-dashboard">
        <div className="loading-container">
          <div className="wheat-loader">
            <div className="wheat-grain"></div>
            <div className="wheat-grain"></div>
            <div className="wheat-grain"></div>
          </div>
          <p>Harvesting the latest farming news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-dashboard">
        <div className="error-container">
          <div className="error-icon">🌾</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-dashboard">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-content">
          <div className="header-icon">📰</div>
          <h2>Agricultural News Hub</h2>
          <p>Stay updated with the latest farming trends and insights</p>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-element wheat-1">🌾</div>
          <div className="floating-element leaf-1">🍃</div>
          <div className="floating-element sun">☀️</div>
        </div>
      </div>

      {/* News Toggle Box */}
      <div className="news-toggle-container">
        <div 
          className={`news-box ${isNewsVisible ? 'active' : ''}`}
          onClick={() => setIsNewsVisible(!isNewsVisible)}
        >
          <div className="news-box-content">
            <span className="toggle-icon">{isNewsVisible ? '📖' : '📰'}</span>
            <h3>{isNewsVisible ? "Hide News Feed" : "Show Latest News"}</h3>
            <p>{isNewsVisible ? "Close news panel" : `${news.length} articles available`}</p>
          </div>
          <div className="ripple-effect"></div>
        </div>
      </div>

      {/* News Container */}
      {isNewsVisible && news.length > 0 && (
        <div className="news-content-wrapper">
          {/* Control Panel */}
          <div className="control-panel">
            <div className="news-counter">
              <span>{currentIndex + 1}</span> of <span>{news.length}</span>
            </div>
            
            <div className="control-buttons">
              <button 
                className={`auto-play-btn ${autoPlay ? 'active' : ''}`}
                onClick={() => setAutoPlay(!autoPlay)}
                title={autoPlay ? "Pause Auto-play" : "Start Auto-play"}
              >
                {autoPlay ? '⏸️' : '▶️'}
              </button>
            </div>
          </div>

          {/* News Card Display */}
          <div className="news-container">
            <div className="news-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {news.map((article, index) => (
                <div key={index} className="news-card">
                  <div className="card-header">
                    <div className="news-badge">Latest</div>
                    <div className="news-category">🌱 Agriculture</div>
                  </div>
                  
                  <div className="card-content">
                    <h3>{article.title}</h3>
                    <p className="description">{article.description}</p>
                    
                    <div className="meta-info">
                      <div className="source-info">
                        <span className="source-icon">📺</span>
                        <span className="source">{article.source}</span>
                      </div>
                      <div className="date-info">
                        <span className="date-icon">📅</span>
                        <span className="date">
                          {new Date(article.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="read-more-btn"
                    >
                      <span>Read Full Article</span>
                      <span className="arrow">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="navigation-controls">
            <button className="nav-btn prev-btn" onClick={handlePrevCard}>
              <span>‹</span>
            </button>
            
            <div className="dots-container">
              {news.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                ></button>
              ))}
            </div>
            
            <button className="nav-btn next-btn" onClick={handleNextCard}>
              <span>›</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / news.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeNews;
