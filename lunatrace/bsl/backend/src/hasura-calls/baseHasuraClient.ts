import axios from 'axios';

const axiosClient = axios.create({
  headers: { 'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'myadminsecretkey' },
});
const hasuraEndpoint = process.env.HASURA_URL || 'http://localhost:4455/api/hasura/v1/graphql';
export function callHasura(operationsDoc: string, operationName: string, variables: Record<string, any>) {
  return axiosClient.post(hasuraEndpoint, {
    query: operationsDoc,
    variables,
    operationName,
  });
}
