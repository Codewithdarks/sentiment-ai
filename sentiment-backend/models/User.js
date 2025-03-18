const mongoose = require("mongoose");

// Define user schema with username, password, and role
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username
  password: { type: String, required: true },              // Hashed password
  role: { type: String, default: "user" }                  // Default role: user
});

module.exports = mongoose.model("User", userSchema);       // Export User model