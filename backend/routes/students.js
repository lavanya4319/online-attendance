const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { studentId, name, descriptor } = req.body;

  const user = new User({
    studentId,
    name,
    descriptor,
  });

  await user.save();
  res.status(200).json({ message: "Student registered" });
});

router.get("/", async (req, res) => {
  const students = await User.find();
  res.json(students);
});

module.exports = router;

