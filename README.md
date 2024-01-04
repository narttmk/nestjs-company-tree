## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## GrapQL Testing

Url: [GraphQL Playground](http://localhost:3000/graphql)

Example query:

```graphql
query {
  getCompanyById(id: "uuid-2") {
    id
    name
    cost
    createdAt
    parentId
    children {
      id
      name
      cost
      createdAt
      parentId
    }
  }
}
```

Result:
![result.png](example/images/result.png 'result.png')
