"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lunaSec = void 0;
const node_sdk_1 = require("@lunasec/node-sdk");
const auth_1 = require("./auth");
if (!process.env.SECURE_FRAME_URL) {
    throw new Error('Secure frame url env var is not set');
}
exports.lunaSec = new node_sdk_1.LunaSec({
    secureFrameURL: process.env.SECURE_FRAME_URL,
    auth: {
        secrets: { source: 'environment' },
        payloadClaims: [],
        pluginBaseUrl: '/api',
        // Provide a small middleware(ours is called readSessionFromRequest) that takes in the req object and returns a promise containing a session token
        // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
        sessionIdProvider: auth_1.lunaSecSessionIdProvider,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLWx1bmFzZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGVkaWNhdGVkLXRva2VuaXplci9wYXNzcG9ydC1hdXRoLWV4cHJlc3MvY29uZmlndXJlLWx1bmFzZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBQTRDO0FBRTVDLGlDQUFrRDtBQUVsRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtJQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7Q0FDeEQ7QUFFWSxRQUFBLE9BQU8sR0FBRyxJQUFJLGtCQUFPLENBQUM7SUFDakMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO0lBQzVDLElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUU7UUFDbEMsYUFBYSxFQUFFLEVBQUU7UUFDakIsYUFBYSxFQUFFLE1BQU07UUFDckIsa0pBQWtKO1FBQ2xKLHlHQUF5RztRQUN6RyxpQkFBaUIsRUFBRSwrQkFBd0I7S0FDNUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMdW5hU2VjIH0gZnJvbSAnQGx1bmFzZWMvbm9kZS1zZGsnO1xuXG5pbXBvcnQgeyBsdW5hU2VjU2Vzc2lvbklkUHJvdmlkZXIgfSBmcm9tICcuL2F1dGgnO1xuXG5pZiAoIXByb2Nlc3MuZW52LlNFQ1VSRV9GUkFNRV9VUkwpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdTZWN1cmUgZnJhbWUgdXJsIGVudiB2YXIgaXMgbm90IHNldCcpO1xufVxuXG5leHBvcnQgY29uc3QgbHVuYVNlYyA9IG5ldyBMdW5hU2VjKHtcbiAgc2VjdXJlRnJhbWVVUkw6IHByb2Nlc3MuZW52LlNFQ1VSRV9GUkFNRV9VUkwsXG4gIGF1dGg6IHtcbiAgICBzZWNyZXRzOiB7IHNvdXJjZTogJ2Vudmlyb25tZW50JyB9LFxuICAgIHBheWxvYWRDbGFpbXM6IFtdLFxuICAgIHBsdWdpbkJhc2VVcmw6ICcvYXBpJyxcbiAgICAvLyBQcm92aWRlIGEgc21hbGwgbWlkZGxld2FyZShvdXJzIGlzIGNhbGxlZCByZWFkU2Vzc2lvbkZyb21SZXF1ZXN0KSB0aGF0IHRha2VzIGluIHRoZSByZXEgb2JqZWN0IGFuZCByZXR1cm5zIGEgcHJvbWlzZSBjb250YWluaW5nIGEgc2Vzc2lvbiB0b2tlblxuICAgIC8vIG9yIG51bGwgaWYgYSB1c2VyIGlzIG5vdCBsb2dnZWQgaW4uICBMdW5hU2VjIHVzZXMgdGhpcyB0byBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBhbmQgdmVyaWZ5IHRva2VuIGdyYW50c1xuICAgIHNlc3Npb25JZFByb3ZpZGVyOiBsdW5hU2VjU2Vzc2lvbklkUHJvdmlkZXIsXG4gIH0sXG59KTtcbiJdfQ==