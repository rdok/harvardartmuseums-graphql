# harvardartmuseums-graphql

> Product ready GraphQL to unify & server harvardartmuseums APIs. Generated from https://github.com/rdok/aws-sam-ts-graphql template.
> 
[![Deploy][badge_svg_deploy]][workflow_link_deploy]
[![Check][badge_svg_check]][workflow_link_check]

Apollo GraphQL Server to unify & serve harvardartmuseums in a single GraphQL request.

# TODO
- Consider benefits/costs of changing `Print` object to more generic `Object` to search for any classification types.
- Keep an eye on slack alerts; harvardmuseums might have fields that is missing data/undefined; if and when these errors occur, rapidly update the GraphQL server to graciously handle these; with TS strongly typed, as it stands it will error.
- Check if harvardartmuseums/api-docs exports somewhere TS types so we won't have to manually maintain them. Like so `lib/data-sources/harvard-art-museums-api/types.generated.ts`
- Upgrade alpha ts-jest to stable 28 - https://github.com/kulshekhar/ts-jest/tree/
- Auto-detect base domain hosted zone id, instead of using hardcoded one.


# Features
- Monitors for any GraphQL errors, and notifies slack channel.
- Monitors for any server crash, and notifies slack channel.
- Scheduled packages maintenance through GitHub's dependabot action.
  
# Develop

- Run `make` for local development and to view the GraphQL schema in Apollo Studio
- Use additional prepared commands from `Makefile` for rapid development flow. E.g. `make test-watch`
- Compiles NodeJS TypeScript to JS for AWS Lambda.
- Uses SAM template to create API Gateway, Lambda function with GraphQL
- Unit tests the Lambda handlers & libraries.
- Runs CI/CD pipelines through GitHub Actions.
- [Grants the least privileges](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege) CI/CD security best practise; through AWS CDK unit tested.
- [Delegates permissions through role](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles) CI/CD security best practise; through AWS CDK unit tested.
- Rapidly deploys dev stack locally through Makefile commands
- Automates dependency updates for NPM packages.
- Automates dependency updates for GitHub actions dependencies.
- Reuses CI checks through [reusable GitHub workflows](https://docs.github.com/en/actions/learn-github-actions/reusing-workflows)
- Ensures [![Deploy][badge_svg_deploy]][workflow_link_deploy] workflow runs at a time through GitHub's [concurrency](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#concurrency) feature.
- Restricts NodeJS engine version to 14, same as AWS Lambda
- Disables Apollo Studio on production environment.

[use_this_template]: https://github.com/rdok/harvardartmuseums-graphql/generate
[badge_svg_deploy]: https://github.com/rdok/harvardartmuseums-graphql/actions/workflows/deploy.yml/badge.svg?branch=main
[badge_svg_check]: https://github.com/rdok/harvardartmuseums-graphql/actions/workflows/check.yml/badge.svg
[workflow_link_deploy]: https://github.com/rdok/harvardartmuseums-graphql/actions/workflows/deploy.yml
[workflow_link_check]: https://github.com/rdok/harvardartmuseums-graphql/actions/workflows/check.yml
