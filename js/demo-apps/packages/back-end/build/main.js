"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const server_1 = require("./dedicated-tokenizer/passport-auth-express/server");
function getApp() {
    if (process.env.DEMO_NAME === 'dedicated-passport-express') {
        return server_1.setupDedicatedPassPortExpressApp();
    }
    throw new Error('Must set DEMO_NAME env var to a suitable demo name');
}
getApp().then((app) => {
    app.listen(3001, () => {
        console.log(`Demo Sever listening on port 3001 in mode ${process.env.DEMO_NAME || 'undefined mode'}`);
    });
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWdDO0FBRWhDLGVBQU0sRUFBRSxDQUFDO0FBRVQsK0VBQXNHO0FBRXRHLFNBQVMsTUFBTTtJQUNiLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssNEJBQTRCLEVBQUU7UUFDMUQsT0FBTyx5Q0FBZ0MsRUFBRSxDQUFDO0tBQzNDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFFRCxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNwQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3hHLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxpQ0FBaUM7QUFDakMsRUFBRTtBQUNGLGlEQUFpRDtBQUNqRCw0RkFBNEY7QUFDNUYsMkNBQTJDO0FBQzNDLEVBQUU7QUFDRiwyQkFBMkI7QUFDM0IsNENBQTRDO0FBQzVDLEVBQUU7QUFDRix5QkFBeUI7QUFDekIsRUFBRTtBQUNGLDJCQUEyQjtBQUMzQixXQUFXO0FBQ1gsV0FBVztBQUNYLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFDakMsdUNBQXVDO0FBQ3ZDLHlCQUF5QjtBQUN6QixPQUFPO0FBQ1AsS0FBSztBQUNMLDJCQUEyQjtBQUMzQixFQUFFO0FBQ0YsOENBQThDO0FBQzlDLDJDQUEyQztBQUMzQyx3SEFBd0g7QUFDeEgsaUVBQWlFO0FBQ2pFLGdEQUFnRDtBQUNoRCxFQUFFO0FBQ0YsMkJBQTJCO0FBQzNCLEVBQUU7QUFDRix1Q0FBdUM7QUFDdkMsNkJBQTZCO0FBQzdCLDBEQUEwRDtBQUMxRCxRQUFRO0FBQ1IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgeyBFeHByZXNzIH0gZnJvbSAnZXhwcmVzcyc7XG5jb25maWcoKTtcblxuaW1wb3J0IHsgc2V0dXBEZWRpY2F0ZWRQYXNzUG9ydEV4cHJlc3NBcHAgfSBmcm9tICcuL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtYXV0aC1leHByZXNzL3NlcnZlcic7XG5cbmZ1bmN0aW9uIGdldEFwcCgpOiBQcm9taXNlPEV4cHJlc3M+IHtcbiAgaWYgKHByb2Nlc3MuZW52LkRFTU9fTkFNRSA9PT0gJ2RlZGljYXRlZC1wYXNzcG9ydC1leHByZXNzJykge1xuICAgIHJldHVybiBzZXR1cERlZGljYXRlZFBhc3NQb3J0RXhwcmVzc0FwcCgpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignTXVzdCBzZXQgREVNT19OQU1FIGVudiB2YXIgdG8gYSBzdWl0YWJsZSBkZW1vIG5hbWUnKTtcbn1cblxuZ2V0QXBwKCkudGhlbigoYXBwKSA9PiB7XG4gIGFwcC5saXN0ZW4oMzAwMSwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBEZW1vIFNldmVyIGxpc3RlbmluZyBvbiBwb3J0IDMwMDEgaW4gbW9kZSAke3Byb2Nlc3MuZW52LkRFTU9fTkFNRSB8fCAndW5kZWZpbmVkIG1vZGUnfWApO1xuICB9KTtcbn0pO1xuXG4vLyBpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbi8vXG4vLyBpbXBvcnQgeyBsdW5hU2VjIH0gZnJvbSAnLi9jb25maWd1cmUtbHVuYXNlYyc7XG4vLyBpbXBvcnQgeyBhdHRhY2hBcG9sbG9TZXJ2ZXIgfSBmcm9tICcuL2RlZGljYXRlZC10b2tlbml6ZXIvZ3JhcGhxbC9ncmFwaHFsLWFwb2xsby1zZXJ2ZXInO1xuLy8gaW1wb3J0IHsgY3JlYXRlUm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xuLy9cbi8vIGltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuLy8gaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbi8vXG4vLyBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4vL1xuLy8gYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4vLyBhcHAudXNlKFxuLy8gICBjb3JzKHtcbi8vICAgICBvcmlnaW46ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuLy8gICAgIG9wdGlvbnNTdWNjZXNzU3RhdHVzOiAyMDAsXG4vLyAgICAgbWV0aG9kczogWydHRVQnLCAnUFVUJywgJ1BPU1QnXSxcbi8vICAgICBjcmVkZW50aWFsczogdHJ1ZSxcbi8vICAgfSlcbi8vICk7XG4vLyBhcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbi8vXG4vLyAvLyBBdHRhY2ggdGhlIEx1bmFTZWMgYXV0aGVudGljYXRpb24gcGx1Z2luXG4vLyBsdW5hU2VjLmV4cHJlc3NBdXRoUGx1Z2luLnJlZ2lzdGVyKGFwcCk7XG4vLyAvLyBBdHRhY2ggdGhlIFNpbXBsZSBUb2tlbml6ZXIgQmFja2VuZCB0byB5b3VyIGFwcCBpZiB5b3UgZG9udCB3YW50IHRvIHVzZSB0aGUgZnVsbCBjb250YWluZXJpemVkIGJhY2tlbmQgYW5kIGluc3RlYWRcbi8vIC8vIGp1c3Qgd2FudCB0byB1c2UgYW4gZXhwcmVzcyBwbHVnaW4gaW4gdGhpcyBhcHAgYXMgYSBiYWNrZW5kXG4vLyBsdW5hU2VjLnNpbXBsZVRva2VuaXplckJhY2tlbmQucmVnaXN0ZXIoYXBwKTtcbi8vXG4vLyBhcHAudXNlKGNyZWF0ZVJvdXRlcygpKTtcbi8vXG4vLyBhdHRhY2hBcG9sbG9TZXJ2ZXIoYXBwKS50aGVuKCgpID0+IHtcbi8vICAgYXBwLmxpc3RlbigzMDAxLCAoKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coJ2xpc3RlbmluZyBvbiBodHRwOi8vbG9jYWxob3N0OjMwMDEvJyk7XG4vLyAgIH0pO1xuLy8gfSk7XG4iXX0=