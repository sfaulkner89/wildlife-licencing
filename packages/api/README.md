# Wildlife licencing API

#### For Natural England

## Getting Started

```shell
cd packages/eps/api
npm start
```

http://localhost:3000/openapi-ui

## Environment Variables

| Variable | Description | Default | Example | Required | Secret |
| -------- | ----------- | ------- | ------- | -------- | ------ |
| AWS_SECRETS_MANAGER_ENDPOINT | Location of the secrets manager | none | http://localhost:4566 | Y | |
| SERVER_PORT | Server Port | 3000 | | N | |
| POSTGRES_USER | Postgres User | | wlsuser | Y | |
| POSTGRES_DB | Postgres database | | wls | Y | |
| POSTGRES_HOST | Postgres host | | localhost | Y | |
| POSTGRES_PORT | Postgres port | | 5432 | Y | |
| POSTGRES_PW | Postgres password | | wildl1fe | N | Y |
| POSTGRES_LOGGING | Log transactions | false | [false,true] | N | 
| AWS_REGION | AWS Region | | eu-west-2 | N | |
| AWS_ACCESS_KEY_ID | AWS Credential | | | N | |
| AWS_SECRET_KEY | AWS Credential | | | N | |
| REDIS_HOST | Redis host | | | Y | |
| REDIS_PORT | Redis port | | | Y | |
| REDIS_DATABASE | Redis database | 0 | | N | |
| CACHE_EXPIRE_SECONDS | Expirary time for request cache in seconds | 60000 | | N | |