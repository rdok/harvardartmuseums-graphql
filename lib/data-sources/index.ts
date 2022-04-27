import { HarvardArtMuseumsApi } from "./harvard-art-museums-api/harvard-art-museums-api";
import { PrintTransformer } from "./harvard-art-museums-api/transformers/print-transformer";

export type DataSources = {
  harvardArtMuseumsApi: HarvardArtMuseumsApi;
};

const printTransformer = new PrintTransformer();

export const dataSources = (): DataSources => ({
  harvardArtMuseumsApi: new HarvardArtMuseumsApi({
    printTransformer,
  }),
});
