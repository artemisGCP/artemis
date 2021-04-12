const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    id: String,
    userID: String,
    videoID: String,
    behavior: String,
    // Timestamp
    startTime: Number, // decimal
    endTime: Number // decimal 
  });


module.exports = mongoose.model('Annotation', annotationSchema, 'Annotation');