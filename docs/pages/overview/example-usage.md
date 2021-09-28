---
id: "example-usage"
title: "LunaSec Example Usage"
sidebar_label: "Example Usage"
sidebar_position: 3
---

# Example Usage
These snippets give you an example of how the library works.  You'll only need two libraries to use LunaSec, one for the 
client and one for the server.  

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