import { config } from 'dotenv';
import { Express } from 'express'
config();

import { setupDedicatedPassPortExpressApp} from "./dedicated-tokenizer/passport-auth-express/server";


function getApp(): Express {
    if (process.env.DEMO_NAME === 'dedicated-passport-express') {
        return setupDedicatedPassPortExpressApp();
    }
    throw new Error('Must set DEMO_NAME env var to a suitable demo name')
}

const app = getApp();

app.listen(3001, () => {
    console.log(`Demo Sever listening on port 3001 in mode ${process.env.DEMO_NAME}`)
})
//
// import express from 'express';
//
// import { lunaSec } from './configure-lunasec';
// import { attachApolloServer } from './dedicated-tokenizer/graphql/graphql-apollo-server';
// import { createRoutes } from './routes';
//
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
//
// const app = express();
//
// app.use(express.json());
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
//     methods: ['GET', 'PUT', 'POST'],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
//
// // Attach the LunaSec authentication plugin
// lunaSec.expressAuthPlugin.register(app);
// // Attach the Simple Tokenizer Backend to your app if you dont want to use the full containerized backend and instead
// // just want to use an express plugin in this app as a backend
// lunaSec.simpleTokenizerBackend.register(app);
//
// app.use(createRoutes());
//
// attachApolloServer(app).then(() => {
//   app.listen(3001, () => {
//     console.log('listening on http://localhost:3001/');
//   });
// });
