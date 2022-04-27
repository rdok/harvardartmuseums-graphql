import { inspect } from "util";

export const logError = (data: any) => {
  /**
   * Recurse over large objects, inspect & properly log them.
   * Handles JSON.stringify weaknesses, such as omitting undefined,
   * Function, and Symbols. In this case, fixes including the headers stored
   * in symbols.
   *
   * Additionally, these logs format are easier to read on AWS CloudWatch
   * versus when encoded as JSON.
   *
   * https://nodejs.org/api/util.html#util_util_inspect_object_showhidden_depth_colors
   */
  inspect.defaultOptions.depth = null;

  console.error("DID_ENCOUNTER_ERRORS", data);
};
