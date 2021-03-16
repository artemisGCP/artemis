var express = require('express');
var cookieParser = require('cookie-parser');
var expressValidator = require("express-validator");
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
require("dotenv").config();
var {ApolloServer} = require('apollo-server-express');
var {typeDefs, resolvers} = require('./schema');
var {MongoClient} = require('mongodb');

// Create a new MongoClient
//const client = new MongoClient(uri);

const SESSION_SECRET = 'secret'; // Move this to .env file

var app = express();
var server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({app});
app.use((req, res) => {
  res.status(200);
  res.send("Hello!");
  res.end();
})
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
  app.listen(process.env.PORT || 8081, () => {
    console.log("Server Running on :8080")
    console.log(`🚀 Graphql Server ready at http://localhost:8080${server.graphqlPath}`)
  });

}

// DB
const connectToDb = require('./models/db.js');

async function run() {
  try {
    // Connect mongoclient to server
    connectToDb();
    console.log("DB Connected successfully to server");
  } finally {
    // Ensure that client closes when you finish/error
    console.error("DB Connection failed");
  }

}

run().catch(console.dir);

module.exports = app;

/* Things to add.
1. during server activation, you are going to want to call a function that connects to the 
mongo db. If this fails you will want to call an error. I made the connect function "connectToDb". You can put this in asycn function. Use an async function with try and catch block
*/