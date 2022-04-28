/**
 *==============================================================================
 * Manually created types of harvardartmuseums-api.
 *
 * Source: https://github.com/harvardartmuseums/api-docs/blob/master/sections/object.md#response
 *==============================================================================
 */
export type IncomingObjects = {
    info: Info
    records: IncomingObject[]
};

export type IncomingObject = {
    objectnumber: string;
    rank: number;
    imagecount: number;
    primaryimageurl: string;
    provenance: string;
    creditline: string;
    url: string;
    title: string;
    technique: string;
    division: string;
    dimensions: string;
    datebegin: string;
    totaluniquepageviews: number;
    verificationleveldescription: string;
};

export type Info = {
    totalrecordsperquery: number,
    totalrecords: number,
    pages: number,
    page: number
};
