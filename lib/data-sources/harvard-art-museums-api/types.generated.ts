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
};

export type Info = {
    totalrecordsperquery: number,
    totalrecords: number,
    pages: number,
    page: number
};
