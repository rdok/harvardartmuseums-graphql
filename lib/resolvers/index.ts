import Query from "./query";

const resolvers = {
  SortOrder: {
    DESC: "desc",
    ASC: "asc",
  },
  SortByFields: {
    RANK: "rank",
  },
  Classification: {
    SCULPTURE: "Sculpture",
    PORTFOLIOS: "Portfolios",
    PRINTS: "Prints",
  },
  VerificationLevel: {
    UNCHECKED: 0,
    POOR: 1,
    ADEQUATE: 2,
    GOOD: 3,
    BEST: 4,
  },
  Query,
};

export { resolvers };
