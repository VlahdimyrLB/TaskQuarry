const multer = require("multer");

// Multer configuration
const upload = multer({
  dest: "uploads/", // Directory where uploaded files will be stored
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = upload;
