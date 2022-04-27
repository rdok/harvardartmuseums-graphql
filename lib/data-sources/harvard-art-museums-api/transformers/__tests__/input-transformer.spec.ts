import { PrintsInputTransformer } from "../prints-input-transformer";
import { createMock } from "ts-auto-mock";
import { PrintsInput } from "../../../../types.generated";

it.skip("transforms input for searching prints", () => {
  const { inputTransformer, input } = makeTransformer();
  const actual = inputTransformer.transform(input);
  expect(actual).toStrictEqual({
    filterby: "lorem",
  });
});

it.skip("deletes null inputs", () => {
  const { inputTransformer, input } = makeTransformerWithNullInputs();
  const actual = inputTransformer.transform(input);
  expect(actual).toStrictEqual({
    filterby: input.pageSize,
  });
});

function makeTransformer() {
  const inputTransformer = new PrintsInputTransformer();
  const input = createMock<PrintsInput>();
  return { inputTransformer, input };
}

function makeTransformerWithNullInputs() {
  const transformer = makeTransformer();
  const input: PrintsInput = createMock<PrintsInput>({
    filterBy: null,
  });
  return { ...transformer, input };
}
