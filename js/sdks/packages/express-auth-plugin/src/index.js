"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPlugin = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const url_1 = require("url");
const webcrypto_1 = require("@peculiar/webcrypto");
// @ts-ignore
global.self = global;
// @ts-ignore
global.window = global;
// @ts-ignore
global.crypto = new webcrypto_1.Crypto();
// @ts-ignore
global.window.atob = function atob(str) {
    return Buffer.from(str, 'base64').toString('binary');
};
// @ts-ignore
global.window.btoa = function btoa(str) {
    var buffer;
    if (str instanceof Buffer) {
        buffer = str;
    }
    else {
        buffer = Buffer.from(str.toString(), 'binary');
    }
    return buffer.toString('base64');
};
const tink_crypto_1 = require("tink-crypto");
function encodeUint8Array(uint8array) {
    return Buffer.from(uint8array).toString('base64');
}
function loadSecureFrameKeyset() {
    const secureFrameKeysetEncoded = process.env.SECURE_FRAME_KEYSET;
    if (secureFrameKeysetEncoded === undefined) {
        throw Error("SECURE_FRAME_KEYSET not found in environment variables.");
    }
    const secureFrameKeyset = Buffer.from(secureFrameKeysetEncoded, 'base64');
    return tink_crypto_1.binaryInsecure.deserializeKeyset(secureFrameKeyset);
}
async function authPlugin(app) {
    tink_crypto_1.hybrid.register();
    const secureFrameKeyset = loadSecureFrameKeyset();
    const hybridEncrypt = await secureFrameKeyset.getPrimitive(tink_crypto_1.hybrid.HybridEncrypt);
    const secureFrameUrl = process.env.SECURE_FRAME_URL;
    if (secureFrameUrl === undefined) {
        throw Error("SECURE_FRAME_URL not found in environment variables.");
    }
    app.get('/secure-frame', cookie_parser_1.default(), async function (req, res) {
        const stateToken = req.query.state;
        if (typeof stateToken !== "string") {
            res.status(400).send({
                'error': 'state is not set in request'
            });
            return;
        }
        const idToken = req.cookies['id_token'];
        if (idToken === undefined) {
            console.error('id_token is not set in request');
            res.status(400).send({
                'error': 'id_token is not set in request'
            });
            return;
        }
        const encryptedData = await hybridEncrypt.encrypt(Buffer.from(idToken), Buffer.from("secureFrame"));
        const encodedData = encodeUint8Array(encryptedData);
        const redirectUrl = new url_1.URL(secureFrameUrl);
        redirectUrl.searchParams.append('state', stateToken);
        redirectUrl.searchParams.append('openid_token', encodedData);
        redirectUrl.pathname = '/session/create';
        console.log('redirecting...', redirectUrl.href);
        res.redirect(redirectUrl.href);
    });
}
exports.authPlugin = authPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxrRUFBeUM7QUFDekMsNkJBQXdCO0FBQ3hCLG1EQUEyQztBQUUzQyxhQUFhO0FBQ2IsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7QUFDckIsYUFBYTtBQUNiLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLGFBQWE7QUFDYixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksa0JBQU0sRUFBRSxDQUFDO0FBRTdCLGFBQWE7QUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxTQUFTLElBQUksQ0FBQyxHQUFHO0lBQ3BDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELENBQUMsQ0FBQztBQUVGLGFBQWE7QUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxTQUFTLElBQUksQ0FBQyxHQUFHO0lBQ3BDLElBQUksTUFBTSxDQUFDO0lBRVgsSUFBSSxHQUFHLFlBQVksTUFBTSxFQUFFO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLENBQUM7S0FDZDtTQUFNO1FBQ0wsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ2hEO0lBRUQsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVGLDZDQUFpRTtBQUVqRSxTQUFTLGdCQUFnQixDQUFDLFVBQXNCO0lBQzlDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVELFNBQVMscUJBQXFCO0lBQzVCLE1BQU0sd0JBQXdCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztJQUNqRSxJQUFJLHdCQUF3QixLQUFLLFNBQVMsRUFBRTtRQUMxQyxNQUFNLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0tBQ3hFO0lBRUQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLE9BQU8sNEJBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFFTSxLQUFLLFVBQVUsVUFBVSxDQUFDLEdBQVc7SUFDMUMsb0JBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixNQUFNLGlCQUFpQixHQUFHLHFCQUFxQixFQUFFLENBQUM7SUFDbEQsTUFBTSxhQUFhLEdBQ2pCLE1BQU0saUJBQWlCLENBQUMsWUFBWSxDQUF1QixvQkFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRW5GLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7SUFDcEQsSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO1FBQ2hDLE1BQU0sS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7S0FDckU7SUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSx1QkFBWSxFQUFFLEVBQUUsS0FBSyxXQUFVLEdBQUcsRUFBRSxHQUFHO1FBQzlELE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ25DLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ2xDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixPQUFPLEVBQUUsNkJBQTZCO2FBQ3ZDLENBQUMsQ0FBQztZQUNILE9BQU87U0FDUjtRQUVELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtZQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsT0FBTyxFQUFFLGdDQUFnQzthQUMxQyxDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1I7UUFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFFcEcsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFcEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxTQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM3RCxXQUFXLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBRXpDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRS9DLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNDRCxnQ0EyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlcn0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSBcImNvb2tpZS1wYXJzZXJcIjtcbmltcG9ydCB7VVJMfSBmcm9tIFwidXJsXCI7XG5pbXBvcnQge0NyeXB0b30gZnJvbSBcIkBwZWN1bGlhci93ZWJjcnlwdG9cIjtcblxuLy8gQHRzLWlnbm9yZVxuZ2xvYmFsLnNlbGYgPSBnbG9iYWw7XG4vLyBAdHMtaWdub3JlXG5nbG9iYWwud2luZG93ID0gZ2xvYmFsO1xuLy8gQHRzLWlnbm9yZVxuZ2xvYmFsLmNyeXB0byA9IG5ldyBDcnlwdG8oKTtcblxuLy8gQHRzLWlnbm9yZVxuZ2xvYmFsLndpbmRvdy5hdG9iID0gZnVuY3Rpb24gYXRvYihzdHIpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKHN0ciwgJ2Jhc2U2NCcpLnRvU3RyaW5nKCdiaW5hcnknKTtcbn07XG5cbi8vIEB0cy1pZ25vcmVcbmdsb2JhbC53aW5kb3cuYnRvYSA9IGZ1bmN0aW9uIGJ0b2Eoc3RyKSB7XG4gIHZhciBidWZmZXI7XG5cbiAgaWYgKHN0ciBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgIGJ1ZmZlciA9IHN0cjtcbiAgfSBlbHNlIHtcbiAgICBidWZmZXIgPSBCdWZmZXIuZnJvbShzdHIudG9TdHJpbmcoKSwgJ2JpbmFyeScpO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZmZlci50b1N0cmluZygnYmFzZTY0Jyk7XG59O1xuXG5pbXBvcnQge2JpbmFyeUluc2VjdXJlLCBoeWJyaWQsIEtleXNldEhhbmRsZX0gZnJvbSBcInRpbmstY3J5cHRvXCI7XG5cbmZ1bmN0aW9uIGVuY29kZVVpbnQ4QXJyYXkodWludDhhcnJheTogVWludDhBcnJheSk6IHN0cmluZyB7XG4gIHJldHVybiBCdWZmZXIuZnJvbSh1aW50OGFycmF5KS50b1N0cmluZygnYmFzZTY0Jyk7XG59XG5cbmZ1bmN0aW9uIGxvYWRTZWN1cmVGcmFtZUtleXNldCgpOiBLZXlzZXRIYW5kbGUge1xuICBjb25zdCBzZWN1cmVGcmFtZUtleXNldEVuY29kZWQgPSBwcm9jZXNzLmVudi5TRUNVUkVfRlJBTUVfS0VZU0VUO1xuICBpZiAoc2VjdXJlRnJhbWVLZXlzZXRFbmNvZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBFcnJvcihcIlNFQ1VSRV9GUkFNRV9LRVlTRVQgbm90IGZvdW5kIGluIGVudmlyb25tZW50IHZhcmlhYmxlcy5cIik7XG4gIH1cblxuICBjb25zdCBzZWN1cmVGcmFtZUtleXNldCA9IEJ1ZmZlci5mcm9tKHNlY3VyZUZyYW1lS2V5c2V0RW5jb2RlZCwgJ2Jhc2U2NCcpO1xuICByZXR1cm4gYmluYXJ5SW5zZWN1cmUuZGVzZXJpYWxpemVLZXlzZXQoc2VjdXJlRnJhbWVLZXlzZXQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0aFBsdWdpbihhcHA6IFJvdXRlcikge1xuICBoeWJyaWQucmVnaXN0ZXIoKTtcbiAgY29uc3Qgc2VjdXJlRnJhbWVLZXlzZXQgPSBsb2FkU2VjdXJlRnJhbWVLZXlzZXQoKTtcbiAgY29uc3QgaHlicmlkRW5jcnlwdCA9XG4gICAgYXdhaXQgc2VjdXJlRnJhbWVLZXlzZXQuZ2V0UHJpbWl0aXZlPGh5YnJpZC5IeWJyaWRFbmNyeXB0PihoeWJyaWQuSHlicmlkRW5jcnlwdCk7XG5cbiAgY29uc3Qgc2VjdXJlRnJhbWVVcmwgPSBwcm9jZXNzLmVudi5TRUNVUkVfRlJBTUVfVVJMO1xuICBpZiAoc2VjdXJlRnJhbWVVcmwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IEVycm9yKFwiU0VDVVJFX0ZSQU1FX1VSTCBub3QgZm91bmQgaW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlwiKTtcbiAgfVxuXG4gIGFwcC5nZXQoJy9zZWN1cmUtZnJhbWUnLCBjb29raWVQYXJzZXIoKSwgYXN5bmMgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgICBjb25zdCBzdGF0ZVRva2VuID0gcmVxLnF1ZXJ5LnN0YXRlO1xuICAgIGlmICh0eXBlb2Ygc3RhdGVUb2tlbiAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAnZXJyb3InOiAnc3RhdGUgaXMgbm90IHNldCBpbiByZXF1ZXN0J1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWRUb2tlbiA9IHJlcS5jb29raWVzWydpZF90b2tlbiddO1xuXG4gICAgaWYgKGlkVG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5lcnJvcignaWRfdG9rZW4gaXMgbm90IHNldCBpbiByZXF1ZXN0JylcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICAgJ2Vycm9yJzogJ2lkX3Rva2VuIGlzIG5vdCBzZXQgaW4gcmVxdWVzdCdcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGVuY3J5cHRlZERhdGEgPSBhd2FpdCBoeWJyaWRFbmNyeXB0LmVuY3J5cHQoQnVmZmVyLmZyb20oaWRUb2tlbiksIEJ1ZmZlci5mcm9tKFwic2VjdXJlRnJhbWVcIikpO1xuXG4gICAgY29uc3QgZW5jb2RlZERhdGEgPSBlbmNvZGVVaW50OEFycmF5KGVuY3J5cHRlZERhdGEpO1xuXG4gICAgY29uc3QgcmVkaXJlY3RVcmwgPSBuZXcgVVJMKHNlY3VyZUZyYW1lVXJsKTtcbiAgICByZWRpcmVjdFVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdzdGF0ZScsIHN0YXRlVG9rZW4pO1xuICAgIHJlZGlyZWN0VXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ29wZW5pZF90b2tlbicsIGVuY29kZWREYXRhKTtcbiAgICByZWRpcmVjdFVybC5wYXRobmFtZSA9ICcvc2Vzc2lvbi9jcmVhdGUnO1xuXG4gICAgY29uc29sZS5sb2coJ3JlZGlyZWN0aW5nLi4uJywgcmVkaXJlY3RVcmwuaHJlZilcblxuICAgIHJlcy5yZWRpcmVjdChyZWRpcmVjdFVybC5ocmVmKTtcbiAgfSk7XG59XG4iXX0=