const express = require('express');
const cookieParser = require('cookie-parser');
const { auth, logout, info } = require('./handle');
const app = express();

//
app.use(cookieParser());
//
app.get('/auth', auth);
app.get('/info', info);
app.get('/logout', logout);

//
const server = () => {
  console.log('server listen on port 8000');
  app.listen(8000);
};

module.exports = server;
