const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes'); // Added authentication routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Mount routes
app.use('/api/auth', authRoutes); // Added authentication endpoints
app.use('/api/jobs', jobRoutes);

// Catch-all route for unhandled endpoints (404 Error Handler)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler (Handles all other server errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});