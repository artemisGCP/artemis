const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    id: String,
    path: String,
    behavior: String,
    // Timestamp
    startTime: Number, // decimal
    endTime: Number, // decimal 
    training: Boolean
  });


module.exports = {annotationSchema};