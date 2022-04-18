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
exports.setupDedicatedPassPortGraphQLApp = void 0;
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
// eslint-disable-next-line import/order
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const db_1 = require("../../common/database/db");
const sessions_1 = require("../../common/database/sessions");
const models_1 = require("../../common/models");
const configure_lunasec_1 = require("./config/configure-lunasec");
const configure_passport_1 = __importDefault(require("./config/configure-passport"));
const graphql_apollo_server_1 = require("./graphql/graphql-apollo-server");
// eslint-disable-next-line import/order
const cors_1 = __importDefault(require("cors"));
// eslint-disable-next-line import/order
const cookie_parser_1 = __importDefault(require("cookie-parser"));
function setupDedicatedPassPortGraphQLApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)('dedicated-passport-graphql');
        const models = (0, models_1.createModels)(db);
        const passport = (0, configure_passport_1.default)(models);
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(
        // This needs to be set both here AND when graphql is initialized in order for passport to work
        (0, cors_1.default)({
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200,
            methods: ['GET', 'PUT', 'POST'],
            credentials: true,
        }));
        app.use((0, cookie_parser_1.default)());
        app.set('trust proxy', 1);
        app.use((req, _res, next) => {
            req.headers['x-forwarded-proto'] = 'https';
            next();
        });
        app.use((0, express_session_1.default)({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            store: new sessions_1.SQLiteStore({
                db: 'sessions.sqlite3',
                table: 'sessions',
                secret: 'keyboard cat',
            }),
            cookie: {
                secure: true,
                httpOnly: true,
                sameSite: 'none',
            },
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(passport.authenticate('session'));
        // Attach the LunaSec authentication plugin
        configure_lunasec_1.lunaSec.expressAuthPlugin.register(app);
        yield (0, graphql_apollo_server_1.attachApolloServer)(app, models);
        return app;
    });
}
exports.setupDedicatedPassPortGraphQLApp = setupDedicatedPassPortGraphQLApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtZ3JhcGhxbC9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsd0NBQXdDO0FBQ3hDLG1DQUFnQztBQUNoQyxJQUFBLGVBQU0sR0FBRSxDQUFDO0FBRVQsc0RBQTJDO0FBQzNDLHNFQUE2QztBQUU3QyxpREFBa0Q7QUFDbEQsNkRBQTZEO0FBQzdELGdEQUFtRDtBQUVuRCxrRUFBcUQ7QUFDckQscUZBQTREO0FBQzVELDJFQUFxRTtBQUVyRSx3Q0FBd0M7QUFDeEMsZ0RBQXdCO0FBQ3hCLHdDQUF3QztBQUN4QyxrRUFBeUM7QUFFekMsU0FBc0IsZ0NBQWdDOztRQUNwRCxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsV0FBTSxFQUFDLDRCQUE0QixDQUFDLENBQUM7UUFFdEQsTUFBTSxNQUFNLEdBQUcsSUFBQSxxQkFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUEsNEJBQWlCLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7UUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEIsR0FBRyxDQUFDLEdBQUc7UUFDTCwrRkFBK0Y7UUFDL0YsSUFBQSxjQUFJLEVBQUM7WUFDSCxNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLG9CQUFvQixFQUFFLEdBQUc7WUFDekIsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDL0IsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUNILENBQUM7UUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsdUJBQVksR0FBRSxDQUFDLENBQUM7UUFFeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDMUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUMzQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FDTCxJQUFBLHlCQUFjLEVBQUM7WUFDYixNQUFNLEVBQUUsY0FBYztZQUN0QixNQUFNLEVBQUUsS0FBSztZQUNiLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsS0FBSyxFQUFFLElBQUksc0JBQVcsQ0FBQztnQkFDckIsRUFBRSxFQUFFLGtCQUFrQjtnQkFDdEIsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLE1BQU0sRUFBRSxjQUFjO2FBQ3ZCLENBQUM7WUFDRixNQUFNLEVBQUU7Z0JBQ04sTUFBTSxFQUFFLElBQUk7Z0JBQ1osUUFBUSxFQUFFLElBQUk7Z0JBQ2QsUUFBUSxFQUFFLE1BQU07YUFDakI7U0FDRixDQUFDLENBQ0gsQ0FBQztRQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUUxQywyQ0FBMkM7UUFDM0MsMkJBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEMsTUFBTSxJQUFBLDBDQUFrQixFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Q0FBQTtBQXBERCw0RUFvREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgYnkgTHVuYVNlYyAob3duZWQgYnkgUmVmaW5lcnkgTGFicywgSW5jKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9vcmRlclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcbmNvbmZpZygpO1xuXG5pbXBvcnQgZXhwcmVzcywgeyBFeHByZXNzIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZXhwcmVzc1Nlc3Npb24gZnJvbSAnZXhwcmVzcy1zZXNzaW9uJztcblxuaW1wb3J0IHsgaW5pdERiIH0gZnJvbSAnLi4vLi4vY29tbW9uL2RhdGFiYXNlL2RiJztcbmltcG9ydCB7IFNRTGl0ZVN0b3JlIH0gZnJvbSAnLi4vLi4vY29tbW9uL2RhdGFiYXNlL3Nlc3Npb25zJztcbmltcG9ydCB7IGNyZWF0ZU1vZGVscyB9IGZyb20gJy4uLy4uL2NvbW1vbi9tb2RlbHMnO1xuXG5pbXBvcnQgeyBsdW5hU2VjIH0gZnJvbSAnLi9jb25maWcvY29uZmlndXJlLWx1bmFzZWMnO1xuaW1wb3J0IGNvbmZpZ3VyZVBhc3Nwb3J0IGZyb20gJy4vY29uZmlnL2NvbmZpZ3VyZS1wYXNzcG9ydCc7XG5pbXBvcnQgeyBhdHRhY2hBcG9sbG9TZXJ2ZXIgfSBmcm9tICcuL2dyYXBocWwvZ3JhcGhxbC1hcG9sbG8tc2VydmVyJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9vcmRlclxuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L29yZGVyXG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0dXBEZWRpY2F0ZWRQYXNzUG9ydEdyYXBoUUxBcHAoKTogUHJvbWlzZTxFeHByZXNzPiB7XG4gIGNvbnN0IGRiID0gYXdhaXQgaW5pdERiKCdkZWRpY2F0ZWQtcGFzc3BvcnQtZ3JhcGhxbCcpO1xuXG4gIGNvbnN0IG1vZGVscyA9IGNyZWF0ZU1vZGVscyhkYik7XG4gIGNvbnN0IHBhc3Nwb3J0ID0gY29uZmlndXJlUGFzc3BvcnQobW9kZWxzKTtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuICBhcHAudXNlKFxuICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgc2V0IGJvdGggaGVyZSBBTkQgd2hlbiBncmFwaHFsIGlzIGluaXRpYWxpemVkIGluIG9yZGVyIGZvciBwYXNzcG9ydCB0byB3b3JrXG4gICAgY29ycyh7XG4gICAgICBvcmlnaW46ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgb3B0aW9uc1N1Y2Nlc3NTdGF0dXM6IDIwMCxcbiAgICAgIG1ldGhvZHM6IFsnR0VUJywgJ1BVVCcsICdQT1NUJ10sXG4gICAgICBjcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KVxuICApO1xuICBhcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcblxuICBhcHAuc2V0KCd0cnVzdCBwcm94eScsIDEpO1xuICBhcHAudXNlKChyZXEsIF9yZXMsIG5leHQpID0+IHtcbiAgICByZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtcHJvdG8nXSA9ICdodHRwcyc7XG4gICAgbmV4dCgpO1xuICB9KTtcblxuICBhcHAudXNlKFxuICAgIGV4cHJlc3NTZXNzaW9uKHtcbiAgICAgIHNlY3JldDogJ2tleWJvYXJkIGNhdCcsXG4gICAgICByZXNhdmU6IGZhbHNlLFxuICAgICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgICAgc3RvcmU6IG5ldyBTUUxpdGVTdG9yZSh7XG4gICAgICAgIGRiOiAnc2Vzc2lvbnMuc3FsaXRlMycsXG4gICAgICAgIHRhYmxlOiAnc2Vzc2lvbnMnLFxuICAgICAgICBzZWNyZXQ6ICdrZXlib2FyZCBjYXQnLFxuICAgICAgfSksXG4gICAgICBjb29raWU6IHtcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAgc2FtZVNpdGU6ICdub25lJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgKTtcblxuICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gIGFwcC51c2UocGFzc3BvcnQuc2Vzc2lvbigpKTtcbiAgYXBwLnVzZShwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ3Nlc3Npb24nKSk7XG5cbiAgLy8gQXR0YWNoIHRoZSBMdW5hU2VjIGF1dGhlbnRpY2F0aW9uIHBsdWdpblxuICBsdW5hU2VjLmV4cHJlc3NBdXRoUGx1Z2luLnJlZ2lzdGVyKGFwcCk7XG5cbiAgYXdhaXQgYXR0YWNoQXBvbGxvU2VydmVyKGFwcCwgbW9kZWxzKTtcbiAgcmV0dXJuIGFwcDtcbn1cbiJdfQ==