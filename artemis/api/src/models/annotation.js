let mongoose = require('mongoose');
let bcrypt   = require('bcrypt-nodejs');

let annotation = mongoose.Schema({
        frame: {
            type: Number
        },
        behavior: {
            type: String
        },
        userid: {
            type: String
        },
        videoPath: {
            type: String
        },
        videoName: {
            type: String
        }
});

module.exports = mongoose.model('annotation', annotation, 'annotations');
