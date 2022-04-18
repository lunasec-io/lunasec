"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lunaSec = void 0;
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
const node_sdk_1 = require("@lunasec/node-sdk");
const auth_helpers_1 = require("./auth-helpers");
if (!process.env.TOKENIZER_URL) {
    throw new Error('Tokenizer URL env var is not set');
}
const publicTokenizerUrl = process.env.REACT_APP_TOKENIZER_URL;
exports.lunaSec = new node_sdk_1.LunaSec({
    tokenizerURL: process.env.TOKENIZER_URL,
    auth: {
        secrets: { provider: 'environment' },
        // pluginBaseUrl: '/api', This prepends the .lunasec routes with any string you wish
        // Provide a small middleware that takes in the req object and returns a promise containing a session token
        // or null if a user is not logged in.  LunaSec uses this to automatically create and verify token grants
        // and to bootstrap a session if you are using the express-auth-plugin
        sessionIdProvider: auth_helpers_1.lunaSecSessionIdProvider,
        publicTokenizerUrl,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLWx1bmFzZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVkaWNhdGVkLXRva2VuaXplci9wYXNzcG9ydC1leHByZXNzL2NvbmZpZy9jb25maWd1cmUtbHVuYXNlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxnREFBNEM7QUFFNUMsaURBQTBEO0FBRTFELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtJQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Q0FDckQ7QUFFRCxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7QUFFbEQsUUFBQSxPQUFPLEdBQUcsSUFBSSxrQkFBTyxDQUFDO0lBQ2pDLFlBQVksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWE7SUFDdkMsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTtRQUNwQyxvRkFBb0Y7UUFFcEYsMkdBQTJHO1FBQzNHLHlHQUF5RztRQUN6RyxzRUFBc0U7UUFDdEUsaUJBQWlCLEVBQUUsdUNBQXdCO1FBQzNDLGtCQUFrQjtLQUNuQjtDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBieSBMdW5hU2VjIChvd25lZCBieSBSZWZpbmVyeSBMYWJzLCBJbmMpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQgeyBMdW5hU2VjIH0gZnJvbSAnQGx1bmFzZWMvbm9kZS1zZGsnO1xuXG5pbXBvcnQgeyBsdW5hU2VjU2Vzc2lvbklkUHJvdmlkZXIgfSBmcm9tICcuL2F1dGgtaGVscGVycyc7XG5cbmlmICghcHJvY2Vzcy5lbnYuVE9LRU5JWkVSX1VSTCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1Rva2VuaXplciBVUkwgZW52IHZhciBpcyBub3Qgc2V0Jyk7XG59XG5cbmNvbnN0IHB1YmxpY1Rva2VuaXplclVybCA9IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9UT0tFTklaRVJfVVJMO1xuXG5leHBvcnQgY29uc3QgbHVuYVNlYyA9IG5ldyBMdW5hU2VjKHtcbiAgdG9rZW5pemVyVVJMOiBwcm9jZXNzLmVudi5UT0tFTklaRVJfVVJMLFxuICBhdXRoOiB7XG4gICAgc2VjcmV0czogeyBwcm92aWRlcjogJ2Vudmlyb25tZW50JyB9LFxuICAgIC8vIHBsdWdpbkJhc2VVcmw6ICcvYXBpJywgVGhpcyBwcmVwZW5kcyB0aGUgLmx1bmFzZWMgcm91dGVzIHdpdGggYW55IHN0cmluZyB5b3Ugd2lzaFxuXG4gICAgLy8gUHJvdmlkZSBhIHNtYWxsIG1pZGRsZXdhcmUgdGhhdCB0YWtlcyBpbiB0aGUgcmVxIG9iamVjdCBhbmQgcmV0dXJucyBhIHByb21pc2UgY29udGFpbmluZyBhIHNlc3Npb24gdG9rZW5cbiAgICAvLyBvciBudWxsIGlmIGEgdXNlciBpcyBub3QgbG9nZ2VkIGluLiAgTHVuYVNlYyB1c2VzIHRoaXMgdG8gYXV0b21hdGljYWxseSBjcmVhdGUgYW5kIHZlcmlmeSB0b2tlbiBncmFudHNcbiAgICAvLyBhbmQgdG8gYm9vdHN0cmFwIGEgc2Vzc2lvbiBpZiB5b3UgYXJlIHVzaW5nIHRoZSBleHByZXNzLWF1dGgtcGx1Z2luXG4gICAgc2Vzc2lvbklkUHJvdmlkZXI6IGx1bmFTZWNTZXNzaW9uSWRQcm92aWRlcixcbiAgICBwdWJsaWNUb2tlbml6ZXJVcmwsXG4gIH0sXG59KTtcbiJdfQ==