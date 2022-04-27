import {
  IncomingObject as IncomingObject,
  IncomingObjects,
} from "../types.generated";
import { Print, Prints } from "../../../types.generated";

export class PrintTransformer {
  transform(print: IncomingObject): Print {
    return {
      id: print.objectnumber,
    };
  }

  transformMany(response: IncomingObjects): Prints {
    const { info } = response;
    const prints = response.records.map((object: IncomingObject) => {
      return this.transform(object);
    });

    return {
      currentPage: info.page,
      itemsPerPage: info.totalrecordsperquery,
      totalItems: info.totalrecords,
      totalPages: info.pages,
      prints,
    };
  }
}
