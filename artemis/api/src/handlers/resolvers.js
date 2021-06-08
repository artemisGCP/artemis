const { UserInputError } = require('apollo-server-express');
const Joi = require('joi');
const { getDb } = require('../../db.js');

const { setUser } = require('../models/joiSchema.js');
const { User } = require('../models/user.js');

async function getUserInfo() {
  const userInfo = await User.find({});
  return userInfo;
}

function validateEmail(info) {
  const errors = [];
  const result = Joi.validate(info, setUser);
  const { error } = result;

  const valid = error == null;

  if (!valid) errors.push('Please enter valid email');

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}


async function setUserInfo(_, { info }) {
  await validateEmail(info);
  const newInfo = Object.assign({}, info);
  return User.create(newInfo);
}


module.exports = { getUserInfo, setUserInfo };

/* here are xamples of resolvers. You can import these in api_handler. */
