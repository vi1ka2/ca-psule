import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './AddFriend.css';

const AddFriend = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:5000/api/users/search?query=${query}`, {
        headers: { Authorization: token },
      });
      setResults(res.data);
    } catch (error) {
      console.error('Error searching users:', error);
      alert('Failed to search users.');
    }
  };

  const handleSendRequest = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      // POST /api/friends/request with { receiverId: userId }
      await axios.post(
        'http://localhost:5000/api/friends/request',
        { receiverId: userId },
        { headers: { Authorization: token } }
      );
      alert('Friend request sent!');
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Failed to send friend request.');
    }
  };

  return (
    <div className="add-friend-container">
      <Sidebar />
      <div className="add-friend-content">
        <h2>Find & Add Friend</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>

        {results.length > 0 && (
          <ul className="search-results">
            {results.map((user) => (
              <li key={user._id}>
                <strong>{user.name}</strong> ({user.email})
                <button onClick={() => handleSendRequest(user._id)}>Send Request</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddFriend;
