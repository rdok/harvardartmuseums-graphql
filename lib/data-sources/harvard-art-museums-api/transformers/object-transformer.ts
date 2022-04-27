import {
  IncomingObject as IncomingObject,
  IncomingObjects,
} from "../types.generated";
import { ObjectResource, Objects } from "../../../types.generated";

export class ObjectTransformer {
  transform(incomingObject: IncomingObject): ObjectResource {
    return {
      id: incomingObject.objectnumber,
      rank: incomingObject.rank,
    };
  }

  transformMany(response: IncomingObjects): Objects {
    const { info } = response;
    const data = response.records.map((object: IncomingObject) => {
      return this.transform(object);
    });

    return {
      currentPage: info.page,
      itemsPerPage: info.totalrecordsperquery,
      totalItems: info.totalrecords,
      totalPages: info.pages,
      data,
    };
  }
}