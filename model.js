const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });


const Image = mongoose.model('Image', imageSchema);


module.exports = Image;