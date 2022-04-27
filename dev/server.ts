import { ApolloServer } from "apollo-server";
import { dataSources, plugins, resolvers, typeDefs } from "../lib";

import envJson from "../.env.json";

const environmentVariables = envJson.GraphQL as any;

for (const envKey in environmentVariables) {
  process.env[envKey] = environmentVariables[envKey];
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  plugins,
});

server.listen(3070, "127.0.0.1").then(() => {
  console.log(`Server ready at http://127.0.0.1:3070/graphql`);
});
