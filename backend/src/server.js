
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "CloudOps backend is running",
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CloudOps Platform"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CloudOps server running on port ${PORT}`);
});
