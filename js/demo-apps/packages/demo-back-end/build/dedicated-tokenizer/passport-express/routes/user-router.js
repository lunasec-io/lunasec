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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const auth_helpers_1 = require("../config/auth-helpers");
const configure_lunasec_1 = require("../config/configure-lunasec");
function userRouter(models) {
    const router = (0, express_1.Router)();
    router.use(body_parser_1.default.json());
    /* GET users listing. */
    router.get('/me', auth_helpers_1.ensureLoggedIn, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        if (!user) {
            throw new Error('user null');
        }
        if (user.ssn_token) {
            console.log(`creating grant for token ${user.ssn_token} with session id ${req.session.id}`);
            yield configure_lunasec_1.lunaSec.grants.create(req.session.id, user.ssn_token);
        }
        res.json({
            success: true,
            user,
        });
    }));
    router.post('/set-ssn', auth_helpers_1.ensureLoggedIn, (req, res) => __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            return res.json({
                success: false,
                error: 'User not logged in',
            });
        }
        const body = req.body;
        if (!('ssn_token' in body) || typeof body.ssn_token !== 'string') {
            return res.json({
                success: false,
                error: 'bad body',
            });
        }
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            yield configure_lunasec_1.lunaSec.grants.verify(req.session.id, body.ssn_token);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            yield models.user.setSsn(req.user.id, body.ssn_token);
        }
        catch (e) {
            console.error(e);
            return res.json({
                success: false,
                error: e,
            });
        }
        return res.json({
            success: true,
        });
    }));
    return router;
}
exports.userRouter = userRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVkaWNhdGVkLXRva2VuaXplci9wYXNzcG9ydC1leHByZXNzL3JvdXRlcy91c2VyLXJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCw4REFBcUM7QUFDckMscUNBQWlDO0FBR2pDLHlEQUF3RDtBQUN4RCxtRUFBc0Q7QUFFdEQsU0FBZ0IsVUFBVSxDQUFDLE1BQWM7SUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7SUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFOUIsd0JBQXdCO0lBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLDZCQUFjLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDbkQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM5QjtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixJQUFJLENBQUMsU0FBUyxvQkFBb0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVGLE1BQU0sMkJBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM3RDtRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDUCxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUk7U0FDTCxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsNkJBQWMsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN6RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNiLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDZCxPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsb0JBQW9CO2FBQzVCLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUNoRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLFVBQVU7YUFDbEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJO1lBQ0YsaUVBQWlFO1lBQ2pFLE1BQU0sMkJBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1RCxpRUFBaUU7WUFDakUsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdkQ7UUFBQyxPQUFPLENBQVUsRUFBRTtZQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDZCxPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ2QsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQXhERCxnQ0F3REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgYnkgTHVuYVNlYyAob3duZWQgYnkgUmVmaW5lcnkgTGFicywgSW5jKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCB7IE1vZGVscyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tb2RlbHMnO1xuaW1wb3J0IHsgZW5zdXJlTG9nZ2VkSW4gfSBmcm9tICcuLi9jb25maWcvYXV0aC1oZWxwZXJzJztcbmltcG9ydCB7IGx1bmFTZWMgfSBmcm9tICcuLi9jb25maWcvY29uZmlndXJlLWx1bmFzZWMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlclJvdXRlcihtb2RlbHM6IE1vZGVscykge1xuICBjb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuICByb3V0ZXIudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuICAvKiBHRVQgdXNlcnMgbGlzdGluZy4gKi9cbiAgcm91dGVyLmdldCgnL21lJywgZW5zdXJlTG9nZ2VkSW4sIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSByZXEudXNlcjtcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndXNlciBudWxsJyk7XG4gICAgfVxuICAgIGlmICh1c2VyLnNzbl90b2tlbikge1xuICAgICAgY29uc29sZS5sb2coYGNyZWF0aW5nIGdyYW50IGZvciB0b2tlbiAke3VzZXIuc3NuX3Rva2VufSB3aXRoIHNlc3Npb24gaWQgJHtyZXEuc2Vzc2lvbi5pZH1gKTtcbiAgICAgIGF3YWl0IGx1bmFTZWMuZ3JhbnRzLmNyZWF0ZShyZXEuc2Vzc2lvbi5pZCwgdXNlci5zc25fdG9rZW4pO1xuICAgIH1cbiAgICByZXMuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdXNlcixcbiAgICB9KTtcbiAgfSk7XG5cbiAgcm91dGVyLnBvc3QoJy9zZXQtc3NuJywgZW5zdXJlTG9nZ2VkSW4sIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGlmICghcmVxLnVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogJ1VzZXIgbm90IGxvZ2dlZCBpbicsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBib2R5ID0gcmVxLmJvZHk7XG4gICAgaWYgKCEoJ3Nzbl90b2tlbicgaW4gYm9keSkgfHwgdHlwZW9mIGJvZHkuc3NuX3Rva2VuICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnYmFkIGJvZHknLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG4gICAgICBhd2FpdCBsdW5hU2VjLmdyYW50cy52ZXJpZnkocmVxLnNlc3Npb24uaWQsIGJvZHkuc3NuX3Rva2VuKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG4gICAgICBhd2FpdCBtb2RlbHMudXNlci5zZXRTc24ocmVxLnVzZXIuaWQsIGJvZHkuc3NuX3Rva2VuKTtcbiAgICB9IGNhdGNoIChlOiB1bmtub3duKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiByb3V0ZXI7XG59XG4iXX0=