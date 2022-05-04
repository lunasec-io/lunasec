---
id: "tokens"
title: "How Tokens Work"
sidebar_label: "Tokens"
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

Tokens are random strings you store in your database, that correspond to a real piece of sensitive data.
They're random values, and they have no meaning
by themselves. In order for your web app to turn a Token into anything useful, the token is sent from an iFrame to the Dedicated Tokenizer,
where it is turned into an S3 signed URL. The iFrame then uses that to retrieve the real value.

:::info Demo

If you want to see Detokenization in a real world scenario, check out
[Live Demo](https://app.lunasec.dev). Just
open up your Network Inspector to see the requests happening. 
:::

### The Tokenizer Server

The server responsible for dealing with Tokens in
LunaDefend is called the "Tokenizer", an Open Source high-performance service that you deploy.

The Tokenizer doesn't store or ever see sensitive data. It is a metadata 
server and gatekeeper in front of the real datastore, which is a direct connection to S3.
The Tokenizer processes tokens and hands back information about where to download (and decrypt) the Token from AWS S3.

### Security
Unlike many other systems, the token is not the full decryption key, only part of it. 
The other required pieces can only be accessed from within the Dedicated Tokenizer Service, 
where authentication for the user can be checked, audit logs can be produced, and keys can be rotated if necessary.

Please see the [Security Section](/pages/lunadefend/how-it-works/security/introduction/) for more information.

### Tokenization
There are a few steps that happen behind the scenes when data gets tokenized.  This is what happens when a
user clicks Submit on a form with a `<SecureInput>`, .
1. [Secure Frame](/pages/lunadefend/how-it-works/features/#secure-frame) (typically created by the React SDK) calls the Tokenizer at `/tokenize` with some metadata and gets back a token and an S3 presigned-URL.  
   Permission for your server to safely store the token from this session is created behind the scenes in what's dubbed a store `Grant`, preventing certain attacks.
2. Secure Frame uploads the sensitive data to S3, data is encrypted by S3's built in encryption.
3. Your web app reads the token from the `<SecureInput>` in the same way it would read a change in a normal input.  
   You send the token to your server for storage with the rest of your data.
4. The `@lunasec/node-sdk` on your server calls to the tokenizer to check that a Grant exists with that session for it to safely store the token.
5. You store the token in your database.

![token-creation-lifecycle](/img/tokenstorage.svg)

### Detokenization
The process when the frontend turns a token back into a plaintext value is almost identical to the above, but in reverse.
This is the process to display a token's value to the user.  It happens when you pass a `token` property to a LunaDefend Component like `<SecureParagraph>`.
Note you can also prefill inputs in the same way.

1. A request for some data comes from your frontend application, in the same way you would fetch a plaintext field.
2. Your server reads a token or tokens out of the database(alongside plaintext data).
3. The `@lunasec/node-sdk` on your server calls to the tokenizer to create a read Grant connected to the users session
4. You return the token to the browser and use React to pass it to a LunaDefend React Component using the `token` property.
5. The Secure frame calls the Tokenizer to get a pre-signed URL to download the sensitive data from s3.  The read grant is checked behind the scenes.
6. The Secure frame gets the real data from s3 and displays it to the user.

### Network calls
Here is what the network calls look like during a detokenization.

##### Request to Tokenizer
```http request
POST /detokenize HTTP/1.1
Host: tokenizer.lunasec.dev
Accept: application/json
Content-Type: application/json
Content-Length: 58
Origin: https://tokenizer.lunasec.dev
Cookie: access_token=<session_cookie>
```

**Uploaded JSON**:
```json
{
   "tokenId": "lunasec-2b58d9b2-83c1-4e9b-9692-b149112810c8"
}
```

##### Response from Tokenizer
```http request 
HTTP/1.1 200 OK
content-type: application/json
lunasec-session-hash: 1ca24299df038ec214bbf2ccb88b2ae6315560bd
vary: Origin
content-encoding: br
```

**Response JSON**
```json
{
   "success": true,
   "error": {},
   "data": {
      "downloadUrl": "https://<AWS_S3_URL>/a-very-long-url-very-secure-url",
      "headers": {
         "host": "lunasec-ciphertextbucket<RANDOM_BUCKET_ID>.s3.us-west-2.amazonaws.com",
         "x-amz-server-side-encryption-customer-algorithm": "AES256",
         "x-amz-server-side-encryption-customer-key": "slwQy2d51/WSoPu9h8Fp5PJZ44w+x0VTcwr5dDnq3fI=",
         "x-amz-server-side-encryption-customer-key-md5": "GkNtl6TYapPdZLbE9ZhR7Q=="
      }
   }
}
```

##### Request to AWS S3
```http request
GET /a-very-long-url-very-secure-url
Host: lunasec-ciphertextbucket<RANDOM_BUCKET_ID>.s3.us-west-2.amazonaws.com
Accept: application/json, text/plain, */*
x-amz-server-side-encryption-customer-algorithm: AES256
x-amz-server-side-encryption-customer-key: slwQy2d51/WSoPu9h8Fp5PJZ44w+x0VTcwr5dDnq3fI=
x-amz-server-side-encryption-customer-key-md5: GkNtl6TYapPdZLbE9ZhR7Q==
Origin: https://tokenizer.lunasec.dev
```

**Response (Detokenized Data)**
```text
some-super-secret-data
```

And that's it! You can store any text or file. It's really just a key-value store with security added.
The rest of the LunaDefend stack is where we add more [layers of security](pages/lunadefend/how-it-works/security/levels).

### Deployment to platforms other than AWS

We use AWS S3 because it's fast, scales really well, and stores files [up to 5TB](https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html).

There are many open source competitors to S3 that can be self-hosted or hosted by other platforms and use the same API.
If you would like to use LunaDefend with a different backend there are [dozens](https://github.com/topics/s3-storage) of
[high-quality](https://github.com/minio/minio) [backends](https://github.com/juicedata/juicefs)
[that](https://www.backblaze.com/b2/docs/s3_compatible_api.html)
[support](https://github.com/chrislusf/seaweedfs/wiki/Amazon-S3-API) the same API as S3 to cover any needs.
