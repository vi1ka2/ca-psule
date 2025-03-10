import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './FriendRequests.css';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/friends/requests', {
          headers: { Authorization: token },
        });
        setRequests(res.data);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/friends/accept', { requestId }, { headers: { Authorization: token } });
      setRequests(prev => prev.filter(req => req._id !== requestId));
      alert('Friend request accepted!');
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert('Failed to accept friend request.');
    }
  };

  const handleReject = async (requestId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/friends/reject', { requestId }, { headers: { Authorization: token } });
      setRequests(prev => prev.filter(req => req._id !== requestId));
      alert('Friend request rejected.');
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      alert('Failed to reject friend request.');
    }
  };

  return (
    <div className="friend-requests-container">
      <Sidebar />
      <div className="friend-requests-content">
        <h2>Friend Requests</h2>
        {requests.length === 0 ? (
          <p>No pending friend requests.</p>
        ) : (
          <ul>
            {requests.map(req => (
              <li key={req._id}>
                <div>
                  <strong>{req.sender.name}</strong> ({req.sender.email})
                </div>
                <div className="actions">
                  <button onClick={() => handleAccept(req._id)}>Accept</button>
                  <button onClick={() => handleReject(req._id)}>Reject</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
