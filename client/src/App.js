import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import CreateCapsule from './components/CreateCapsule';
import ChatWindow from './components/ChatWindow';
import FriendsList from './components/FriendsList';
import FriendRequests from './components/FriendRequests';
import AddFriend from './components/AddFriend';
import ChatPage from './components/ChatPage';

function App() {
  // In a real app, conversationId and currentUser would be dynamic (from context or state)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-capsule" element={<CreateCapsule />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/friends" element={<FriendsList />} />
        <Route path="/friend-requests" element={<FriendRequests />} />
        <Route path="/add-friend" element={<AddFriend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




