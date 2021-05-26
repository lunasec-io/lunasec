
# Tokenizer Front End SDK

This monorepo holds the LunaSec SDKs, servers, and demo application.  

A few components:

### /app
This is a demo vanilla JS web page that represents something similar to a customer's page, just a place for LunaSec modules to be inserted. This has no CSP policy and is swiss cheese by itself.

### /react-front-end
Similar to above, but a React Application.  This is our main supported framework at the moment.

### /service
This hosts the SDK frontend components which load into the iframe. What matters with this service is that it has very strict CSP and is only able to be invoked from an `<iframe>` context.

Ultimately, this will most likely just be a CDN for the assets and this URI just sets a few variables. We could definitely do this in edge workers if we wanted -- there is no database.

Any calls to Tokenizer would likely be proxied through this service for the MVP.


### /sdks
Contains front and backend SDKs. Node serverside SDKs are in `/packages/node-sdk` and frontend components are in `packages/secure-frame`.
`js-sdk` and `react-sdk` packages support different frontend frameworks, and get most of their business logic from the `common` module.  
It's all written in Typescript and outputs to a few different formats:
- ES5 build (polyfills ES2016 modules)
- ESNext build (uses ES2016 modules)
- Browser build (concatenated into one file that's loaded into browser global namespace)

## How to launch the cluster and get the app running
First, make sure the following environment variables are set.  Their values should look something like: 
```bash
export DOCUMENT_VAULT_S3_BUCKET="crytovault-loq-[YOURNAME]-personal"
export AWS_DEFAULT_REGION="us-west-2"
export SECURE_FRAME_CLIENT_SECRET="super-secret-value-yay"
```
Then, install `tmuxp` and then run `tmuxp load ./start-with-tmuxp.yaml` in the root directory. You can inspect that file to see what commands are all being run if you'd like to start the cluster without tmuxp.

Then open your browser and navigate to `http://localhost:3000`. That will show you the POC.

When you want to shut down the cluster, hit `ctrl+b` and type `:kill-session`.  

### Developing the React Front End
You need to link the `secure-frame-sdk` to the React Front End app:
```
cd secure-frame-sdk
npm link
cd ../react-front-end
npm link secure-frame-sdk
```

This will setup the module to be shared with the React app for dev.

### TODO
- Add React project
- Add React SDK
- Add Tokenizer calls in backend ("service")
- Authorization
- Finish RPC work to make the postMessage APIs well formed
- Figure a versioning mechanism
  - What if multiple copies of the script are mounted to the page?

