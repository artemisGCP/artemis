var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var expressValidator = require("express-validator");
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
require("dotenv").config();

const SESSION_SECRET = 'secret'; // Move this to .env file

var indexRouter = require('./controllers/pages/index');
//var loginRouter = require('./controllers/pages/login');

var app = express();
app.use(cors())

// view engine setup omitted
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use(expressValidator());
app.use(
	session({
		secret: SESSION_SECRET,
		cookie: {},
		resave: false, // This must be false. Interferes with concurrency.
        saveUninitialized: true,
        maxAge: 86400000, // Session expires after 24 hours
	})
);


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
