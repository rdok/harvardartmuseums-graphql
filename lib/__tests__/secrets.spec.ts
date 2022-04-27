import { SecretsManager } from "@aws-sdk/client-secrets-manager";
import { createMock } from "ts-auto-mock";

it("errors having missing HARVARD_ART_MUSEUMS_API_KEY_SECRET_ARN environment variable", async () => {
  const { secretsManager, Secrets } = await makeSecrets();
  delete process.env.HARVARD_ART_MUSEUMS_API_KEY_SECRET_ARN;
  await expect(
    new Secrets({ secretsManager }).harvardArtMuseumsApiKey()
  ).rejects.toThrow(
    "Required env.HARVARD_ART_MUSEUMS_API_KEY_SECRET_ARN is missing."
  );
});

it("fetches the Harvard museums API key from AWS SecretsManager", async () => {
  const { secretsManager, Secrets } = await makeSecrets();
  await new Secrets({ secretsManager }).harvardArtMuseumsApiKey();
  expect(secretsManager.getSecretValue).toHaveBeenCalledWith({
    SecretId: "mocked_HARVARD_ART_MUSEUMS_API_KEY_SECRET_ARN",
  });
});

test("It should re-use AWS Secret", async () => {
  const { secretsManager, Secrets } = await makeSecrets();

  await new Secrets({ secretsManager }).harvardArtMuseumsApiKey();
  await new Secrets({ secretsManager }).harvardArtMuseumsApiKey();

  expect(secretsManager.getSecretValue).toHaveBeenCalledTimes(1);
});

test("It errors having empty harvardArtMuseumsApiKey secret.", async () => {
  const { secretsManager, Secrets } = await makeSecretsWithEmptyJwt();
  const credentials = new Secrets({ secretsManager });
  await expect(credentials.harvardArtMuseumsApiKey()).rejects.toThrowError(
    "AWS SecretsManager secret value is empty."
  );
});

async function makeSecrets() {
  const { Secrets } = await import("../secrets");
  const SecretString = "lorem-ipsum";
  const secretsManager = createMock<SecretsManager>({
    getSecretValue: jest.fn().mockImplementation(() => ({ SecretString })),
  });
  return { Secrets, secretsManager };
}

async function makeSecretsWithEmptyJwt() {
  const secretsFactory = await makeSecrets();
  secretsFactory.secretsManager.getSecretValue = jest
    .fn()
    .mockResolvedValue(() => ({ SecretString: "" }));
  return secretsFactory;
}
