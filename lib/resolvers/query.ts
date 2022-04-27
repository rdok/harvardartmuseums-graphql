import { Context } from "..";
import { PrintsInput } from "../types.generated";

const Query = {
  healthCheck: () => "alive",
  prints(parent: any, args: { input: PrintsInput }, context: Context) {
    return context.dataSources.harvardArtMuseumsApi.prints(args.input);
  },
};

export { Query as default };
