/* This is where you will build apolloserver on express server. And layout resolvers. 
I have copied and pasted code form other work I have done to help you. You will have to change
most of it to conform to our use case. BUt the overall idea is still there. 

Basically, 
1. initialize graphschema in typedefs
2. layut resolver functions
3. create function that applies middleware to express sevrer. 
4. You can import installhandler in app.js and call installHandler(app) to apply middleware. 
*/
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const Joi = require('joi');
const info = require('./resolvers.js');
const UserAquireDate = require('../resolvers/graphql_date.js');

const resolvers = {
  Query: {
    getUserInfo: resolvers.getUserInfo,
  },
  Mutation: {
    setUserInfo: resolvers.setUserInfo,
  },
  UserAquireDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };