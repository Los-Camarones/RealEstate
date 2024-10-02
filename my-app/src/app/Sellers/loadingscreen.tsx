import React from 'react';
import './page.css'; // Import the CSS file for styling

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-message">Loading sellers page for you ...</div>
      <div className="loading-bar"></div>
    </div>
  );
};

export default LoadingScreen;