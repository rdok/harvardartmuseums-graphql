import { createMock } from "ts-auto-mock";
import { IncomingObject, IncomingObjects } from "../types.generated";
import { PrintTransformer } from "../transformers/print-transformer";
import { PrintsInputTransformer } from "../transformers/prints-input-transformer";
import { Prints, PrintsInput } from "../../../types.generated";
import { create } from "domain";

it("transforms prints input", async () => {
  const { harvardArtMuseumApi, inputTransformer, input } =
    await makeHarvardArtMuseumApi();
  await harvardArtMuseumApi.prints(input);
  expect(inputTransformer.transform).toHaveBeenCalledWith(input);
});

it("uses the correct API request body", async () => {
  const { harvardArtMuseumApi, httpGet, input, transformedInput } =
    await makeHarvardArtMuseumApi();
  await harvardArtMuseumApi.prints(input);
  expect(httpGet).toHaveBeenCalledWith("object", transformedInput);
});

it("transforms prints", async () => {
  const { apiResults, input, objectTransformer, harvardArtMuseumApi } =
    await makeHarvardArtMuseumApi();

  await harvardArtMuseumApi.prints(input);

  expect(objectTransformer.transformMany).toHaveBeenCalledWith(
    apiResults,
    input
  );
});

async function makeHarvardArtMuseumApi() {
  const { HarvardArtMuseumsApi } = await import("../harvard-art-museums-api");
  const input = createMock<PrintsInput>({
    pageNumber: 1,
    pageSize: 2,
  });
  const incomingObject = createMock<IncomingObject>();
  const apiResults = createMock<IncomingObjects>({
    records: [createMock<IncomingObject>()],
  });
  const prints = createMock<Prints>();
  const transformMany = jest.fn().mockReturnValueOnce(prints);
  const transformedInput = jest.fn();
  const inputTransformer = createMock<PrintsInputTransformer>({
    transform: jest.fn().mockReturnValueOnce(transformedInput),
  });
  const objectTransformer = createMock<PrintTransformer>({
    transformMany,
  });
  const httpGet = jest.fn().mockResolvedValueOnce(apiResults);
  jest.mock("apollo-datasource-rest", () => ({
    RESTDataSource: class {
      get = httpGet;
    },
  }));
  const harvardArtMuseumApi = new HarvardArtMuseumsApi({
    printTransformer: objectTransformer,
    inputTransformer,
  });

  return {
    harvardArtMuseumApi,
    objectTransformer,
    transformedInput,
    transformMany,
    prints,
    httpGet,
    apiResults,
    incomingObject,
    input: input,
    inputTransformer,
  };
}

describe("validate user input", () => {
  it("errors having page size less than one", async () => {
    const { harvardArtMuseumApi, input } = await makeHarvardArtMuseumApi();
    await expect(
      harvardArtMuseumApi.prints({ ...input, pageSize: -1 })
    ).rejects.toThrow("Page size must be between 1 and 100.");
  });

  it("errors having page size more than 100", async () => {
    const { harvardArtMuseumApi, input } = await makeHarvardArtMuseumApi();
    await expect(
      harvardArtMuseumApi.prints({ ...input, pageSize: 101 })
    ).rejects.toThrow("Page size must be between 1 and 100.");
  });

  it("errors having negative page number", async () => {
    const { harvardArtMuseumApi, input } = await makeHarvardArtMuseumApi();
    await expect(
      harvardArtMuseumApi.prints({ ...input, pageNumber: 0 })
    ).rejects.toThrow("Page number must be greater than 0.");
  });
});
