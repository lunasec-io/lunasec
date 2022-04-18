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
Object.defineProperty(exports, "__esModule", { value: true });
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
const passport_1 = require("passport");
function configurePassport(models) {
    const passport = new passport_1.Passport();
    // Configure the local strategy for use by Passport.
    //
    // The local strategy requires a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    // passport.use(
    //   // @ts-ignore
    //   new Strategy(async (username: string, password: string, done: any) => {})
    // );
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
exports.default = configurePassport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLXBhc3Nwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtZ3JhcGhxbC9jb25maWcvY29uZmlndXJlLXBhc3Nwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsdUNBQW9DO0FBS3BDLFNBQXdCLGlCQUFpQixDQUFDLE1BQWM7SUFDdEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7SUFFaEMsb0RBQW9EO0lBQ3BELEVBQUU7SUFDRixpRkFBaUY7SUFDakYsK0VBQStFO0lBQy9FLDhFQUE4RTtJQUM5RSxvRUFBb0U7SUFDcEUsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQiw4RUFBOEU7SUFDOUUsS0FBSztJQUVMLHdEQUF3RDtJQUN4RCxFQUFFO0lBQ0YsZ0ZBQWdGO0lBQ2hGLHlFQUF5RTtJQUN6RSw0RUFBNEU7SUFDNUUseUVBQXlFO0lBQ3pFLGlCQUFpQjtJQUNqQixRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUU7UUFDdkMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVILGtFQUFrRTtJQUNsRSxRQUFRLENBQUMsZUFBZSxDQUFDLFVBQWdCLFFBQXdCLEVBQUUsRUFBRTs7WUFDbkUsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNoQjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNQO1FBQ0gsQ0FBQztLQUFBLENBQUMsQ0FBQztJQUNILE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFuQ0Qsb0NBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIGJ5IEx1bmFTZWMgKG93bmVkIGJ5IFJlZmluZXJ5IExhYnMsIEluYylcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7IFBhc3Nwb3J0IH0gZnJvbSAncGFzc3BvcnQnO1xuLy8gaW1wb3J0IFN0cmF0ZWd5IGZyb20gJ3Bhc3Nwb3J0LWxvY2FsJztcblxuaW1wb3J0IHsgTW9kZWxzIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21vZGVscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVBhc3Nwb3J0KG1vZGVsczogTW9kZWxzKSB7XG4gIGNvbnN0IHBhc3Nwb3J0ID0gbmV3IFBhc3Nwb3J0KCk7XG5cbiAgLy8gQ29uZmlndXJlIHRoZSBsb2NhbCBzdHJhdGVneSBmb3IgdXNlIGJ5IFBhc3Nwb3J0LlxuICAvL1xuICAvLyBUaGUgbG9jYWwgc3RyYXRlZ3kgcmVxdWlyZXMgYSBgdmVyaWZ5YCBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyB0aGUgY3JlZGVudGlhbHNcbiAgLy8gKGB1c2VybmFtZWAgYW5kIGBwYXNzd29yZGApIHN1Ym1pdHRlZCBieSB0aGUgdXNlci4gIFRoZSBmdW5jdGlvbiBtdXN0IHZlcmlmeVxuICAvLyB0aGF0IHRoZSBwYXNzd29yZCBpcyBjb3JyZWN0IGFuZCB0aGVuIGludm9rZSBgY2JgIHdpdGggYSB1c2VyIG9iamVjdCwgd2hpY2hcbiAgLy8gd2lsbCBiZSBzZXQgYXQgYHJlcS51c2VyYCBpbiByb3V0ZSBoYW5kbGVycyBhZnRlciBhdXRoZW50aWNhdGlvbi5cbiAgLy8gcGFzc3BvcnQudXNlKFxuICAvLyAgIC8vIEB0cy1pZ25vcmVcbiAgLy8gICBuZXcgU3RyYXRlZ3koYXN5bmMgKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGRvbmU6IGFueSkgPT4ge30pXG4gIC8vICk7XG5cbiAgLy8gQ29uZmlndXJlIFBhc3Nwb3J0IGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBwZXJzaXN0ZW5jZS5cbiAgLy9cbiAgLy8gSW4gb3JkZXIgdG8gcmVzdG9yZSBhdXRoZW50aWNhdGlvbiBzdGF0ZSBhY3Jvc3MgSFRUUCByZXF1ZXN0cywgUGFzc3BvcnQgbmVlZHNcbiAgLy8gdG8gc2VyaWFsaXplIHVzZXJzIGludG8gYW5kIGRlc2VyaWFsaXplIHVzZXJzIG91dCBvZiB0aGUgc2Vzc2lvbi4gIFRoZVxuICAvLyB0eXBpY2FsIGltcGxlbWVudGF0aW9uIG9mIHRoaXMgaXMgYXMgc2ltcGxlIGFzIHN1cHBseWluZyB0aGUgdXNlciBJRCB3aGVuXG4gIC8vIHNlcmlhbGl6aW5nLCBhbmQgcXVlcnlpbmcgdGhlIHVzZXIgcmVjb3JkIGJ5IElEIGZyb20gdGhlIGRhdGFiYXNlIHdoZW5cbiAgLy8gZGVzZXJpYWxpemluZy5cbiAgcGFzc3BvcnQuc2VyaWFsaXplVXNlcihmdW5jdGlvbiAodXNlciwgY2IpIHtcbiAgICBjYihudWxsLCB7IGlkOiB1c2VyLmlkLCB1c2VybmFtZTogdXNlci51c2VybmFtZSB9KTtcbiAgfSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1taXN1c2VkLXByb21pc2VzXG4gIHBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihhc3luYyBmdW5jdGlvbiAodXNlckluZm86IHsgaWQ6IHN0cmluZyB9LCBjYikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgbW9kZWxzLnVzZXIuZ2V0VXNlcih1c2VySW5mby5pZCk7XG4gICAgICBjYihudWxsLCB1c2VyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjYihlKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcGFzc3BvcnQ7XG59XG4iXX0=