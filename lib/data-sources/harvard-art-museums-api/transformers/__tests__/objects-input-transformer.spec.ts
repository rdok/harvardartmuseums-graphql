import { ObjectsInputTransformer } from "../objects-input-transformer";
import { ObjectsInput } from "../../../../types.generated";
import { createMock } from "ts-auto-mock";

it("transform objects input", () => {
  const { inputTransformer, input } = makeTransformer();
  const actual = inputTransformer.transform(input);
  expect(actual).toStrictEqual({
    size: input.pageSize,
    sortorder: input.orderBy?.sortOrder,
    sort: input.orderBy?.sortBy,
    hasimage: input.filter?.hasImage ? 1 : 0,
    classification: input.filter?.classification,
    verificationlevel: input.filter?.verificationLevel,
  });
});

function makeTransformer() {
  const inputTransformer = new ObjectsInputTransformer();
  const input = createMock<ObjectsInput>();
  return { inputTransformer, input };
}
