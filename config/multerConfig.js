const multer = require('multer');

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// Initialize multer with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;
