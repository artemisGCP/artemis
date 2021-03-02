let mongoose = require('mongoose');
let bcrypt   = require('bcrypt-nodejs');

let annotation = mongoose.Schema({
        timestamp: {
            type: Date
        },
        behavior: {
            type: String
        },
        userid: String
});

module.exports = mongoose.model('annotation', annotation);
