import { URLSearchParamsInit } from "apollo-server-env";
import { PrintsInput } from "../../../types.generated";

export class PrintsInputTransformer {
  transform(input: PrintsInput): URLSearchParamsInit {
    // const input: any = {
    //   "page[default][number]": input.pageNumber,
    //   "page[default][size]": input.pageSize,
    //   "sort_by[default]": input.sortBy,
    // };
    //
    // if (typeof input.resources !== "undefined") {
    //   input["filter[default][resources]"] = input.resources?.split(",");
    // }
    //
    // const { isTrainingCamp } = input;
    // if (typeof isTrainingCamp !== "undefined" && isTrainingCamp !== null) {
    //   input["filter[default][is_training_camp]"] = input.isTrainingCamp ? 1 : 0;
    // }
    //
    // Object.keys(input).forEach(
    //   (key) =>
    //     (input[key] === undefined || input[key] === null) && delete input[key]
    // );

    return [];
  }
}
