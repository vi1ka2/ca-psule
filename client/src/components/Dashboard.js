import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [capsulesCount, setCapsulesCount] = useState(0);
  const [scheduledCapsules, setScheduledCapsules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        // Fetch user profile
        const userRes = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: token },
        });
        setUser(userRes.data);

        // Fetch capsule count (immediate and scheduled)
        const countRes = await axios.get('http://localhost:5000/api/messages/count-capsules', {
          headers: { Authorization: token },
        });
        setCapsulesCount(countRes.data.count);

        // Fetch scheduled capsules (not yet delivered)
        const schedRes = await axios.get('http://localhost:5000/api/messages/scheduled', {
          headers: { Authorization: token },
        });
        setScheduledCapsules(schedRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const level = Math.floor(capsulesCount / 5) + 1;
  const capsulesToNextLevel = 5 - (capsulesCount % 5);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Welcome, {user.name || 'User'}!</h2>
        <p>Your current level: <strong>{level}</strong></p>
        <div className="capsule-progress">
          <p>{capsulesCount} capsules sent</p>
          <progress value={capsulesCount % 5} max="5"></progress>
          <small>Send {capsulesToNextLevel} more to level up!</small>
        </div>
        <div className="action-links">
          <Link to="/create-capsule" className="btn btn-create">Create Capsule</Link>
          <Link to="/chat" className="btn btn-chat">Open Chat</Link>
          <Link to="/profile" className="btn btn-profile">Profile</Link>
          <Link to="/friends" className="btn btn-friends">Friends</Link>
          <Link to="/friend-requests" className="btn btn-friend-requests">Friend Requests</Link>
          <Link to="/add-friend" className="btn btn-add-friend">Add Friend</Link>
        </div>
        <div className="scheduled-section">
          <h3>Scheduled Capsules</h3>
          {scheduledCapsules.length === 0 ? (
            <p>No future capsules scheduled.</p>
          ) : (
            <ul>
              {scheduledCapsules.map((cap) => (
                <li key={cap._id}>
                  <strong>Message:</strong> {cap.content} <br />
                  <strong>Deliver At:</strong> {new Date(cap.deliverAt).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





