// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const capsuleRoutes = require('./routes/capsules');
const conversationRoutes = require('./routes/conversations');
const messageRoutes = require('./routes/messages');
const capsuleScheduler = require('./scheduler/capsuleScheduler');
const friendRoutes = require('./routes/friends');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://fancy-biscuit-54f447.netlify.app/' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/capsules', capsuleRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/users', userRoutes);

// Start capsule scheduler (for scheduled messages)
capsuleScheduler.start();

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // The "catchall" handler: for any request that doesn't match the above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Create HTTP server and setup Socket.io
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

// Real-time chat with Socket.io
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
  });

  socket.on('send message', async (data) => {
    // data: { conversationId, sender, content, isCapsule, deliverAt }
    const Message = require('./models/Message');
    try {
      let newMessage = new Message(data);
      await newMessage.save();
      
      // Emit immediately if not a capsule message.
      if (!data.isCapsule) {
        io.to(data.conversationId).emit('receive message', data);
      }
      // If it's a capsule, a scheduler will deliver it later.
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



