const bodyParser = require("body-parser");
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var expressValidator = require("express-validator");
var logger = require('morgan');
var session = require('express-session');
require("dotenv").config();
var {ApolloServer} = require('apollo-server-express');
var {MongoClient} = require('mongodb');
var {OAuth2Client} = require('google-auth-library');
var jwt = require('jsonwebtoken');
var fileUpload = require('express-fileupload');
const { installHandler } = require('./src/handlers/api_handler');

const cors = require('cors');
app.use(cors())


app.use(cookieParser());

installHandler(app);
// DB
const connectToDb = require('./db.js');

const port = process.env.API_PORT;

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());


/* Things to add.
1. during server activation, you are going to want to call a function that connects to the 
mongo db. If this fails you will want to call an error. I made the connect function "connectToDb". You can put this in asycn function. Use an async function with try and catch block
*/
