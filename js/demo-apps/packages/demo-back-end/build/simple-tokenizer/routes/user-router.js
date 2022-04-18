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
function userRouter(models) {
    const router = (0, express_1.Router)();
    router.use(body_parser_1.default.json());
    /* GET users listing. */
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.get('/me', (_req, res) => __awaiter(this, void 0, void 0, function* () {
        const user = yield models.user.getUser('1'); // Just get the pre-created user from the db migration
        res.json({
            success: true,
            user,
        });
    }));
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.post('/set-ssn', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Note the lack of grant checking.  There are no grants in the simple-tokenizer.  If you have the token you can get the data, simple.
            yield models.user.setSsn('1', req.body.ssn_token); // just set the ssn on our pre-created user(that was created in db migration), this is a really simple demo
        }
        catch (e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2ltcGxlLXRva2VuaXplci9yb3V0ZXMvdXNlci1yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsOERBQXFDO0FBQ3JDLHFDQUFpQztBQUlqQyxTQUFnQixVQUFVLENBQUMsTUFBYztJQUN2QyxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztJQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUU5Qix3QkFBd0I7SUFDeEIsa0VBQWtFO0lBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQU8sSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxzREFBc0Q7UUFDbkcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNQLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSTtTQUNMLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxrRUFBa0U7SUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDekMsSUFBSTtZQUNGLHNJQUFzSTtZQUN0SSxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsMkdBQTJHO1NBQy9KO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztZQUNkLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFqQ0QsZ0NBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIGJ5IEx1bmFTZWMgKG93bmVkIGJ5IFJlZmluZXJ5IExhYnMsIEluYylcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgeyBNb2RlbHMgfSBmcm9tICcuLi8uLi9jb21tb24vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZXJSb3V0ZXIobW9kZWxzOiBNb2RlbHMpIHtcbiAgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbiAgcm91dGVyLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbiAgLyogR0VUIHVzZXJzIGxpc3RpbmcuICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbWlzdXNlZC1wcm9taXNlc1xuICByb3V0ZXIuZ2V0KCcvbWUnLCBhc3luYyAoX3JlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IG1vZGVscy51c2VyLmdldFVzZXIoJzEnKTsgLy8gSnVzdCBnZXQgdGhlIHByZS1jcmVhdGVkIHVzZXIgZnJvbSB0aGUgZGIgbWlncmF0aW9uXG4gICAgcmVzLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIHVzZXIsXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbWlzdXNlZC1wcm9taXNlc1xuICByb3V0ZXIucG9zdCgnL3NldC1zc24nLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gTm90ZSB0aGUgbGFjayBvZiBncmFudCBjaGVja2luZy4gIFRoZXJlIGFyZSBubyBncmFudHMgaW4gdGhlIHNpbXBsZS10b2tlbml6ZXIuICBJZiB5b3UgaGF2ZSB0aGUgdG9rZW4geW91IGNhbiBnZXQgdGhlIGRhdGEsIHNpbXBsZS5cbiAgICAgIGF3YWl0IG1vZGVscy51c2VyLnNldFNzbignMScsIHJlcS5ib2R5LnNzbl90b2tlbik7IC8vIGp1c3Qgc2V0IHRoZSBzc24gb24gb3VyIHByZS1jcmVhdGVkIHVzZXIodGhhdCB3YXMgY3JlYXRlZCBpbiBkYiBtaWdyYXRpb24pLCB0aGlzIGlzIGEgcmVhbGx5IHNpbXBsZSBkZW1vXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiByb3V0ZXI7XG59XG4iXX0=