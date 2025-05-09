const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  preferences: {
    favoriteGenres: [String],
    dislikedGenres: [String]
  },
  feedbackHistory: [{
    movieId: String,
    comment: String,
    sentimentScore: Number,
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('User', userSchema);