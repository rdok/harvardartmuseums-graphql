import { HarvardArtMuseumsApi } from "./harvard-art-museums-api/harvard-art-museums-api";
import { PrintTransformer } from "./harvard-art-museums-api/transformers/print-transformer";
import { PrintsInputTransformer } from "./harvard-art-museums-api/transformers/prints-input-transformer";

export type DataSources = {
  harvardArtMuseumsApi: HarvardArtMuseumsApi;
};

const objectTransformer = new PrintTransformer();
const printsInputTransformer = new PrintsInputTransformer();

export const dataSources = (): DataSources => ({
  harvardArtMuseumsApi: new HarvardArtMuseumsApi({
    printTransformer: objectTransformer,
    inputTransformer: printsInputTransformer,
  }),
});
