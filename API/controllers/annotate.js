const express = require("express");
const router = express.Router();
const cors = require('cors');

require("../app.js");
let mongoose = require('mongoose');
var Annotation = require('../models/annotations.js');

router.post('/', cors(), async function(req, res) {
    /*
    Purpose: Inserts a tuple (behavior, timestamp) in the database.
    */

   console.log("req.query: ", req.query);
    var data = req.query;
    var annotations = data.annotations;
    
    const Annotation = mongoose.model('Annotation');
    //console.log(annotations);
    
    annotations.forEach(annotation => {
       
        var obj = JSON.parse(annotation);
        var timestamps = obj.data;
        
        if (obj.data !== []) {
            timestamps.forEach(timestamp => {
                console.log("timestamp: ", timestamp);
                var startTime = timestamp[0][1];
                var endTime = timestamp[1][1];

                var newDataPoint = {
                    userID: req.session.uid,
                    videoID: req.query.videoID,
                    behavior: obj.text,
                    startTime: startTime,
                    endTime: endTime,
                }
                Annotation.insertMany(newDataPoint, function(err, result) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(result);
                    }
                })
            });
        };   
    });
   
    console.log("Data inserted");
});

router.delete('/', async function(req, res) {
    /*
    Purpose: Deletes a tuple (behavior, timestamp) in the database.
    */
   const Annotation = mongoose.model('Annotation');
   Annotation.findOneAndDelete({videoID: req.body.videoID}, function(err) {
       // deletes the whole video for now, need to know what params are passed in from frontend.
       if (err) console.error(err);
       console.log("Data deleted");
   })
})

module.exports = router;