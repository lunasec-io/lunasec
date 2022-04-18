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
Object.defineProperty(exports, "__esModule", { value: true });
exports.lunaSecSessionIdProvider = exports.ensureLoggedIn = void 0;
function ensureLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    }
    return res.json({
        success: false,
        error: 'user is not logged in',
    });
}
exports.ensureLoggedIn = ensureLoggedIn;
// Tell LunaSec how to read a user identifier out of the request object.  Technically any ID will work, but the sessionId is often a good choice.
// If you'd like to allow users to use LunaSec elements without being logged in, consider generating a temporary session for them.
function lunaSecSessionIdProvider(req) {
    // LunaSec expects this to return a promise in case we need to do something async
    return new Promise((resolve) => {
        console.log(`creating LunaSec session with session id: ${req.session.id}`);
        if (req.session.id) {
            return resolve(req.session.id);
        }
        return resolve(null); // LunaSec Elements will not work in this case
    });
}
exports.lunaSecSessionIdProvider = lunaSecSessionIdProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtZXhwcmVzcy9jb25maWcvYXV0aC1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWtCQSxTQUFnQixjQUFjLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUM1RSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDWixPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDZCxPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSx1QkFBdUI7S0FDL0IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVJELHdDQVFDO0FBRUQsaUpBQWlKO0FBQ2pKLGtJQUFrSTtBQUNsSSxTQUFnQix3QkFBd0IsQ0FBQyxHQUFZO0lBQ25ELGlGQUFpRjtJQUNqRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDbEIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsOENBQThDO0lBQ3RFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVRELDREQVNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIGJ5IEx1bmFTZWMgKG93bmVkIGJ5IFJlZmluZXJ5IExhYnMsIEluYylcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUxvZ2dlZEluKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XG4gIGlmIChyZXEudXNlcikge1xuICAgIHJldHVybiBuZXh0KCk7XG4gIH1cbiAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBlcnJvcjogJ3VzZXIgaXMgbm90IGxvZ2dlZCBpbicsXG4gIH0pO1xufVxuXG4vLyBUZWxsIEx1bmFTZWMgaG93IHRvIHJlYWQgYSB1c2VyIGlkZW50aWZpZXIgb3V0IG9mIHRoZSByZXF1ZXN0IG9iamVjdC4gIFRlY2huaWNhbGx5IGFueSBJRCB3aWxsIHdvcmssIGJ1dCB0aGUgc2Vzc2lvbklkIGlzIG9mdGVuIGEgZ29vZCBjaG9pY2UuXG4vLyBJZiB5b3UnZCBsaWtlIHRvIGFsbG93IHVzZXJzIHRvIHVzZSBMdW5hU2VjIGVsZW1lbnRzIHdpdGhvdXQgYmVpbmcgbG9nZ2VkIGluLCBjb25zaWRlciBnZW5lcmF0aW5nIGEgdGVtcG9yYXJ5IHNlc3Npb24gZm9yIHRoZW0uXG5leHBvcnQgZnVuY3Rpb24gbHVuYVNlY1Nlc3Npb25JZFByb3ZpZGVyKHJlcTogUmVxdWVzdCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAvLyBMdW5hU2VjIGV4cGVjdHMgdGhpcyB0byByZXR1cm4gYSBwcm9taXNlIGluIGNhc2Ugd2UgbmVlZCB0byBkbyBzb21ldGhpbmcgYXN5bmNcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc29sZS5sb2coYGNyZWF0aW5nIEx1bmFTZWMgc2Vzc2lvbiB3aXRoIHNlc3Npb24gaWQ6ICR7cmVxLnNlc3Npb24uaWR9YCk7XG4gICAgaWYgKHJlcS5zZXNzaW9uLmlkKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShyZXEuc2Vzc2lvbi5pZCk7XG4gICAgfVxuICAgIHJldHVybiByZXNvbHZlKG51bGwpOyAvLyBMdW5hU2VjIEVsZW1lbnRzIHdpbGwgbm90IHdvcmsgaW4gdGhpcyBjYXNlXG4gIH0pO1xufVxuIl19