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
exports.attachApolloServer = void 0;
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
const apollo_server_express_1 = require("apollo-server-express");
const graphql_passport_1 = require("graphql-passport");
const schema_1 = require("./schema");
function attachApolloServer(app, models) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('attaching apollo server to express');
        function buildContext(context) {
            return Object.assign(Object.assign({}, (0, graphql_passport_1.buildContext)(context)), { models });
        }
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: schema_1.resolvers,
            schemaDirectives: schema_1.schemaDirectives,
            context: buildContext,
        });
        yield server.start();
        server.applyMiddleware({
            app,
            cors: {
                origin: 'http://localhost:3000',
                optionsSuccessStatus: 200,
                methods: ['GET', 'PUT', 'POST'],
                credentials: true,
            },
        });
    });
}
exports.attachApolloServer = attachApolloServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC1hcG9sbG8tc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtZ3JhcGhxbC9ncmFwaHFsL2dyYXBocWwtYXBvbGxvLXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxpRUFBcUU7QUFFckUsdURBQXlGO0FBS3pGLHFDQUFpRTtBQUVqRSxTQUFzQixrQkFBa0IsQ0FBQyxHQUFZLEVBQUUsTUFBYzs7UUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBRWxELFNBQVMsWUFBWSxDQUFDLE9BQXVCO1lBQzNDLHVDQUNLLElBQUEsK0JBQW9CLEVBQUMsT0FBTyxDQUFDLEtBQ2hDLE1BQU0sSUFDTjtRQUNKLENBQUM7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLG9DQUFZLENBQUM7WUFDOUIsUUFBUSxFQUFSLGlCQUFRO1lBQ1IsU0FBUyxFQUFFLGtCQUFTO1lBQ3BCLGdCQUFnQixFQUFoQix5QkFBZ0I7WUFDaEIsT0FBTyxFQUFFLFlBQVk7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFckIsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNyQixHQUFHO1lBQ0gsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSx1QkFBdUI7Z0JBQy9CLG9CQUFvQixFQUFFLEdBQUc7Z0JBQ3pCLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO2dCQUMvQixXQUFXLEVBQUUsSUFBSTthQUNsQjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQTtBQTNCRCxnREEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgYnkgTHVuYVNlYyAob3duZWQgYnkgUmVmaW5lcnkgTGFicywgSW5jKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHsgQXBvbGxvU2VydmVyLCBFeHByZXNzQ29udGV4dCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgeyBFeHByZXNzIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBidWlsZENvbnRleHQgYXMgYnVpbGRQYXNzcG9ydENvbnRleHQsIFBhc3Nwb3J0Q29udGV4dCB9IGZyb20gJ2dyYXBocWwtcGFzc3BvcnQnO1xuXG5pbXBvcnQgeyBNb2RlbHMgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vbW9kZWxzJztcbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tb2RlbHMvdXNlcic7XG5cbmltcG9ydCB7IHJlc29sdmVycywgc2NoZW1hRGlyZWN0aXZlcywgdHlwZURlZnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhdHRhY2hBcG9sbG9TZXJ2ZXIoYXBwOiBFeHByZXNzLCBtb2RlbHM6IE1vZGVscyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zb2xlLmxvZygnYXR0YWNoaW5nIGFwb2xsbyBzZXJ2ZXIgdG8gZXhwcmVzcycpO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkQ29udGV4dChjb250ZXh0OiBFeHByZXNzQ29udGV4dCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5idWlsZFBhc3Nwb3J0Q29udGV4dChjb250ZXh0KSxcbiAgICAgIG1vZGVscyxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgc2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7XG4gICAgdHlwZURlZnMsXG4gICAgcmVzb2x2ZXJzOiByZXNvbHZlcnMsXG4gICAgc2NoZW1hRGlyZWN0aXZlcyxcbiAgICBjb250ZXh0OiBidWlsZENvbnRleHQsXG4gIH0pO1xuICBhd2FpdCBzZXJ2ZXIuc3RhcnQoKTtcblxuICBzZXJ2ZXIuYXBwbHlNaWRkbGV3YXJlKHtcbiAgICBhcHAsXG4gICAgY29yczoge1xuICAgICAgb3JpZ2luOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgIG9wdGlvbnNTdWNjZXNzU3RhdHVzOiAyMDAsXG4gICAgICBtZXRob2RzOiBbJ0dFVCcsICdQVVQnLCAnUE9TVCddLFxuICAgICAgY3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwQ29udGV4dCBleHRlbmRzIFBhc3Nwb3J0Q29udGV4dDxVc2VyTW9kZWwsIHsgdXNlcm5hbWU6IHN0cmluZzsgcGFzc3dvcmQ/OiBzdHJpbmc7IGlkPzogc3RyaW5nIH0+IHtcbiAgbW9kZWxzOiBNb2RlbHM7XG59XG4iXX0=