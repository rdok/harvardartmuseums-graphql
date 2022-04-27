import { ApolloServer } from "apollo-server-lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Request, Response } from "express-serve-static-core";

import {
  addToContext,
  Context,
  dataSources,
  plugins,
  resolvers,
  typeDefs,
} from "../lib";
import { SecretsManager } from "@aws-sdk/client-secrets-manager";
import { Secrets } from "../lib/secrets";

/**
 * Subsequent invocations processed by the same instance of the function can reuse resources.
 * Save cost by reducing function run time & service usage.
 * https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
 */
const secretsManager = new SecretsManager({});
const secrets = new Secrets({ secretsManager });

const graphql = new ApolloServer({
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

const { CORS_ORIGINS_COMMA_DELIMITED = "" } = process.env;
const origin = CORS_ORIGINS_COMMA_DELIMITED.split(",");

export const handler = graphql.createHandler({
  // https://github.com/expressjs/cors#configuration-options
  expressGetMiddlewareOptions: {
    cors: { origin, credentials: true },
  },
});
