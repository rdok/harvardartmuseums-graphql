import { Stack } from "@aws-cdk/core";
import { Effect, ManagedPolicy, PolicyStatement } from "@aws-cdk/aws-iam";
import { RolePolicyProps } from "./types";

export class ApiGatewayPolicy {
  constructor(stack: Stack, { role, stackRegex }: RolePolicyProps) {
    const managedPolicy = new ManagedPolicy(stack, "ApiGatewayPolicy", {
      description: `Policy to manage API Gateway: ${stack.stackName}`,
      roles: [role],
    });

    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/tags/*`],
        actions: ["apigateway:*"],
      })
    );
    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/restapis`],
        actions: ["apigateway:POST"],
      })
    );
    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/restapis/*`],
        actions: ["apigateway:*"],
        conditions: {
          StringLike: {
            "aws:ResourceTag/aws:cloudformation:stack-name": stackRegex,
          },
        },
      })
    );
    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:apigateway:${stack.region}::/domainnames`],
        actions: ["apigateway:POST"],
      })
    );
    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [`arn:aws:cloudfront::${stack.account}:distribution/*`],
        actions: ["cloudfront:UpdateDistribution"],
      })
    );

    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [
          `arn:aws:logs:${stack.region}:${stack.account}:log-group:API-Gateway-Execution-Logs*`,
        ],
        actions: [
          "logs:PutMetricFilter",
          "logs:DeleteMetricFilter",
          "logs:DescribeMetricFilters",
        ],
      })
    );
  }
}
