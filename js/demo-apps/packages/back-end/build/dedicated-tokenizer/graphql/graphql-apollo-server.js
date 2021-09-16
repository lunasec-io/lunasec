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
const apollo_server_express_1 = require("apollo-server-express");
const read_session_from_request_1 = require("../../read-session-from-request");
const schema_1 = require("./schema");
function attachApolloServer(app) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: schema_1.resolvers,
            schemaDirectives: schema_1.schemaDirectives,
            context: addSessionToContext,
        });
        yield server.start();
        server.applyMiddleware({ app, cors: false });
    });
}
exports.attachApolloServer = attachApolloServer;
// USER AUTH
// Verifies the users session cookie and adds the session ID to the context object for easy access in resolvers
// You could also do this as an express middleware if you chose, this is just apollo's version of the same pattern
function addSessionToContext(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = yield read_session_from_request_1.readSessionFromRequest(context.req);
        return { sessionId: sessionId, req: context.req, res: context.res };
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC1hcG9sbG8tc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvZ3JhcGhxbC9ncmFwaHFsLWFwb2xsby1zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQWlFO0FBR2pFLCtFQUF5RTtBQUV6RSxxQ0FBaUU7QUFFakUsU0FBc0Isa0JBQWtCLENBQUMsR0FBWTs7UUFDbkQsYUFBYTtRQUNiLE1BQU0sTUFBTSxHQUFHLElBQUksb0NBQVksQ0FBQztZQUM5QixRQUFRLEVBQVIsaUJBQVE7WUFDUixTQUFTLEVBQUUsa0JBQXVCO1lBQ2xDLGdCQUFnQixFQUFoQix5QkFBZ0I7WUFDaEIsT0FBTyxFQUFFLG1CQUFtQjtTQUM3QixDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQixNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FBQTtBQVhELGdEQVdDO0FBRUQsWUFBWTtBQUNaLCtHQUErRztBQUMvRyxrSEFBa0g7QUFDbEgsU0FBZSxtQkFBbUIsQ0FBQyxPQUF3Qzs7UUFDekUsTUFBTSxTQUFTLEdBQUcsTUFBTSxrREFBc0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0RSxDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcG9sbG9TZXJ2ZXIsIElSZXNvbHZlcnMgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnO1xuaW1wb3J0IHsgRXhwcmVzcywgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuaW1wb3J0IHsgcmVhZFNlc3Npb25Gcm9tUmVxdWVzdCB9IGZyb20gJy4uLy4uL3JlYWQtc2Vzc2lvbi1mcm9tLXJlcXVlc3QnO1xuXG5pbXBvcnQgeyByZXNvbHZlcnMsIHNjaGVtYURpcmVjdGl2ZXMsIHR5cGVEZWZzIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXR0YWNoQXBvbGxvU2VydmVyKGFwcDogRXhwcmVzcykge1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICAgIHR5cGVEZWZzLFxuICAgIHJlc29sdmVyczogcmVzb2x2ZXJzIGFzIElSZXNvbHZlcnMsXG4gICAgc2NoZW1hRGlyZWN0aXZlcyxcbiAgICBjb250ZXh0OiBhZGRTZXNzaW9uVG9Db250ZXh0LFxuICB9KTtcbiAgYXdhaXQgc2VydmVyLnN0YXJ0KCk7XG5cbiAgc2VydmVyLmFwcGx5TWlkZGxld2FyZSh7IGFwcCwgY29yczogZmFsc2UgfSk7XG59XG5cbi8vIFVTRVIgQVVUSFxuLy8gVmVyaWZpZXMgdGhlIHVzZXJzIHNlc3Npb24gY29va2llIGFuZCBhZGRzIHRoZSBzZXNzaW9uIElEIHRvIHRoZSBjb250ZXh0IG9iamVjdCBmb3IgZWFzeSBhY2Nlc3MgaW4gcmVzb2x2ZXJzXG4vLyBZb3UgY291bGQgYWxzbyBkbyB0aGlzIGFzIGFuIGV4cHJlc3MgbWlkZGxld2FyZSBpZiB5b3UgY2hvc2UsIHRoaXMgaXMganVzdCBhcG9sbG8ncyB2ZXJzaW9uIG9mIHRoZSBzYW1lIHBhdHRlcm5cbmFzeW5jIGZ1bmN0aW9uIGFkZFNlc3Npb25Ub0NvbnRleHQoY29udGV4dDogeyByZXE6IFJlcXVlc3Q7IHJlczogUmVzcG9uc2UgfSk6IFByb21pc2U8UmVjb3JkPHN0cmluZywgYW55Pj4ge1xuICBjb25zdCBzZXNzaW9uSWQgPSBhd2FpdCByZWFkU2Vzc2lvbkZyb21SZXF1ZXN0KGNvbnRleHQucmVxKTtcblxuICByZXR1cm4geyBzZXNzaW9uSWQ6IHNlc3Npb25JZCwgcmVxOiBjb250ZXh0LnJlcSwgcmVzOiBjb250ZXh0LnJlcyB9O1xufVxuIl19