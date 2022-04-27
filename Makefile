export AWS_DEFAULT_REGION=$(shell jq -r '.region' infrastructurerc.json)
export NAME=$(shell jq -r '.name' infrastructurerc.json)
export ORG=$(shell jq -r '.org' infrastructurerc.json)
export AWS_CICD_STACK_NAME=$(shell echo "${ORG}-cicd-${NAME}")
export AWS_PROFILE=cicd_harvardartmuseums_graphql

start: node_modules .env.json
	export AWS_PROFILE=default && \
	npm run dev

InvokeGraphQL:
	node events/generate-api-gateway-event.js
	make build
	sam local invoke \
		--event events/APIGatewayProxyEvent.json \
		--template-file infrastructure.yml \
		--env-vars .env.json \
		'GraphQL'

start-sam: node_modules
	make build
	sam local start-api --port 3003

deploy-cicd-auth:
	cd cicd-authorisation && make deploy

build-deploy-cicd:
	make build
	AWS_ROLE_ARN=$$(aws --profile $$AWS_PROFILE \
		cloudformation describe-stacks --stack-name $$AWS_CICD_STACK_NAME \
		--query 'Stacks[0].Outputs[?OutputKey==`CICDRoleARN`].OutputValue' \
		--output text) && \
	ASSUME_ROLE=$$(aws --profile $$AWS_PROFILE --output json \
		sts assume-role --role-arn $$AWS_ROLE_ARN --role-session-name cicd-access \
		--query "Credentials") && \
	export AWS_ACCESS_KEY_ID=$$(echo $$ASSUME_ROLE | jq -r '.AccessKeyId') && \
	export AWS_SECRET_ACCESS_KEY=$$(echo $$ASSUME_ROLE | jq -r '.SecretAccessKey') && \
	export AWS_SESSION_TOKEN=$$(echo $$ASSUME_ROLE | jq -r '.SessionToken') && \
	sam deploy \
		--config-env dev \
		--stack-name "$${ORG}-dev-$${NAME}" \
		--s3-bucket "$${ORG}-cicd-$${NAME}" \
		--s3-prefix "dev" \
		--capabilities CAPABILITY_IAM \
		--no-fail-on-empty-changeset

update-all-npm:
	rm -rf node_modules
	npx npm-check --update-all
	cd cicd-authorisation && rm -rf node_modules && npx npm-check --update-all

test-watch:
	npm run test:watch
test:
	npm run test

prettier:
	npm run prettier
prettier-fix:
	npm run prettier:fix

lint:
	yarn lint
lint-fix:
	yarn lint:fix

build-npm: node_modules
	npm run build
build-sam:
	sam build --template infrastructure.yml
build:
	make build-npm
	make build-sam

node_modules:
	npm ci

check: test prettier lint

.env.json:
	cp .env.json.example .env.json
