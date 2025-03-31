const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Upload File
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ message: "File uploaded successfully", fileName: req.file.filename });
});

// List Files
router.get("/files", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ message: "Error retrieving files" });
    res.json({ files });
  });
});

// Delete File
router.delete("/files/:fileName", (req, res) => {
  const filePath = path.join(uploadDir, req.params.fileName);
  fs.unlink(filePath, err => {
    if (err) return res.status(500).json({ message: "Error deleting file" });
    res.json({ message: "File deleted successfully" });
  });
});

module.exports = router;
