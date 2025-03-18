const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.body;

    // Check if a pending request already exists
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: 'pending'
    });
    if (existingRequest) {
      return res.status(400).json({ msg: 'Friend request already sent' });
    }

    const friendRequest = new FriendRequest({ sender: senderId, receiver: receiverId });
    await friendRequest.save();
    res.json(friendRequest);
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await FriendRequest.find({ receiver: userId, status: 'pending' })
      .populate('sender', 'name email');
    res.json(requests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) return res.status(404).json({ msg: 'Friend request not found' });
    
    friendRequest.status = 'accepted';
    await friendRequest.save();

    // Update both users' friend lists
    await User.findByIdAndUpdate(friendRequest.sender, { $push: { friends: friendRequest.receiver } });
    await User.findByIdAndUpdate(friendRequest.receiver, { $push: { friends: friendRequest.sender } });
    
    res.json(friendRequest);
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) return res.status(404).json({ msg: 'Friend request not found' });
    
    friendRequest.status = 'rejected';
    await friendRequest.save();
    res.json(friendRequest);
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getFriendsList = async (req, res) => {
  try {
    const userId = req.user?.id;  // Ensure req.user exists

    if (!userId) {
      return res.status(401).json({ msg: 'Unauthorized: No user ID found' });
    }

    console.log(`Fetching friends for user ID: ${userId}`);

    const user = await User.findById(userId).populate('friends', 'name email');

    if (!user) {
      console.log('User not found in database.');
      return res.status(404).json({ msg: 'User not found' });
    }

    console.log(`User found: ${user.name}, Friends count: ${user.friends.length}`);

    res.json(user.friends || []);
  } catch (error) {
    console.error('Error fetching friends list:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
