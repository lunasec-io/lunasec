---
id: "graphql"
title: "GraphQL"
sidebar_label: "GraphQL Support"
sidebar_position: 4
---

# Apollo GraphQL Grants

Because we need to set and check Grants (LunaSec's token specific permissions), the server needs to know what fields are tokens.
We provide a schema directive to make this straightforward.  Behind the scenes, the directive calls the Dedicated Tokenizer.
If there is a problem with the session or the Grant, it will throw and error that Apollo will handle and send to the client.

### Automatically create and verify token grants for any field with the @token directive.

```typescript
const server = new ApolloServer({
  schemaDirectives: {token: lunaSec.tokenDirective}, // our initialized instance of the @lunasec/node-sdk
  // ... other apollo options
});
```
Here's an example schema that has the @token directive. Note that both input fields and normal fields should be decorated with the `@token` directive.  Don't forget to decorate every
field that contains a token, or it could be vulnerable.  Arrays of tokens are supported.
```graphql
const typeDefs = gql`
  type Query {
    getFormData: FormData
  }
    
  type FormData {
    text_area: String @token
    email: String @token
    insecure_field: String
    files: [String] @token # @token directive also works on arrays of tokens
  }
    
  type Mutation {
    setFormData(formData: FormDataInput): FormData
  }
    
  input FormDataInput {
    email: String @token
    insecure_field: String
    text_area: String @token
    files: [String] @token
  }
    
  directive @token on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
`;
```

