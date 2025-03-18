const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const sentimentRoutes = require('./routes/sentiment');

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(cors()); // Enable CORS for React frontend
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected')) // Log successful connection
  .catch(err => console.error('MongoDB connection error:', err)); // Log connection error

// Define routes
app.use('/api/auth', authRoutes); // Authentication routes (signup, login)
app.use('/api/sentiment', sentimentRoutes); // Sentiment analysis route

// Root endpoint for status check
app.get('/', (req, res) => res.send('Sentiment Analysis API'));

const PORT = process.env.PORT || 5050; // Default port 5050
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start server