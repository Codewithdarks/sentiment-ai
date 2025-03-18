const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username }); // Check if username exists
    if (user) return res.status(400).json({ error: "Username already exists" });

    user = new User({
      username,
      password: await bcrypt.hash(password, 10), // Hash password with 10 rounds
    });
    await user.save(); // Save user to MongoDB

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Generate JWT with 1-hour expiry
    res.json({ token }); // Return token
  } catch (err) {
    res.status(500).json({ error: "Server Error" }); // Handle server error
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }); // Find user by username
    if (!user) return res.status(400).json({ error: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Generate JWT with 1-hour expiry
    res.json({ token }); // Return token
  } catch (err) {
    res.status(500).json({ error: "Server Error" }); // Handle server error
  }
});

module.exports = router; // Export router