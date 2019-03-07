import { ApolloServer } from 'apollo-server';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const GRAPHQL_PORT = process.env.PORT || 3010;
const REST_PORT = process.env.REST_PORT || 3020;
export const REST_SERVER_URL = `http://localhost:${REST_PORT}`;

const context = {
    restUrl: REST_SERVER_URL,
    isLoggedIn: false,
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
});

server.listen({
    port: GRAPHQL_PORT,
}).then( ({ url }) => {
    console.log(`graphql server url: ${url}`);
} );
