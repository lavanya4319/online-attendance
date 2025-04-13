const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Dummy admin
const adminEmail = "admin@gmail.com";
const adminPassword = "admin123";

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
