const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");

function euclideanDistance(desc1, desc2) {
  if (!desc1 || !desc2 || desc1.length !== desc2.length) return Infinity;
  return Math.sqrt(desc1.reduce((sum, val, i) => sum + (val - desc2[i]) ** 2, 0));
}

router.post("/mark", async (req, res) => {
  const { descriptor } = req.body;
  if (!descriptor) {
    return res.status(400).json({ message: "Face descriptor missing" });
  }

  const users = await User.find();

  let bestMatch = null;
  let minDistance = 1;

  for (const user of users) {
    const distance = euclideanDistance(descriptor, user.descriptor);
    if (distance < minDistance && distance < 0.6) {
      minDistance = distance;
      bestMatch = user;
    }
  }

  if (!bestMatch) {
    return res.status(404).json({ message: "Face not recognized" });
  }

  const today = new Date().setHours(0, 0, 0, 0);

  const alreadyMarked = await Attendance.findOne({
    studentId: bestMatch.studentId,
    date: today,
  });

  if (alreadyMarked) {
    return res.status(200).json({
      message: `Attendance already marked for ${bestMatch.name}`,
      alreadyMarked: true,
    });
  }

  const attendance = new Attendance({
    studentId: bestMatch.studentId,
    date: today,
  });
  await attendance.save();

  res.status(200).json({
    message: `Attendance marked for ${bestMatch.name}`,
    alreadyMarked: false,
  });
});


router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find();
    const grouped = {};

    for (let rec of records) {
      const date = new Date(rec.date).toISOString().split("T")[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(rec.studentId);
    }

    const report = [];

    for (const [date, studentIds] of Object.entries(grouped)) {
      const students = await User.find({ studentId: { $in: studentIds } });
      const studentNames = students.map((s) => s.name);
      report.push({
        date,
        count: studentNames.length,
        students: studentNames,
      });
    }

    res.json(report);
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
