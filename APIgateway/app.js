const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { recommendMovies } = require('./controllers/rest');
const { typeDefs, resolvers } = require('./controllers/graphql');
const config = require('./config');

const app = express();
app.use(express.json());

// REST endpoint
app.get('/recommend', recommendMovies);

// GraphQL setup
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });

app.listen(config.PORT, () => {
  console.log(`API Gateway running on http://localhost:${config.PORT}`);
  console.log(`GraphQL at http://localhost:${config.PORT}${apolloServer.graphqlPath}`);
});