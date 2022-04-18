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
exports.configurePassport = void 0;
/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const buffer_1 = require("buffer");
const crypto_1 = __importDefault(require("crypto"));
const passport_1 = require("passport");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const passport_json_1 = require("passport-json");
function comparePassword(passwordToCheck, storedPasswordHash, salt) {
    return new Promise((resolve, _reject) => {
        crypto_1.default.pbkdf2(passwordToCheck, salt, 10000, 32, 'sha256', function (err, reqPassHash) {
            if (err) {
                return resolve(err);
            }
            const passwordCorrect = crypto_1.default.timingSafeEqual(buffer_1.Buffer.from(storedPasswordHash), reqPassHash);
            resolve(passwordCorrect);
        });
    });
}
function configurePassport(models) {
    const passport = new passport_1.Passport();
    // Configure the local strategy for use by Passport.
    //
    // The local strategy requires a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(new passport_json_1.Strategy(function login(username, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield models.user.getUserWithPasswordHash(username).catch((err) => done(err, false));
            if (!userRecord) {
                return done('Incorrect username or password.', false);
            }
            const passwordCorrect = yield comparePassword(password, userRecord.hashed_password, userRecord.salt);
            if (passwordCorrect instanceof Error) {
                return done(passwordCorrect, false);
            }
            if (!passwordCorrect) {
                return done('Incorrect username or password.', false);
            }
            const user = {
                id: userRecord.id.toString(),
                username: userRecord.username,
                ssn_token: userRecord.ssn_token,
            };
            return done(null, user);
        });
    }));
    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(function (user, cb) {
        cb(null, { id: user.id, username: user.username });
    });
    // TODO: Generate session IDs, dont use user IDs like this
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    passport.deserializeUser(function (userInfo, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models.user.getUser(userInfo.id);
                cb(null, user);
            }
            catch (e) {
                cb(e);
            }
        });
    });
    return passport;
}
exports.configurePassport = configurePassport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLXBhc3Nwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtZXhwcmVzcy9jb25maWcvY29uZmlndXJlLXBhc3Nwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILG1DQUFnQztBQUNoQyxvREFBNEI7QUFFNUIsdUNBQThEO0FBQzlELDZEQUE2RDtBQUM3RCxhQUFhO0FBQ2IsaURBQXlDO0FBSXpDLFNBQVMsZUFBZSxDQUFDLGVBQXVCLEVBQUUsa0JBQTBCLEVBQUUsSUFBWTtJQUN4RixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQ3RDLGdCQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxHQUFHLEVBQUUsV0FBVztZQUNsRixJQUFJLEdBQUcsRUFBRTtnQkFDUCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyQjtZQUVELE1BQU0sZUFBZSxHQUFHLGdCQUFNLENBQUMsZUFBZSxDQUFDLGVBQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM3RixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxNQUFjO0lBQzlDLE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO0lBQ2hDLG9EQUFvRDtJQUNwRCxFQUFFO0lBQ0YsaUZBQWlGO0lBQ2pGLCtFQUErRTtJQUMvRSw4RUFBOEU7SUFDOUUsb0VBQW9FO0lBQ3BFLFFBQVEsQ0FBQyxHQUFHLENBQ1YsSUFBSSx3QkFBUSxDQUFDLFNBQWUsS0FBSyxDQUMvQixRQUFnQixFQUNoQixRQUFnQixFQUNoQixJQUFtRTs7WUFFbkUsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRS9HLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsT0FBTyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDdkQ7WUFFRCxNQUFNLGVBQWUsR0FBRyxNQUFNLGVBQWUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckcsSUFBSSxlQUFlLFlBQVksS0FBSyxFQUFFO2dCQUNwQyxPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDckM7WUFDRCxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUNwQixPQUFPLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN2RDtZQUVELE1BQU0sSUFBSSxHQUFHO2dCQUNYLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtnQkFDNUIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO2dCQUM3QixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7YUFDaEMsQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDO0tBQUEsQ0FBaUIsQ0FDbkIsQ0FBQztJQUVGLHdEQUF3RDtJQUN4RCxFQUFFO0lBQ0YsZ0ZBQWdGO0lBQ2hGLHlFQUF5RTtJQUN6RSw0RUFBNEU7SUFDNUUseUVBQXlFO0lBQ3pFLGlCQUFpQjtJQUNqQixRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUU7UUFDdkMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNILDBEQUEwRDtJQUUxRCxrRUFBa0U7SUFDbEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFnQixRQUF3QixFQUFFLEVBQUU7O1lBQ25FLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDaEI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDUDtRQUNILENBQUM7S0FBQSxDQUFDLENBQUM7SUFDSCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBM0RELDhDQTJEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBieSBMdW5hU2VjIChvd25lZCBieSBSZWZpbmVyeSBMYWJzLCBJbmMpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQgeyBCdWZmZXIgfSBmcm9tICdidWZmZXInO1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuXG5pbXBvcnQgeyBQYXNzcG9ydCwgU3RyYXRlZ3kgYXMgU3RyYXRlZ3lUeXBlIH0gZnJvbSAncGFzc3BvcnQnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qc29uJztcblxuaW1wb3J0IHsgTW9kZWxzLCBVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vbW9kZWxzJztcblxuZnVuY3Rpb24gY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkVG9DaGVjazogc3RyaW5nLCBzdG9yZWRQYXNzd29yZEhhc2g6IHN0cmluZywgc2FsdDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuIHwgRXJyb3I+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgY3J5cHRvLnBia2RmMihwYXNzd29yZFRvQ2hlY2ssIHNhbHQsIDEwMDAwLCAzMiwgJ3NoYTI1NicsIGZ1bmN0aW9uIChlcnIsIHJlcVBhc3NIYXNoKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKGVycik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhc3N3b3JkQ29ycmVjdCA9IGNyeXB0by50aW1pbmdTYWZlRXF1YWwoQnVmZmVyLmZyb20oc3RvcmVkUGFzc3dvcmRIYXNoKSwgcmVxUGFzc0hhc2gpO1xuICAgICAgcmVzb2x2ZShwYXNzd29yZENvcnJlY3QpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZVBhc3Nwb3J0KG1vZGVsczogTW9kZWxzKSB7XG4gIGNvbnN0IHBhc3Nwb3J0ID0gbmV3IFBhc3Nwb3J0KCk7XG4gIC8vIENvbmZpZ3VyZSB0aGUgbG9jYWwgc3RyYXRlZ3kgZm9yIHVzZSBieSBQYXNzcG9ydC5cbiAgLy9cbiAgLy8gVGhlIGxvY2FsIHN0cmF0ZWd5IHJlcXVpcmVzIGEgYHZlcmlmeWAgZnVuY3Rpb24gd2hpY2ggcmVjZWl2ZXMgdGhlIGNyZWRlbnRpYWxzXG4gIC8vIChgdXNlcm5hbWVgIGFuZCBgcGFzc3dvcmRgKSBzdWJtaXR0ZWQgYnkgdGhlIHVzZXIuICBUaGUgZnVuY3Rpb24gbXVzdCB2ZXJpZnlcbiAgLy8gdGhhdCB0aGUgcGFzc3dvcmQgaXMgY29ycmVjdCBhbmQgdGhlbiBpbnZva2UgYGNiYCB3aXRoIGEgdXNlciBvYmplY3QsIHdoaWNoXG4gIC8vIHdpbGwgYmUgc2V0IGF0IGByZXEudXNlcmAgaW4gcm91dGUgaGFuZGxlcnMgYWZ0ZXIgYXV0aGVudGljYXRpb24uXG4gIHBhc3Nwb3J0LnVzZShcbiAgICBuZXcgU3RyYXRlZ3koYXN5bmMgZnVuY3Rpb24gbG9naW4oXG4gICAgICB1c2VybmFtZTogc3RyaW5nLFxuICAgICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICAgIGRvbmU6IChlcnI6IG51bGwgfCBzdHJpbmcgfCBFcnJvciwgdXNyPzogZmFsc2UgfCBVc2VyTW9kZWwpID0+IHZvaWRcbiAgICApIHtcbiAgICAgIGNvbnN0IHVzZXJSZWNvcmQgPSBhd2FpdCBtb2RlbHMudXNlci5nZXRVc2VyV2l0aFBhc3N3b3JkSGFzaCh1c2VybmFtZSkuY2F0Y2goKGVycjogRXJyb3IpID0+IGRvbmUoZXJyLCBmYWxzZSkpO1xuXG4gICAgICBpZiAoIXVzZXJSZWNvcmQpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUoJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZC4nLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhc3N3b3JkQ29ycmVjdCA9IGF3YWl0IGNvbXBhcmVQYXNzd29yZChwYXNzd29yZCwgdXNlclJlY29yZC5oYXNoZWRfcGFzc3dvcmQsIHVzZXJSZWNvcmQuc2FsdCk7XG4gICAgICBpZiAocGFzc3dvcmRDb3JyZWN0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUocGFzc3dvcmRDb3JyZWN0LCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZiAoIXBhc3N3b3JkQ29ycmVjdCkge1xuICAgICAgICByZXR1cm4gZG9uZSgnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkLicsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXNlciA9IHtcbiAgICAgICAgaWQ6IHVzZXJSZWNvcmQuaWQudG9TdHJpbmcoKSxcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJSZWNvcmQudXNlcm5hbWUsXG4gICAgICAgIHNzbl90b2tlbjogdXNlclJlY29yZC5zc25fdG9rZW4sXG4gICAgICB9O1xuICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlcik7XG4gICAgfSkgYXMgU3RyYXRlZ3lUeXBlXG4gICk7XG5cbiAgLy8gQ29uZmlndXJlIFBhc3Nwb3J0IGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBwZXJzaXN0ZW5jZS5cbiAgLy9cbiAgLy8gSW4gb3JkZXIgdG8gcmVzdG9yZSBhdXRoZW50aWNhdGlvbiBzdGF0ZSBhY3Jvc3MgSFRUUCByZXF1ZXN0cywgUGFzc3BvcnQgbmVlZHNcbiAgLy8gdG8gc2VyaWFsaXplIHVzZXJzIGludG8gYW5kIGRlc2VyaWFsaXplIHVzZXJzIG91dCBvZiB0aGUgc2Vzc2lvbi4gIFRoZVxuICAvLyB0eXBpY2FsIGltcGxlbWVudGF0aW9uIG9mIHRoaXMgaXMgYXMgc2ltcGxlIGFzIHN1cHBseWluZyB0aGUgdXNlciBJRCB3aGVuXG4gIC8vIHNlcmlhbGl6aW5nLCBhbmQgcXVlcnlpbmcgdGhlIHVzZXIgcmVjb3JkIGJ5IElEIGZyb20gdGhlIGRhdGFiYXNlIHdoZW5cbiAgLy8gZGVzZXJpYWxpemluZy5cbiAgcGFzc3BvcnQuc2VyaWFsaXplVXNlcihmdW5jdGlvbiAodXNlciwgY2IpIHtcbiAgICBjYihudWxsLCB7IGlkOiB1c2VyLmlkLCB1c2VybmFtZTogdXNlci51c2VybmFtZSB9KTtcbiAgfSk7XG4gIC8vIFRPRE86IEdlbmVyYXRlIHNlc3Npb24gSURzLCBkb250IHVzZSB1c2VyIElEcyBsaWtlIHRoaXNcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW1pc3VzZWQtcHJvbWlzZXNcbiAgcGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGFzeW5jIGZ1bmN0aW9uICh1c2VySW5mbzogeyBpZDogc3RyaW5nIH0sIGNiKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBtb2RlbHMudXNlci5nZXRVc2VyKHVzZXJJbmZvLmlkKTtcbiAgICAgIGNiKG51bGwsIHVzZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNiKGUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBwYXNzcG9ydDtcbn1cbiJdfQ==