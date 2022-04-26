import { Stack } from "@aws-cdk/core";
import { Effect, ManagedPolicy, PolicyStatement } from "@aws-cdk/aws-iam";
import { RolePolicyProps } from "./types";

export class SecretsManagerPolicy {
  constructor(stack: Stack, props: RolePolicyProps) {
    const { stackRegex, role } = props;
    const managedPolicy = new ManagedPolicy(stack, "SecretsManagerPolicy", {
      description: `Authorise Secrets manager: ${stack.stackName}`,
      roles: [role],
    });

    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [
          `arn:aws:secretsmanager:${stack.region}:${stack.account}:secret:${stackRegex}`,
        ],
        actions: ["secretsmanager:*"],
      })
    );
  }
}
