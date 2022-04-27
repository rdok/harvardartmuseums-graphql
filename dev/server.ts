import { ApolloServer } from "apollo-server";
import { Request, Response } from "express-serve-static-core";
import {
  Context,
  dataSources,
  plugins,
  resolvers,
  typeDefs,
  addToContext,
} from "../lib";

import envJson from "../.env.json";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { SecretsManager } from "@aws-sdk/client-secrets-manager";
import { Secrets } from "../lib/secrets";

const environmentVariables = envJson.GraphQL as any;

for (const envKey in environmentVariables) {
  process.env[envKey] = environmentVariables[envKey];
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Subsequent invocations processed by the same instance of the function can reuse resources.
 * Save cost by reducing function run time & service usage.
 * https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
 */
const secretsManager = new SecretsManager({});
const secrets = new Secrets({ secretsManager });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: (props: {
    event: APIGatewayProxyEvent;
    context: Context;
    express: { req: Request; res: Response };
  }) => addToContext({ ...props.express, secrets }),
  plugins,
});

server.listen(3070, "127.0.0.1").then(() => {
  console.log(`Server ready at http://127.0.0.1:3070/graphql`);
});
