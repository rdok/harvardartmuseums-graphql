import { createMock } from "ts-auto-mock";
import { ObjectTransformer } from "../object-transformer";
import { IncomingObject } from "../../types.generated";

it("transforms object", () => {
  const { objectTransformer, incomingObject } = makeTransformer();
  const actual = objectTransformer.transform(incomingObject);

  expect(actual).toMatchObject({
    id: incomingObject.objectnumber,
    rank: incomingObject.rank,
  });
});

function makeTransformer() {
  const objectTransformer = new ObjectTransformer();

  const incomingObject = createMock<IncomingObject>();

  return { objectTransformer: objectTransformer, incomingObject };
}
