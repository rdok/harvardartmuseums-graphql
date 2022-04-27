import Query from "./query";

const resolvers = {
  SortBy: {
    DESC: "desc",
    ASC: "asc",
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
