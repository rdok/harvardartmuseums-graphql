import {
  CfnOutput,
  Construct,
  RemovalPolicy,
  Stack,
  StackProps,
} from "@aws-cdk/core";
import { BlockPublicAccess, Bucket } from "@aws-cdk/aws-s3";
import { Role, User } from "@aws-cdk/aws-iam";
import { Config } from "./config";
import { SamPolicy } from "./sam-policy";
import { LambdaPolicy } from "./lambda-policy";
import { DescribeCloudformationStacks } from "./describe-cloudformation-stacks";
import { ApiGatewayPolicy } from "./api-gateway-policy";
import { DomainPolicy } from "./domain-policy";
import { MonitorPolicy } from "./monitor-policy";

export class CICDAuthorisationStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    config: Config,
    props?: StackProps
  ) {
    super(scope, id, props);

    const deploymentBucket = new Bucket(this, "CICDBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      bucketName: `${config.org}-${config.cicdEnvironment}-${config.name}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });
    new CfnOutput(this, `CICDBucketName`, {
      value: deploymentBucket.bucketName,
    });

    const CICDStackName = `${config.org}-${config.cicdEnvironment}-${config.name}`;
    const user = new User(this, `${config.name}CICDUser`, {
      userName: CICDStackName,
    });
    new CfnOutput(this, "CICDIAMUserLink", {
      value: `https://console.aws.amazon.com/iam/home?#/users/${user.userName}?section=security_credentials`,
    });

    const role = new Role(this, `${config.name}CICDRole`, { assumedBy: user });
    new CfnOutput(this, "CICDRoleARN", { value: role.roleArn });

    const stackRegex = `${config.org}-*-${config.name.substring(0, 12)}*`;
    new SamPolicy(this, {
      config,
      stackRegex,
      deploymentBucketName: deploymentBucket.bucketName,
      role,
    });
    new LambdaPolicy(this, { config, stackRegex, role });
    new DescribeCloudformationStacks(this, { config, stackRegex, user });
    new ApiGatewayPolicy(this, { config, stackRegex, role });
    new DomainPolicy(this, { config, stackRegex, role });
    new MonitorPolicy(this, { config, stackRegex, role });
  }
}
