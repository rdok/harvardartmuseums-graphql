import { resolvers } from "../index";
import { makeContext } from "./makers";
import { createMock } from "ts-auto-mock";
import { ObjectResource, ObjectsInput } from "../../types.generated";

describe("Query: Objects", () => {
  it("fetches incoming objects", async () => {
    const { context, harvardArtMuseumsApi, args } = makeQuery();
    await resolvers.Query.objects(null, args, context);
    expect(harvardArtMuseumsApi.objects).not.toHaveBeenCalledWith(args);
  });
  it("returns Objects", async () => {
    const { context, args, objects } = makeQuery();
    const actual = await resolvers.Query.objects(null, args, context);
    expect(actual).toEqual(objects);
  });
});
function makeQuery() {
  const contextFactory = makeContext();
  contextFactory.args = createMock<ObjectsInput>();
  const objects = [createMock<ObjectResource>(), createMock<ObjectResource>()];
  contextFactory.harvardArtMuseumsApi.objects = jest
    .fn()
    .mockResolvedValueOnce(objects);
  return { ...contextFactory, objects };
}
