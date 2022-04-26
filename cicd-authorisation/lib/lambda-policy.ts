import { Stack } from "@aws-cdk/core";
import { Effect, ManagedPolicy, PolicyStatement } from "@aws-cdk/aws-iam";
import { RolePolicyProps } from "./types";

export class LambdaPolicy {
  constructor(stack: Stack, { stackRegex, role }: RolePolicyProps) {
    const managedPolicy = new ManagedPolicy(stack, "LambdaPolicy", {
      description: `Policy to manage lambda functions: ${stack.stackName}`,
      roles: [role],
    });
    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [
          `arn:aws:lambda:${stack.region}:${stack.account}:function:${stackRegex}`,
        ],
        actions: [
          "lambda:ListTags",
          "lambda:TagResource",
          "lambda:UntagResource",
          "lambda:UpdateFunctionCode",
          "lambda:GetFunction",
          "lambda:CreateFunction",
          "lambda:DeleteFunction",
          "lambda:GetFunctionConfiguration",
          "lambda:UpdateFunctionConfiguration",
          "lambda:PutFunctionEventInvokeConfig",
          "lambda:UpdateFunctionEventInvokeConfig",
          "lambda:DeleteFunctionEventInvokeConfig",
          "lambda:AddPermission",
          "lambda:RemovePermission",
          "lambda:InvokeFunction",
        ],
      })
    );
    managedPolicy.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [
          `arn:aws:logs:${stack.region}:${stack.account}:log-group:/aws/lambda/${stackRegex}`,
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
