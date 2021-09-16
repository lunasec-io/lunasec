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
exports.userRouter = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const configure_lunasec_1 = require("../../../configure-lunasec");
const auth_helpers_1 = require("../config/auth-helpers");
const db_1 = require("../config/db");
function userRouter() {
    const router = express_1.Router();
    router.use(auth_helpers_1.ensureLoggedIn);
    router.use(body_parser_1.default.json());
    /* GET users listing. */
    router.get('/me', auth_helpers_1.ensureLoggedIn, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        if (user.ssn_token) {
            yield configure_lunasec_1.lunaSec.grants.create(req.user.id, user.ssn_token);
        }
        res.json({
            success: true,
            user,
        });
    }));
    router.post('/me', auth_helpers_1.ensureLoggedIn, (req, res) => __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            return res.json({
                success: false,
            });
        }
        const db = yield db_1.getDb();
        yield db.run('UPDATE users SET ssn_token = ? WHERE rowid = ?', [req.body.ssnToken, req.user.id]).catch((err) => {
            return res.json({
                success: false,
                error: err,
            });
        });
        return res.json({
            success: true,
        });
    }));
    return router;
}
exports.userRouter = userRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVkaWNhdGVkLXRva2VuaXplci9wYXNzcG9ydC1hdXRoLWV4cHJlc3Mvcm91dGVzL3VzZXItcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUFxQztBQUNyQyxxQ0FBaUM7QUFFakMsa0VBQXFEO0FBQ3JELHlEQUF3RDtBQUN4RCxxQ0FBcUM7QUFFckMsU0FBZ0IsVUFBVTtJQUN4QixNQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7SUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyw2QkFBYyxDQUFDLENBQUM7SUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFOUIsd0JBQXdCO0lBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLDZCQUFjLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDbkQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsTUFBTSwyQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNQLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSTtTQUNMLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSw2QkFBYyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ2IsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNkLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxNQUFNLEVBQUUsR0FBRyxNQUFNLFVBQUssRUFBRSxDQUFDO1FBQ3pCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM3RyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDWCxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztZQUNkLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUF0Q0QsZ0NBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCB7IGx1bmFTZWMgfSBmcm9tICcuLi8uLi8uLi9jb25maWd1cmUtbHVuYXNlYyc7XG5pbXBvcnQgeyBlbnN1cmVMb2dnZWRJbiB9IGZyb20gJy4uL2NvbmZpZy9hdXRoLWhlbHBlcnMnO1xuaW1wb3J0IHsgZ2V0RGIgfSBmcm9tICcuLi9jb25maWcvZGInO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlclJvdXRlcigpIHtcbiAgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbiAgcm91dGVyLnVzZShlbnN1cmVMb2dnZWRJbik7XG4gIHJvdXRlci51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG4gIC8qIEdFVCB1c2VycyBsaXN0aW5nLiAqL1xuICByb3V0ZXIuZ2V0KCcvbWUnLCBlbnN1cmVMb2dnZWRJbiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgdXNlciA9IHJlcS51c2VyO1xuICAgIGlmICh1c2VyLnNzbl90b2tlbikge1xuICAgICAgYXdhaXQgbHVuYVNlYy5ncmFudHMuY3JlYXRlKHJlcS51c2VyLmlkLCB1c2VyLnNzbl90b2tlbik7XG4gICAgfVxuICAgIHJlcy5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICB1c2VyLFxuICAgIH0pO1xuICB9KTtcblxuICByb3V0ZXIucG9zdCgnL21lJywgZW5zdXJlTG9nZ2VkSW4sIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGlmICghcmVxLnVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGIoKTtcbiAgICBhd2FpdCBkYi5ydW4oJ1VQREFURSB1c2VycyBTRVQgc3NuX3Rva2VuID0gPyBXSEVSRSByb3dpZCA9ID8nLCBbcmVxLmJvZHkuc3NuVG9rZW4sIHJlcS51c2VyLmlkXSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBlcnIsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gcm91dGVyO1xufVxuIl19