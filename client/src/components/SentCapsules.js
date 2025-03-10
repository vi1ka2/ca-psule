// client/src/components/SentCapsules.js
import React from 'react';
import Sidebar from './Sidebar';
import './SentCapsules.css';

const SentCapsules = () => {
  return (
    <div className="capsules-container">
      <Sidebar />
      <div className="capsules-content">
        <h2>Sent Capsules</h2>
        <p>Display the record of delivered capsules here.</p>
      </div>
    </div>
  );
};

export default SentCapsules;
