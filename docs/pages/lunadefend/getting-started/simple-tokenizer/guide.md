---
id: "guide"
title: "Simple Setup"
sidebar_label: "Set Up Guide"
sidebar_position: 0.5
custom_edit_url: null
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
## Simple Tokenizer
If you have chosen to use the Simple Tokenizer, as explained in [Choose your Setup](../choose-your-setup.md), let's get started
adding the Simple Tokenizer to your web app.  

:::caution Limitiations
Please note that the Simple Tokenizer doesn't interoperate with the rest of LunaDefend's modules that you might see mentioned elsewhere in these docs,
and automated migration to the full Dedicated Tokenizer from Simple has not yet been implemented.  What you see on this page 
represents everything the simple tokenizer can do: tokenize and detokenize strings. It is, however, very easy to set up.
:::
## Express Plugin

The plugin will add the tokenization backend routes to your app and use S3 as a database.

First, initialize LunaDefend and tell the Simple Tokenizer where to store the tokens in S3:

```typescript
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { SimpleTokenizerBackend } from '@lunasec/node-sdk';

export const simpleTokenizerBackend = new SimpleTokenizerBackend({
    awsRegion: 'us-west-2',
    s3Bucket: process.env.CIPHERTEXT_S3_BUCKET || 'YOU MUST SPECIFY A BUCKET',
    getAwsCredentials: () => {
        return Promise.resolve(fromIni()); // This is one way of several ways to get AWS KratosCredentials
    },
});

```

We recommend setting the bucket to encrypted [using the AWS CLI.](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-encryption.html)

Now just register the plugin with Express:

```typescript
const app = express();
simpleTokenizerBackend.register(app);
```

That's it! This will add `/.lunasec/tokenize` and `/.lunasec/detokenize` routes to your server.

## Browser
To create and read tokens in the browser, initialize the tokenizer and tell it where the backend is:
```typescript
const tokenizer = new SimpleTokenizer({
  host: window.location.origin,
});
```

Now you can tokenize and detokenize strings and buffers:

### Tokenize
```typescript
const result = await tokenizer.tokenize(e.target.value);

if (!result.success) {
  throw result.error; // Handle the error however you like
}

console.log('token is: ', result.tokenId)
```

### Detokenize
```typescript
const result = await tokenizer.detokenize(this.state.inputToken);

if (!result.success) {
  throw result.error;
}

console.log('Decoded value is ', result.value)
```

To see these in a more complete example inside a react app, see the Simple Tokenizer sections of [the demo app.](/pages/lunadefend/overview/demo-app/walkthrough)

To see the API Reference for these libraries, take a look at [the TypeDoc for the Simple Tokenizer](/pages/lunadefend/tokenizer-sdk/classes/SimpleTokenizer/)
