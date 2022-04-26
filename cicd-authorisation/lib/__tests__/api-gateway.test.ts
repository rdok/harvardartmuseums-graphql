import { Stack } from "@aws-cdk/core";
import { Config } from "../config";
import { Match, Template } from "@aws-cdk/assertions";
import { Effect, Role, User } from "@aws-cdk/aws-iam";
import { ApiGatewayPolicy } from "../api-gateway-policy";

const config = new Config();
const stack = new Stack();
const stackRegex = `${config.org}-*-${config.name}*`;
const user = new User(stack, "CICDUser", { userName: "CICDStackName" });
const role = new Role(stack, "Role", { assumedBy: user });
new ApiGatewayPolicy(stack, { stackRegex, config, role });
const template = Template.fromStack(stack);

test("Authorise API Gateway creation", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: "apigateway:POST",
          Effect: Effect.ALLOW,
          Resource: {
            "Fn::Join": [
              "",
              ["arn:aws:apigateway:", { Ref: "AWS::Region" }, "::/restapis"],
            ],
          },
        },
      ]),
    },
  });
});

test("Authorise management of created API Gateway resources", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Condition: {
            StringLike: {
              "aws:ResourceTag/aws:cloudformation:stack-name": stackRegex,
            },
          },
          Action: "apigateway:*",
          Effect: "Allow",
          Resource: {
            "Fn::Join": [
              "",
              ["arn:aws:apigateway:", { Ref: "AWS::Region" }, "::/restapis/*"],
            ],
          },
        },
      ]),
    },
  });
});

test("Authorise AWS SAM to tag API Gateway deployment & stage", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: "apigateway:*",
          Effect: "Allow",
          Resource: {
            "Fn::Join": [
              "",
              ["arn:aws:apigateway:", { Ref: "AWS::Region" }, "::/tags/*"],
            ],
          },
        },
      ]),
    },
  });
});

test("Authorise API Gateway to update it's CloudFront distribution", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: "cloudfront:UpdateDistribution",
          Effect: "Allow",
          Resource: {
            "Fn::Join": [
              "",
              [
                "arn:aws:cloudfront::",
                { Ref: "AWS::AccountId" },
                ":distribution/*",
              ],
            ],
          },
        },
      ]),
    },
  });
});

test("Authorise metrics filter management", () => {
  template.hasResourceProperties("AWS::IAM::ManagedPolicy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        {
          Action: [
            "logs:PutMetricFilter",
            "logs:DeleteMetricFilter",
            "logs:DescribeMetricFilters",
          ],
          Effect: "Allow",
          Resource: {
            "Fn::Join": [
              "",
              [
                "arn:aws:logs:",
                { Ref: "AWS::Region" },
                ":",
                { Ref: "AWS::AccountId" },
                ":log-group:API-Gateway-Execution-Logs*",
              ],
            ],
          },
        },
      ]),
    },
  });
});
