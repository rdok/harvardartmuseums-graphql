import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { IncomingObjects } from "./types.generated";
import { UserInputError } from "apollo-server-lambda";
import { Objects, ObjectsInput } from "../../types.generated";
import { ObjectTransformer } from "./transformers/object-transformer";
import { ObjectsInputTransformer } from "./transformers/objects-input-transformer";

export class HarvardArtMuseumsApi extends RESTDataSource {
  private transformer: ObjectTransformer;
  private inputTransformer: ObjectsInputTransformer;

  constructor(props: {
    objectTransformer: ObjectTransformer;
    objectInputTransformer: ObjectsInputTransformer;
  }) {
    super();
    this.baseURL = process.env.HARVARD_ART_MUSEUMS_API;
    this.transformer = props.objectTransformer;
    this.inputTransformer = props.objectInputTransformer;
  }

  async willSendRequest(request: RequestOptions) {
    const harvardArtMuseumsApiKey =
      await this.context.secrets.harvardArtMuseumsApiKey();

    if (!harvardArtMuseumsApiKey) {
      const message =
        "process.env.HARVARD_ART_MUSEUMS_API_KEY is missing. See https://docs.google.com/forms/d/1Fe1H4nOhFkrLpaeBpLAnSrIMYvcAxnYWm0IU9a6IkFA/viewform";
      throw new Error(message);
    }

    request.params.set("apikey", harvardArtMuseumsApiKey);
  }

  async objects(input: ObjectsInput): Promise<Objects> {
    const pageSize = input.pageSize as number; // Default value set from GraphQL
    const pageNumber = input.pageNumber as number; // Default value set from GraphQL

    if (pageSize > 100 || pageSize < 1) {
      throw new UserInputError("Page size must be between 1 and 100.");
    }
    if (pageNumber < 1) {
      throw new UserInputError("Page number must be greater than 0.");
    }

    const transformedInput = this.inputTransformer.transform(input);

    const response: IncomingObjects = await this.get(
      "object",
      transformedInput
    );

    return this.transformer.transformMany(response);
  }
}
