const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  descriptor: [Number],
});

module.exports = mongoose.model('User', UserSchema);
