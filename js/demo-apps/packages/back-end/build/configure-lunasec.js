"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lunaSec = void 0;
const credential_provider_ini_1 = require("@aws-sdk/credential-provider-ini");
const node_sdk_1 = require("@lunasec/node-sdk");
const read_session_from_request_1 = require("./read-session-from-request");
if (!process.env.SECURE_FRAME_URL) {
    throw new Error('Secure frame url env var is not set');
}
exports.lunaSec = new node_sdk_1.LunaSec({
    secureFrameURL: process.env.SECURE_FRAME_URL,
    auth: {
        secrets: { source: 'environment' },
        payloadClaims: [],
        // Provide a small middleware(ours is called readSessionFromRequest) that takes in the req object and returns a promise containing a session token
        // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
        sessionIdProvider: read_session_from_request_1.readSessionFromRequest,
    },
    simpleTokenizerBackendConfig: {
        // Only needed if you want to register the simple-express-tokenizer-backend
        awsRegion: 'us-west-2',
        s3Bucket: process.env.CIPHERTEXT_S3_BUCKET || 'YOU MUST SPECIFY A BUCKET',
        getAwsCredentials: () => {
            return Promise.resolve(credential_provider_ini_1.fromIni());
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLWx1bmFzZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29uZmlndXJlLWx1bmFzZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOEVBQTJEO0FBQzNELGdEQUE0QztBQUU1QywyRUFBcUU7QUFFckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7SUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0NBQ3hEO0FBRVksUUFBQSxPQUFPLEdBQUcsSUFBSSxrQkFBTyxDQUFDO0lBQ2pDLGNBQWMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtJQUM1QyxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFO1FBQ2xDLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLGtKQUFrSjtRQUNsSix5R0FBeUc7UUFDekcsaUJBQWlCLEVBQUUsa0RBQXNCO0tBQzFDO0lBQ0QsNEJBQTRCLEVBQUU7UUFDNUIsMkVBQTJFO1FBQzNFLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixJQUFJLDJCQUEyQjtRQUN6RSxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7WUFDdEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGlDQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21JbmkgfSBmcm9tICdAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLWluaSc7XG5pbXBvcnQgeyBMdW5hU2VjIH0gZnJvbSAnQGx1bmFzZWMvbm9kZS1zZGsnO1xuXG5pbXBvcnQgeyByZWFkU2Vzc2lvbkZyb21SZXF1ZXN0IH0gZnJvbSAnLi9yZWFkLXNlc3Npb24tZnJvbS1yZXF1ZXN0JztcblxuaWYgKCFwcm9jZXNzLmVudi5TRUNVUkVfRlJBTUVfVVJMKSB7XG4gIHRocm93IG5ldyBFcnJvcignU2VjdXJlIGZyYW1lIHVybCBlbnYgdmFyIGlzIG5vdCBzZXQnKTtcbn1cblxuZXhwb3J0IGNvbnN0IGx1bmFTZWMgPSBuZXcgTHVuYVNlYyh7XG4gIHNlY3VyZUZyYW1lVVJMOiBwcm9jZXNzLmVudi5TRUNVUkVfRlJBTUVfVVJMLFxuICBhdXRoOiB7XG4gICAgc2VjcmV0czogeyBzb3VyY2U6ICdlbnZpcm9ubWVudCcgfSxcbiAgICBwYXlsb2FkQ2xhaW1zOiBbXSxcbiAgICAvLyBQcm92aWRlIGEgc21hbGwgbWlkZGxld2FyZShvdXJzIGlzIGNhbGxlZCByZWFkU2Vzc2lvbkZyb21SZXF1ZXN0KSB0aGF0IHRha2VzIGluIHRoZSByZXEgb2JqZWN0IGFuZCByZXR1cm5zIGEgcHJvbWlzZSBjb250YWluaW5nIGEgc2Vzc2lvbiB0b2tlblxuICAgIC8vIG9yIG51bGwgaWYgYSB1c2VyIGlzIG5vdCBsb2dnZWQgaW4uICBMdW5hU2VjIHVzZXMgdGhpcyB0byBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBhbmQgdmVyaWZ5IHRva2VuIGdyYW50c1xuICAgIHNlc3Npb25JZFByb3ZpZGVyOiByZWFkU2Vzc2lvbkZyb21SZXF1ZXN0LFxuICB9LFxuICBzaW1wbGVUb2tlbml6ZXJCYWNrZW5kQ29uZmlnOiB7XG4gICAgLy8gT25seSBuZWVkZWQgaWYgeW91IHdhbnQgdG8gcmVnaXN0ZXIgdGhlIHNpbXBsZS1leHByZXNzLXRva2VuaXplci1iYWNrZW5kXG4gICAgYXdzUmVnaW9uOiAndXMtd2VzdC0yJyxcbiAgICBzM0J1Y2tldDogcHJvY2Vzcy5lbnYuQ0lQSEVSVEVYVF9TM19CVUNLRVQgfHwgJ1lPVSBNVVNUIFNQRUNJRlkgQSBCVUNLRVQnLFxuICAgIGdldEF3c0NyZWRlbnRpYWxzOiAoKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZyb21JbmkoKSk7XG4gICAgfSxcbiAgfSxcbn0pO1xuIl19