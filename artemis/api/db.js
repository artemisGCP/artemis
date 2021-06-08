const mongoose = require('mongoose');
let chalk = require('chalk');
require('dotenv').config();
let connected = chalk.bold.cyan;
let error = chalk.bold.yellow;
let disconnected = chalk.bold.red;
let termination = chalk.bold.magenta;


async function connectToDb() {
    const DB_URL = process.env.DB_URL || 'mongodb://localhost/artemis'
    // configuration =============================================================== 
    mongoose.connect(DB_URL,{ useUnifiedTopology: true, useNewUrlParser: true });

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", DB_URL));
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
}

module.exports = { connectToDb };