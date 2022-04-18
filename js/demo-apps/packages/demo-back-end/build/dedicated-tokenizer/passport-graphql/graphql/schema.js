/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
exports.schemaDirectives = exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const auth_helpers_1 = require("../config/auth-helpers");
const configure_lunasec_1 = require("../config/configure-lunasec");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  # Declare the lunasec @token directive
  directive @token(duration: String) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

  type User {
    username: String
    ssn_token: String @token
  }
  # Types
  type UserResponse {
    success: Boolean!
    user: User
    error: String
  }

  type Document {
    token: String @token(duration: "50m")
  }

  type DocumentResponse {
    success: Boolean!
    documents: [Document]
    error: String
  }

  type EmptyResponse {
    success: Boolean!
    error: String
  }

  # Inputs
  input UserInput {
    username: String
    password: String
  }

  input SsnInput {
    ssn_token: String @token
  }

  input DocumentsInput {
    documents: [String] @token
  }

  # Mutations and Queries
  type Mutation {
    signup(userInfo: UserInput): UserResponse!
    login(userInfo: UserInput): UserResponse!
    setSsn(ssnInfo: SsnInput): UserResponse!
    setDocuments(tokenArray: DocumentsInput): EmptyResponse!
  }

  type Query {
    getCurrentUser: UserResponse
    getDocuments: DocumentResponse
  }
