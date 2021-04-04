const bodyParser = require("body-parser");
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
var {OAuth2Client} = require('google-auth-library');
var jwt = require('jsonwebtoken');

// Create a new MongoClient
//const client = new MongoClient(uri);

const SESSION_SECRET = 'secret'; // Move this to .env file
let JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.log("Authentication fail: Missing a JWT_SECRET")
}

var app = express();
var server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({app});
app.use((req, res) => {
  res.status(200);
  //res.send("Hello!");
  res.end();
})
app.use(cors())

// view engine setup omitted
app.use(logger('dev'));
app.use(bodyParser.json({limit: "200mb"}));
app.use(bodyParser.urlencoded({limit: "200mb", extended: true})); 
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

const annotate = require("./controllers/annotate");

app.use("/annotate", annotate);
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
  app.listen(process.env.PORT || 8080, () => {
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

function getCurrUser(req) {
  const googleToken = req.cookies.jwt_google;
  if (!googleToken) {
    return {
      signedIn: false
    };
  }

  try {
    const credential = jwt.verify(googleToken, JWT_SECRET);
    return credential;

  } catch (err) {
    return {
      signedIn: false
    };
  }
}

app.get('/', async(req, res) => {
  res.send("Welcome to our app");
})

app.post('/signin', async(req, res)  => {
  if (!JWT_SECRET) {
    res.status(500).send("Authentication failed: You are missing a JWT_SECRET");
  }
  if (!req.body.google_token) {
    res.status(400).send({ code: 400, message: "Google token is missing"});
  }

  const token = req.body.token;
  const client = new OAuth2Client();
  try {
    const session = await client.verifyIdToken({idToken : token});
    payload = session.getPayload();
  } catch (err) {
    res.status(401).send("Your credentials are not valid");
  }

  const {username: username, email: email} = payload;
  const credential = { signedIn: true, username, email: email}
  const myToken = jwt.sign(credential, JWT_SECRET);

  res.cookie('jwt', myToken);
  console.log("User was signed in")
});

app.post('/user', (req, res) => {
  const currUser = getCurrUser(req);

  if (currUser.signedIn == false) {
    res.status(403).send("User could not be signed in. Try again")
  } else {
    res.send(currUser);
  }
})

app.post('signout', async (req, res) => {
  res.clearCookie('jwt');
  console.log("User was signed out");
})

run().catch(console.dir);

module.exports = app;

/* Things to add.
1. during server activation, you are going to want to call a function that connects to the 
mongo db. If this fails you will want to call an error. I made the connect function "connectToDb". You can put this in asycn function. Use an async function with try and catch block
*/