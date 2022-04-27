import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { logError } from "../utils";

/**
 * https://www.apollographql.com/docs/apollo-server/integrations/plugins/
 */
export const Logger: ApolloServerPlugin = {
  async requestDidStart() {
    return {
      async didEncounterErrors(requestContext) {
        logError({
          ERRORS: requestContext.errors,
          REQUEST: requestContext.request,
        });
      },
    };
  },
};
