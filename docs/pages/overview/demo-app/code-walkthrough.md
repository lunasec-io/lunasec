---
id: "walkthrough"
title: "Demo App Walkthrough"
sidebar_label: "Code Walkthrough"
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
# Understanding the Demo App Source
This is a full demonstration of a real-world web application, complete with SQL database, front-end state management, and a Component Library(MaterialUI).
The vast majority of the code
is just normal application code, like in any other web app.  Only a small part is LunaSec Specific.

### Folder Structure
The Demo is separated into two applications, the front-end and back-end in 
[the demo apps folder](https://github.com/lunasec-io/lunasec-monorepo/tree/master/js/demo-apps/packages).

The apps are really multiple apps, one for each of the different modes. We wanted to reuse as much code as possible, 
which lives in the `common` folders of each app. Only code that needs to be different for each demo is broken into 
folders like [/src/dedicated-tokenizer/passport-express](https://github.com/lunasec-io/lunasec-monorepo/tree/demo-app-refactor/js/demo-apps/packages/demo-back-end/src/dedicated-tokenizer/passport-express).
That's a bit confusing but this needs to be maintainable, and we also wanted use it for integration testing.

#### Front-end
The frontend modes that use the `dedicated-tokenizer` are virtually identical. Almost all of their code lives in `common`.
All frontend features work the same regardless of whether express, graphql, or some other transport layer is used. 
The only difference is how the tokens (and other data) are fetched (which happens inside the `store` file).

You can see the Secure Components being used 
[here](https://github.com/lunasec-io/lunasec-monorepo/tree/demo-app-refactor/js/demo-apps/packages/react-front-end/src/common/components/secure-components).

To see the LunaSec Provider wrapping the components, look 
[here](https://github.com/lunasec-io/lunasec-monorepo/blob/de384d69d4c78e6b39505561c6c25b6a34a34e23/js/demo-apps/packages/react-front-end/src/common/App.tsx#L37).

Note the use of the `SecureInput` element 
[natively with MaterialUi](https://github.com/lunasec-io/lunasec-monorepo/blob/de384d69d4c78e6b39505561c6c25b6a34a34e23/js/demo-apps/packages/react-front-end/src/common/components/secure-components/SecureInputDemo.tsx#L118).

![demo screenshot tokenization](/img/demo-app-tokenization.png)


The `simple` tokenizer has a different developer experience because it doesn't use Secure Frames.
Getting and storing tokens is done with JavaScript methods, 
[like this](https://github.com/lunasec-io/lunasec-monorepo/blob/de384d69d4c78e6b39505561c6c25b6a34a34e23/js/demo-apps/packages/react-front-end/src/simple-tokenizer/components/secure-components/TokenizeDemo.tsx#L23).
It shares no code with the other demos.

![simple screenshot](/img/demo-app-simple.png)

#### Back-end
The Backend launches each mode as a separate Express server running in parallel on different ports, starting from 3001.
You can see that happening in the [server's entrypoint](https://github.com/lunasec-io/lunasec-monorepo/blob/demo-app-refactor/js/demo-apps/packages/demo-back-end/src/main.ts).
From there you can trace through and see how the different apps are configured.

For an example of LunaSec's [Node SDK](../../node-sdk/index.md) being configured, 
[look here](https://github.com/lunasec-io/lunasec-monorepo/blob/de384d69d4c78e6b39505561c6c25b6a34a34e23/js/demo-apps/packages/demo-back-end/src/dedicated-tokenizer/passport-express/config/configure-lunasec.ts).

To see an Express Route properly creating and checking grants, 
[look here](https://github.com/lunasec-io/lunasec-monorepo/blob/de384d69d4c78e6b39505561c6c25b6a34a34e23/js/demo-apps/packages/demo-back-end/src/dedicated-tokenizer/passport-express/routes/user-router.ts#L17).

:::warning Production Readiness and Library Choices
This demo is made to simulate a production application, not be one.  Please use concepts or snippets from it in your code, but we do not 
recommend cloning it directly or using it as a measuring stick for good library and technology choices.  In particular Passport(the auth library)
was chosen because it is popular, not because we recommend it.  LunaSec will work with any auth system in exactly the same way as shown here with passport. 
:::