const fs = require("fs");
const path = require("path");
const event = {
  body: '{"query":"query { healthCheck }"}',
  headers: {
    Accept: "*/*",
    Host: "127.0.0.1:3000",
    "User-Agent": "curl/7.68.0",
    "X-Forwarded-Port": "3000",
    "X-Forwarded-Proto": "http",
  },
  httpMethod: "POST",
  isBase64Encoded: false,
  multiValueHeaders: {
    Accept: ["*/*"],
    Host: ["127.0.0.1:3000"],
    "User-Agent": ["curl/7.68.0"],
    "X-Forwarded-Port": ["3000"],
    "X-Forwarded-Proto": ["http"],
    "Content-Type": ["application/json"],
  },
  multiValueQueryStringParameters: null,
  path: "/graphql",
  pathParameters: { proxy: "test" },
  queryStringParameters: null,
  requestContext: {
    accountId: "123456789012",
    apiId: "1234567890",
    domainName: "127.0.0.1:3000",
    extendedRequestId: null,
    httpMethod: "GET",
    identity: {
      accountId: null,
      apiKey: null,
      caller: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityPoolId: null,
      sourceIp: "127.0.0.1",
      user: null,
      userAgent: "Custom User Agent String",
      userArn: null,
    },
    path: "/{proxy+}",
    protocol: "HTTP/1.1",
    requestId: "16384f50-63b3-4b05-8f3c-d78d2c96191c",
    requestTime: "18/Dec/2021:15:21:47 +0000",
    requestTimeEpoch: 1639840907,
    resourceId: "123456",
    resourcePath: "/{proxy+}",
    stage: "Prod",
  },
  resource: "/{proxy+}",
  stageVariables: null,
  version: "1.0",
};

const json = JSON.stringify(event);
filename = path.resolve(__dirname, "APIGatewayProxyEvent.json");
fs.writeFileSync(filename, json);
