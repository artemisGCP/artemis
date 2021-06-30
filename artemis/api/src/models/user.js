const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    token: String,
    password: String
  });


  module.exports = mongoose.model('User', userSchema, 'User');