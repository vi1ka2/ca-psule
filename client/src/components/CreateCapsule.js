import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateCapsule.css';

const CreateCapsule = () => {
  const [message, setMessage] = useState('');
  const [media, setMedia] = useState('');
  const [deliverAt, setDeliverAt] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/capsules',
        { message, media, deliverAt, recipientPhone },
        { headers: { Authorization: token } }
      );
      alert('Capsule created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating capsule:', error);
      alert('Error creating capsule');
    }
  };

  return (
    <div className="create-capsule-container">
      <h2>Create a New Capsule</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Media URL (optional):</label>
          <input type="text" value={media} onChange={(e) => setMedia(e.target.value)} placeholder="Enter image/video URL" />
        </div>
        <div className="form-group">
          <label>Delivery Date & Time:</label>
          <input type="datetime-local" value={deliverAt} onChange={(e) => setDeliverAt(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Recipient Phone Number:</label>
          <input type="tel" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} placeholder="e.g., +1234567890" required />
        </div>
        <button type="submit">Send Capsule</button>
      </form>
    </div>
  );
};

export default CreateCapsule;


