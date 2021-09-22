<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
---
id: "libraries-services"
title: "Libraries and Services"
sidebar_label: "Libraries and Services"
sidebar_position: 3
---

# NPM Modules
You'll only need two libraries to use LunaSec, one for the client and one for the server. 

## `@lunasec/react-sdk`
The frontend component of the LunaSec Stack.  Turns your form inputs and other elements into [Secure Frames](./features.md#secure-frame). Support for other frameworks is in development.

### Example usage
These snippets give you an example of how the library works.  For a full setup tutorial, see SETUP TUTORIAL

#### ClientSide React Form
Let's look at a simple form that takes in a social security number.
```jsx title="normal-form.tsx"
import React from 'react';


export function renderInsecureComponent(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" value={props.value} onChange={props.onChange} name="ssn" />
      <input type="submit" />
    </form>
  );
}
```

We can add tokenization by simply replacing the components used in the form with the LunaSec replacements.
```tsx title="secure-form.tsx"
import React from 'react';
import {SecureForm, SecureInput} from '@lunasec/react-sdk';

// The returned output from SecureInput is now a token instead of the actual SSN.
// And, if a token is passed to this component, it will automatically be detokenized (or fail if the user is unauthorized).
export function renderSecureComponent(props) {
  return (
    <SecureForm onSubmit={props.onSubmit}>
      <SecureInput type="text" token={props.value} onChange={props.onChange} name="ssn" />
      <input type="submit" />
    </SecureForm>
  );
}
```

## `@lunasec/node-sdk`
The backend component of the LunaSec stack.  Grants permissions for the browser to read tokens, handles authentication,
and exposes helpers for working with Express or Apollo-GraphQL.  

### Example usage

#### Configuration
```typescript
import { LunaSec } from '@lunasec/node-sdk
const lunaSec = new LunaSec({
  secureFrameURL: process.env.SECURE_FRAME_URL,
  auth: {
    secrets: { source: 'environment' },
    payloadClaims: [],
    // Provide a small middleware that takes in the req object and returns a promise containing a session ID
    // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
    sessionIdProvider: readSessionFromRequest,
  },
});
```

#### Registering the auth plugin with express
```typescript
// Attach the LunaSec authentication plugin
lunaSec.expressAuthPlugin.register(app);
```
See the [authentication](./authentication.md) page to understand when and why you need to register this auth plugin.

#### Apollo GraphQL Directive
Use this if you're using graphQL.  Automatically create and verify token grants for any field with the @token directive
```typescript
  const server = new ApolloServer({
    schemaDirectives: {token: lunaSec.tokenDirective},
    // ... other apollo options
  });
```
In your schema:
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

Note that both input fields and normal fields should be decorated with the `@token` directive