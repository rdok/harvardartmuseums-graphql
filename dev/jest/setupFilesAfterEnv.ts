global.console = {
  ...global.console,
  log: jest.fn(),
};

beforeEach(() => {
  process.env.HARVARD_ART_MUSEUMS_API_KEY =
    "mocked_HARVARD_ART_MUSEUMS_API_KEY";
});

afterEach(() => {
  // To mock modules from reusable make functions.
  // Achieves cleaner and easier to read unit tests.
  jest.resetModules();
  // jest.resetAllMocks();
});
