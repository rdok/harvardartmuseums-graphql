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
      imageCount: incomingObject.imagecount,
      primaryImageUrl: incomingObject.primaryimageurl,
      provenance: incomingObject.provenance,
      creditLine: incomingObject.creditline,
      url: incomingObject.url,
      title: incomingObject.title,
      technique: incomingObject.technique,
      division: incomingObject.division,
      dimensions: incomingObject.dimensions,
      dateBegin: incomingObject.datebegin,
      totalUniquePageViews: incomingObject.totaluniquepageviews,
      verificationLevelDescription: incomingObject.verificationleveldescription,
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
