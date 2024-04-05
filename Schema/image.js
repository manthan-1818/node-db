const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  image: Buffer // Store binary data of the image
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;