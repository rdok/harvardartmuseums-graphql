import { Stack } from "@aws-cdk/core";
import { Config } from "../config";
import { Match, Template } from "@aws-cdk/assertions";
import { Effect, Role, User } from "@aws-cdk/aws-iam";
import { SecretsManagerPolicy } from "../secrets-manager-policy";

const testStack = new Stack();
const config = new Config();
const stackRegex = `${config.org}-*-${config.name}*`;
const user = new User(testStack, "CICDUser", { userName: "CICDStackName" });
const role = new Role(testStack, "Role", { assumedBy: user });
new SecretsManagerPolicy(testStack, {
  stackRegex,
  config,
  role,
});
const template = Template.fromStack(testStack);

test("Authorise managing secrets", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: "secretsmanager:*",
          Effect: Effect.ALLOW,
          Resource: {
            "Fn::Join": [
              "",
              [
                "arn:aws:secretsmanager:",
                { Ref: "AWS::Region" },
                ":",
                { Ref: "AWS::AccountId" },
                `:secret:${stackRegex}`,
              ],
            ],
          },
        },
      ]),
    },
  });
});
