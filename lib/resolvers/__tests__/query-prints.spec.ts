import { resolvers } from "../index";
import { makeContext } from "./makers";
import { createMock } from "ts-auto-mock";
import { Print, PrintsInput } from "../../types.generated";

describe("Query: prints", () => {
  it("fetches incoming objects", async () => {
    const { context, harvardArtMuseumsApi, args } = makeQuery();
    await resolvers.Query.prints(null, args, context);
    expect(harvardArtMuseumsApi.prints).not.toHaveBeenCalledWith(args);
  });
  it("returns prints", async () => {
    const { context, args, prints } = makeQuery();
    const actual = await resolvers.Query.prints(null, args, context);
    expect(actual).toEqual(prints);
  });
});
function makeQuery() {
  const contextFactory = makeContext();
  contextFactory.args = createMock<PrintsInput>();
  const prints = [createMock<Print>(), createMock<Print>()];
  contextFactory.harvardArtMuseumsApi.prints = jest
    .fn()
    .mockResolvedValueOnce(prints);
  return { ...contextFactory, prints };
}
