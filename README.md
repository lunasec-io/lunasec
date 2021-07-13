
# Tokenizer Front End SDK

This monorepo holds the LunaSec SDKs, servers, and demo application.  Together, they are a toolkit that keeps data secure in the front and back end of web applications by replacing the sensitive fields in your database with **tokens** that represent them.

On the front end, cross-domain iFrames dubbed **Secure Frames** handle the creation and display of sensitive fields, and on the backend sensitive data is handled inside Lambdas dubbed **Secure Resolvers**.  

A few components:

### /js/demo-apps/packages
Demo apps that use our toolkit for testing and demonstration.  The react-app and node-app are the one's currently being developed.  These are our only SDK supported frameworks currently.  


### /js/sdks
Contains front and backend SDKs. 
`js-sdk` and `react-sdk` packages support different frontend frameworks, and get most of their business logic from the `common` module.  
It's all written in Typescript and outputs to a few different formats:
- ES5 build (polyfills ES2016 modules)
- ESNext build (uses ES2016 modules)
- Browser build (concatenated into one file that's loaded into browser global namespace)

### /js/sdks/packages/secure-frame-iframe
This holds the SDK frontend components which load into the iframe. What makes this secure is that it has very strict CSP and is only able to be invoked from an `<iframe>` context.


## How to launch the cluster and get the app running
To install all dependencies, run `lerna bootstrap`. 

Make sure your AWS credentials are set in `~/.aws/credentials`.  You may want to install `aws-cli-v2` from AUR as well.

Make sure the following environment variables are set.  Their values should look something like: 
```bash
export DOCUMENT_VAULT_S3_BUCKET="crytovault-loq-[YOURNAME]-personal"
export AWS_DEFAULT_REGION="us-west-2"
export SECURE_FRAME_CLIENT_SECRET="super-secret-value-yay"
```

We must also add a `secrets.yaml` file for the go services. Create a file with that name in `/go/config/secureframe`, with the following fields:
```yaml

jwt_verifier:
  public_key: EXAMPLE
jwt_manager:
  signing_keys_arn: EXAMPLE
hybrid_encryption_manager:
  secure_frame_keyset_arn: EXAMPLE
aws_gateway:
  s3_bucket: EXAMPLE
```

Then, install `tmuxp` and then run `tmuxp load ./start-with-tmuxp.yaml` in the root directory. You can inspect that file to see what commands are all being run if you'd like to start the cluster without tmuxp.

You will need a session to be a valid, logged in user in the app.  Make sure your cookie is set to 
```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjp7ImlkIjoiU09NRV9JRCJ9fQ.J-4BVMZKhEi_igguYepCS8OhCf1zG1RXGbJi6uPF0Ast2lkT45s2IzJfokABOnm32rK4oQTTPBq_9J03F6LHicGwZ6b0ckOJOMeAd9NMtHfOGCBnD3FxcsvBw46MTnQSlTbNiJIzrCr8Usws8uCvQw8EYye6SJh6XoizQX5kym8JF0VYL6VAY-eLjhKuj_xBIbP2NSQZ2UbmuvA_wIha8oJn7xohD9qpuPDfi-st9nHIoHzIQZtKcAnQrsl525c012lSsUu76n_BqfaMoI0YqLMZ3tso2NQ-lulD5UO3Zs_pwq42u1ure1OV1PbIw0PA6wZc9L7izWzE6KA20tCdfLwe_3NiH_XyqL2p63u2FOgv3kxIMHbGW9YuZt_BBIwCbSlcunBPDJbtNmmCijwdlf89LsC6LQhjwou9wwKYb8NvOppJQslrMKkixmkOLRHavhIdgCqDF8hkTrdtaQYhs2Vv6JC6rEeyyn9xKqcq_WqCRtK8RNJActeoMenuDVk8
```

Then open your browser and navigate to `http://localhost:3000`. That will show you the POC.

When you want to shut down the cluster, hit `ctrl+b` and type `:kill-session`.  

### How to manage and install packages
We use lerna to manage the monorepo, and yarn as the package manager.  Since yarn doesn't know about local packages like lerna,
we can't use `yarn add` to install dependencies. To add a dependency to a package, either edit it 
manually into the package.json and run `lerna bootstrap`, or use `lerna add <dependencyname> <path/to/package/youre/working/on>`.

### TODO
- Add React project
- Add React SDK
- Add Tokenizer calls in backend ("service")
- Authorization
- Finish RPC work to make the postMessage APIs well formed
- Figure a versioning mechanism
  - What if multiple copies of the script are mounted to the page?

