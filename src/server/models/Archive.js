const mongoose = require('mongoose');

const Archive = mongoose.Schema({
  url: { type: String, required: true },
  date: { type: Date, default: Date.now },
  html: { type: String, required: true }
});

module.exports = mongoose.model('Archive', Archive);
