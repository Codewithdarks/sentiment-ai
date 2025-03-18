const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const AnalyzedTweet = require("../models/AnalyzedTweet"); 

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

// Proxy for sentiment analysis
router.post("/analyze", auth, async (req, res) => {
  const { tweet } = req.body;
  if (!tweet) return res.status(400).json({ error: "No tweet provided" });

  try {
    const response = await axios.post("http://localhost:5001/sentiment/analyze", { tweet });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Sentiment Analysis Failed. Ensure Flask API is running." });
  }
});

// Proxy for fetching tweets
router.get("/tweets/:username", auth, async (req, res) => {
  const { username } = req.params;
  const { count } = req.query;
  try {
    const response = await axios.get(`http://localhost:5001/twitter/tweets/${username}`, {
      params: { count }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.error || "Failed to fetch tweets. Ensure Flask API is running."
    });
  }
});

// Proxy for tweet analysis (tweets + sentiment)
router.get("/tweetanalysis/:username", auth, async (req, res) => {
  const { username } = req.params;
  const { count } = req.query;
  try {
    const response = await axios.get(`http://localhost:5001/tweetanalysis/${username}`, {
      params: { count }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.error || "Failed to analyze tweets. Ensure Flask API is running."
    });
  }
});
// for saving analyzed data into database
router.post("/save-analyzed-tweets", auth, async (req, res) => {
  const { username, name, tweets } = req.body;
  console.log('Request Body:', req.body); // Debug incoming data

  if (!username || !name || !tweets || !Array.isArray(tweets)) {
    console.log('Validation Failed:', { username, name, tweets });
    return res.status(400).json({ error: "Invalid data provided" });
  }

  try {
    const analyzedTweet = new AnalyzedTweet({
      username,
      name,
      tweets
    });
    console.log('Saving Document:', analyzedTweet); // Debug before save
    await analyzedTweet.save();
    console.log('Save Successful');
    res.status(201).json({ message: "Analyzed tweets saved successfully" });
  } catch (err) {
    console.error('Save Error:', err.message); // Detailed error log
    res.status(500).json({ error: "Failed to save analyzed tweets: " + err.message });
  }
});

module.exports = router;