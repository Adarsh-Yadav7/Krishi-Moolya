import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  // Enhanced slides data with more agricultural theming
  const slides = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/235925/pexels-photo-235925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      label: "Harvest Analytics",
      subtitle: "Data-Driven Farming",
      description: "Make informed decisions with our advanced prediction models for agricultural commodity prices.",
      ctaText: "Explore Analytics",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      label: "Krishi Chat",
      subtitle: "Your Smart Agricultural Assistant",
      description: "Interactive, farmer-focused chatbot providing real-time assistance and guidance for all your agricultural needs.",
      ctaText: "Start Chatting",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/442589/pexels-photo-442589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      label: "Smart Crop Insights",
      subtitle: "Grow What Thrives",
      description: "Analyze soil conditions, climatic factors, and regional suitability to cultivate the most profitable and sustainable crops.",
      ctaText: "Get Insights",
    },
  ];

  // Autoplay functionality
  useEffect(() => {
    if (autoplayPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeSlide, autoplayPaused]);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveSlide((prev) => (prev + 1) % slides.length);
    
    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === activeSlide) return;
    
    setIsTransitioning(true);
    setActiveSlide(index);
    
    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <main className="home-main">
      {/* Animated background grain texture */}
      <div className="grain-overlay"></div>
      
      {/* Hero Carousel Section */}
      <section 
        className="hero-carousel"
        onMouseEnter={() => setAutoplayPaused(true)}
        onMouseLeave={() => setAutoplayPaused(false)}
      >
        {/* Slides Container */}
        <div className="slides-container">
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`slide ${index === activeSlide ? 'active' : ''}`}
              style={{
                zIndex: index === activeSlide ? 2 : 1,
                transform: `translateX(${(index - activeSlide) * 100}%)`,
              }}
            >
              {/* Background Image with Zoom Effect */}
              <div 
                className="slide-bg" 
                style={{ backgroundImage: `url(${slide.src})` }}
              ></div>
              
              {/* Gradient Overlay */}
              <div className="slide-overlay"></div>
              
              {/* Content */}
              <div className="slide-content">
                <h3 className="slide-subtitle">{slide.subtitle}</h3>
                <h2 className="slide-title">{slide.label}</h2>
                <p className="slide-description">{slide.description}</p>
                
                <div className="slide-actions">
                  <button className="btn btn-primary">
                    {slide.ctaText}
                    <span className="btn-icon">→</span>
                  </button>
                  <button className="btn btn-secondary">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Controls */}
        <div className="carousel-controls">
          <button 
            className="carousel-arrow carousel-arrow-prev" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <span>←</span>
          </button>
          
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === activeSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="indicator-progress"></span>
              </button>
            ))}
          </div>
          
          <button 
            className="carousel-arrow carousel-arrow-next" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <span>→</span>
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </section>
      
      {/* Feature Highlights Section */}
      <section className="feature-highlights">
        <div className="section-heading">
          <h2>Smart Farming Solutions</h2>
          <p>Empowering farmers with technology and data-driven insights</p>
        </div>
        
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon harvest-icon"></div>
            <h3>Harvest Analytics</h3>
            <p>Gain insights into market trends and make informed decisions with our price prediction tools.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon chat-icon"></div>
            <h3>Krishi Chat</h3>
            <p>Get instant answers to your farming questions from our AI-powered agricultural assistant.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon crop-icon"></div>
            <h3>Crop Recommendations</h3>
            <p>Discover which crops will thrive in your specific conditions for maximum yield and profit.</p>
          </div>
          
          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon weather-icon"></div>
            <h3>Weather Insights</h3>
            <p>Stay ahead of changing weather patterns with our localized agricultural forecasts.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your <span>Farming Practices?</span></h2>
          <p>Join thousands of farmers who have already enhanced their productivity and profitability with our smart agricultural solutions.</p>
          
          <ul className="benefits-list">
            <li>Increase crop yield by up to 25%</li>
            <li>Reduce resource wastage with precision farming</li>
            <li>Get real-time advice from agricultural experts</li>
            <li>Stay updated with market trends and prices</li>
          </ul>
          
          <button className="btn btn-primary cta-button">
            Get Started Today
            <span className="btn-icon">→</span>
          </button>
        </div>
        
        <div className="cta-image"></div>
      </section>
    </main>
  );
}

export default Home;