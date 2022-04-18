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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
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
const express_1 = require("express");
const auth_helpers_1 = require("../config/auth-helpers");
function authRouter(models, passport) {
    const router = (0, express_1.Router)();
    router.post('/login', (req, res, next) => {
        passport.authenticate('json', (err, user) => {
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
                    user: user,
                });
            });
        })(req, res, next);
    });
    router.get('/logout', auth_helpers_1.ensureLoggedIn, (req, res) => {
        req.logout();
        res.redirect('/');
    });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.post('/signup', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const user = yield models.user.createNewUser(body);
            return req.login(user, function (err) {
                if (err) {
                    return res.json({
                        success: false,
                        error: err,
                    });
                }
                return res.json({
                    success: true,
                    user: user,
                });
            });
        }
        catch (err) {
            return res.json({
                success: false,
                error: err,
            });
        }
    }));
    return router;
}
exports.authRouter = authRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVkaWNhdGVkLXRva2VuaXplci9wYXNzcG9ydC1leHByZXNzL3JvdXRlcy9hdXRoLXJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxxQ0FBaUM7QUFHakMseURBQXdEO0FBR3hELFNBQWdCLFVBQVUsQ0FBQyxNQUFjLEVBQUUsUUFBOEM7SUFDdkYsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7SUFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3ZDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQWtCLEVBQUUsRUFBRTtZQUN4RCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ2QsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsS0FBSyxFQUFFLEdBQUc7aUJBQ1gsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztnQkFDbEMsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNkLE9BQU8sRUFBRSxLQUFLO3dCQUNkLEtBQUssRUFBRSxHQUFHO3FCQUNYLENBQUMsQ0FBQztpQkFDSjtnQkFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ2QsT0FBTyxFQUFFLElBQUk7b0JBQ2IsSUFBSSxFQUFFLElBQUk7aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsNkJBQWMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNqRCxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDYixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsa0VBQWtFO0lBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3hDLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBOEMsQ0FBQztZQUNoRSxNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFVO2dCQUN6QyxJQUFJLEdBQUcsRUFBRTtvQkFDUCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7d0JBQ2QsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsS0FBSyxFQUFFLEdBQUc7cUJBQ1gsQ0FBQyxDQUFDO2lCQUNKO2dCQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDZCxPQUFPLEVBQUUsSUFBSTtvQkFDYixJQUFJLEVBQUUsSUFBSTtpQkFDWCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDWCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBekRELGdDQXlEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBieSBMdW5hU2VjIChvd25lZCBieSBSZWZpbmVyeSBMYWJzLCBJbmMpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcblxuaW1wb3J0IHsgTW9kZWxzIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL21vZGVscyc7XG5pbXBvcnQgeyBlbnN1cmVMb2dnZWRJbiB9IGZyb20gJy4uL2NvbmZpZy9hdXRoLWhlbHBlcnMnO1xuaW1wb3J0IHsgY29uZmlndXJlUGFzc3BvcnQgfSBmcm9tICcuLi9jb25maWcvY29uZmlndXJlLXBhc3Nwb3J0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhSb3V0ZXIobW9kZWxzOiBNb2RlbHMsIHBhc3Nwb3J0OiBSZXR1cm5UeXBlPHR5cGVvZiBjb25maWd1cmVQYXNzcG9ydD4pIHtcbiAgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbiAgcm91dGVyLnBvc3QoJy9sb2dpbicsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnanNvbicsIChlcnIsIHVzZXI6IEV4cHJlc3MuVXNlcikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcS5sb2dpbih1c2VyLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZXJyLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICB1c2VyOiB1c2VyLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKHJlcSwgcmVzLCBuZXh0KTtcbiAgfSk7XG5cbiAgcm91dGVyLmdldCgnL2xvZ291dCcsIGVuc3VyZUxvZ2dlZEluLCAocmVxLCByZXMpID0+IHtcbiAgICByZXEubG9nb3V0KCk7XG4gICAgcmVzLnJlZGlyZWN0KCcvJyk7XG4gIH0pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbWlzdXNlZC1wcm9taXNlc1xuICByb3V0ZXIucG9zdCgnL3NpZ251cCcsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBib2R5ID0gcmVxLmJvZHkgYXMgeyB1c2VybmFtZTogc3RyaW5nOyBwYXNzd29yZDogc3RyaW5nIH07XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgbW9kZWxzLnVzZXIuY3JlYXRlTmV3VXNlcihib2R5KTtcbiAgICAgIHJldHVybiByZXEubG9naW4odXNlciwgZnVuY3Rpb24gKGVycjogRXJyb3IpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgIHVzZXI6IHVzZXIsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGVycixcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJvdXRlcjtcbn1cbiJdfQ==