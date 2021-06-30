const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const setAnnotations = require('./resolvers.js');


const resolvers = {
  Mutation: {
    annotate: setAnnotations.setAnnotations,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf-8'),
  resolvers,
  context: ({ req, res }) => {
    return {
      req,
      res
    }
  },
  formatError: (error) => {
    console.log(error);
    return error;
  },
  playground: true,
  introspection: true,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };