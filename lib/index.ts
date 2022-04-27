import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { join } from "path";

import { resolvers } from "./resolvers";
import { dataSources } from "./data-sources";
import { Context } from "./config";
import { Logger } from "./plugins/logger";
import { PluginDefinition } from "apollo-server-core/src/types";

const typeDefs = loadSchemaSync(join(__dirname, "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const plugins: PluginDefinition[] = [Logger];

export { typeDefs, resolvers, dataSources, Context, plugins };
