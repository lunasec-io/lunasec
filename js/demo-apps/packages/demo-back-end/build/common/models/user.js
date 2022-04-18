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
exports.UserMethods = void 0;
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
const crypto_1 = __importDefault(require("crypto"));
class UserMethods {
    constructor(db) {
        this.db = db;
    }
    setSsn(id, ssnToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('UPDATE users SET ssn_token = ? WHERE rowid = ?', [ssnToken, id]);
            return;
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.db.get('SELECT rowid AS id, username, ssn_token FROM users WHERE rowid = ?', [
                id,
            ]);
            if (!row) {
                return null;
            }
            return Object.assign(Object.assign({}, row), { id: row.id.toString() });
        });
    }
    // just used for login with passport
    getUserWithPasswordHash(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [username]);
        });
    }
    createNewUser(userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            const salt = crypto_1.default.randomBytes(16);
            return new Promise((resolve) => {
                crypto_1.default.pbkdf2(userFields.password, salt, 10000, 32, 'sha256', function (err, hashedPassword) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            throw err;
                        }
                        const insertedUser = yield db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
                            userFields.username,
                            hashedPassword,
                            salt,
                        ]);
                        if (!insertedUser.lastID) {
                            throw new Error('db error');
                        }
                        resolve({
                            id: insertedUser.lastID.toString(),
                            username: userFields.username,
                        });
                    });
                });
            });
        });
    }
}
exports.UserMethods = UserMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vbW9kZWxzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsb0RBQTRCO0FBZ0I1QixNQUFhLFdBQVc7SUFHdEIsWUFBWSxFQUFpRDtRQUMzRCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFSyxNQUFNLENBQUMsRUFBVSxFQUFFLFFBQWdCOztZQUN2QyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEYsT0FBTztRQUNULENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxFQUFVOztZQUN0QixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFZLG9FQUFvRSxFQUFFO2dCQUM3RyxFQUFFO2FBQ0gsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUixPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsdUNBQ0ssR0FBRyxLQUNOLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUNyQjtRQUNKLENBQUM7S0FBQTtJQUVELG9DQUFvQztJQUM5Qix1QkFBdUIsQ0FBQyxRQUFnQjs7WUFDNUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBdUIscURBQXFELEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzlHLENBQUM7S0FBQTtJQUVLLGFBQWEsQ0FBQyxVQUFrRDs7WUFDcEUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzdCLGdCQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQWdCLEdBQUcsRUFBRSxjQUFjOzt3QkFDL0YsSUFBSSxHQUFHLEVBQUU7NEJBQ1AsTUFBTSxHQUFHLENBQUM7eUJBQ1g7d0JBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLHNFQUFzRSxFQUFFOzRCQUN4RyxVQUFVLENBQUMsUUFBUTs0QkFDbkIsY0FBYzs0QkFDZCxJQUFJO3lCQUNMLENBQUMsQ0FBQzt3QkFFSCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTs0QkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDN0I7d0JBQ0QsT0FBTyxDQUFDOzRCQUNOLEVBQUUsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTs0QkFDbEMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO3lCQUM5QixDQUFDLENBQUM7b0JBQ0wsQ0FBQztpQkFBQSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBdkRELGtDQXVEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBieSBMdW5hU2VjIChvd25lZCBieSBSZWZpbmVyeSBMYWJzLCBJbmMpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5cbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSAnc3FsaXRlJztcbmltcG9ydCBzcWxpdGUzIGZyb20gJ3NxbGl0ZTMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJNb2RlbCB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHNzbl90b2tlbj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyV2l0aFBhc3N3b3JkSGFzaCBleHRlbmRzIFVzZXJNb2RlbCB7XG4gIHNhbHQ6IHN0cmluZztcbiAgaGFzaGVkX3Bhc3N3b3JkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBVc2VyTWV0aG9kcyB7XG4gIGRiOiBEYXRhYmFzZTxzcWxpdGUzLkRhdGFiYXNlLCBzcWxpdGUzLlN0YXRlbWVudD47XG5cbiAgY29uc3RydWN0b3IoZGI6IERhdGFiYXNlPHNxbGl0ZTMuRGF0YWJhc2UsIHNxbGl0ZTMuU3RhdGVtZW50Pikge1xuICAgIHRoaXMuZGIgPSBkYjtcbiAgfVxuXG4gIGFzeW5jIHNldFNzbihpZDogc3RyaW5nLCBzc25Ub2tlbjogc3RyaW5nKSB7XG4gICAgYXdhaXQgdGhpcy5kYi5ydW4oJ1VQREFURSB1c2VycyBTRVQgc3NuX3Rva2VuID0gPyBXSEVSRSByb3dpZCA9ID8nLCBbc3NuVG9rZW4sIGlkXSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXN5bmMgZ2V0VXNlcihpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyTW9kZWwgfCBudWxsPiB7XG4gICAgY29uc3Qgcm93ID0gYXdhaXQgdGhpcy5kYi5nZXQ8VXNlck1vZGVsPignU0VMRUNUIHJvd2lkIEFTIGlkLCB1c2VybmFtZSwgc3NuX3Rva2VuIEZST00gdXNlcnMgV0hFUkUgcm93aWQgPSA/JywgW1xuICAgICAgaWQsXG4gICAgXSk7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgLi4ucm93LFxuICAgICAgaWQ6IHJvdy5pZC50b1N0cmluZygpLFxuICAgIH07XG4gIH1cblxuICAvLyBqdXN0IHVzZWQgZm9yIGxvZ2luIHdpdGggcGFzc3BvcnRcbiAgYXN5bmMgZ2V0VXNlcldpdGhQYXNzd29yZEhhc2godXNlcm5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmRiLmdldDxVc2VyV2l0aFBhc3N3b3JkSGFzaD4oJ1NFTEVDVCByb3dpZCBBUyBpZCwgKiBGUk9NIHVzZXJzIFdIRVJFIHVzZXJuYW1lID0gPycsIFt1c2VybmFtZV0pO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlTmV3VXNlcih1c2VyRmllbGRzOiB7IHBhc3N3b3JkOiBzdHJpbmc7IHVzZXJuYW1lOiBzdHJpbmcgfSk6IFByb21pc2U8VXNlck1vZGVsPiB7XG4gICAgY29uc3QgZGIgPSB0aGlzLmRiO1xuICAgIGNvbnN0IHNhbHQgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoMTYpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY3J5cHRvLnBia2RmMih1c2VyRmllbGRzLnBhc3N3b3JkLCBzYWx0LCAxMDAwMCwgMzIsICdzaGEyNTYnLCBhc3luYyBmdW5jdGlvbiAoZXJyLCBoYXNoZWRQYXNzd29yZCkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5zZXJ0ZWRVc2VyID0gYXdhaXQgZGIucnVuKCdJTlNFUlQgSU5UTyB1c2VycyAodXNlcm5hbWUsIGhhc2hlZF9wYXNzd29yZCwgc2FsdCkgVkFMVUVTICg/LCA/LCA/KScsIFtcbiAgICAgICAgICB1c2VyRmllbGRzLnVzZXJuYW1lLFxuICAgICAgICAgIGhhc2hlZFBhc3N3b3JkLFxuICAgICAgICAgIHNhbHQsXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGlmICghaW5zZXJ0ZWRVc2VyLmxhc3RJRCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGIgZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICBpZDogaW5zZXJ0ZWRVc2VyLmxhc3RJRC50b1N0cmluZygpLFxuICAgICAgICAgIHVzZXJuYW1lOiB1c2VyRmllbGRzLnVzZXJuYW1lLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=