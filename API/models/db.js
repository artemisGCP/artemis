
const mongoose = require('mongoose');
let dbUrl ='mongodb+srv://tashakim:greenemu@autoba.pcfbm.mongodb.net/test'

let chalk    = require('chalk');
let connected = chalk.bold.cyan;
let error = chalk.bold.yellow;
let disconnected = chalk.bold.red;
let termination = chalk.bold.magenta;


module.exports = async function () {
    // configuration 
    mongoose.connect(dbUrl,{ useUnifiedTopology: true, useNewUrlParser: true });

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", dbUrl));
    });

	mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

	mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

	process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
};