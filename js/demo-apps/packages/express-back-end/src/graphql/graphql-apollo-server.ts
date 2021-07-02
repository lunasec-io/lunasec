import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers, schemaDirectives } from './schema';
import {Express} from 'express';

export async function attachApolloServer(app: Express) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        schemaDirectives
    });
    await server.start();

    server.applyMiddleware({app});
}