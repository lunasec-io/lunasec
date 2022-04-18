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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSimpleExpressApp = void 0;
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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = require("../common/database/db");
const models_1 = require("../common/models");
const configure_lunasec_1 = require("./config/configure-lunasec");
const user_router_1 = require("./routes/user-router");
function setupSimpleExpressApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)('simple-express');
        const models = (0, models_1.createModels)(db);
        const app = (0, express_1.default)();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.use((0, cors_1.default)({
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200,
            methods: ['GET', 'PUT', 'POST'],
            credentials: true,
        }));
        app.use('/user', (0, user_router_1.userRouter)(models));
        // Attach the LunaSec authentication plugin
        configure_lunasec_1.simpleTokenizerBackend.register(app);
        return app;
    });
}
exports.setupSimpleExpressApp = setupSimpleExpressApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NpbXBsZS10b2tlbml6ZXIvc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILGdEQUF3QjtBQUN4QixzREFBOEI7QUFFOUIsOENBQStDO0FBQy9DLDZDQUFnRDtBQUVoRCxrRUFBb0U7QUFDcEUsc0RBQWtEO0FBRWxELFNBQXNCLHFCQUFxQjs7UUFDekMsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFBLFdBQU0sRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sTUFBTSxHQUFHLElBQUEscUJBQVksRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztRQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV4QixHQUFHLENBQUMsR0FBRyxDQUNMLElBQUEsY0FBSSxFQUFDO1lBQ0gsTUFBTSxFQUFFLHVCQUF1QjtZQUMvQixvQkFBb0IsRUFBRSxHQUFHO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO1lBQy9CLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FDSCxDQUFDO1FBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBQSx3QkFBVSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFckMsMkNBQTJDO1FBQzNDLDBDQUFzQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Q0FBQTtBQXZCRCxzREF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgYnkgTHVuYVNlYyAob3duZWQgYnkgUmVmaW5lcnkgTGFicywgSW5jKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcblxuaW1wb3J0IHsgaW5pdERiIH0gZnJvbSAnLi4vY29tbW9uL2RhdGFiYXNlL2RiJztcbmltcG9ydCB7IGNyZWF0ZU1vZGVscyB9IGZyb20gJy4uL2NvbW1vbi9tb2RlbHMnO1xuXG5pbXBvcnQgeyBzaW1wbGVUb2tlbml6ZXJCYWNrZW5kIH0gZnJvbSAnLi9jb25maWcvY29uZmlndXJlLWx1bmFzZWMnO1xuaW1wb3J0IHsgdXNlclJvdXRlciB9IGZyb20gJy4vcm91dGVzL3VzZXItcm91dGVyJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldHVwU2ltcGxlRXhwcmVzc0FwcCgpIHtcbiAgY29uc3QgZGIgPSBhd2FpdCBpbml0RGIoJ3NpbXBsZS1leHByZXNzJyk7XG5cbiAgY29uc3QgbW9kZWxzID0gY3JlYXRlTW9kZWxzKGRiKTtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gIGFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKTtcblxuICBhcHAudXNlKFxuICAgIGNvcnMoe1xuICAgICAgb3JpZ2luOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgIG9wdGlvbnNTdWNjZXNzU3RhdHVzOiAyMDAsXG4gICAgICBtZXRob2RzOiBbJ0dFVCcsICdQVVQnLCAnUE9TVCddLFxuICAgICAgY3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSlcbiAgKTtcblxuICBhcHAudXNlKCcvdXNlcicsIHVzZXJSb3V0ZXIobW9kZWxzKSk7XG5cbiAgLy8gQXR0YWNoIHRoZSBMdW5hU2VjIGF1dGhlbnRpY2F0aW9uIHBsdWdpblxuICBzaW1wbGVUb2tlbml6ZXJCYWNrZW5kLnJlZ2lzdGVyKGFwcCk7XG4gIHJldHVybiBhcHA7XG59XG4iXX0=