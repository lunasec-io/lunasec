---
id: "token-lifecycle"
title: "Token Lifecycle"
sidebar_label: "Token Lifecycle"
sidebar_position: 4
---
# Token lifecycle

### Page Loading and setup
When the browser mounts a LunaSec react element from `@lunasec/react-sdk`, such as `<SecureInput>`, it creates an iFrame that loads from the 
`Dedicated Tokenizer`. Now we have a cross-domain iFrame on the page which can only communicate with the SDK through secure Post Messages.  This is our
trusted environment to handle sensitive data. The SDK, running as part of your code 
in the browser, sends the Secure Frame (iFrame) information it needs like styling information copied from your app, a prexisting token
to display if desired, any validations that need to run, etc.

Now it's ready to tokenize or detokenize data:

### Tokenization
There are a few steps that happen behind the scenes when data gets tokenized.  This is what happens when a
user clicks Submit on a form with a `<SecureInput>`.
1. Secure Frame (typically from the React SDK) calls the Tokenizer with `/tokenize` and gets back a token and an S3 presigned-URL.  
   Permission for the server to safely store the token from this session is created behind the scenes in what's dubbed a store `Grant`, preventing certain attacks.
2. Secure Frame uploads the sensitive data to S3, data is encrypted by S3's built in encryption. 
3. Your web app reads the token from the `<SecureInput>` in the same way it would read a change in a normal input.  
   You send the token to your server for storage with the rest of your data.
4. The `@lunasec/node-sdk` on your server calls to the tokenizer to check that a Grant exists with that session for it to safely store the token. 
5. You store the token in your database.

![token-creation-lifecycle](/img/tokenstorage.svg)

### Detokenization
The process when the frontend turns a token back into a plaintext value is almost identical to the above, but in reverse.
This is the process to display a token's value to the user.  It happens when you pass a `token` property to a LunaSec Component like `<SecureParagraph>`. 
Note you can also prefill inputs in the same way.

1. A request for some data comes from your frontend application, in the same way you would fetch a plaintext field.
1. Your server reads a token or tokens out of the database(alongside plaintext data).
2. The `@lunasec/node-sdk` on your server calls to the tokenizer to create a read Grant connected to the users session
3. You return the token to the browser and use react to pass it to a LunaSec React Component using the `token` property.
4. The Secure frame calls the Tokenizer to get a presigned URL to download the sensitive data from s3.  The read grant is checked behind the scenes.
5. The Secure frame gets the real data from s3 and displays it to the user.