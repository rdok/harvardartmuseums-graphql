/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(spec).ts"],
  testPathIgnorePatterns: [
    "<rootDir>/cicd-authorisation",
    "<rootDir>/.aws-sam",
    "<rootDir>/node_modules",
  ],
  transformIgnorePatterns: ["^.+\\.js$", "node_modules"],
  setupFilesAfterEnv: ["<rootDir>/dev/jest/setupFilesAfterEnv.ts"],
  setupFiles: ["<rootDir>/dev/jest/setupFiles.ts"],
  modulePaths: ["<rootDir>/dev/jest/factories"],
  transform: {
    "^.+\\.tsx?$": "ts-jest/legacy",
  },
  globals: {
    "ts-jest": {
      compiler: "ttypescript",
    },
  },
};
