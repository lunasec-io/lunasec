/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
exports.DocumentMethods = void 0;
class DocumentMethods {
    constructor(db) {
        this.db = db;
    }
    getUserDocuments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.all('SELECT token FROM documents WHERE user_id = ?', [userId]);
        });
    }
    setUserDocuments(userId, documentTokens) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.db;
            yield db.run('DELETE FROM documents WHERE user_id = (?)', userId); // clear out any old documents
            const insertionPromises = [];
            documentTokens.forEach((documentToken) => {
                insertionPromises.push(db.run('INSERT INTO documents (user_id, token) VALUES (?, ?)', [userId, documentToken]));
            });
            yield Promise.all(insertionPromises);
            return;
        });
    }
}
exports.DocumentMethods = DocumentMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9tb2RlbHMvZG9jdW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFhLGVBQWU7SUFHMUIsWUFBWSxFQUFpRDtRQUMzRCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDSyxnQkFBZ0IsQ0FBQyxNQUFjOztZQUNuQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUEyQiwrQ0FBK0MsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDMUcsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsTUFBYyxFQUFFLGNBQXdCOztZQUM3RCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtZQUNqRyxNQUFNLGlCQUFpQixHQUF1QixFQUFFLENBQUM7WUFDakQsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUN2QyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsRUFBRSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEgsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNyQyxPQUFPO1FBQ1QsQ0FBQztLQUFBO0NBQ0Y7QUFyQkQsMENBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIGJ5IEx1bmFTZWMgKG93bmVkIGJ5IFJlZmluZXJ5IExhYnMsIEluYylcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSAnc3FsaXRlJztcbmltcG9ydCBzcWxpdGUzIGZyb20gJ3NxbGl0ZTMnO1xuXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRNZXRob2RzIHtcbiAgZGI6IERhdGFiYXNlPHNxbGl0ZTMuRGF0YWJhc2UsIHNxbGl0ZTMuU3RhdGVtZW50PjtcblxuICBjb25zdHJ1Y3RvcihkYjogRGF0YWJhc2U8c3FsaXRlMy5EYXRhYmFzZSwgc3FsaXRlMy5TdGF0ZW1lbnQ+KSB7XG4gICAgdGhpcy5kYiA9IGRiO1xuICB9XG4gIGFzeW5jIGdldFVzZXJEb2N1bWVudHModXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5kYi5hbGw8QXJyYXk8eyB0b2tlbjogc3RyaW5nIH0+PignU0VMRUNUIHRva2VuIEZST00gZG9jdW1lbnRzIFdIRVJFIHVzZXJfaWQgPSA/JywgW3VzZXJJZF0pO1xuICB9XG5cbiAgYXN5bmMgc2V0VXNlckRvY3VtZW50cyh1c2VySWQ6IHN0cmluZywgZG9jdW1lbnRUb2tlbnM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgZGIgPSB0aGlzLmRiO1xuICAgIGF3YWl0IGRiLnJ1bignREVMRVRFIEZST00gZG9jdW1lbnRzIFdIRVJFIHVzZXJfaWQgPSAoPyknLCB1c2VySWQpOyAvLyBjbGVhciBvdXQgYW55IG9sZCBkb2N1bWVudHNcbiAgICBjb25zdCBpbnNlcnRpb25Qcm9taXNlczogUHJvbWlzZTx1bmtub3duPltdID0gW107XG4gICAgZG9jdW1lbnRUb2tlbnMuZm9yRWFjaCgoZG9jdW1lbnRUb2tlbikgPT4ge1xuICAgICAgaW5zZXJ0aW9uUHJvbWlzZXMucHVzaChkYi5ydW4oJ0lOU0VSVCBJTlRPIGRvY3VtZW50cyAodXNlcl9pZCwgdG9rZW4pIFZBTFVFUyAoPywgPyknLCBbdXNlcklkLCBkb2N1bWVudFRva2VuXSkpO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoaW5zZXJ0aW9uUHJvbWlzZXMpO1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19