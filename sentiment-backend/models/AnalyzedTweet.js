const mongoose = require('mongoose');

const analyzedTweetSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  tweets: [{
    text: { type: String, required: true },
    sentiment: { type: String, required: true },
    created_at: { type: String, default: 'Unknown' }
  }],
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AnalyzedTweet', analyzedTweetSchema);