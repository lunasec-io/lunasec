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
exports.setupDedicatedPassPortExpressApp = void 0;
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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const db_1 = require("../../common/database/db");
const sessions_1 = require("../../common/database/sessions");
const models_1 = require("../../common/models");
const configure_lunasec_1 = require("./config/configure-lunasec");
const configure_passport_1 = require("./config/configure-passport");
const auth_router_1 = require("./routes/auth-router");
const documents_router_1 = require("./routes/documents-router");
const user_router_1 = require("./routes/user-router");
function setupDedicatedPassPortExpressApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDb)('dedicated-passport-express');
        const models = (0, models_1.createModels)(db);
        const passport = (0, configure_passport_1.configurePassport)(models);
        const app = (0, express_1.default)();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use((0, cors_1.default)({
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200,
            methods: ['GET', 'PUT', 'POST'],
            credentials: true,
        }));
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
        app.use('/user', (0, user_router_1.userRouter)(models));
        app.use('/auth', (0, auth_router_1.authRouter)(models, passport));
        app.use('/documents', (0, documents_router_1.documentsRouter)(models));
        // Attach the LunaSec authentication plugin
        configure_lunasec_1.lunaSec.expressAuthPlugin.register(app);
        // todo: add an error handler
        return app;
    });
}
exports.setupDedicatedPassPortExpressApp = setupDedicatedPassPortExpressApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtZXhwcmVzcy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsa0VBQXlDO0FBQ3pDLGdEQUF3QjtBQUN4QixzREFBOEI7QUFDOUIsc0VBQTZDO0FBRTdDLGlEQUFrRDtBQUNsRCw2REFBNkQ7QUFDN0QsZ0RBQW1EO0FBRW5ELGtFQUFxRDtBQUNyRCxvRUFBZ0U7QUFDaEUsc0RBQWtEO0FBQ2xELGdFQUE0RDtBQUM1RCxzREFBa0Q7QUFFbEQsU0FBc0IsZ0NBQWdDOztRQUNwRCxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsV0FBTSxFQUFDLDRCQUE0QixDQUFDLENBQUM7UUFFdEQsTUFBTSxNQUFNLEdBQUcsSUFBQSxxQkFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUEsc0NBQWlCLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0MsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7UUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLHVCQUFZLEdBQUUsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQ0wsSUFBQSxjQUFJLEVBQUM7WUFDSCxNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLG9CQUFvQixFQUFFLEdBQUc7WUFDekIsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDL0IsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUNILENBQUM7UUFFRixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUMxQixHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQzNDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsR0FBRyxDQUNMLElBQUEseUJBQWMsRUFBQztZQUNiLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixLQUFLLEVBQUUsSUFBSSxzQkFBVyxDQUFDO2dCQUNyQixFQUFFLEVBQUUsa0JBQWtCO2dCQUN0QixLQUFLLEVBQUUsVUFBVTtnQkFDakIsTUFBTSxFQUFFLGNBQWM7YUFDdkIsQ0FBQztZQUNGLE1BQU0sRUFBRTtnQkFDTixNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLEVBQUUsSUFBSTtnQkFDZCxRQUFRLEVBQUUsTUFBTTthQUNqQjtTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUEsd0JBQVUsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUEsd0JBQVUsRUFBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFBLGtDQUFlLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUUvQywyQ0FBMkM7UUFDM0MsMkJBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsNkJBQTZCO1FBQzdCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUFBO0FBekRELDRFQXlEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBieSBMdW5hU2VjIChvd25lZCBieSBSZWZpbmVyeSBMYWJzLCBJbmMpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBleHByZXNzU2Vzc2lvbiBmcm9tICdleHByZXNzLXNlc3Npb24nO1xuXG5pbXBvcnQgeyBpbml0RGIgfSBmcm9tICcuLi8uLi9jb21tb24vZGF0YWJhc2UvZGInO1xuaW1wb3J0IHsgU1FMaXRlU3RvcmUgfSBmcm9tICcuLi8uLi9jb21tb24vZGF0YWJhc2Uvc2Vzc2lvbnMnO1xuaW1wb3J0IHsgY3JlYXRlTW9kZWxzIH0gZnJvbSAnLi4vLi4vY29tbW9uL21vZGVscyc7XG5cbmltcG9ydCB7IGx1bmFTZWMgfSBmcm9tICcuL2NvbmZpZy9jb25maWd1cmUtbHVuYXNlYyc7XG5pbXBvcnQgeyBjb25maWd1cmVQYXNzcG9ydCB9IGZyb20gJy4vY29uZmlnL2NvbmZpZ3VyZS1wYXNzcG9ydCc7XG5pbXBvcnQgeyBhdXRoUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXMvYXV0aC1yb3V0ZXInO1xuaW1wb3J0IHsgZG9jdW1lbnRzUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXMvZG9jdW1lbnRzLXJvdXRlcic7XG5pbXBvcnQgeyB1c2VyUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXMvdXNlci1yb3V0ZXInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0dXBEZWRpY2F0ZWRQYXNzUG9ydEV4cHJlc3NBcHAoKSB7XG4gIGNvbnN0IGRiID0gYXdhaXQgaW5pdERiKCdkZWRpY2F0ZWQtcGFzc3BvcnQtZXhwcmVzcycpO1xuXG4gIGNvbnN0IG1vZGVscyA9IGNyZWF0ZU1vZGVscyhkYik7XG4gIGNvbnN0IHBhc3Nwb3J0ID0gY29uZmlndXJlUGFzc3BvcnQobW9kZWxzKTtcblxuICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbiAgYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuXG4gIGFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuICBhcHAudXNlKFxuICAgIGNvcnMoe1xuICAgICAgb3JpZ2luOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgIG9wdGlvbnNTdWNjZXNzU3RhdHVzOiAyMDAsXG4gICAgICBtZXRob2RzOiBbJ0dFVCcsICdQVVQnLCAnUE9TVCddLFxuICAgICAgY3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSlcbiAgKTtcblxuICBhcHAuc2V0KCd0cnVzdCBwcm94eScsIDEpO1xuICBhcHAudXNlKChyZXEsIF9yZXMsIG5leHQpID0+IHtcbiAgICByZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtcHJvdG8nXSA9ICdodHRwcyc7XG4gICAgbmV4dCgpO1xuICB9KTtcblxuICBhcHAudXNlKFxuICAgIGV4cHJlc3NTZXNzaW9uKHtcbiAgICAgIHNlY3JldDogJ2tleWJvYXJkIGNhdCcsXG4gICAgICByZXNhdmU6IGZhbHNlLFxuICAgICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgICAgc3RvcmU6IG5ldyBTUUxpdGVTdG9yZSh7XG4gICAgICAgIGRiOiAnc2Vzc2lvbnMuc3FsaXRlMycsXG4gICAgICAgIHRhYmxlOiAnc2Vzc2lvbnMnLFxuICAgICAgICBzZWNyZXQ6ICdrZXlib2FyZCBjYXQnLFxuICAgICAgfSksXG4gICAgICBjb29raWU6IHtcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAgc2FtZVNpdGU6ICdub25lJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgKTtcblxuICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gIGFwcC51c2UocGFzc3BvcnQuc2Vzc2lvbigpKTtcbiAgYXBwLnVzZShwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ3Nlc3Npb24nKSk7XG5cbiAgYXBwLnVzZSgnL3VzZXInLCB1c2VyUm91dGVyKG1vZGVscykpO1xuICBhcHAudXNlKCcvYXV0aCcsIGF1dGhSb3V0ZXIobW9kZWxzLCBwYXNzcG9ydCkpO1xuICBhcHAudXNlKCcvZG9jdW1lbnRzJywgZG9jdW1lbnRzUm91dGVyKG1vZGVscykpO1xuXG4gIC8vIEF0dGFjaCB0aGUgTHVuYVNlYyBhdXRoZW50aWNhdGlvbiBwbHVnaW5cbiAgbHVuYVNlYy5leHByZXNzQXV0aFBsdWdpbi5yZWdpc3RlcihhcHApO1xuICAvLyB0b2RvOiBhZGQgYW4gZXJyb3IgaGFuZGxlclxuICByZXR1cm4gYXBwO1xufVxuIl19