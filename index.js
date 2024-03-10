const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./models/typeDefs.js");
const { resolvers } = require("./resolvers.js");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
