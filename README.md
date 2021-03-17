# Tokenizer Front End SDK

A few components:

### App
This is a service that represents something similar to a customer's app. This has no CSP policy and is swiss cheese.

### Service
This is our service that hosts the JS. Ultimately, this will most likely just be a CDN for the assets and this URI just sets a few variables. We could definitely do this in edge workers if we wanted -- there is no database.

What matters with this service is that it has very strict CSP and is only able to be invoked from an `<iframe>` context.

Any calls to Tokenizer would likely be proxied through this service for the MVP.

### Secure Frame SDK
This is the "meat" of the actual SDK. It's all written in Typescript and outputs to a few different formats:
- ES5 build (polyfills ES2016 modules)
- ESNext build (uses ES2016 modules)
- Browser build (concatenated into one file that's loaded into browser global namespace)

## How to use this repo
Install `tmuxp` and then run `tmuxp load ./start-with-tmuxp.yaml` in the root directory. You can inspect that file to see what commands are all being run.

Then go hit the `app` service, which runs at `http://localhost:5001`. That will show you the POC.

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

