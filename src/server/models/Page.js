const mongoose = require('mongoose');

const Page = mongoose.Schema({
  url: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', Page);
