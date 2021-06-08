const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: async email => await User.where({ email }).countDocuments() === 0,
      message: ({ value }) => `Email ${value} already exists`,
    },
  },
  fname: { type: String },
  lname: { type: String },
  createdAt: { type: String },
  userid: { type: String },
}, { timestamps: { createdAt: 'createdAt' } });


const User = mongoose.model('User', userSchema, 'users');

module.exports = { User };