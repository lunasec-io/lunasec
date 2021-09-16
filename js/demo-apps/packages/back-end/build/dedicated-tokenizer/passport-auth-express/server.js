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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const configure_lunasec_1 = require("./config/configure-lunasec");
const configure_passport_1 = __importDefault(require("./config/configure-passport"));
const db_1 = require("./config/db");
const auth_router_1 = require("./routes/auth-router");
const documents_router_1 = require("./routes/documents-router");
const user_router_1 = require("./routes/user-router");
function setupDedicatedPassPortExpressApp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield configure_passport_1.default();
        yield db_1.getDb();
        const app = express_1.default();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.use(cookie_parser_1.default());
        app.use(express_session_1.default({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.authenticate('session'));
        app.use('/user', user_router_1.userRouter());
        app.use('/auth', auth_router_1.authRouter());
        app.use('/documents', documents_router_1.documentsRouter());
        // Attach the LunaSec authentication plugin
        configure_lunasec_1.lunaSec.expressAuthPlugin.register(app);
        return app;
    });
}
exports.setupDedicatedPassPortExpressApp = setupDedicatedPassPortExpressApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtYXV0aC1leHByZXNzL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBeUM7QUFDekMsc0RBQThCO0FBQzlCLHNFQUE2QztBQUM3Qyx3REFBZ0M7QUFFaEMsa0VBQXFEO0FBQ3JELHFGQUE0RDtBQUM1RCxvQ0FBb0M7QUFDcEMsc0RBQWtEO0FBQ2xELGdFQUE0RDtBQUM1RCxzREFBa0Q7QUFFbEQsU0FBc0IsZ0NBQWdDOztRQUNwRCxNQUFNLDRCQUFpQixFQUFFLENBQUM7UUFDMUIsTUFBTSxVQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztRQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV4QixHQUFHLENBQUMsR0FBRyxDQUFDLHVCQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLHdCQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLHdCQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGtDQUFlLEVBQUUsQ0FBQyxDQUFDO1FBRXpDLDJDQUEyQztRQUMzQywyQkFBTyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Q0FBQTtBQXBCRCw0RUFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZXhwcmVzc1Nlc3Npb24gZnJvbSAnZXhwcmVzcy1zZXNzaW9uJztcbmltcG9ydCBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCc7XG5cbmltcG9ydCB7IGx1bmFTZWMgfSBmcm9tICcuL2NvbmZpZy9jb25maWd1cmUtbHVuYXNlYyc7XG5pbXBvcnQgY29uZmlndXJlUGFzc3BvcnQgZnJvbSAnLi9jb25maWcvY29uZmlndXJlLXBhc3Nwb3J0JztcbmltcG9ydCB7IGdldERiIH0gZnJvbSAnLi9jb25maWcvZGInO1xuaW1wb3J0IHsgYXV0aFJvdXRlciB9IGZyb20gJy4vcm91dGVzL2F1dGgtcm91dGVyJztcbmltcG9ydCB7IGRvY3VtZW50c1JvdXRlciB9IGZyb20gJy4vcm91dGVzL2RvY3VtZW50cy1yb3V0ZXInO1xuaW1wb3J0IHsgdXNlclJvdXRlciB9IGZyb20gJy4vcm91dGVzL3VzZXItcm91dGVyJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldHVwRGVkaWNhdGVkUGFzc1BvcnRFeHByZXNzQXBwKCkge1xuICBhd2FpdCBjb25maWd1cmVQYXNzcG9ydCgpO1xuICBhd2FpdCBnZXREYigpO1xuICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbiAgYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuXG4gIGFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuICBhcHAudXNlKGV4cHJlc3NTZXNzaW9uKHsgc2VjcmV0OiAna2V5Ym9hcmQgY2F0JywgcmVzYXZlOiBmYWxzZSwgc2F2ZVVuaW5pdGlhbGl6ZWQ6IGZhbHNlIH0pKTtcbiAgYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xuICBhcHAudXNlKHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnc2Vzc2lvbicpKTtcblxuICBhcHAudXNlKCcvdXNlcicsIHVzZXJSb3V0ZXIoKSk7XG4gIGFwcC51c2UoJy9hdXRoJywgYXV0aFJvdXRlcigpKTtcbiAgYXBwLnVzZSgnL2RvY3VtZW50cycsIGRvY3VtZW50c1JvdXRlcigpKTtcblxuICAvLyBBdHRhY2ggdGhlIEx1bmFTZWMgYXV0aGVudGljYXRpb24gcGx1Z2luXG4gIGx1bmFTZWMuZXhwcmVzc0F1dGhQbHVnaW4ucmVnaXN0ZXIoYXBwKTtcbiAgcmV0dXJuIGFwcDtcbn1cbiJdfQ==