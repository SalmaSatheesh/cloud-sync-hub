const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/files", require("./routes/fileRoutes"));

// Static folder for uploaded files
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
