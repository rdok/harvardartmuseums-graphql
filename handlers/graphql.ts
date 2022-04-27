import { ApolloServer } from "apollo-server-lambda";

import { dataSources, plugins, resolvers, typeDefs } from "../lib";

const graphql = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  plugins,
});

const { CORS_ORIGINS_COMMA_DELIMITED = "" } = process.env;
const origin = CORS_ORIGINS_COMMA_DELIMITED.split(",");

export const handler = graphql.createHandler({
  // https://github.com/expressjs/cors#configuration-options
  expressGetMiddlewareOptions: {
    cors: { origin, credentials: true },
  },
});
