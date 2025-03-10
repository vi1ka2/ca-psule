import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-toggle" onClick={() => setOpen(!open)}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      {open && (
        <div className="sidebar-menu">
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/create-capsule">Capsules</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/friends">Friends</Link></li>
            <li><Link to="/friend-requests">Friend Requests</Link></li>
            <li>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;



