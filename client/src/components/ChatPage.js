// src/components/ChatPage.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import FriendsList from './FriendsList';
import ChatWindow from './ChatWindow';
import './ChatPage.css';

function ChatPage() {
  // Hooks unconditionally
  const { user, token } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  // 1. Fetch the friend list
  useEffect(() => {
    if (!token) return;
    axios
      .get('http://localhost:5000/api/friends', {
        headers: { Authorization: token },
      })
      .then((res) => setFriends(res.data))
      .catch((err) => console.error('Error fetching friends:', err));
  }, [token]);

  // 2. Start Chat: create/fetch conversation for the friend
  const handleStartChat = async (friend) => {
    setSelectedFriend(friend);
    if (!user || !token) return;

    try {
      const res = await axios.post(
        'http://localhost:5000/api/conversations',
        { participants: [user._id, friend._id] },
        { headers: { Authorization: token } }
      );
      setConversationId(res.data._id);
    } catch (error) {
      console.error('Error creating conversation:', error);
      alert('Failed to open chat.');
    }
  };

  return (
    <div className="chat-page">
      {/* Left column: FriendsList */}
      <div className="sidebar">
        <FriendsList friends={friends} onStartChat={handleStartChat} />
      </div>

      {/* Right column: ChatWindow if we have a conversation */}
      <div className="chat-column">
        {conversationId && selectedFriend ? (
          <ChatWindow
            conversationId={conversationId}
            friend={selectedFriend}
          />
        ) : (
          <div className="no-chat-selected">
            <h2>Select a friend to start chatting</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;



