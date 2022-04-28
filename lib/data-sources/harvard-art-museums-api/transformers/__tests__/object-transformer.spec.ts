import { createMock } from "ts-auto-mock";
import { ObjectTransformer } from "../object-transformer";
import { IncomingObject } from "../../types.generated";

it("transforms object", () => {
  const { objectTransformer, incomingObject } = makeTransformer();
  const actual = objectTransformer.transform(incomingObject);

  expect(actual).toMatchObject({
    id: incomingObject.objectnumber,
    rank: incomingObject.rank,
    imageCount: incomingObject.imagecount,
    primaryImageUrl: incomingObject.primaryimageurl,
    provenance: incomingObject.provenance,
    creditLine: incomingObject.creditline,
    verificationLevelDescription: incomingObject.verificationleveldescription,
    url: incomingObject.url,
    title: incomingObject.title,
    technique: incomingObject.technique,
    division: incomingObject.division,
    dimensions: incomingObject.dimensions,
    dateBegin: incomingObject.datebegin,
    totalUniquePageViews: incomingObject.totaluniquepageviews,
  });
});

function makeTransformer() {
  const objectTransformer = new ObjectTransformer();

  const incomingObject = createMock<IncomingObject>();

  return { objectTransformer: objectTransformer, incomingObject };
}
