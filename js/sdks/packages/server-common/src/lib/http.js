"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = exports.makeRawRequest = exports.BadHttpResponseError = exports.FailedJsonDeserializationError = exports.getUrl = void 0;
const http = __importStar(require("http"));
const https = __importStar(require("https"));
// Apparently this is automatically imported in both Node and the Browser.
// It's kind of janky to _not_ explicitly import this, but this is the best "isomorphic" way.
// If we do import it, then the Browser webpack build step complains.
// If we do this, then both Node.js and the browser seem to work. *shrug*
function getUrl() {
    // @ts-ignore
    return URL;
}
exports.getUrl = getUrl;
function getRequestModule(protocol) {
    if (protocol === 'http:') {
        return http;
    }
    if (protocol === 'https:') {
        return https;
    }
    throw new Error('Unable to identify request method for Refinery API Client');
}
class FailedJsonDeserializationError extends Error {
    constructor(rawData) {
        super('Failed to deserialize JSON data');
        this.rawData = rawData;
    }
}
exports.FailedJsonDeserializationError = FailedJsonDeserializationError;
class BadHttpResponseError extends Error {
    constructor(responseCode, rawData) {
        super('Bad Http response received');
        this.responseCode = responseCode;
        this.rawData = rawData;
    }
}
exports.BadHttpResponseError = BadHttpResponseError;
function getRequestParams(host, path, params) {
    const URL = getUrl();
    const requestUri = new URL(path, host);
    const requestModule = getRequestModule(requestUri.protocol);
    const searchParams = requestUri.search !== undefined ? `?${requestUri.search}` : '';
    const requestConfig = Object.assign({ protocol: requestUri.protocol, hostname: requestUri.hostname, port: requestUri.port, path: requestUri.pathname + searchParams }, params);
    return { requestModule, requestConfig };
}
function makeRawRequest(host, path, params, body) {
    const { requestModule, requestConfig } = getRequestParams(host, path, params);
    return new Promise((resolve, reject) => {
        let responseBuffer;
        const req = requestModule.request(requestConfig, res => {
            res.on('data', (chunk) => {
                chunk.copy(responseBuffer);
            });
            res.on('end', () => {
                resolve([res, responseBuffer]);
            });
        });
        req.on('error', (e) => reject(e));
        req.on('response', resp => {
            const contentLength = resp.headers['content-length'];
            if (!contentLength) {
                responseBuffer = Buffer.alloc(0);
                return;
            }
            const size = parseInt(contentLength);
            if (size < 0) {
                return reject('Content length is negative');
            }
            responseBuffer = Buffer.alloc(size);
        });
        if (body !== undefined) {
            req.write(body);
        }
        req.end();
    });
}
exports.makeRawRequest = makeRawRequest;
async function makeRequest(host, path, params, body) {
    const [res, responseBuffer] = await makeRawRequest(host, path, params, body);
    const responseData = responseBuffer.toString();
    if (res.statusCode !== 200) {
        console.log('bad response', { host, path, params, res, responseData });
        throw new BadHttpResponseError(res.statusCode, responseData);
    }
    try {
        // TODO: Validate this parsed JSON against some schema
        return JSON.parse(responseData);
    }
    catch (e) {
        // If data can't be parsed, wrap the data.
        const error = new FailedJsonDeserializationError(responseData);
        console.error(error);
        throw error;
    }
}
exports.makeRequest = makeRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUE2QjtBQUM3Qiw2Q0FBK0I7QUFFL0IsMEVBQTBFO0FBQzFFLDZGQUE2RjtBQUM3RixxRUFBcUU7QUFDckUseUVBQXlFO0FBQ3pFLFNBQWdCLE1BQU07SUFDcEIsYUFBYTtJQUNiLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUhELHdCQUdDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFnQjtJQUN4QyxJQUFJLFFBQVEsS0FBSyxPQUFPLEVBQUU7UUFDeEIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUN6QixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFFRCxNQUFhLDhCQUErQixTQUFRLEtBQUs7SUFHdkQsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUFQRCx3RUFPQztBQUVELE1BQWEsb0JBQXFCLFNBQVEsS0FBSztJQUk3QyxZQUFZLFlBQWdDLEVBQUUsT0FBZTtRQUMzRCxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUFURCxvREFTQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLElBQVksRUFBRSxNQUE4QjtJQUNsRixNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUVyQixNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFdkMsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTVELE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRW5GLE1BQU0sYUFBYSxtQkFDakIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQzdCLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUM3QixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFDckIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsWUFBWSxJQUNyQyxNQUFNLENBQ1YsQ0FBQztJQUVGLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxJQUFZLEVBQUUsSUFBWSxFQUFFLE1BQThCLEVBQUUsSUFBYTtJQUN0RyxNQUFNLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBQyxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFNUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUVyQyxJQUFJLGNBQXNCLENBQUM7UUFDM0IsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDckQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtnQkFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDakIsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN4QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFckQsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDbEIsY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE9BQU87YUFDUjtZQUVELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVyQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ1osT0FBTyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQzthQUM3QztZQUVELGNBQWMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7UUFFRCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF2Q0Qsd0NBdUNDO0FBRU0sS0FBSyxVQUFVLFdBQVcsQ0FBSSxJQUFZLEVBQUUsSUFBWSxFQUFFLE1BQThCLEVBQUUsSUFBYTtJQUM1RyxNQUFNLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTdFLE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUUvQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7UUFDckUsTUFBTSxJQUFJLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxJQUFJO1FBQ0Ysc0RBQXNEO1FBQ3RELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQU0sQ0FBQztLQUN0QztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsMENBQTBDO1FBQzFDLE1BQU0sS0FBSyxHQUFHLElBQUksOEJBQThCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixNQUFNLEtBQUssQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQW5CRCxrQ0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgaHR0cHMgZnJvbSAnaHR0cHMnO1xuXG4vLyBBcHBhcmVudGx5IHRoaXMgaXMgYXV0b21hdGljYWxseSBpbXBvcnRlZCBpbiBib3RoIE5vZGUgYW5kIHRoZSBCcm93c2VyLlxuLy8gSXQncyBraW5kIG9mIGphbmt5IHRvIF9ub3RfIGV4cGxpY2l0bHkgaW1wb3J0IHRoaXMsIGJ1dCB0aGlzIGlzIHRoZSBiZXN0IFwiaXNvbW9ycGhpY1wiIHdheS5cbi8vIElmIHdlIGRvIGltcG9ydCBpdCwgdGhlbiB0aGUgQnJvd3NlciB3ZWJwYWNrIGJ1aWxkIHN0ZXAgY29tcGxhaW5zLlxuLy8gSWYgd2UgZG8gdGhpcywgdGhlbiBib3RoIE5vZGUuanMgYW5kIHRoZSBicm93c2VyIHNlZW0gdG8gd29yay4gKnNocnVnKlxuZXhwb3J0IGZ1bmN0aW9uIGdldFVybCgpIHtcbiAgLy8gQHRzLWlnbm9yZVxuICByZXR1cm4gVVJMO1xufVxuXG5mdW5jdGlvbiBnZXRSZXF1ZXN0TW9kdWxlKHByb3RvY29sOiBzdHJpbmcpIHtcbiAgaWYgKHByb3RvY29sID09PSAnaHR0cDonKSB7XG4gICAgcmV0dXJuIGh0dHA7XG4gIH1cblxuICBpZiAocHJvdG9jb2wgPT09ICdodHRwczonKSB7XG4gICAgcmV0dXJuIGh0dHBzO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gaWRlbnRpZnkgcmVxdWVzdCBtZXRob2QgZm9yIFJlZmluZXJ5IEFQSSBDbGllbnQnKTtcbn1cblxuZXhwb3J0IGNsYXNzIEZhaWxlZEpzb25EZXNlcmlhbGl6YXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcmVhZG9ubHkgcmF3RGF0YT86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihyYXdEYXRhPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoJ0ZhaWxlZCB0byBkZXNlcmlhbGl6ZSBKU09OIGRhdGEnKTtcbiAgICB0aGlzLnJhd0RhdGEgPSByYXdEYXRhO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYWRIdHRwUmVzcG9uc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcmVhZG9ubHkgcmVzcG9uc2VDb2RlPzogbnVtYmVyO1xuICByZWFkb25seSByYXdEYXRhITogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlQ29kZTogbnVtYmVyIHwgdW5kZWZpbmVkLCByYXdEYXRhOiBzdHJpbmcpIHtcbiAgICBzdXBlcignQmFkIEh0dHAgcmVzcG9uc2UgcmVjZWl2ZWQnKTtcbiAgICB0aGlzLnJlc3BvbnNlQ29kZSA9IHJlc3BvbnNlQ29kZTtcbiAgICB0aGlzLnJhd0RhdGEgPSByYXdEYXRhO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJlcXVlc3RQYXJhbXMoaG9zdDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHBhcmFtczogaHR0cC5DbGllbnRSZXF1ZXN0QXJncykge1xuICBjb25zdCBVUkwgPSBnZXRVcmwoKTtcblxuICBjb25zdCByZXF1ZXN0VXJpID0gbmV3IFVSTChwYXRoLCBob3N0KTtcblxuICBjb25zdCByZXF1ZXN0TW9kdWxlID0gZ2V0UmVxdWVzdE1vZHVsZShyZXF1ZXN0VXJpLnByb3RvY29sKTtcblxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSByZXF1ZXN0VXJpLnNlYXJjaCAhPT0gdW5kZWZpbmVkID8gYD8ke3JlcXVlc3RVcmkuc2VhcmNofWA6ICcnO1xuXG4gIGNvbnN0IHJlcXVlc3RDb25maWc6IGh0dHAuQ2xpZW50UmVxdWVzdEFyZ3MgPSB7XG4gICAgcHJvdG9jb2w6IHJlcXVlc3RVcmkucHJvdG9jb2wsXG4gICAgaG9zdG5hbWU6IHJlcXVlc3RVcmkuaG9zdG5hbWUsXG4gICAgcG9ydDogcmVxdWVzdFVyaS5wb3J0LFxuICAgIHBhdGg6IHJlcXVlc3RVcmkucGF0aG5hbWUgKyBzZWFyY2hQYXJhbXMsXG4gICAgLi4ucGFyYW1zXG4gIH07XG5cbiAgcmV0dXJuIHtyZXF1ZXN0TW9kdWxlLCByZXF1ZXN0Q29uZmlnfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VSYXdSZXF1ZXN0KGhvc3Q6IHN0cmluZywgcGF0aDogc3RyaW5nLCBwYXJhbXM6IGh0dHAuQ2xpZW50UmVxdWVzdEFyZ3MsIGJvZHk/OiBzdHJpbmcpOiBQcm9taXNlPHJlYWRvbmx5IFtodHRwLkluY29taW5nTWVzc2FnZSwgQnVmZmVyXT4ge1xuICBjb25zdCB7cmVxdWVzdE1vZHVsZSwgcmVxdWVzdENvbmZpZ30gPSBnZXRSZXF1ZXN0UGFyYW1zKGhvc3QsIHBhdGgsIHBhcmFtcyk7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGxldCByZXNwb25zZUJ1ZmZlcjogQnVmZmVyO1xuICAgIGNvbnN0IHJlcSA9IHJlcXVlc3RNb2R1bGUucmVxdWVzdChyZXF1ZXN0Q29uZmlnLCByZXMgPT4ge1xuICAgICAgcmVzLm9uKCdkYXRhJywgKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgY2h1bmsuY29weShyZXNwb25zZUJ1ZmZlcik7XG4gICAgICB9KTtcbiAgICAgIHJlcy5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKFtyZXMsIHJlc3BvbnNlQnVmZmVyXSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJlcS5vbignZXJyb3InLCAoZSkgPT4gcmVqZWN0KGUpKTtcbiAgICByZXEub24oJ3Jlc3BvbnNlJywgcmVzcCA9PiB7XG4gICAgICBjb25zdCBjb250ZW50TGVuZ3RoID0gcmVzcC5oZWFkZXJzWydjb250ZW50LWxlbmd0aCddO1xuXG4gICAgICBpZiAoIWNvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgcmVzcG9uc2VCdWZmZXIgPSBCdWZmZXIuYWxsb2MoMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KGNvbnRlbnRMZW5ndGgpO1xuXG4gICAgICBpZiAoc2l6ZSA8IDApIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdCgnQ29udGVudCBsZW5ndGggaXMgbmVnYXRpdmUnKTtcbiAgICAgIH1cblxuICAgICAgcmVzcG9uc2VCdWZmZXIgPSBCdWZmZXIuYWxsb2Moc2l6ZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoYm9keSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXEud3JpdGUoYm9keSk7XG4gICAgfVxuXG4gICAgcmVxLmVuZCgpO1xuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0PFQ+KGhvc3Q6IHN0cmluZywgcGF0aDogc3RyaW5nLCBwYXJhbXM6IGh0dHAuQ2xpZW50UmVxdWVzdEFyZ3MsIGJvZHk/OiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgW3JlcywgcmVzcG9uc2VCdWZmZXJdID0gYXdhaXQgbWFrZVJhd1JlcXVlc3QoaG9zdCwgcGF0aCwgcGFyYW1zLCBib2R5KTtcblxuICBjb25zdCByZXNwb25zZURhdGEgPSByZXNwb25zZUJ1ZmZlci50b1N0cmluZygpO1xuXG4gIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgY29uc29sZS5sb2coJ2JhZCByZXNwb25zZScsIHtob3N0LCBwYXRoLCBwYXJhbXMsIHJlcywgcmVzcG9uc2VEYXRhfSk7XG4gICAgdGhyb3cgbmV3IEJhZEh0dHBSZXNwb25zZUVycm9yKHJlcy5zdGF0dXNDb2RlLCByZXNwb25zZURhdGEpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBUT0RPOiBWYWxpZGF0ZSB0aGlzIHBhcnNlZCBKU09OIGFnYWluc3Qgc29tZSBzY2hlbWFcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZURhdGEpIGFzIFQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBJZiBkYXRhIGNhbid0IGJlIHBhcnNlZCwgd3JhcCB0aGUgZGF0YS5cbiAgICBjb25zdCBlcnJvciA9IG5ldyBGYWlsZWRKc29uRGVzZXJpYWxpemF0aW9uRXJyb3IocmVzcG9uc2VEYXRhKTtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4iXX0=