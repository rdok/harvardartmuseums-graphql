import { createMock } from "ts-auto-mock";
import { PrintTransformer } from "../print-transformer";
import { IncomingObject, IncomingObjects } from "../../types.generated";
import { Print, Prints, PrintsInput } from "../../../../types.generated";

it("transforms objects", () => {
  const { objectTransformer, object } = makeTransformer();
  const actual = objectTransformer.transform(object);

  expect(actual).toMatchObject({
    id: object.objectnumber,
  });
});

it("transforms objects meta data", () => {
  const incomingObjects = createMock<IncomingObjects>();
  const { info } = incomingObjects;
  const objectTransformer = new PrintTransformer();
  const input = createMock<PrintsInput>();
  const actual = objectTransformer.transformMany(incomingObjects, input);

  expect(actual).toMatchObject({
    currentPage: info.page,
    itemsPerPage: info.totalrecordsperquery,
    totalItems: info.totalrecords,
    totalPages: info.pages,
  });
});

it("transforms each object", () => {
  const { objectTransformer, incomingObjects, prints, input } =
    makeTransformerWithTwoObjects();
  const actual = objectTransformer.transformMany(incomingObjects, input);
  expect(actual).toEqual(prints);
});

function makeTransformer() {
  const objectTransformer = new PrintTransformer();
  const object = createMock<IncomingObject>({});
  return { objectTransformer, object };
}

function makeTransformerWithTwoObjects() {
  const input = createMock<PrintsInput>();
  const objectAlpha = createMock<Print>();
  const objectBeta = createMock<Print>();
  const incomingObjects = createMock<IncomingObjects>();
  const prints = createMock<Prints>({
    prints: [objectAlpha, objectBeta],
  });
  const objectTransformer = new PrintTransformer();
  const transform = jest.fn();
  transform.mockReturnValueOnce(objectAlpha);
  transform.mockReturnValueOnce(objectBeta);
  objectTransformer.transform = transform;
  objectTransformer.transformMany = jest.fn().mockReturnValueOnce(prints);

  return {
    input,
    objectTransformer,
    incomingObjects,
    prints: prints,
  };
}
