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
exports.authRouter = void 0;
const crypto_1 = __importDefault(require("crypto"));
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const db_1 = require("../config/db");
function authRouter() {
    const router = express_1.Router();
    router.post('/login', (req, res, next) => {
        passport_1.default.authenticate('json', (err, user) => {
            if (err) {
                return res.json({
                    success: false,
                    error: err,
                });
            }
            return req.login(user, function (err) {
                if (err) {
                    return res.json({
                        success: false,
                        error: err,
                    });
                }
                return res.json({
                    success: true,
                });
            });
        })(req, res, next);
    });
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    router.post('/signup', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const db = yield db_1.getDb();
        const salt = crypto_1.default.randomBytes(16);
        crypto_1.default.pbkdf2(req.body.password, salt, 10000, 32, 'sha256', function (err, hashedPassword) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.json({
                        success: false,
                        error: err,
                    });
                }
                return db
                    .run('INSERT INTO users (username, hashed_password, salt, display_name) VALUES (?, ?, ?, ?)', [
                    req.body.username,
                    hashedPassword,
                    salt,
                    req.body.display_name,
                ])
                    .then((result) => {
                    if (!result.lastID) {
                        throw new Error('db error');
                    }
                    const user = {
                        id: result.lastID.toString(),
                        username: req.body.username,
                        display_name: req.body.name,
                    };
                    return req.login(user, function (err) {
                        if (err) {
                            return res.json({
                                success: false,
                                error: err,
                            });
                        }
                        return res.json({
                            success: true,
                        });
                    });
                })
                    .catch((err) => {
                    return res.json({
                        success: false,
                        error: err,
                    });
                });
            });
        });
    }));
    return router;
}
exports.authRouter = authRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVkaWNhdGVkLXRva2VuaXplci9wYXNzcG9ydC1hdXRoLWV4cHJlc3Mvcm91dGVzL2F1dGgtcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUU1QixxQ0FBaUM7QUFDakMsd0RBQWdDO0FBRWhDLHFDQUFxQztBQUVyQyxTQUFnQixVQUFVO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztJQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdkMsa0JBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzFDLElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDZCxPQUFPLEVBQUUsS0FBSztvQkFDZCxLQUFLLEVBQUUsR0FBRztpQkFDWCxDQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO2dCQUNsQyxJQUFJLEdBQUcsRUFBRTtvQkFDUCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7d0JBQ2QsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsS0FBSyxFQUFFLEdBQUc7cUJBQ1gsQ0FBQyxDQUFDO2lCQUNKO2dCQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO1FBQ3RDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN4QyxNQUFNLEVBQUUsR0FBRyxNQUFNLFVBQUssRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLGdCQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFnQixHQUFHLEVBQUUsY0FBYzs7Z0JBQzdGLElBQUksR0FBRyxFQUFFO29CQUNQLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDZCxPQUFPLEVBQUUsS0FBSzt3QkFDZCxLQUFLLEVBQUUsR0FBRztxQkFDWCxDQUFDLENBQUM7aUJBQ0o7Z0JBRUQsT0FBTyxFQUFFO3FCQUNOLEdBQUcsQ0FBQyx1RkFBdUYsRUFBRTtvQkFDNUYsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO29CQUNqQixjQUFjO29CQUNkLElBQUk7b0JBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZO2lCQUN0QixDQUFDO3FCQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO3dCQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUM3QjtvQkFDRCxNQUFNLElBQUksR0FBRzt3QkFDWCxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7d0JBQzVCLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7d0JBQzNCLFlBQVksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7cUJBQzVCLENBQUM7b0JBQ0YsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLEdBQVU7d0JBQ3pDLElBQUksR0FBRyxFQUFFOzRCQUNQLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztnQ0FDZCxPQUFPLEVBQUUsS0FBSztnQ0FDZCxLQUFLLEVBQUUsR0FBRzs2QkFDWCxDQUFDLENBQUM7eUJBQ0o7d0JBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDOzRCQUNkLE9BQU8sRUFBRSxJQUFJO3lCQUNkLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2IsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNkLE9BQU8sRUFBRSxLQUFLO3dCQUNkLEtBQUssRUFBRSxHQUFHO3FCQUNYLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7U0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQS9FRCxnQ0ErRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5cbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHBhc3Nwb3J0IGZyb20gJ3Bhc3Nwb3J0JztcblxuaW1wb3J0IHsgZ2V0RGIgfSBmcm9tICcuLi9jb25maWcvZGInO1xuXG5leHBvcnQgZnVuY3Rpb24gYXV0aFJvdXRlcigpIHtcbiAgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbiAgcm91dGVyLnBvc3QoJy9sb2dpbicsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnanNvbicsIChlcnIsIHVzZXIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZXJyLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXEubG9naW4odXNlciwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGVycixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSkocmVxLCByZXMsIG5leHQpO1xuICB9KTtcblxuICByb3V0ZXIuZ2V0KCcvbG9nb3V0JywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgcmVxLmxvZ291dCgpO1xuICAgIHJlcy5yZWRpcmVjdCgnLycpO1xuICB9KTtcblxuICByb3V0ZXIucG9zdCgnL3NpZ251cCcsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGIoKTtcbiAgICBjb25zdCBzYWx0ID0gY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KTtcbiAgICBjcnlwdG8ucGJrZGYyKHJlcS5ib2R5LnBhc3N3b3JkLCBzYWx0LCAxMDAwMCwgMzIsICdzaGEyNTYnLCBhc3luYyBmdW5jdGlvbiAoZXJyLCBoYXNoZWRQYXNzd29yZCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGJcbiAgICAgICAgLnJ1bignSU5TRVJUIElOVE8gdXNlcnMgKHVzZXJuYW1lLCBoYXNoZWRfcGFzc3dvcmQsIHNhbHQsIGRpc3BsYXlfbmFtZSkgVkFMVUVTICg/LCA/LCA/LCA/KScsIFtcbiAgICAgICAgICByZXEuYm9keS51c2VybmFtZSxcbiAgICAgICAgICBoYXNoZWRQYXNzd29yZCxcbiAgICAgICAgICBzYWx0LFxuICAgICAgICAgIHJlcS5ib2R5LmRpc3BsYXlfbmFtZSxcbiAgICAgICAgXSlcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0Lmxhc3RJRCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYiBlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB1c2VyID0ge1xuICAgICAgICAgICAgaWQ6IHJlc3VsdC5sYXN0SUQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHVzZXJuYW1lOiByZXEuYm9keS51c2VybmFtZSxcbiAgICAgICAgICAgIGRpc3BsYXlfbmFtZTogcmVxLmJvZHkubmFtZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiByZXEubG9naW4odXNlciwgZnVuY3Rpb24gKGVycjogRXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJvdXRlcjtcbn1cbiJdfQ==