import { createMock } from "ts-auto-mock";
import { Context } from "../..";
import { HarvardArtMuseumsApi } from "../../data-sources/harvard-art-museums-api/harvard-art-museums-api";

export function makeContext() {
  const harvardArtMuseumsApi = createMock<HarvardArtMuseumsApi>();
  const args: any = jest.fn() as any;
  const context: Context = {
    dataSources: { harvardArtMuseumsApi },
  };
  return {
    harvardArtMuseumsApi,
    args,
    context,
  };
}
