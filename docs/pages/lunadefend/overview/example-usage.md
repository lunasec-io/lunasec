---
id: "example-usage"
title: "LunaDefend Example Usage"
sidebar_label: "Example Usage"
sidebar_position: 2
---
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
You'll only need two libraries to start using LunaDefend, one for the 
client and one for the server.  We've worked hard to ensure that developing with LunaDefend is easy, and we hope
that our examples below demonstrate that.

If you'd like to see these examples in a real-world setting, please check out our [Live Demo](https://app.lunasec.dev) app.

:::info Guide
These snippets give you an example of how the library works.  For a complete and up-to-date guide, see the [getting started tutorial](/pages/lunadefend/getting-started/dedicated-tokenizer/introduction/).
:::

## `@lunasec/react-sdk`
The frontend component of the LunaDefend Stack.  Turns your form inputs and other elements into [Secure Frames](/pages/lunadefend/how-it-works/features#secure-frame). Support for other frameworks is in development.

### Example usage
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

We can secure the data by replacing components used in the form with LunaDefend ones.
```tsx title="secure-form.tsx"
import React from 'react';
import {SecureForm, SecureInput} from '@lunasec/react-sdk';

// The returned output from SecureInput is now a token instead of the actual SSN.
// And, if a token is passed to this component, it will automatically be detokenized (or fail if the user is unauthorized).
export function renderSecureComponent(props) {
  return (
    <SecureForm onSubmit={props.onSubmit}>
      <SecureInput type="text" token={props.value} onChange={props.onChange} onError={props.onError} name="ssn" />
      <input type="submit" />
    </SecureForm>
  );
}
```

## `@lunasec/node-sdk`
The backend component of the LunaDefend stack.  Grants permissions for the browser to read tokens, handles authentication,
and exposes helpers for working with Express or Apollo-GraphQL.  

### Example usage

#### Configuration
```typescript
import { LunaSec } from '@lunasec/node-sdk
const lunaSec = new LunaSec({
  tokenizerURL: process.env.TOKENIZER_URL,
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
See the [authentication](/pages/lunadefend/how-it-works/sessions) page to understand when and why you need to register this auth plugin.

#### Grants in Express Routes
Grants connect the user's session to a token, giving them permission to read it for a short time.  

```typescript
app.get('/get-ssn', async (req, res) => {
    const ssnToken = req.user.ssn_token

    await lunaSec.grants.create(req.session.id, ssnToken);
    
    res.json({
      success: true,
      ssnToken,
    });
  });

  // We also need to check the user has permission to store the grant back into the database, otherwise an attacker could steal tokens
  // and put them into their own database entry, and then fetch them using the above route and read them
app.post('/set-ssn', async (req, res) => {
    await lunaSec.grants.verify(req.session.id, req.body.ssn_token); 
    await models.user.setSsn(req.user.id, req.body.ssn_token);
    
    return res.json({
      success: true,
    });
});

```

#### Apollo GraphQL Directive
If using GraphQL, automatically create and verify token grants for any field with the @token directive
```typescript
  const server = new ApolloServer({
    schemaDirectives: {token: lunaSec.tokenDirective},
    // ... other apollo options
  });
```
In your schema:
```graphql
const typeDefs = gql`
    directive @token on FIELD_DEFINITION | INPUT_FIELD_DEFINITION # Register the directive

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
        text_area: String @token # use on input fields as well so that incoming tokens are checked
        files: [String] @token
    }
`;
```

Note that both input fields and normal fields should be decorated with the `@token` directive
