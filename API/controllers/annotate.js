const express = require("express");
const router = express.Router();
require("../app.js");
let mongoose = require('mongoose');
var Annotation = require('../models/annotations.js');
  
router.post('/', async function(req, res) {
    /*
    Purpose: Inserts a tuple (behavior, timestamp) in the database.
    */
   const Annotation = mongoose.model('Annotation');
   const newDataPoint = {
       userID: req.session.uid,
       videoID: '',
       behavior: req.body.behavior,
       timestamp: req.body.timestamp
   }
   Annotation.insertMany(newDataPoint, function(err, result) {
       if (err) {
           console.error(err);
       } else {
           console.log(result);
       }
   })
    //req.body.data // in the form: (behavior, timestamp)
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