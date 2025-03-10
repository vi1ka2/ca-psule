// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
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
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/capsules', capsuleRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/users', userRoutes);


// Start capsule scheduler (for scheduled messages)
capsuleScheduler.start();

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
    if (!data.isCapsule) {
      io.to(data.conversationId).emit('receive message', data);
      const Message = require('./models/Message');
      let newMessage = new Message(data);
      await newMessage.save();
    } else {
      const Message = require('./models/Message');
      let newMessage = new Message(data);
      await newMessage.save();
      // The capsuleScheduler will deliver this message when due.
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


