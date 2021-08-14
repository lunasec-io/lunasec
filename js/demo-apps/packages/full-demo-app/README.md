# FAST FullStack React with TypeScript starter kit.

<img src="https://github.com/gilamran/fullstack-typescript/raw/master/assets/images/logo.png" width="150">

---

## Quick Start

Just clone this repository into your own project folder. and start working

```bash
git clone https://github.com/gilamran/fullstack-typescript.git <MyProjectName>
cd <MyProjectName>
npm install
npm run dev
```

If you want to detach from this repository into your own repository do this:

```bash
git remote remove origin
git remote add origin YOUR_REPO_URL
git push -u origin master
```

## Why

- **Simple** to jump into, **Fast** because it is simple.
- Separate `tsconfig.json` for client and server.
- Client and server can share code (And types). For example: [IUserDTO.d.ts](https://github.com/gilamran/fullstack-typescript/blob/master/src/shared/IUserDTO.d.ts)
- The client is bundled using [Webpack](https://webpack.github.io/) because it goes to the browser.
- The server is emitted by [TypeScript](https://github.com/Microsoft/TypeScript) because node now supports es6.

<p align="center"> 
<img src="https://github.com/gilamran/fullstack-typescript/raw/master/assets/images/flow.png" width="500">
</p>

---

## Requirements

- `NodeJs 12.13+`, `Chrome 79+` or `FireFox 72+`

### Directory Layout

```bash
.
├── /node_modules/                    # 3rd-party libraries and utilities
├── /dist/                            # All the generated files will go here, and will run from this folder
├── /src/                             # The source code of the application
│   ├── /client/                      # React app
│   ├── /server/                      # Express server app
│   ├── /shared/                      # The shared code between the client and the server
├── /assets/                          # images, css, jsons etc.
├── .eslintrc                         # es-lint configuration
├── .prettierec                       # prettier configuration
├── .gitignore                        # ignored git files and folders
├── .nvmrc                            # Force nodejs version
├── .env                              # (ignored) Can be used to override environment variables
├── index.js                          # The server's entry point
├── package.json                      # The list of 3rd party libraries and utilities
└── tsconfig-for-webpack-config.json  # using TypeScript for the webpack config file
├── README.md                         # This file
```

### What's included

- [React v16](https://facebook.github.io/react/)
- [React router v4](https://github.com/ReactTraining/react-router)
- [Material-ui](https://github.com/mui-org/material-ui)
- [Jest](https://github.com/facebook/jest)
- [Styled Components](https://github.com/styled-components/styled-components)
- [Axios](https://github.com/mzabriskie/axios) (For Client/Server communication)

### Usage

- `npm run dev` - Client and server are in watch mode with source maps, opens [http://localhost:3000](http://localhost:3000)
- `npm run test` - Runs jest tests
- `npm run lint` - Runs es-lint
- `npm run build` - `dist` folder will include all the needed files, both client (Bundle) and server.
- `npm start` - Just runs `node ./dist/server/server.js`
- `npm start:prod` - sets `NODE_ENV` to `production` and then runs `node ./dist/server/server.js`. (Bypassing webpack proxy)

### Config

All applications require a config mechanism, for example, `SLACK_API_TOKEN`. Things that you don't want in your git history, you want a different environment to have different value (dev/staging/production). This repo uses the file `config.ts` to access all your app variables. And a `.env` file to override variable in dev environment. This file is ignored from git.

---

#### What's not included

- Universal (Server side rendering)
- Redux/MobX (State management)

---

#### Licence

This code is released as is, under MIT licence. Feel free to use it for free for both commercial and private projects. No warranty provided.
