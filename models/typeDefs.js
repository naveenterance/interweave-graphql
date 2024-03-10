const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    hello: String
    welcome(name: String): String
    users: [User]
    user(id: ID): User
  }
  type User {
    id: ID
    name: String
    password: String
    cart: [String]
  }
  type Mutation {
    create(name: String, password: String, cart: [String]): User
    update(id: ID, name: String, password: String, cart: [String]): User
    delete(id: ID): User
  }
`;

module.exports = { typeDefs };
