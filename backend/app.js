const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/students");
const attendanceRoutes = require("./routes/attendanceRoutes");
const adminRoutes=require('./routes/adminRoutes')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/face-attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"));

app.use('/api/admin',adminRoutes)
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
