import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers, schemaDirectives } from './schema';
import {Express} from 'express';
import { LunaSecApolloPlugin } from "@lunasec/node-sdk";

export async function attachApolloServer(app: Express) {
    // @ts-ignore
    const server = new ApolloServer({
        typeDefs,
        //@ts-ignore THIS IS BAD, FIX THIS.  It doesn't like the mutations
        resolvers,
        schemaDirectives,
        plugins: [LunaSecApolloPlugin]
    });
    await server.start();

    server.applyMiddleware({app});
}