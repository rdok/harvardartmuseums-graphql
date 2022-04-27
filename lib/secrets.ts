import { SecretsManager } from "@aws-sdk/client-secrets-manager";

export class Secrets {
  private secretsManager: SecretsManager;
  public static HarvardArtMusemsApiKeySingleton: string | undefined;

  constructor(param: { secretsManager: SecretsManager }) {
    this.secretsManager = param.secretsManager;
  }

  async harvardArtMuseumsApiKey() {
    if (Secrets.HarvardArtMusemsApiKeySingleton !== undefined) {
      console.log("Reusing secret value from execution environment.");
      return Secrets.HarvardArtMusemsApiKeySingleton;
    }

    const SecretId = process.env.HARVARD_ART_MUSEUMS_API_KEY_SECRET_ARN;

    if (SecretId == null) {
      throw new Error(
        "Required env.HARVARD_ART_MUSEUMS_API_KEY_SECRET_ARN is missing."
      );
    }

    console.log("Getting secret value from AWS Secret Manager");
    const secretValue = await this.secretsManager.getSecretValue({ SecretId });

    if (secretValue.SecretString === undefined) {
      throw new Error("AWS SecretsManager secret value is empty.");
    }

    Secrets.HarvardArtMusemsApiKeySingleton = secretValue.SecretString;

    return Secrets.HarvardArtMusemsApiKeySingleton;
  }
}
