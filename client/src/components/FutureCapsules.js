// client/src/components/FutureCapsules.js
import React from 'react';
import Sidebar from './Sidebar';
import './FutureCapsules.css';

const FutureCapsules = () => {
  return (
    <div className="capsules-container">
      <Sidebar />
      <div className="capsules-content">
        <h2>Future Capsules</h2>
        <p>Display scheduled capsules that are yet to be delivered.</p>
      </div>
    </div>
  );
};

export default FutureCapsules;
