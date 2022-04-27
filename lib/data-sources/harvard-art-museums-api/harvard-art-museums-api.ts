import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { PrintTransformer } from "./transformers/print-transformer";
import { IncomingObjects } from "./types.generated";
import { PrintsInputTransformer } from "./transformers/prints-input-transformer";
import { UserInputError } from "apollo-server-lambda";
import { Prints, PrintsInput } from "../../types.generated";

export class HarvardArtMuseumsApi extends RESTDataSource {
  private transformer: PrintTransformer;
  private inputTransformer: PrintsInputTransformer;

  constructor(props: {
    printTransformer: PrintTransformer;
    inputTransformer: PrintsInputTransformer;
  }) {
    super();
    this.baseURL = process.env.HARVARD_ART_MUSEUMS_API;
    this.transformer = props.printTransformer;
    this.inputTransformer = props.inputTransformer;
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

  async prints(input: PrintsInput): Promise<Prints> {
    const pageSize = input.pageSize as number; // Default value set from GraphQL
    const pageNumber = input.pageNumber as number; // Default value set from GraphQL

    if (pageSize > 100 || pageSize < 1) {
      throw new UserInputError("Page size must be between 1 and 100.");
    }
    if (pageNumber < 1) {
      throw new UserInputError("Page number must be greater than 0.");
    }

    const params = this.inputTransformer.transform(input);

    const response: IncomingObjects = await this.get("object", params);

    return this.transformer.transformMany(response, input);
  }
}
