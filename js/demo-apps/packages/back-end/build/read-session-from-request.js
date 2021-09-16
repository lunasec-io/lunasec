"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSessionFromRequest = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __PUBLIC_KEY__ = process.env.SESSION_JWT_PUBLIC_KEY;
// Pull the public key to verify the session JWT from an environment variable and turn it into a keyobject, then use it to decode the session
function readSessionFromRequest(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (__PUBLIC_KEY__ === undefined) {
            throw new Error('Unable to read secret from environment variable: SESSION_JWT_PUBLIC_KEY');
        }
        const pubKey = Buffer.from(__PUBLIC_KEY__, 'base64').toString();
        // this cookie is our session cookie that was created in our demo app when a user logged in
        const cookie = req.cookies['id_token'];
        if (!cookie) {
            return null; // returning null tells LunaSec that a session is not set
        }
        try {
            const jwtData = yield decodeJWT(cookie, pubKey);
            return jwtData.session.id;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    });
}
exports.readSessionFromRequest = readSessionFromRequest;
function decodeJWT(encodedJwt, pubKey) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(encodedJwt, pubKey, { algorithms: ['RS256'] }, (err, data) => {
            if (err) {
                return reject(err);
            }
            if (!data || !('session' in data) || !('id' in data.session)) {
                return reject(new Error('session info missing from JWT'));
            }
            resolve(data);
        });
        reject(new Error('unable to parse jwt due to unknown error'));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1zZXNzaW9uLWZyb20tcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWFkLXNlc3Npb24tZnJvbS1yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdFQUErQjtBQUMvQixNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFnQyxDQUFDO0FBS3BFLDZJQUE2STtBQUM3SSxTQUFzQixzQkFBc0IsQ0FBQyxHQUFZOztRQUN2RCxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO1NBQzVGO1FBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEUsMkZBQTJGO1FBQzNGLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDLENBQUMseURBQXlEO1NBQ3ZFO1FBRUQsSUFBSTtZQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVoRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQzNCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQUE7QUFuQkQsd0RBbUJDO0FBRUQsU0FBUyxTQUFTLENBQUMsVUFBa0IsRUFBRSxNQUFjO0lBQ25ELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsc0JBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDdEUsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7WUFDRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzVELE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQzthQUMzRDtZQUNELE9BQU8sQ0FBQyxJQUFpQixDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmNvbnN0IF9fUFVCTElDX0tFWV9fID0gcHJvY2Vzcy5lbnYuU0VTU0lPTl9KV1RfUFVCTElDX0tFWSBhcyBzdHJpbmc7XG5cbmludGVyZmFjZSBUb2tlbkRhdGEge1xuICBzZXNzaW9uOiB7IGlkOiBzdHJpbmcgfTtcbn1cbi8vIFB1bGwgdGhlIHB1YmxpYyBrZXkgdG8gdmVyaWZ5IHRoZSBzZXNzaW9uIEpXVCBmcm9tIGFuIGVudmlyb25tZW50IHZhcmlhYmxlIGFuZCB0dXJuIGl0IGludG8gYSBrZXlvYmplY3QsIHRoZW4gdXNlIGl0IHRvIGRlY29kZSB0aGUgc2Vzc2lvblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWRTZXNzaW9uRnJvbVJlcXVlc3QocmVxOiBSZXF1ZXN0KSB7XG4gIGlmIChfX1BVQkxJQ19LRVlfXyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcmVhZCBzZWNyZXQgZnJvbSBlbnZpcm9ubWVudCB2YXJpYWJsZTogU0VTU0lPTl9KV1RfUFVCTElDX0tFWScpO1xuICB9XG4gIGNvbnN0IHB1YktleSA9IEJ1ZmZlci5mcm9tKF9fUFVCTElDX0tFWV9fLCAnYmFzZTY0JykudG9TdHJpbmcoKTtcbiAgLy8gdGhpcyBjb29raWUgaXMgb3VyIHNlc3Npb24gY29va2llIHRoYXQgd2FzIGNyZWF0ZWQgaW4gb3VyIGRlbW8gYXBwIHdoZW4gYSB1c2VyIGxvZ2dlZCBpblxuICBjb25zdCBjb29raWUgPSByZXEuY29va2llc1snaWRfdG9rZW4nXTtcbiAgaWYgKCFjb29raWUpIHtcbiAgICByZXR1cm4gbnVsbDsgLy8gcmV0dXJuaW5nIG51bGwgdGVsbHMgTHVuYVNlYyB0aGF0IGEgc2Vzc2lvbiBpcyBub3Qgc2V0XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGp3dERhdGEgPSBhd2FpdCBkZWNvZGVKV1QoY29va2llLCBwdWJLZXkpO1xuXG4gICAgcmV0dXJuIGp3dERhdGEuc2Vzc2lvbi5pZDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVjb2RlSldUKGVuY29kZWRKd3Q6IHN0cmluZywgcHViS2V5OiBzdHJpbmcpOiBQcm9taXNlPFRva2VuRGF0YT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGp3dC52ZXJpZnkoZW5jb2RlZEp3dCwgcHViS2V5LCB7IGFsZ29yaXRobXM6IFsnUlMyNTYnXSB9LCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICAgIGlmICghZGF0YSB8fCAhKCdzZXNzaW9uJyBpbiBkYXRhKSB8fCAhKCdpZCcgaW4gZGF0YS5zZXNzaW9uKSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignc2Vzc2lvbiBpbmZvIG1pc3NpbmcgZnJvbSBKV1QnKSk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKGRhdGEgYXMgVG9rZW5EYXRhKTtcbiAgICB9KTtcbiAgICByZWplY3QobmV3IEVycm9yKCd1bmFibGUgdG8gcGFyc2Ugand0IGR1ZSB0byB1bmtub3duIGVycm9yJykpO1xuICB9KTtcbn1cbiJdfQ==