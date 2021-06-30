const { UserInputError } = require('apollo-server-express');
const Joi = require('joi');
let mongoose = require('mongoose');


const annotationSchema = require('../models/annotations.js');


async function getUserInfo() {
  const userInfo = await User.find({});
  return userInfo;
}

function validateEmail(info) {
  const errors = [];
  const result = Joi.validate(info, setUser);
  const { error } = result;

  const valid = error == null;

  if (!valid) errors.push('Please enter valid email');

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}


async function setAnnotations(obj, args, context, info) {
    /*
    Purpose: Inserts a tuple (behavior, timestamp) in the database.
    */
   console.log(args);
   const location = context.req.headers.authorization;
    const Annotation = mongoose.model('Annotation', annotationSchema, `${args.videoName}`);
    var data = context.req.query;
    var annotations = data.annotations;
    
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
    
}


module.exports = { setAnnotations };