`;
exports.resolvers = {
    Query: {
        getCurrentUser: (_parent, _args, context) => {
            const user = context.getUser(); // this method added by the passport-graphql plugin
            return { success: true, user: user };
        },
        getDocuments: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = (0, auth_helpers_1.getUserOrThrow)(context);
                const documents = yield context.models.documents.getUserDocuments(user.id);
                return { success: true, documents: documents };
            }
            catch (e) {
                return { success: false, error: e.toString() };
            }
        }),
    },
    Mutation: {
        signup: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield context.models.user.createNewUser(args.userInfo);
                yield context.login(user);
                return { success: true, user: user };
            }
            catch (e) {
                return { success: false, error: e.toString() };
            }
        }),
        login: (_parent, { userInfo }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { username, password } = userInfo;
                // bypassed passport entirely for this part, it just wasn't working.  LunaSec does not recommend Passport, this is just an example
                const user = yield (0, auth_helpers_1.authenticateUser)(context.models, username, password);
                yield context.login(user);
                return { success: true, user: user };
            }
            catch (e) {
                return { success: false, error: e.toString() };
            }
        }),
        setSsn: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = (0, auth_helpers_1.getUserOrThrow)(context);
                yield context.models.user.setSsn(user.id, args.ssnInfo.ssn_token);
                return { success: true, user: user };
            }
            catch (e) {
                return { success: false, error: e.toString() };
            }
        }),
        setDocuments: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = (0, auth_helpers_1.getUserOrThrow)(context);
                yield context.models.documents.setUserDocuments(user.id, args.tokenArray.documents);
                return { success: true };
            }
            catch (e) {
                return { success: false, error: e.toString() };
            }
        }),
    },
};
exports.schemaDirectives = {
    token: configure_lunasec_1.lunaSec.tokenDirective,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtZ3JhcGhxbC9ncmFwaHFsL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFpQkEsaUVBQTRDO0FBRTVDLHlEQUEwRTtBQUMxRSxtRUFBc0Q7QUFNekMsUUFBQSxRQUFRLEdBQUcsSUFBQSwyQkFBRyxFQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdEMUIsQ0FBQztBQUVXLFFBQUEsU0FBUyxHQUFtQztJQUN2RCxLQUFLLEVBQUU7UUFDTCxjQUFjLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQzFDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLG1EQUFtRDtZQUNuRixPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELFlBQVksRUFBRSxDQUFPLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDOUMsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxJQUFBLDZCQUFjLEVBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sU0FBUyxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUM7YUFDaEQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUcsQ0FBVyxDQUFDLFFBQVEsRUFBRSxF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OlsiLypcbiAqIENvcHlyaWdodCAyMDIxIGJ5IEx1bmFTZWMgKG93bmVkIGJ5IFJlZmluZXJ5IExhYnMsIEluYylcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7IEdyYXBoUUxSZXNvbHZlck1hcCB9IGZyb20gJ2Fwb2xsby1ncmFwaHFsJztcbmltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5cbmltcG9ydCB7IGF1dGhlbnRpY2F0ZVVzZXIsIGdldFVzZXJPclRocm93IH0gZnJvbSAnLi4vY29uZmlnL2F1dGgtaGVscGVycyc7XG5pbXBvcnQgeyBsdW5hU2VjIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZ3VyZS1sdW5hc2VjJztcbi8vIFJFQURNRSAtIFRoaXMgZGVtbyBzaG93cyBob3cgdG8gdXNlIHRoZSBsdW5hc2VjIEB0b2tlbiBkaXJlY3RpdmUgaW4geW91ciBhcG9sbG8gc2VydmVyXG4vLyBJbXBvcnQgdGhlIGRpcmVjdGl2ZSBmcm9tIHRoZSBub2RlLXNkayBhbmQgYXR0YWNoIGl0IHRvIHlvdXIgc2NoZW1hRGlyZWN0aXZlcyhib3R0b20gb2YgdGhpcyBmaWxlKSB3aGljaCBhcmUgcGFzc2VkIGludG8gYXBvbGxvXG4vLyBhbmQgZGVjbGFyZSB0aGUgZGlyZWN0aXZlIGRpcmVjdGx5IGluIHlvdXIgc2NoZW1hIHdpdGggdGhlIGBkaXJlY3RpdmVgIGtleXdvcmQuXG5cbmltcG9ydCB7IEFwcENvbnRleHQgfSBmcm9tICcuL2dyYXBocWwtYXBvbGxvLXNlcnZlcic7XG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXG4gICMgRGVjbGFyZSB0aGUgbHVuYXNlYyBAdG9rZW4gZGlyZWN0aXZlXG4gIGRpcmVjdGl2ZSBAdG9rZW4oZHVyYXRpb246IFN0cmluZykgb24gRklFTERfREVGSU5JVElPTiB8IElOUFVUX0ZJRUxEX0RFRklOSVRJT05cblxuICB0eXBlIFVzZXIge1xuICAgIHVzZXJuYW1lOiBTdHJpbmdcbiAgICBzc25fdG9rZW46IFN0cmluZyBAdG9rZW5cbiAgfVxuICAjIFR5cGVzXG4gIHR5cGUgVXNlclJlc3BvbnNlIHtcbiAgICBzdWNjZXNzOiBCb29sZWFuIVxuICAgIHVzZXI6IFVzZXJcbiAgICBlcnJvcjogU3RyaW5nXG4gIH1cblxuICB0eXBlIERvY3VtZW50IHtcbiAgICB0b2tlbjogU3RyaW5nIEB0b2tlbihkdXJhdGlvbjogXCI1MG1cIilcbiAgfVxuXG4gIHR5cGUgRG9jdW1lbnRSZXNwb25zZSB7XG4gICAgc3VjY2VzczogQm9vbGVhbiFcbiAgICBkb2N1bWVudHM6IFtEb2N1bWVudF1cbiAgICBlcnJvcjogU3RyaW5nXG4gIH1cblxuICB0eXBlIEVtcHR5UmVzcG9uc2Uge1xuICAgIHN1Y2Nlc3M6IEJvb2xlYW4hXG4gICAgZXJyb3I6IFN0cmluZ1xuICB9XG5cbiAgIyBJbnB1dHNcbiAgaW5wdXQgVXNlcklucHV0IHtcbiAgICB1c2VybmFtZTogU3RyaW5nXG4gICAgcGFzc3dvcmQ6IFN0cmluZ1xuICB9XG5cbiAgaW5wdXQgU3NuSW5wdXQge1xuICAgIHNzbl90b2tlbjogU3RyaW5nIEB0b2tlblxuICB9XG5cbiAgaW5wdXQgRG9jdW1lbnRzSW5wdXQge1xuICAgIGRvY3VtZW50czogW1N0cmluZ10gQHRva2VuXG4gIH1cblxuICAjIE11dGF0aW9ucyBhbmQgUXVlcmllc1xuICB0eXBlIE11dGF0aW9uIHtcbiAgICBzaWdudXAodXNlckluZm86IFVzZXJJbnB1dCk6IFVzZXJSZXNwb25zZSFcbiAgICBsb2dpbih1c2VySW5mbzogVXNlcklucHV0KTogVXNlclJlc3BvbnNlIVxuICAgIHNldFNzbihzc25JbmZvOiBTc25JbnB1dCk6IFVzZXJSZXNwb25zZSFcbiAgICBzZXREb2N1bWVudHModG9rZW5BcnJheTogRG9jdW1lbnRzSW5wdXQpOiBFbXB0eVJlc3BvbnNlIVxuICB9XG5cbiAgdHlwZSBRdWVyeSB7XG4gICAgZ2V0Q3VycmVudFVzZXI6IFVzZXJSZXNwb25zZVxuICAgIGdldERvY3VtZW50czogRG9jdW1lbnRSZXNwb25zZVxuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzOiBHcmFwaFFMUmVzb2x2ZXJNYXA8QXBwQ29udGV4dD4gPSB7XG4gIFF1ZXJ5OiB7XG4gICAgZ2V0Q3VycmVudFVzZXI6IChfcGFyZW50LCBfYXJncywgY29udGV4dCkgPT4ge1xuICAgICAgY29uc3QgdXNlciA9IGNvbnRleHQuZ2V0VXNlcigpOyAvLyB0aGlzIG1ldGhvZCBhZGRlZCBieSB0aGUgcGFzc3BvcnQtZ3JhcGhxbCBwbHVnaW5cbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHVzZXI6IHVzZXIgfTtcbiAgICB9LCAvLyBPbmNlIHRoaXMgcmVzb2x2ZXIgZmlyZXMgYW5kIHRva2VucyBhcmUgcmV0cmlldmVkLCBhbnkgZmllbGQgYW5ub3RhdGVkIHdpdGggQHRva2VuIHdpbGwgYmUgZ3JhbnRlZCByZWFkIHBlcm1pc3Npb24gZm9yIHRoaXMgc2Vzc2lvbiBmb3IgMTUgbWludXRlc1xuXG4gICAgZ2V0RG9jdW1lbnRzOiBhc3luYyAoX3BhcmVudCwgX2FyZ3MsIGNvbnRleHQpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBnZXRVc2VyT3JUaHJvdyhjb250ZXh0KTtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRzID0gYXdhaXQgY29udGV4dC5tb2RlbHMuZG9jdW1lbnRzLmdldFVzZXJEb2N1bWVudHModXNlci5pZCk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRvY3VtZW50czogZG9jdW1lbnRzIH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogKGUgYXMgRXJyb3IpLnRvU3RyaW5nKCkgfTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBNdXRhdGlvbjoge1xuICAgIHNpZ251cDogYXN5bmMgKF9wYXJlbnQsIGFyZ3MsIGNvbnRleHQpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBjb250ZXh0Lm1vZGVscy51c2VyLmNyZWF0ZU5ld1VzZXIoYXJncy51c2VySW5mbyk7XG4gICAgICAgIGF3YWl0IGNvbnRleHQubG9naW4odXNlcik7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIHVzZXI6IHVzZXIgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAoZSBhcyBFcnJvcikudG9TdHJpbmcoKSB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgbG9naW46IGFzeW5jIChfcGFyZW50LCB7IHVzZXJJbmZvIH0sIGNvbnRleHQpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSB1c2VySW5mbztcbiAgICAgICAgLy8gYnlwYXNzZWQgcGFzc3BvcnQgZW50aXJlbHkgZm9yIHRoaXMgcGFydCwgaXQganVzdCB3YXNuJ3Qgd29ya2luZy4gIEx1bmFTZWMgZG9lcyBub3QgcmVjb21tZW5kIFBhc3Nwb3J0LCB0aGlzIGlzIGp1c3QgYW4gZXhhbXBsZVxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgYXV0aGVudGljYXRlVXNlcihjb250ZXh0Lm1vZGVscywgdXNlcm5hbWUsIHBhc3N3b3JkKTtcbiAgICAgICAgYXdhaXQgY29udGV4dC5sb2dpbih1c2VyKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdXNlcjogdXNlciB9O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IChlIGFzIEVycm9yKS50b1N0cmluZygpIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRTc246IGFzeW5jIChfcGFyZW50LCBhcmdzLCBjb250ZXh0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gZ2V0VXNlck9yVGhyb3coY29udGV4dCk7XG4gICAgICAgIGF3YWl0IGNvbnRleHQubW9kZWxzLnVzZXIuc2V0U3NuKHVzZXIuaWQsIGFyZ3Muc3NuSW5mby5zc25fdG9rZW4pO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB1c2VyOiB1c2VyIH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogKGUgYXMgRXJyb3IpLnRvU3RyaW5nKCkgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0RG9jdW1lbnRzOiBhc3luYyAoX3BhcmVudCwgYXJncywgY29udGV4dCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGdldFVzZXJPclRocm93KGNvbnRleHQpO1xuICAgICAgICBhd2FpdCBjb250ZXh0Lm1vZGVscy5kb2N1bWVudHMuc2V0VXNlckRvY3VtZW50cyh1c2VyLmlkLCBhcmdzLnRva2VuQXJyYXkuZG9jdW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IChlIGFzIEVycm9yKS50b1N0cmluZygpIH07XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBzY2hlbWFEaXJlY3RpdmVzID0ge1xuICB0b2tlbjogbHVuYVNlYy50b2tlbkRpcmVjdGl2ZSxcbn07XG4iXX0=