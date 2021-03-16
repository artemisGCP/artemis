var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var logger = require('morgan');
var cors = require('cors');
require("dotenv").config();
var {ApolloServer} = require('apollo-server-express');

const connectToDb = require('./db.js');

var indexRouter = require('./src/controllers/pages/index');
//var loginRouter = require('./controllers/pages/login');

var app = express();
app.use(cors())

// view engine setup omitted
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Server Activation
 */
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 8081, () =>
    console.log("Server Running on :8081")
  );
}

module.exports = app;

/* Things to add.
1. during server activation, you are going to want to call a function that connects to the 
mongo db. If this fails you will want to call an error. I made the connect function "connectToDb". You can put this in asycn function. Use an async function with try and catch block
