import { URLSearchParamsInit } from "apollo-server-env";
import { ObjectsInput } from "../../../types.generated";

export class ObjectsInputTransformer {
  transform(input: ObjectsInput): URLSearchParamsInit {
    const transformedInput: any = {};

    if (typeof input.pageSize !== "undefined") {
      transformedInput["size"] = input.pageSize;
    }

    return transformedInput;
  }
}
