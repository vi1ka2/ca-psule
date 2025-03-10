// src/components/FriendsList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FriendsList.css';

function FriendsList({ onStartChat }) {
  const { user, token } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  // Fetch friend list from backend
  useEffect(() => {
    if (!token) return;
    axios
      .get('http://localhost:5000/api/friends', {
        headers: { Authorization: token },
      })
      .then((res) => setFriends(res.data))
      .catch((err) => {
        console.error('Error fetching friends:', err);
      });
  }, [token]);

  // Default function to start chat if onStartChat prop is not provided
  const defaultStartChat = (friend) => {
    if (!user || !token) return;
    // Create a conversation with both the current user and the friend
    axios
      .post(
        'http://localhost:5000/api/conversations',
        { participants: [user._id, friend._id] },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        // Navigate to the chat page with conversationId and friendId in query parameters
        navigate(`/chat?conversationId=${res.data._id}&friendId=${friend._id}`);
      })
      .catch((err) => {
        console.error('Error starting chat:', err);
        alert('Failed to open chat with friend.');
      });
  };

  // Handle the Start Chat click: use the provided onStartChat prop or default
  const handleStartChat = (friend) => {
    if (onStartChat) {
      onStartChat(friend);
    } else {
      defaultStartChat(friend);
    }
  };

  return (
    <div className="friends-list-container">
      <h2>Your Friends</h2>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        friends.map((friend) => (
          <div key={friend._id} className="friend-item">
            <span>
              {friend.name} ({friend.email})
            </span>
            <button onClick={() => handleStartChat(friend)}>Start Chat</button>
          </div>
        ))
      )}
    </div>
  );
}

export default FriendsList;









