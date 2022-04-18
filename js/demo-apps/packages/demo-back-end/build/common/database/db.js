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
exports.initDb = void 0;
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
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
sqlite3_1.default.verbose();
function initDb(dbName) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, sqlite_1.open)({
            filename: `db.${dbName}.sqlite3`,
            driver: sqlite3_1.default.Database,
        });
        yield db.migrate({
            force: false,
            migrationsPath: __dirname + '/migrations',
        });
        return db;
    });
}
exports.initDb = initDb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2RhdGFiYXNlL2RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILG1DQUF3QztBQUN4QyxzREFBOEI7QUFDOUIsaUJBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUlsQixTQUFzQixNQUFNLENBQUMsTUFBYzs7UUFDekMsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFBLGFBQUksRUFBQztZQUNwQixRQUFRLEVBQUUsTUFBTSxNQUFNLFVBQVU7WUFDaEMsTUFBTSxFQUFFLGlCQUFPLENBQUMsUUFBUTtTQUN6QixDQUFDLENBQUM7UUFDSCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDZixLQUFLLEVBQUUsS0FBSztZQUNaLGNBQWMsRUFBRSxTQUFTLEdBQUcsYUFBYTtTQUMxQyxDQUFDLENBQUM7UUFDSCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Q0FBQTtBQVZELHdCQVVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIGJ5IEx1bmFTZWMgKG93bmVkIGJ5IFJlZmluZXJ5IExhYnMsIEluYylcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7IERhdGFiYXNlLCBvcGVuIH0gZnJvbSAnc3FsaXRlJztcbmltcG9ydCBzcWxpdGUzIGZyb20gJ3NxbGl0ZTMnO1xuc3FsaXRlMy52ZXJib3NlKCk7XG5cbmV4cG9ydCB0eXBlIERiVHlwZSA9IERhdGFiYXNlPHNxbGl0ZTMuRGF0YWJhc2UsIHNxbGl0ZTMuU3RhdGVtZW50PjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXREYihkYk5hbWU6IHN0cmluZyk6IFByb21pc2U8RGJUeXBlPiB7XG4gIGNvbnN0IGRiID0gYXdhaXQgb3Blbih7XG4gICAgZmlsZW5hbWU6IGBkYi4ke2RiTmFtZX0uc3FsaXRlM2AsXG4gICAgZHJpdmVyOiBzcWxpdGUzLkRhdGFiYXNlLFxuICB9KTtcbiAgYXdhaXQgZGIubWlncmF0ZSh7XG4gICAgZm9yY2U6IGZhbHNlLCAvLyBmb3JjZSByZW1pZ3JhdGUgaWYgdHJ1ZS4gIFlvdSBzaG91bGQgdXN1YWxseSBqdXN0IGRlbGV0ZSB0aGUgZGIgZmlsZSBpbnN0ZWFkIHRvIHdpcGUgZGJcbiAgICBtaWdyYXRpb25zUGF0aDogX19kaXJuYW1lICsgJy9taWdyYXRpb25zJyxcbiAgfSk7XG4gIHJldHVybiBkYjtcbn1cbiJdfQ==