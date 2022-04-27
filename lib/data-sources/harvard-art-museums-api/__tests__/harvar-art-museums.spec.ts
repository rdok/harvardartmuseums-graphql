import { createMock } from "ts-auto-mock";
import { IncomingObject, IncomingObjects } from "../types.generated";
import { Objects, ObjectsInput } from "../../../types.generated";
import { ObjectTransformer } from "../transformers/object-transformer";
import { ObjectsInputTransformer } from "../transformers/objects-input-transformer";

it("transforms objects input", async () => {
  const { harvardArtMuseumApi, input, objectInputTransformer } =
    await makeHarvardArtMuseumApi();
  await harvardArtMuseumApi.objects(input);
  expect(objectInputTransformer.transform).toHaveBeenCalledWith(input);
});

it("uses the correct API request body", async () => {
  const { harvardArtMuseumApi, httpGet, input, transformedInput } =
    await makeHarvardArtMuseumApi();
  await harvardArtMuseumApi.objects(input);
  expect(httpGet).toHaveBeenCalledWith("object", transformedInput);
});

it("transforms objects", async () => {
  const { apiResults, input, objectTransformer, harvardArtMuseumApi } =
    await makeHarvardArtMuseumApi();

  await harvardArtMuseumApi.objects(input);

  expect(objectTransformer.transformMany).toHaveBeenCalledWith(apiResults);
});

async function makeHarvardArtMuseumApi() {
  const { HarvardArtMuseumsApi } = await import("../harvard-art-museums-api");
  const input = createMock<ObjectsInput>({
    pageNumber: 1,
    pageSize: 2,
  });
  const incomingObject = createMock<IncomingObject>();
  const apiResults = createMock<IncomingObjects>({
    records: [createMock<IncomingObject>()],
  });
  const objects = createMock<Objects>();
  const transformMany = jest.fn().mockReturnValueOnce(objects);
  const transformedInput = jest.fn();
  const objectInputTransformer = createMock<ObjectsInputTransformer>({
    transform: jest.fn().mockReturnValueOnce(transformedInput),
  });
  const objectTransformer = createMock<ObjectTransformer>({
    transformMany,
  });
  const httpGet = jest.fn().mockResolvedValueOnce(apiResults);
  jest.mock("apollo-datasource-rest", () => ({
    RESTDataSource: class {
      get = httpGet;
    },
  }));
  const harvardArtMuseumApi = new HarvardArtMuseumsApi({
    objectTransformer,
    objectInputTransformer,
  });

  return {
    transformedInput,
    harvardArtMuseumApi,
    objectTransformer,
    objectInputTransformer,
    transformMany,
    objects,
    httpGet,
    apiResults,
    incomingObject,
    input,
  };
}

describe("validate user input", () => {
  it("errors having page size less than one", async () => {
    const { harvardArtMuseumApi, input } = await makeHarvardArtMuseumApi();
    await expect(
      harvardArtMuseumApi.objects({ ...input, pageSize: -1 })
    ).rejects.toThrow("Page size must be between 1 and 100.");
  });

  it("errors having page size more than 100", async () => {
    const { harvardArtMuseumApi, input } = await makeHarvardArtMuseumApi();
    await expect(
      harvardArtMuseumApi.objects({ ...input, pageSize: 101 })
    ).rejects.toThrow("Page size must be between 1 and 100.");
  });

  it("errors having negative page number", async () => {
    const { harvardArtMuseumApi, input } = await makeHarvardArtMuseumApi();
    await expect(
      harvardArtMuseumApi.objects({ ...input, pageNumber: 0 })
    ).rejects.toThrow("Page number must be greater than 0.");
  });
});
