// src/components/ChatWindow.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';
import axios from 'axios';
import './ChatWindow.css';

const socket = io('http://localhost:5000');

export default function ChatWindow({ conversationId, friend }) {
  const { user, token } = useContext(AuthContext);

  // Hooks at top
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isCapsule, setIsCapsule] = useState(false);
  const [deliverAt, setDeliverAt] = useState('');

  const currentUserId = user ? user._id : null;

  // 1. Fetch previous messages
  useEffect(() => {
    if (conversationId && token) {
      axios
        .get(`http://localhost:5000/api/messages/${conversationId}`, {
          headers: { Authorization: token },
        })
        .then((res) => setMessages(res.data))
        .catch((err) => console.error('Error fetching messages:', err));
    }
  }, [conversationId, token]);

  // 2. Socket.io join & listen
  useEffect(() => {
    if (conversationId) {
      socket.emit('join conversation', conversationId);
      socket.on('receive message', (msg) => {
        if (msg.conversationId === conversationId) {
          setMessages((prev) => [...prev, msg]);
        }
      });
      return () => {
        socket.off('receive message');
      };
    }
  }, [conversationId]);

  // 3. Send a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !currentUserId) return;

    const messageData = {
      conversationId,
      sender: currentUserId,
      content: input,
      isCapsule,
      deliverAt: isCapsule ? deliverAt : null,
    };

    socket.emit('send message', messageData);

    // If immediate, show locally
    
    setInput('');
    setIsCapsule(false);
    setDeliverAt('');
  };

  // If friend or user is missing, show a loading
  if (!friend || !user) {
    return <div className="chat-window-loading">Loading chat...</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img
          src={`https://i.pravatar.cc/40?u=${friend._id}`}
          alt={friend.name}
          className="avatar"
        />
        <h3>{friend.name}</h3>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-row ${
              msg.sender === currentUserId ? 'sent' : 'received'
            }`}
          >
            <div className="message-bubble">
              <p>{msg.content}</p>
              {msg.isCapsule && !msg.delivered && (
                <span className="capsule-info">
                  Scheduled for {new Date(msg.deliverAt).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          placeholder={`Message ${friend.name}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {isCapsule && (
          <input
            type="datetime-local"
            value={deliverAt}
            onChange={(e) => setDeliverAt(e.target.value)}
            required
            className="date-picker"
          />
        )}
        <div className="chat-actions">
          <button type="submit" className="btn-send">Send</button>
          <button
            type="button"
            className="btn-schedule"
            onClick={() => setIsCapsule(!isCapsule)}
          >
            {isCapsule ? 'Cancel Capsule' : 'Schedule Capsule'}
          </button>
        </div>
      </form>
    </div>
  );
}













