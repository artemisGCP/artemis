const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    id: String,
    userId: String
})

module.exports = mongoose.model('Video', videoschema, 'Video');