import {
  useQuery,
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import { apiRequest } from "./util";

// React Query client
const client = new QueryClient();

/**** USERS ****/

// Fetch user data
// Note: This is called automatically in `auth.js` and data is merged into `auth.user`
export function useUser(uid) {
  // Manage data fetching with React Query: https://react-query.tanstack.com/overview
  return useQuery(
    // Unique query key: https://react-query.tanstack.com/guides/query-keys
    ["user", { uid }],
    // Query function that fetches data
    () => apiRequest(`user/${uid}`),
    // Only call query function if we have a `uid`
    { enabled: !!uid }
  );
}

// Create a new user
export function createUser(uid, data) {
  return apiRequest("user", "POST", { uid, ...data });
}

// Update an existing user
export async function updateUser(uid, data) {
  const response = await apiRequest(`user/${uid}`, "PATCH", data);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["user", { uid }]);
  return response;
}

/**** ITEMS ****/
/* Example query functions (modify to your needs) */

// Fetch item data
export function useItem(id) {
  return useQuery(["item", { id }], () => apiRequest(`item/${id}`), {
    enabled: !!id,
  });
}

// Fetch item data (non-hook)
// Useful if you need to fetch data from outside of a component
export function getItem(id) {
  return apiRequest(`item/${id}`);
}

// Fetch all items by owner
export function useItemsByOwner(owner) {
  return useQuery(
    ["items", { owner }],
    () => apiRequest(`items?owner=${owner}`),
    { enabled: !!owner }
  );
}

// Create a new item
export async function createItem(data) {
  const response = await apiRequest("item", "POST", data);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["items"]);
  return response;
}

// Update an item
export async function updateItem(id, data) {
  const response = await apiRequest(`item/${id}`, "PATCH", data);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["item", { id }]),
    client.invalidateQueries(["items"]),
  ]);
  return response;
}

// Delete an item
export async function deleteItem(id) {
  const response = await apiRequest(`item/${id}`, "DELETE");
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["item", { id }]),
    client.invalidateQueries(["items"]),
  ]);
  return response;
}

// React Query context provider that wraps our app
export function QueryClientProvider(props) {
  return (
    <QueryClientProviderBase client={client}>
      {props.children}
    </QueryClientProviderBase>
  );
}
