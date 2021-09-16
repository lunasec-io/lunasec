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
exports.createRoutes = void 0;
const crypto_1 = require("crypto");
const express_1 = require("express");
const configure_lunasec_1 = require("./configure-lunasec");
const read_session_from_request_1 = require("./read-session-from-request");
const routes = express_1.Router();
// (forrest) Leaving the secure resolver stuff commented out until chris gets a chance to take another pass at it
// const secureResolver = new SecureResolver({
//   stage: DeploymentStage.DEV,
// });
//
// const secureProcessForm = secureResolver.wrap(processForm);
function createRoutes() {
    routes.get('/auth', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const id_token = yield read_session_from_request_1.readSessionFromRequest(req);
        if (id_token === null) {
            res.status(401).end();
            return;
        }
        res.status(200).end();
    }));
    // This little helper route gets called manually to simulate a login flow for the purposes of the demo
    routes.get('/set-id-token', function (_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_token = yield configure_lunasec_1.lunaSec.auth.createAuthenticationJWT('user', {
                session: {
                    id: crypto_1.randomUUID(),
                },
            });
            res.cookie('id_token', id_token.toString());
            res.redirect('back');
        });
    });
    routes.get('/', (_req, res) => __awaiter(this, void 0, void 0, function* () {
        res.end();
    }));
    routes.post('/check-cors', (_req, res) => {
        res.status(200).send('ok');
    });
    //
    // routes.post('/signup', async (req, res) => {
    //   const ssnToken: string = req.body.ssnToken;
    //
    //   if (!ssnToken) {
    //     console.error('ssn token is not set');
    //     res.status(400);
    //     res.end();
    //     return;
    //   }
    //
    //   const formData: SecureFormData = {
    //     ssnToken: ssnToken,
    //   };
    //
    //   const plaintext = await secureProcessForm(formData);
    //   if (plaintext === undefined) {
    //     console.error('error when calling process form');
    //     res.status(500);
    //     res.end();
    //     return;
    //   }
    //
    //   console.log(plaintext);
    //   res.status(200);
    //   res.end();
    // });
    routes.get('/grant', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const tokenId = req.query.token;
        if (tokenId === undefined || typeof tokenId !== 'string') {
            console.error('token not defined in grant request, or is not a string');
            res.status(400);
            res.end();
            return;
        }
        // TODO (cthompson) sessionId is a value that should be set in the jwt, it is a value that the session for the backend and secure frame share
        const sessionId = '1234';
        try {
            const tokenGrant = yield configure_lunasec_1.lunaSec.grants.create(sessionId, tokenId);
            res.json({
                grant: tokenGrant, // grant stringifies itself on serialization
            });
            res.end();
        }
        catch (e) {
            console.error('error while authorizing token grant: ', e);
            res.status(500);
            res.end();
            return;
        }
    }));
    return routes;
}
exports.createRoutes = createRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBb0M7QUFFcEMscUNBQWlDO0FBRWpDLDJEQUE4QztBQUM5QywyRUFBcUU7QUFDckUsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBRXhCLGlIQUFpSDtBQUNqSCw4Q0FBOEM7QUFDOUMsZ0NBQWdDO0FBQ2hDLE1BQU07QUFDTixFQUFFO0FBQ0YsOERBQThEO0FBRTlELFNBQWdCLFlBQVk7SUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDckMsTUFBTSxRQUFRLEdBQUcsTUFBTSxrREFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRCxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0QixPQUFPO1NBQ1I7UUFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxzR0FBc0c7SUFDdEcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBZ0IsQ0FBQyxFQUFFLEdBQUc7O1lBQ2hELE1BQU0sUUFBUSxHQUFHLE1BQU0sMkJBQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFO2dCQUNsRSxPQUFPLEVBQUU7b0JBQ1AsRUFBRSxFQUFFLG1CQUFVLEVBQUU7aUJBQ2pCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDNUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO0tBQUEsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBTyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDbEMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRTtJQUNGLCtDQUErQztJQUMvQyxnREFBZ0Q7SUFDaEQsRUFBRTtJQUNGLHFCQUFxQjtJQUNyQiw2Q0FBNkM7SUFDN0MsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsTUFBTTtJQUNOLEVBQUU7SUFDRix1Q0FBdUM7SUFDdkMsMEJBQTBCO0lBQzFCLE9BQU87SUFDUCxFQUFFO0lBQ0YseURBQXlEO0lBQ3pELG1DQUFtQztJQUNuQyx3REFBd0Q7SUFDeEQsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsTUFBTTtJQUNOLEVBQUU7SUFDRiw0QkFBNEI7SUFDNUIscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixNQUFNO0lBRU4sTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFFaEMsSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUN4RCxPQUFPLENBQUMsS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7WUFDeEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDVixPQUFPO1NBQ1I7UUFFRCw2SUFBNkk7UUFDN0ksTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBRXpCLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLDJCQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkUsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDUCxLQUFLLEVBQUUsVUFBVSxFQUFFLDRDQUE0QzthQUNoRSxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDWDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNWLE9BQU87U0FDUjtJQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBckZELG9DQXFGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJhbmRvbVVVSUQgfSBmcm9tICdjcnlwdG8nO1xuXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcblxuaW1wb3J0IHsgbHVuYVNlYyB9IGZyb20gJy4vY29uZmlndXJlLWx1bmFzZWMnO1xuaW1wb3J0IHsgcmVhZFNlc3Npb25Gcm9tUmVxdWVzdCB9IGZyb20gJy4vcmVhZC1zZXNzaW9uLWZyb20tcmVxdWVzdCc7XG5jb25zdCByb3V0ZXMgPSBSb3V0ZXIoKTtcblxuLy8gKGZvcnJlc3QpIExlYXZpbmcgdGhlIHNlY3VyZSByZXNvbHZlciBzdHVmZiBjb21tZW50ZWQgb3V0IHVudGlsIGNocmlzIGdldHMgYSBjaGFuY2UgdG8gdGFrZSBhbm90aGVyIHBhc3MgYXQgaXRcbi8vIGNvbnN0IHNlY3VyZVJlc29sdmVyID0gbmV3IFNlY3VyZVJlc29sdmVyKHtcbi8vICAgc3RhZ2U6IERlcGxveW1lbnRTdGFnZS5ERVYsXG4vLyB9KTtcbi8vXG4vLyBjb25zdCBzZWN1cmVQcm9jZXNzRm9ybSA9IHNlY3VyZVJlc29sdmVyLndyYXAocHJvY2Vzc0Zvcm0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm91dGVzKCkge1xuICByb3V0ZXMuZ2V0KCcvYXV0aCcsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IGlkX3Rva2VuID0gYXdhaXQgcmVhZFNlc3Npb25Gcm9tUmVxdWVzdChyZXEpO1xuICAgIGlmIChpZF90b2tlbiA9PT0gbnVsbCkge1xuICAgICAgcmVzLnN0YXR1cyg0MDEpLmVuZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXMuc3RhdHVzKDIwMCkuZW5kKCk7XG4gIH0pO1xuXG4gIC8vIFRoaXMgbGl0dGxlIGhlbHBlciByb3V0ZSBnZXRzIGNhbGxlZCBtYW51YWxseSB0byBzaW11bGF0ZSBhIGxvZ2luIGZsb3cgZm9yIHRoZSBwdXJwb3NlcyBvZiB0aGUgZGVtb1xuICByb3V0ZXMuZ2V0KCcvc2V0LWlkLXRva2VuJywgYXN5bmMgZnVuY3Rpb24gKF8sIHJlcykge1xuICAgIGNvbnN0IGlkX3Rva2VuID0gYXdhaXQgbHVuYVNlYy5hdXRoLmNyZWF0ZUF1dGhlbnRpY2F0aW9uSldUKCd1c2VyJywge1xuICAgICAgc2Vzc2lvbjoge1xuICAgICAgICBpZDogcmFuZG9tVVVJRCgpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXMuY29va2llKCdpZF90b2tlbicsIGlkX3Rva2VuLnRvU3RyaW5nKCkpO1xuICAgIHJlcy5yZWRpcmVjdCgnYmFjaycpO1xuICB9KTtcblxuICByb3V0ZXMuZ2V0KCcvJywgYXN5bmMgKF9yZXEsIHJlcykgPT4ge1xuICAgIHJlcy5lbmQoKTtcbiAgfSk7XG5cbiAgcm91dGVzLnBvc3QoJy9jaGVjay1jb3JzJywgKF9yZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKCdvaycpO1xuICB9KTtcblxuICAvL1xuICAvLyByb3V0ZXMucG9zdCgnL3NpZ251cCcsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAvLyAgIGNvbnN0IHNzblRva2VuOiBzdHJpbmcgPSByZXEuYm9keS5zc25Ub2tlbjtcbiAgLy9cbiAgLy8gICBpZiAoIXNzblRva2VuKSB7XG4gIC8vICAgICBjb25zb2xlLmVycm9yKCdzc24gdG9rZW4gaXMgbm90IHNldCcpO1xuICAvLyAgICAgcmVzLnN0YXR1cyg0MDApO1xuICAvLyAgICAgcmVzLmVuZCgpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBjb25zdCBmb3JtRGF0YTogU2VjdXJlRm9ybURhdGEgPSB7XG4gIC8vICAgICBzc25Ub2tlbjogc3NuVG9rZW4sXG4gIC8vICAgfTtcbiAgLy9cbiAgLy8gICBjb25zdCBwbGFpbnRleHQgPSBhd2FpdCBzZWN1cmVQcm9jZXNzRm9ybShmb3JtRGF0YSk7XG4gIC8vICAgaWYgKHBsYWludGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gIC8vICAgICBjb25zb2xlLmVycm9yKCdlcnJvciB3aGVuIGNhbGxpbmcgcHJvY2VzcyBmb3JtJyk7XG4gIC8vICAgICByZXMuc3RhdHVzKDUwMCk7XG4gIC8vICAgICByZXMuZW5kKCk7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIGNvbnNvbGUubG9nKHBsYWludGV4dCk7XG4gIC8vICAgcmVzLnN0YXR1cygyMDApO1xuICAvLyAgIHJlcy5lbmQoKTtcbiAgLy8gfSk7XG5cbiAgcm91dGVzLmdldCgnL2dyYW50JywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgdG9rZW5JZCA9IHJlcS5xdWVyeS50b2tlbjtcblxuICAgIGlmICh0b2tlbklkID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHRva2VuSWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCd0b2tlbiBub3QgZGVmaW5lZCBpbiBncmFudCByZXF1ZXN0LCBvciBpcyBub3QgYSBzdHJpbmcnKTtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUT0RPIChjdGhvbXBzb24pIHNlc3Npb25JZCBpcyBhIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldCBpbiB0aGUgand0LCBpdCBpcyBhIHZhbHVlIHRoYXQgdGhlIHNlc3Npb24gZm9yIHRoZSBiYWNrZW5kIGFuZCBzZWN1cmUgZnJhbWUgc2hhcmVcbiAgICBjb25zdCBzZXNzaW9uSWQgPSAnMTIzNCc7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW5HcmFudCA9IGF3YWl0IGx1bmFTZWMuZ3JhbnRzLmNyZWF0ZShzZXNzaW9uSWQsIHRva2VuSWQpO1xuICAgICAgcmVzLmpzb24oe1xuICAgICAgICBncmFudDogdG9rZW5HcmFudCwgLy8gZ3JhbnQgc3RyaW5naWZpZXMgaXRzZWxmIG9uIHNlcmlhbGl6YXRpb25cbiAgICAgIH0pO1xuICAgICAgcmVzLmVuZCgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIHdoaWxlIGF1dGhvcml6aW5nIHRva2VuIGdyYW50OiAnLCBlKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByb3V0ZXM7XG59XG4iXX0=