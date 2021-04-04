const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    id: String,
    userID: String,
    videoID: String,
    behavior: String,
    timestamp: String
  });


module.exports = mongoose.model('Annotation', annotationSchema, 'Annotation');