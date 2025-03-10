import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-overlay">
        <h1>Time Capsule</h1>
        <p>
          Send messages to your future self or friends. Chat in real time and schedule wishes for special moments.
        </p>
        <div className="landing-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
        <div className="landing-features">
          <h2>Features</h2>
          <ul>
            <li>Real-time messaging </li>
            <li>Schedule future messages (Capsules)</li>
            <li>Chat with friends or even yourself</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


