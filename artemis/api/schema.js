const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query {
        users: [User]
    }
    type User {
        id: ID!
        email: String 
        token: String
        password: String
    }
`;

const resolvers = {
    Query: {
        users: () => users
    }
}


const users = [
    {id: 1,
    email: 'email',
    token: 'token',
    password: 'password'}
  ]

module.exports = {typeDefs, resolvers};