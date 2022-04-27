import { HarvardArtMuseumsApi } from "./harvard-art-museums-api/harvard-art-museums-api";
import { ObjectTransformer } from "./harvard-art-museums-api/transformers/object-transformer";
import { ObjectsInputTransformer } from "./harvard-art-museums-api/transformers/objects-input-transformer";

export type DataSources = {
  harvardArtMuseumsApi: HarvardArtMuseumsApi;
};

const objectTransformer = new ObjectTransformer();
const objectInputTransformer = new ObjectsInputTransformer();

export const dataSources = (): DataSources => ({
  harvardArtMuseumsApi: new HarvardArtMuseumsApi({
    objectTransformer,
    objectInputTransformer,
  }),
});
