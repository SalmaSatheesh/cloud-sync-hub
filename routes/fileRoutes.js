const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Files will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Upload route (only authenticated users can upload files)
router.post("/upload", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({ 
    message: "File uploaded successfully", 
    filePath: `/uploads/${req.file.filename}` 
  });
});

// Retrieve uploaded files
router.get("/files", authMiddleware, (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving files" });
    }
    res.status(200).json({ files });
  });
});

module.exports = router;
