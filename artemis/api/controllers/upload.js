const fs = require('fs');
const express = require("express");
const router = express.Router();
const cors = require('cors');

require('../app.js');
let mongoose = require('mongoose');
var Video = require('../models/video.js');

router.use(express.bodyParser());


router.post('/', cors(), async function(req, res, next) {
    // <input type='file' name='upload'>

    //var path = req.files.upload.path;
    var fileName = req.files.upload.name;

    const Video = mongoose.model('Video');
    var newDataPoint = {
        userId: req.session.userId
    }
    // if videoId doesn't already exist
    Video.insertMany(newDataPoint, function(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(results);
        }
    })
    console.log("Data inserted");


    // if videoId already exists, alert user -> load video?
    console.log("Video has already been uploaded. Load video?")
})

module.exports = router;