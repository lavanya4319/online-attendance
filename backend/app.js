const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/students");
const attendanceRoutes = require("./routes/attendanceRoutes");
const adminRoutes=require('./routes/adminRoutes')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/admin',adminRoutes)
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

app.listen(process.env.PORT, () => console.log("Server running on port 5003"));
