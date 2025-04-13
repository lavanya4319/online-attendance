const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentId: String,
  date: Date,
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
