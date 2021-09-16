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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const auth_helpers_1 = require("../config/auth-helpers");
const db_1 = require("../config/db");
function documentsRouter() {
    const router = express_1.Router();
    router.use(auth_helpers_1.ensureLoggedIn);
    router.use(body_parser_1.default.json());
    router.get('/', auth_helpers_1.ensureLoggedIn, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const db = yield db_1.getDb();
        if (!req.user) {
            throw new Error('not logged in and not caught by middleware');
        }
        const rows = yield db.all('SELECT token FROM documents WHERE user_id = ?', [req.user.id]).catch((e) => next(e));
        if (!rows) {
            return res.json({ success: true, documents: [] });
        }
        const documents = rows.map((r) => r.token);
        return res.json({
            success: true,
            documents: documents,
        });
    }));
    router.post('/', auth_helpers_1.ensureLoggedIn, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const db = yield db_1.getDb();
        const documentTokens = req.body.documents;
        documentTokens.forEach((documentToken) => {
            db.run('INSERT INTO documents (user_id, token) VALUES (?, ?)', [req.user.id, documentToken]).catch((e) => {
                next(e);
            });
        });
        return res.json({
            success: true,
        });
    }));
    return router;
}
exports.documentsRouter = documentsRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRzLXJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWRpY2F0ZWQtdG9rZW5pemVyL3Bhc3Nwb3J0LWF1dGgtZXhwcmVzcy9yb3V0ZXMvZG9jdW1lbnRzLXJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBcUM7QUFDckMscUNBQWlDO0FBRWpDLHlEQUF3RDtBQUN4RCxxQ0FBcUM7QUFFckMsU0FBZ0IsZUFBZTtJQUM3QixNQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7SUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyw2QkFBYyxDQUFDLENBQUM7SUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsNkJBQWMsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdkQsTUFBTSxFQUFFLEdBQUcsTUFBTSxVQUFLLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUMvRDtRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhILElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztZQUNkLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLDZCQUFjLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3hELE1BQU0sRUFBRSxHQUFHLE1BQU0sVUFBSyxFQUFFLENBQUM7UUFDekIsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFxQixDQUFDO1FBQ3RELGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN2QyxFQUFFLENBQUMsR0FBRyxDQUFDLHNEQUFzRCxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdkcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztZQUNkLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUF0Q0QsMENBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCB7IGVuc3VyZUxvZ2dlZEluIH0gZnJvbSAnLi4vY29uZmlnL2F1dGgtaGVscGVycyc7XG5pbXBvcnQgeyBnZXREYiB9IGZyb20gJy4uL2NvbmZpZy9kYic7XG5cbmV4cG9ydCBmdW5jdGlvbiBkb2N1bWVudHNSb3V0ZXIoKSB7XG4gIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG4gIHJvdXRlci51c2UoZW5zdXJlTG9nZ2VkSW4pO1xuICByb3V0ZXIudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuICByb3V0ZXIuZ2V0KCcvJywgZW5zdXJlTG9nZ2VkSW4sIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGIoKTtcbiAgICBpZiAoIXJlcS51c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBsb2dnZWQgaW4gYW5kIG5vdCBjYXVnaHQgYnkgbWlkZGxld2FyZScpO1xuICAgIH1cbiAgICBjb25zdCByb3dzID0gYXdhaXQgZGIuYWxsKCdTRUxFQ1QgdG9rZW4gRlJPTSBkb2N1bWVudHMgV0hFUkUgdXNlcl9pZCA9ID8nLCBbcmVxLnVzZXIuaWRdKS5jYXRjaCgoZSkgPT4gbmV4dChlKSk7XG5cbiAgICBpZiAoIXJvd3MpIHtcbiAgICAgIHJldHVybiByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRvY3VtZW50czogW10gfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZG9jdW1lbnRzID0gcm93cy5tYXAoKHIpID0+IHIudG9rZW4pO1xuICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgZG9jdW1lbnRzOiBkb2N1bWVudHMsXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJvdXRlci5wb3N0KCcvJywgZW5zdXJlTG9nZ2VkSW4sIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGIoKTtcbiAgICBjb25zdCBkb2N1bWVudFRva2VucyA9IHJlcS5ib2R5LmRvY3VtZW50cyBhcyBzdHJpbmdbXTtcbiAgICBkb2N1bWVudFRva2Vucy5mb3JFYWNoKChkb2N1bWVudFRva2VuKSA9PiB7XG4gICAgICBkYi5ydW4oJ0lOU0VSVCBJTlRPIGRvY3VtZW50cyAodXNlcl9pZCwgdG9rZW4pIFZBTFVFUyAoPywgPyknLCBbcmVxLnVzZXIuaWQsIGRvY3VtZW50VG9rZW5dKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBuZXh0KGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiByb3V0ZXI7XG59XG4iXX0=