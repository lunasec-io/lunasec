"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const server_1 = require("./dedicated-tokenizer/passport-express/server");
const server_2 = require("./dedicated-tokenizer/passport-graphql/server");
const server_3 = require("./simple-tokenizer/server");
void (0, server_1.setupDedicatedPassPortExpressApp)().then((app) => {
    app.listen(3001, () => {
        console.log('Dedicated PassPort Express Server running on 3001');
    });
});
void (0, server_2.setupDedicatedPassPortGraphQLApp)().then((app) => {
    app.listen(3002, () => {
        console.log('Dedicated PassPort GraphQL Server running on 3002');
    });
});
void (0, server_3.setupSimpleExpressApp)().then((app) => {
    app.listen(3003, () => {
        console.log('Simple Server running on 3003');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsbUNBQWdDO0FBQ2hDLElBQUEsZUFBTSxHQUFFLENBQUM7QUFFVCwwRUFBaUc7QUFDakcsMEVBQWlHO0FBQ2pHLHNEQUFrRTtBQUVsRSxLQUFLLElBQUEseUNBQWdDLEdBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxLQUFLLElBQUEseUNBQWdDLEdBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxLQUFLLElBQUEsOEJBQXFCLEdBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUN4QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgYnkgTHVuYVNlYyAob3duZWQgYnkgUmVmaW5lcnkgTGFicywgSW5jKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmNvbmZpZygpO1xuXG5pbXBvcnQgeyBzZXR1cERlZGljYXRlZFBhc3NQb3J0RXhwcmVzc0FwcCB9IGZyb20gJy4vZGVkaWNhdGVkLXRva2VuaXplci9wYXNzcG9ydC1leHByZXNzL3NlcnZlcic7XG5pbXBvcnQgeyBzZXR1cERlZGljYXRlZFBhc3NQb3J0R3JhcGhRTEFwcCB9IGZyb20gJy4vZGVkaWNhdGVkLXRva2VuaXplci9wYXNzcG9ydC1ncmFwaHFsL3NlcnZlcic7XG5pbXBvcnQgeyBzZXR1cFNpbXBsZUV4cHJlc3NBcHAgfSBmcm9tICcuL3NpbXBsZS10b2tlbml6ZXIvc2VydmVyJztcblxudm9pZCBzZXR1cERlZGljYXRlZFBhc3NQb3J0RXhwcmVzc0FwcCgpLnRoZW4oKGFwcCkgPT4ge1xuICBhcHAubGlzdGVuKDMwMDEsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnRGVkaWNhdGVkIFBhc3NQb3J0IEV4cHJlc3MgU2VydmVyIHJ1bm5pbmcgb24gMzAwMScpO1xuICB9KTtcbn0pO1xuXG52b2lkIHNldHVwRGVkaWNhdGVkUGFzc1BvcnRHcmFwaFFMQXBwKCkudGhlbigoYXBwKSA9PiB7XG4gIGFwcC5saXN0ZW4oMzAwMiwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdEZWRpY2F0ZWQgUGFzc1BvcnQgR3JhcGhRTCBTZXJ2ZXIgcnVubmluZyBvbiAzMDAyJyk7XG4gIH0pO1xufSk7XG5cbnZvaWQgc2V0dXBTaW1wbGVFeHByZXNzQXBwKCkudGhlbigoYXBwKSA9PiB7XG4gIGFwcC5saXN0ZW4oMzAwMywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdTaW1wbGUgU2VydmVyIHJ1bm5pbmcgb24gMzAwMycpO1xuICB9KTtcbn0pO1xuIl19