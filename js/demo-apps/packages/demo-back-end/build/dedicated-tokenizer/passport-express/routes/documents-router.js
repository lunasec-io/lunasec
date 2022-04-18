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
exports.documentsRouter = void 0;
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
function documentsRouter(models) {
    const router = (0, express_1.Router)();
    router.use(auth_helpers_1.ensureLoggedIn);
    router.use(body_parser_1.default.json());
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            throw new Error('not logged in and not caught by middleware');
        }
        try {
            const documentRecords = yield models.documents.getUserDocuments(req.user.id);
            const documents = documentRecords.map((r) => r.token);
            yield configure_lunasec_1.lunaSec.grants.create(req.user.id, documents);
            return res.json({
                success: true,
                documents: documents,
            });
        }
        catch (e) {
            return res.send({
                success: false,
                error: e,
            });
        }
    }));
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const documentTokens = req.body.documents;
        try {
            yield configure_lunasec_1.lunaSec.grants.verify(req.session.id, documentTokens); // Handles arrays of tokens like this in addition to individual tokens
            yield models.documents.setUserDocuments(req.user.id, documentTokens);
        }
        catch (e) {
            return res.send({
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
exports.documentsRouter = documentsRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRzLXJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWRpY2F0ZWQtdG9rZW5pemVyL3Bhc3Nwb3J0LWV4cHJlc3Mvcm91dGVzL2RvY3VtZW50cy1yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsOERBQXFDO0FBQ3JDLHFDQUFpQztBQUdqQyx5REFBd0Q7QUFDeEQsbUVBQXNEO0FBRXRELFNBQWdCLGVBQWUsQ0FBQyxNQUFjO0lBQzVDLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0lBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsNkJBQWMsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRTlCLGtFQUFrRTtJQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUMvRDtRQUNELElBQUk7WUFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3RSxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsTUFBTSwyQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDcEQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFNBQVMsRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxrRUFBa0U7SUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDbEMsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFxQixDQUFDO1FBQ3RELElBQUk7WUFDRixNQUFNLDJCQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLHNFQUFzRTtZQUNuSSxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDdEU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDZCxPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ2QsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQTlDRCwwQ0E4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgYnkgTHVuYVNlYyAob3duZWQgYnkgUmVmaW5lcnkgTGFicywgSW5jKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCB7IE1vZGVscyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tb2RlbHMnO1xuaW1wb3J0IHsgZW5zdXJlTG9nZ2VkSW4gfSBmcm9tICcuLi9jb25maWcvYXV0aC1oZWxwZXJzJztcbmltcG9ydCB7IGx1bmFTZWMgfSBmcm9tICcuLi9jb25maWcvY29uZmlndXJlLWx1bmFzZWMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZG9jdW1lbnRzUm91dGVyKG1vZGVsczogTW9kZWxzKSB7XG4gIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG4gIHJvdXRlci51c2UoZW5zdXJlTG9nZ2VkSW4pO1xuICByb3V0ZXIudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW1pc3VzZWQtcHJvbWlzZXNcbiAgcm91dGVyLmdldCgnLycsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGlmICghcmVxLnVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGxvZ2dlZCBpbiBhbmQgbm90IGNhdWdodCBieSBtaWRkbGV3YXJlJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkb2N1bWVudFJlY29yZHMgPSBhd2FpdCBtb2RlbHMuZG9jdW1lbnRzLmdldFVzZXJEb2N1bWVudHMocmVxLnVzZXIuaWQpO1xuICAgICAgY29uc3QgZG9jdW1lbnRzID0gZG9jdW1lbnRSZWNvcmRzLm1hcCgocikgPT4gci50b2tlbik7XG4gICAgICBhd2FpdCBsdW5hU2VjLmdyYW50cy5jcmVhdGUocmVxLnVzZXIuaWQsIGRvY3VtZW50cyk7XG4gICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBkb2N1bWVudHM6IGRvY3VtZW50cyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiByZXMuc2VuZCh7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1taXN1c2VkLXByb21pc2VzXG4gIHJvdXRlci5wb3N0KCcvJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgZG9jdW1lbnRUb2tlbnMgPSByZXEuYm9keS5kb2N1bWVudHMgYXMgc3RyaW5nW107XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGx1bmFTZWMuZ3JhbnRzLnZlcmlmeShyZXEuc2Vzc2lvbi5pZCwgZG9jdW1lbnRUb2tlbnMpOyAvLyBIYW5kbGVzIGFycmF5cyBvZiB0b2tlbnMgbGlrZSB0aGlzIGluIGFkZGl0aW9uIHRvIGluZGl2aWR1YWwgdG9rZW5zXG4gICAgICBhd2FpdCBtb2RlbHMuZG9jdW1lbnRzLnNldFVzZXJEb2N1bWVudHMocmVxLnVzZXIuaWQsIGRvY3VtZW50VG9rZW5zKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gcmVzLnNlbmQoe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJvdXRlcjtcbn1cbiJdfQ==