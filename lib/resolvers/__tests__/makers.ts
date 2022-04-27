import { createMock } from "ts-auto-mock";
import { Context } from "../..";
import { HarvardArtMuseumsApi } from "../../data-sources/harvard-art-museums-api/harvard-art-museums-api";
import { Secrets } from "../../secrets";

export function makeContext() {
  const harvardArtMuseumsApi = createMock<HarvardArtMuseumsApi>();
  const secrets = createMock<Secrets>();
  const args: any = jest.fn() as any;
  const context: Context = {
    dataSources: { harvardArtMuseumsApi },
    secrets,
  };
  return {
    harvardArtMuseumsApi,
    args,
    context,
  };
}
