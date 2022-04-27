import { URLSearchParamsInit } from "apollo-server-env";
import { ObjectsInput } from "../../../types.generated";

export class ObjectsInputTransformer {
  transform(input: ObjectsInput): URLSearchParamsInit {
    const transformedInput: any = {};

    if (input.pageSize !== null) transformedInput["size"] = input.pageSize;

    if (input.orderBy !== null) {
      transformedInput["sortorder"] = input.orderBy.sortOrder;
      transformedInput["sort"] = input.orderBy.sortBy;
    }

    if (input.hasImage !== null) {
      transformedInput["hasimage"] = input.hasImage ? 1 : 0;
    }

    return transformedInput;
  }
}
