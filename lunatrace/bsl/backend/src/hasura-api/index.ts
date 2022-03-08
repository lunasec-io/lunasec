import { GraphQLClient } from 'graphql-request';

import { getSdk } from './generated';

const headers = { 'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'myadminsecretkey' };
const hasuraEndpoint = process.env.HASURA_URL || 'http://localhost:4455/api/service';

const client = new GraphQLClient(hasuraEndpoint, { headers });
export const hasura = getSdk(client);
