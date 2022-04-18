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
exports.authenticateUser = exports.readSessionFromRequest = exports.getUserOrThrow = void 0;
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
const apollo_server_express_1 = require("apollo-server-express");
function getUserOrThrow(context) {
    const user = context.getUser();
    if (!user) {
        throw new apollo_server_express_1.AuthenticationError('User is not logged in');
    }
    return user;
}
exports.getUserOrThrow = getUserOrThrow;
// Tell LunaSec how to read a user identifier out of the request object.  Technically any ID will work, but the sessionId is often a good choice.
// If you'd like to allow users to use LunaSec elements without being logged in, consider generating a temporary session for them.
function readSessionFromRequest(req) {
    // LunaSec expects this to return a promise in case we need to do something async
    return new Promise((resolve) => {
        if (req.session.id) {
            return resolve(req.session.id);
        }
        return resolve(null); // LunaSec Elements will not work in this case
    });
}
exports.readSessionFromRequest = readSessionFromRequest;
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
function authenticateUser(models, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRecord = yield models.user.getUserWithPasswordHash(username);
        if (!userRecord) {
            throw new Error('Incorrect username or password.');
        }
        const passwordCorrect = yield comparePassword(password, userRecord.hashed_password, userRecord.salt);
        if (passwordCorrect instanceof Error) {
            throw passwordCorrect;
        }
        if (!passwordCorrect) {
            throw new Error('Incorrect username or password.');
        }
        const user = {
            id: userRecord.id.toString(),
            username: userRecord.username,
            ssn_token: userRecord.ssn_token,
        };
        return user;
    });
}
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtZ3JhcGhxbC9jb25maWcvYXV0aC1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILG1DQUFnQztBQUNoQyxvREFBNEI7QUFFNUIsaUVBQTREO0FBSzVELFNBQWdCLGNBQWMsQ0FBQyxPQUFtQjtJQUNoRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0IsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSSwyQ0FBbUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ3hEO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBTkQsd0NBTUM7QUFFRCxpSkFBaUo7QUFDakosa0lBQWtJO0FBQ2xJLFNBQWdCLHNCQUFzQixDQUFDLEdBQW9CO0lBQ3pELGlGQUFpRjtJQUNqRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNsQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7SUFDdEUsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBUkQsd0RBUUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxlQUF1QixFQUFFLGtCQUEwQixFQUFFLElBQVk7SUFDeEYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRTtRQUN0QyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsR0FBRyxFQUFFLFdBQVc7WUFDbEYsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckI7WUFFRCxNQUFNLGVBQWUsR0FBRyxnQkFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDN0YsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBc0IsZ0JBQWdCLENBQUMsTUFBYyxFQUFFLFFBQWdCLEVBQUUsUUFBZ0I7O1FBQ3ZGLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsTUFBTSxlQUFlLEdBQUcsTUFBTSxlQUFlLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JHLElBQUksZUFBZSxZQUFZLEtBQUssRUFBRTtZQUNwQyxNQUFNLGVBQWUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsTUFBTSxJQUFJLEdBQUc7WUFDWCxFQUFFLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO1lBQzdCLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUztTQUNoQyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQUE7QUFyQkQsNENBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIGJ5IEx1bmFTZWMgKG93bmVkIGJ5IFJlZmluZXJ5IExhYnMsIEluYylcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcic7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5cbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uRXJyb3IgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xuXG5pbXBvcnQgeyBNb2RlbHMgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vbW9kZWxzJztcbmltcG9ydCB7IEFwcENvbnRleHQgfSBmcm9tICcuLi9ncmFwaHFsL2dyYXBocWwtYXBvbGxvLXNlcnZlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyT3JUaHJvdyhjb250ZXh0OiBBcHBDb250ZXh0KSB7XG4gIGNvbnN0IHVzZXIgPSBjb250ZXh0LmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB7XG4gICAgdGhyb3cgbmV3IEF1dGhlbnRpY2F0aW9uRXJyb3IoJ1VzZXIgaXMgbm90IGxvZ2dlZCBpbicpO1xuICB9XG4gIHJldHVybiB1c2VyO1xufVxuXG4vLyBUZWxsIEx1bmFTZWMgaG93IHRvIHJlYWQgYSB1c2VyIGlkZW50aWZpZXIgb3V0IG9mIHRoZSByZXF1ZXN0IG9iamVjdC4gIFRlY2huaWNhbGx5IGFueSBJRCB3aWxsIHdvcmssIGJ1dCB0aGUgc2Vzc2lvbklkIGlzIG9mdGVuIGEgZ29vZCBjaG9pY2UuXG4vLyBJZiB5b3UnZCBsaWtlIHRvIGFsbG93IHVzZXJzIHRvIHVzZSBMdW5hU2VjIGVsZW1lbnRzIHdpdGhvdXQgYmVpbmcgbG9nZ2VkIGluLCBjb25zaWRlciBnZW5lcmF0aW5nIGEgdGVtcG9yYXJ5IHNlc3Npb24gZm9yIHRoZW0uXG5leHBvcnQgZnVuY3Rpb24gcmVhZFNlc3Npb25Gcm9tUmVxdWVzdChyZXE6IEV4cHJlc3MuUmVxdWVzdCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAvLyBMdW5hU2VjIGV4cGVjdHMgdGhpcyB0byByZXR1cm4gYSBwcm9taXNlIGluIGNhc2Ugd2UgbmVlZCB0byBkbyBzb21ldGhpbmcgYXN5bmNcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgaWYgKHJlcS5zZXNzaW9uLmlkKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShyZXEuc2Vzc2lvbi5pZCk7XG4gICAgfVxuICAgIHJldHVybiByZXNvbHZlKG51bGwpOyAvLyBMdW5hU2VjIEVsZW1lbnRzIHdpbGwgbm90IHdvcmsgaW4gdGhpcyBjYXNlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlUGFzc3dvcmQocGFzc3dvcmRUb0NoZWNrOiBzdHJpbmcsIHN0b3JlZFBhc3N3b3JkSGFzaDogc3RyaW5nLCBzYWx0OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4gfCBFcnJvcj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICBjcnlwdG8ucGJrZGYyKHBhc3N3b3JkVG9DaGVjaywgc2FsdCwgMTAwMDAsIDMyLCAnc2hhMjU2JywgZnVuY3Rpb24gKGVyciwgcmVxUGFzc0hhc2gpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoZXJyKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFzc3dvcmRDb3JyZWN0ID0gY3J5cHRvLnRpbWluZ1NhZmVFcXVhbChCdWZmZXIuZnJvbShzdG9yZWRQYXNzd29yZEhhc2gpLCByZXFQYXNzSGFzaCk7XG4gICAgICByZXNvbHZlKHBhc3N3b3JkQ29ycmVjdCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0aGVudGljYXRlVXNlcihtb2RlbHM6IE1vZGVscywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyUmVjb3JkID0gYXdhaXQgbW9kZWxzLnVzZXIuZ2V0VXNlcldpdGhQYXNzd29yZEhhc2godXNlcm5hbWUpO1xuXG4gIGlmICghdXNlclJlY29yZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkLicpO1xuICB9XG5cbiAgY29uc3QgcGFzc3dvcmRDb3JyZWN0ID0gYXdhaXQgY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkLCB1c2VyUmVjb3JkLmhhc2hlZF9wYXNzd29yZCwgdXNlclJlY29yZC5zYWx0KTtcbiAgaWYgKHBhc3N3b3JkQ29ycmVjdCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgdGhyb3cgcGFzc3dvcmRDb3JyZWN0O1xuICB9XG4gIGlmICghcGFzc3dvcmRDb3JyZWN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQuJyk7XG4gIH1cblxuICBjb25zdCB1c2VyID0ge1xuICAgIGlkOiB1c2VyUmVjb3JkLmlkLnRvU3RyaW5nKCksXG4gICAgdXNlcm5hbWU6IHVzZXJSZWNvcmQudXNlcm5hbWUsXG4gICAgc3NuX3Rva2VuOiB1c2VyUmVjb3JkLnNzbl90b2tlbixcbiAgfTtcbiAgcmV0dXJuIHVzZXI7XG59XG4iXX0=