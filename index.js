// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server); // Initialize Socket.io

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');

  // Get user ID from query parameters or authentication
  const userId = socket.handshake.query.userId;

  // Join the user to a room with their user ID
  socket.join(userId);

  // Handle incoming messages
  socket.on('sendMessage', (messageData) => {
    // Emit the message to the recipient's room
    io.to(messageData.recipientId).emit('receiveMessage', messageData);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/admin', require('./routes/api/admin')); // Include admin routes

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
