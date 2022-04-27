import { Context } from "..";
import { ObjectsInput } from "../types.generated";

const Query = {
  healthCheck: () => "alive",
  objects(parent: any, args: { input: ObjectsInput }, context: Context) {
    return context.dataSources.harvardArtMuseumsApi.objects(args.input);
  },
};

export { Query as default };
