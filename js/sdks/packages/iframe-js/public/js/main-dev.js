/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../browser-common/build/main/constants.js":
/*!****************************************************!*\
  !*** ../../browser-common/build/main/constants.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../../../node_modules/process/browser.js");

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.secureFrameSessionVerifyPathname = exports.secureFramePathname = exports.__SECURE_FRAME_URL__ = void 0;
exports.__SECURE_FRAME_URL__ = process.env.REACT_APP_SECURE_FRAME_URL || "http://localhost:37766" || 'http://localhost:37766';
exports.secureFramePathname = "/frame";
exports.secureFrameSessionVerifyPathname = "/session/verify";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLG9CQUFvQixHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSx3QkFBd0IsQ0FBQztBQUNsSSxRQUFBLG1CQUFtQixHQUFHLFFBQVEsQ0FBQTtBQUM5QixRQUFBLGdDQUFnQyxHQUFHLGlCQUFpQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IF9fU0VDVVJFX0ZSQU1FX1VSTF9fOiBzdHJpbmcgPSBwcm9jZXNzLmVudi5SRUFDVF9BUFBfU0VDVVJFX0ZSQU1FX1VSTCB8fCBwcm9jZXNzLmVudi5TRUNVUkVfRlJBTUVfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjM3NzY2JztcbmV4cG9ydCBjb25zdCBzZWN1cmVGcmFtZVBhdGhuYW1lID0gXCIvZnJhbWVcIlxuZXhwb3J0IGNvbnN0IHNlY3VyZUZyYW1lU2Vzc2lvblZlcmlmeVBhdGhuYW1lID0gXCIvc2Vzc2lvbi92ZXJpZnlcIlxuIl19

/***/ }),

/***/ "../../browser-common/build/main/index.js":
/*!************************************************!*\
  !*** ../../browser-common/build/main/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./constants */ "../../browser-common/build/main/constants.js"), exports);
__exportStar(__webpack_require__(/*! ./rpc */ "../../browser-common/build/main/rpc/index.js"), exports);
__exportStar(__webpack_require__(/*! ./style-patcher */ "../../browser-common/build/main/style-patcher/index.js"), exports);
__exportStar(__webpack_require__(/*! ./utils */ "../../browser-common/build/main/utils/index.js"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsOENBQTRCO0FBQzVCLHdDQUFzQjtBQUN0QixrREFBZ0M7QUFDaEMsMENBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9ycGMnO1xuZXhwb3J0ICogZnJvbSAnLi9zdHlsZS1wYXRjaGVyJztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMnO1xuIl19

/***/ }),

/***/ "../../browser-common/build/main/rpc/frame-message-creator.js":
/*!********************************************************************!*\
  !*** ../../browser-common/build/main/rpc/frame-message-creator.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FrameMessageCreator = void 0;
const constants_1 = __webpack_require__(/*! ../constants */ "../../browser-common/build/main/constants.js");
const async_1 = __webpack_require__(/*! ../utils/async */ "../../browser-common/build/main/utils/async.js");
const random_1 = __webpack_require__(/*! ../utils/random */ "../../browser-common/build/main/utils/random.js");
const types_1 = __webpack_require__(/*! ./types */ "../../browser-common/build/main/rpc/types.js");
class FrameMessageCreator {
    constructor(notificationCallback, timeout = 5000) {
        this.frameResponses = {};
        this.frameNotificationCallback = notificationCallback;
        this.timeout = timeout;
    }
    createMessageToFrame(command, data) {
        return {
            command,
            correlationToken: random_1.generateSecureNonce(),
            data: data,
        };
    }
    postReceived(unknownPost) {
        if (!unknownPost.frameNonce && !unknownPost.correlationToken) {
            throw new Error('Unknown post message received without correlationToken or frameNonce, must have one or the other');
        }
        // Notifications have a frameNonce
        if (unknownPost.frameNonce) {
            this.handleNotificationReceived(unknownPost);
            return;
        }
        // Messages are receipt confirmations to things we have sent the frame, and have a correlationToken
        if (unknownPost.correlationToken) {
            this.handleMessageReceived(unknownPost);
            return;
        }
    }
    // Notifications start in the frame and are sent here to notify us of events
    handleNotificationReceived(notification) {
        const notificationTypes = ['NotifyOnBlur', 'NotifyOnStart'];
        if (!notificationTypes.includes(notification.command)) {
            throw new Error(`Received Frame Notification of unknown type, allowed types are ${notificationTypes.toString()}`);
        }
        this.frameNotificationCallback(notification);
        return;
    }
    // Messages are responses from the frame to things we have sent it
    handleMessageReceived(message) {
        // TODO: Validate response has valid JSON
        this.frameResponses[message.correlationToken] = message;
    }
    async sendMessageToFrameWithReply(frameContext, message) {
        const startTime = new Date();
        return new Promise(async (resolve, reject) => {
            // TODO: Make this domain be configurable
            frameContext.postMessage(JSON.stringify(message), constants_1.__SECURE_FRAME_URL__);
            await async_1.timeout(2);
            // Spin lock that waits until we receive a response in another "thread".
            // This will return false when a message is in the response buffer "frameResponses".
            while (this.frameResponses[message.correlationToken] === undefined) {
                const currentTime = new Date();
                // Throw a timeout if we don't get a response.
                if (currentTime.getTime() - startTime.getTime() > this.timeout) {
                    return reject('Timeout exceeded for frame call: ' + message.correlationToken);
                }
                // Delay loop asynchronously
                await async_1.timeout(5);
            }
            const rawResponse = this.frameResponses[message.correlationToken];
            delete this.frameResponses[message.correlationToken];
            if (rawResponse.command !== types_1.OutboundToInboundMessageValueMap[message.command]) {
                console.error('Wrong response message type from secure frame', rawResponse);
                return null;
            }
            // TODO: Add JSON validation to prevent badly formatted messaged from slipping through.
            // Or use Protobuf..?
            resolve(rawResponse);
        });
    }
    convertRawMessageToTypedMessage(rawMessage) {
        return rawMessage;
    }
    processFrameResponse(message) {
        // TODO: Add validation for this RPC here.
        switch (message.command) {
            case 'ReceiveCommittedToken':
                return this.convertRawMessageToTypedMessage(message);
        }
        return null;
    }
}
exports.FrameMessageCreator = FrameMessageCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWUtbWVzc2FnZS1jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JwYy9mcmFtZS1tZXNzYWdlLWNyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQW9EO0FBQ3BELDBDQUF5QztBQUN6Qyw0Q0FBc0Q7QUFFdEQsbUNBUWlCO0FBRWpCLE1BQWEsbUJBQW1CO0lBSzlCLFlBQVksb0JBQXNFLEVBQUUsT0FBTyxHQUFHLElBQUk7UUFDaEcsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLHlCQUF5QixHQUFHLG9CQUFvQixDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxvQkFBb0IsQ0FDbEIsT0FBVSxFQUNWLElBQWdDO1FBRWhDLE9BQU87WUFDTCxPQUFPO1lBQ1AsZ0JBQWdCLEVBQUUsNEJBQW1CLEVBQUU7WUFDdkMsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO0lBQ0osQ0FBQztJQUVELFlBQVksQ0FBQyxXQUEyRDtRQUN0RSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM1RCxNQUFNLElBQUksS0FBSyxDQUNiLGtHQUFrRyxDQUNuRyxDQUFDO1NBQ0g7UUFFRCxrQ0FBa0M7UUFDbEMsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUFFO1lBQzFCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QyxPQUFPO1NBQ1I7UUFDRCxtR0FBbUc7UUFDbkcsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hDLE9BQU87U0FDUjtJQUNILENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsMEJBQTBCLENBQUMsWUFBc0M7UUFDL0QsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLGtFQUFrRSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbkg7UUFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0MsT0FBTztJQUNULENBQUM7SUFFRCxrRUFBa0U7SUFDbEUscUJBQXFCLENBQUMsT0FBNEI7UUFDaEQseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQzFELENBQUM7SUFFRCxLQUFLLENBQUMsMkJBQTJCLENBQy9CLFlBQW9CLEVBQ3BCLE9BQWlEO1FBRWpELE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLHlDQUF5QztZQUN6QyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsZ0NBQW9CLENBQUMsQ0FBQztZQUN4RSxNQUFNLGVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqQix3RUFBd0U7WUFDeEUsb0ZBQW9GO1lBQ3BGLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ2xFLE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBRS9CLDhDQUE4QztnQkFDOUMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQzlELE9BQU8sTUFBTSxDQUFDLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUMvRTtnQkFFRCw0QkFBNEI7Z0JBQzVCLE1BQU0sZUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xCO1lBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVsRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFckQsSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLHdDQUFnQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDN0UsT0FBTyxDQUFDLEtBQUssQ0FBQywrQ0FBK0MsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDNUUsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELHVGQUF1RjtZQUN2RixxQkFBcUI7WUFDckIsT0FBTyxDQUFDLFdBQXVGLENBQUMsQ0FBQztRQUNuRyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQkFBK0IsQ0FDN0IsVUFBK0I7UUFFL0IsT0FBTyxVQUFxRCxDQUFDO0lBQy9ELENBQUM7SUFFRCxvQkFBb0IsQ0FDbEIsT0FBNEI7UUFFNUIsMENBQTBDO1FBQzFDLFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN2QixLQUFLLHVCQUF1QjtnQkFDMUIsT0FBTyxJQUFJLENBQUMsK0JBQStCLENBQTBCLE9BQU8sQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFqSEQsa0RBaUhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX19TRUNVUkVfRlJBTUVfVVJMX18gfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgdGltZW91dCB9IGZyb20gJy4uL3V0aWxzL2FzeW5jJztcbmltcG9ydCB7IGdlbmVyYXRlU2VjdXJlTm9uY2UgfSBmcm9tICcuLi91dGlscy9yYW5kb20nO1xuXG5pbXBvcnQge1xuICBGcmFtZU1lc3NhZ2UsXG4gIEluYm91bmRGcmFtZU1lc3NhZ2VNYXAsXG4gIE91dGJvdW5kRnJhbWVNZXNzYWdlTWFwLFxuICBPdXRib3VuZFRvSW5ib3VuZE1lc3NhZ2VUeXBlTWFwLFxuICBPdXRib3VuZFRvSW5ib3VuZE1lc3NhZ2VWYWx1ZU1hcCxcbiAgVW5rbm93bkZyYW1lTWVzc2FnZSxcbiAgVW5rbm93bkZyYW1lTm90aWZpY2F0aW9uLFxufSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIEZyYW1lTWVzc2FnZUNyZWF0b3Ige1xuICBwcml2YXRlIHJlYWRvbmx5IGZyYW1lUmVzcG9uc2VzOiBSZWNvcmQ8c3RyaW5nLCBVbmtub3duRnJhbWVNZXNzYWdlPjtcbiAgcHJpdmF0ZSByZWFkb25seSB0aW1lb3V0OiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgZnJhbWVOb3RpZmljYXRpb25DYWxsYmFjayE6IChub3RpZmljYXRpb246IFVua25vd25GcmFtZU5vdGlmaWNhdGlvbikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihub3RpZmljYXRpb25DYWxsYmFjazogKG5vdGlmaWNhdGlvbjogVW5rbm93bkZyYW1lTm90aWZpY2F0aW9uKSA9PiB2b2lkLCB0aW1lb3V0ID0gNTAwMCkge1xuICAgIHRoaXMuZnJhbWVSZXNwb25zZXMgPSB7fTtcbiAgICB0aGlzLmZyYW1lTm90aWZpY2F0aW9uQ2FsbGJhY2sgPSBub3RpZmljYXRpb25DYWxsYmFjaztcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICB9XG5cbiAgY3JlYXRlTWVzc2FnZVRvRnJhbWU8SyBleHRlbmRzIGtleW9mIE91dGJvdW5kRnJhbWVNZXNzYWdlTWFwPihcbiAgICBjb21tYW5kOiBLLFxuICAgIGRhdGE6IE91dGJvdW5kRnJhbWVNZXNzYWdlTWFwW0tdXG4gICk6IEZyYW1lTWVzc2FnZTxPdXRib3VuZEZyYW1lTWVzc2FnZU1hcCwgSz4ge1xuICAgIHJldHVybiB7XG4gICAgICBjb21tYW5kLFxuICAgICAgY29ycmVsYXRpb25Ub2tlbjogZ2VuZXJhdGVTZWN1cmVOb25jZSgpLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICB9O1xuICB9XG5cbiAgcG9zdFJlY2VpdmVkKHVua25vd25Qb3N0OiBVbmtub3duRnJhbWVNZXNzYWdlIHwgVW5rbm93bkZyYW1lTm90aWZpY2F0aW9uKTogdm9pZCB7XG4gICAgaWYgKCF1bmtub3duUG9zdC5mcmFtZU5vbmNlICYmICF1bmtub3duUG9zdC5jb3JyZWxhdGlvblRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdVbmtub3duIHBvc3QgbWVzc2FnZSByZWNlaXZlZCB3aXRob3V0IGNvcnJlbGF0aW9uVG9rZW4gb3IgZnJhbWVOb25jZSwgbXVzdCBoYXZlIG9uZSBvciB0aGUgb3RoZXInXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIE5vdGlmaWNhdGlvbnMgaGF2ZSBhIGZyYW1lTm9uY2VcbiAgICBpZiAodW5rbm93blBvc3QuZnJhbWVOb25jZSkge1xuICAgICAgdGhpcy5oYW5kbGVOb3RpZmljYXRpb25SZWNlaXZlZCh1bmtub3duUG9zdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIE1lc3NhZ2VzIGFyZSByZWNlaXB0IGNvbmZpcm1hdGlvbnMgdG8gdGhpbmdzIHdlIGhhdmUgc2VudCB0aGUgZnJhbWUsIGFuZCBoYXZlIGEgY29ycmVsYXRpb25Ub2tlblxuICAgIGlmICh1bmtub3duUG9zdC5jb3JyZWxhdGlvblRva2VuKSB7XG4gICAgICB0aGlzLmhhbmRsZU1lc3NhZ2VSZWNlaXZlZCh1bmtub3duUG9zdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLy8gTm90aWZpY2F0aW9ucyBzdGFydCBpbiB0aGUgZnJhbWUgYW5kIGFyZSBzZW50IGhlcmUgdG8gbm90aWZ5IHVzIG9mIGV2ZW50c1xuICBoYW5kbGVOb3RpZmljYXRpb25SZWNlaXZlZChub3RpZmljYXRpb246IFVua25vd25GcmFtZU5vdGlmaWNhdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IG5vdGlmaWNhdGlvblR5cGVzID0gWydOb3RpZnlPbkJsdXInLCAnTm90aWZ5T25TdGFydCddO1xuICAgIGlmICghbm90aWZpY2F0aW9uVHlwZXMuaW5jbHVkZXMobm90aWZpY2F0aW9uLmNvbW1hbmQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlY2VpdmVkIEZyYW1lIE5vdGlmaWNhdGlvbiBvZiB1bmtub3duIHR5cGUsIGFsbG93ZWQgdHlwZXMgYXJlICR7bm90aWZpY2F0aW9uVHlwZXMudG9TdHJpbmcoKX1gKTtcbiAgICB9XG4gICAgdGhpcy5mcmFtZU5vdGlmaWNhdGlvbkNhbGxiYWNrKG5vdGlmaWNhdGlvbik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gTWVzc2FnZXMgYXJlIHJlc3BvbnNlcyBmcm9tIHRoZSBmcmFtZSB0byB0aGluZ3Mgd2UgaGF2ZSBzZW50IGl0XG4gIGhhbmRsZU1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlOiBVbmtub3duRnJhbWVNZXNzYWdlKTogdm9pZCB7XG4gICAgLy8gVE9ETzogVmFsaWRhdGUgcmVzcG9uc2UgaGFzIHZhbGlkIEpTT05cbiAgICB0aGlzLmZyYW1lUmVzcG9uc2VzW21lc3NhZ2UuY29ycmVsYXRpb25Ub2tlbl0gPSBtZXNzYWdlO1xuICB9XG5cbiAgYXN5bmMgc2VuZE1lc3NhZ2VUb0ZyYW1lV2l0aFJlcGx5PEsgZXh0ZW5kcyBrZXlvZiBPdXRib3VuZEZyYW1lTWVzc2FnZU1hcCB8IGtleW9mIE91dGJvdW5kVG9JbmJvdW5kTWVzc2FnZVR5cGVNYXA+KFxuICAgIGZyYW1lQ29udGV4dDogV2luZG93LFxuICAgIG1lc3NhZ2U6IEZyYW1lTWVzc2FnZTxPdXRib3VuZEZyYW1lTWVzc2FnZU1hcCwgSz5cbiAgKTogUHJvbWlzZTxGcmFtZU1lc3NhZ2U8SW5ib3VuZEZyYW1lTWVzc2FnZU1hcCwgT3V0Ym91bmRUb0luYm91bmRNZXNzYWdlVHlwZU1hcFtLXT4gfCBudWxsPiB7XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gVE9ETzogTWFrZSB0aGlzIGRvbWFpbiBiZSBjb25maWd1cmFibGVcbiAgICAgIGZyYW1lQ29udGV4dC5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgX19TRUNVUkVfRlJBTUVfVVJMX18pO1xuICAgICAgYXdhaXQgdGltZW91dCgyKTtcblxuICAgICAgLy8gU3BpbiBsb2NrIHRoYXQgd2FpdHMgdW50aWwgd2UgcmVjZWl2ZSBhIHJlc3BvbnNlIGluIGFub3RoZXIgXCJ0aHJlYWRcIi5cbiAgICAgIC8vIFRoaXMgd2lsbCByZXR1cm4gZmFsc2Ugd2hlbiBhIG1lc3NhZ2UgaXMgaW4gdGhlIHJlc3BvbnNlIGJ1ZmZlciBcImZyYW1lUmVzcG9uc2VzXCIuXG4gICAgICB3aGlsZSAodGhpcy5mcmFtZVJlc3BvbnNlc1ttZXNzYWdlLmNvcnJlbGF0aW9uVG9rZW5dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8vIFRocm93IGEgdGltZW91dCBpZiB3ZSBkb24ndCBnZXQgYSByZXNwb25zZS5cbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lLmdldFRpbWUoKSAtIHN0YXJ0VGltZS5nZXRUaW1lKCkgPiB0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KCdUaW1lb3V0IGV4Y2VlZGVkIGZvciBmcmFtZSBjYWxsOiAnICsgbWVzc2FnZS5jb3JyZWxhdGlvblRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlbGF5IGxvb3AgYXN5bmNocm9ub3VzbHlcbiAgICAgICAgYXdhaXQgdGltZW91dCg1KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmF3UmVzcG9uc2UgPSB0aGlzLmZyYW1lUmVzcG9uc2VzW21lc3NhZ2UuY29ycmVsYXRpb25Ub2tlbl07XG5cbiAgICAgIGRlbGV0ZSB0aGlzLmZyYW1lUmVzcG9uc2VzW21lc3NhZ2UuY29ycmVsYXRpb25Ub2tlbl07XG5cbiAgICAgIGlmIChyYXdSZXNwb25zZS5jb21tYW5kICE9PSBPdXRib3VuZFRvSW5ib3VuZE1lc3NhZ2VWYWx1ZU1hcFttZXNzYWdlLmNvbW1hbmRdKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dyb25nIHJlc3BvbnNlIG1lc3NhZ2UgdHlwZSBmcm9tIHNlY3VyZSBmcmFtZScsIHJhd1Jlc3BvbnNlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IEFkZCBKU09OIHZhbGlkYXRpb24gdG8gcHJldmVudCBiYWRseSBmb3JtYXR0ZWQgbWVzc2FnZWQgZnJvbSBzbGlwcGluZyB0aHJvdWdoLlxuICAgICAgLy8gT3IgdXNlIFByb3RvYnVmLi4/XG4gICAgICByZXNvbHZlKHJhd1Jlc3BvbnNlIGFzIEZyYW1lTWVzc2FnZTxJbmJvdW5kRnJhbWVNZXNzYWdlTWFwLCBPdXRib3VuZFRvSW5ib3VuZE1lc3NhZ2VUeXBlTWFwW0tdPik7XG4gICAgfSk7XG4gIH1cblxuICBjb252ZXJ0UmF3TWVzc2FnZVRvVHlwZWRNZXNzYWdlPEsgZXh0ZW5kcyBrZXlvZiBJbmJvdW5kRnJhbWVNZXNzYWdlTWFwPihcbiAgICByYXdNZXNzYWdlOiBVbmtub3duRnJhbWVNZXNzYWdlXG4gICk6IEZyYW1lTWVzc2FnZTxJbmJvdW5kRnJhbWVNZXNzYWdlTWFwLCBLPiB7XG4gICAgcmV0dXJuIHJhd01lc3NhZ2UgYXMgRnJhbWVNZXNzYWdlPEluYm91bmRGcmFtZU1lc3NhZ2VNYXAsIEs+O1xuICB9XG5cbiAgcHJvY2Vzc0ZyYW1lUmVzcG9uc2UoXG4gICAgbWVzc2FnZTogVW5rbm93bkZyYW1lTWVzc2FnZVxuICApOiBGcmFtZU1lc3NhZ2U8SW5ib3VuZEZyYW1lTWVzc2FnZU1hcCwga2V5b2YgSW5ib3VuZEZyYW1lTWVzc2FnZU1hcD4gfCBudWxsIHtcbiAgICAvLyBUT0RPOiBBZGQgdmFsaWRhdGlvbiBmb3IgdGhpcyBSUEMgaGVyZS5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UuY29tbWFuZCkge1xuICAgICAgY2FzZSAnUmVjZWl2ZUNvbW1pdHRlZFRva2VuJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFJhd01lc3NhZ2VUb1R5cGVkTWVzc2FnZTwnUmVjZWl2ZUNvbW1pdHRlZFRva2VuJz4obWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "../../browser-common/build/main/rpc/index.js":
/*!****************************************************!*\
  !*** ../../browser-common/build/main/rpc/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./frame-message-creator */ "../../browser-common/build/main/rpc/frame-message-creator.js"), exports);
__exportStar(__webpack_require__(/*! ./listener */ "../../browser-common/build/main/rpc/listener.js"), exports);
__exportStar(__webpack_require__(/*! ./types */ "../../browser-common/build/main/rpc/types.js"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnBjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDBEQUF3QztBQUN4Qyw2Q0FBMkI7QUFDM0IsMENBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9mcmFtZS1tZXNzYWdlLWNyZWF0b3InO1xuZXhwb3J0ICogZnJvbSAnLi9saXN0ZW5lcic7XG5leHBvcnQgKiBmcm9tICcuL3R5cGVzJztcbiJdfQ==

/***/ }),

/***/ "../../browser-common/build/main/rpc/listener.js":
/*!*******************************************************!*\
  !*** ../../browser-common/build/main/rpc/listener.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addReactEventListener = exports.addMessageListener = void 0;
// import {patchStyle} from '../style-patcher/write';
const constants_1 = __webpack_require__(/*! ../constants */ "../../browser-common/build/main/constants.js");
const json_1 = __webpack_require__(/*! ../utils/json */ "../../browser-common/build/main/utils/json.js");
/**
 * The goal of this function is to receive RPC calls from the secure frame.
 * @param window Browser `window` instance.
 * @param domInstance Browser `document` instance.
 */
function addMessageListener(window, domInstance) {
    window.addEventListener('message', (event) => {
        console.log('parent message received:', event);
        if (event.origin !== constants_1.__SECURE_FRAME_URL__) {
            return;
        }
        if (!event.source) {
            console.error('invalid source of event');
            return;
        }
        const secureContainer = domInstance.querySelector(`[data-secure-frame-nonce="${event.data}"]`);
        if (!secureContainer) {
            console.error('Unable to locate secure container with nonce:', event.data);
            return;
        }
        // @ts-ignore
        const inputElementStyle = window.SECURE_FORM_ORIGINAL_ELEMENTS[event.data]; // secureContainer.querySelector('input') as (HTMLElement | undefined);
        if (!inputElementStyle) {
            console.error('Unable to find child input element for container with nonce:', event.data);
            return;
        }
        const secureIframe = secureContainer.querySelector('iframe');
        if (!secureIframe) {
            console.error('Missing iframe in secure container');
            return;
        }
        // const styleInfo = getStyleInfo(inputElement);
        // patchStyle(domInstance, secureIframe, inputElementStyle);
        // @ts-ignore
        event.source.postMessage(inputElementStyle, event.origin);
    }, false);
}
exports.addMessageListener = addMessageListener;
function addReactEventListener(window, controller, callback) {
    const abortSignal = controller.signal;
    // Note: The AbortSignal seems to be unknown to Typescript.
    // @ts-ignore
    const eventListenerOptions = { signal: abortSignal };
    window.addEventListener('message', (event) => {
        if (event.origin !== constants_1.__SECURE_FRAME_URL__) {
            return;
        }
        const frameMessage = json_1.safeParseJson(event.data);
        // Invalid data passed from frame.
        if (frameMessage === null) {
            console.error('Frame message null:', frameMessage);
            return;
        }
        // Message is not for us
        // if (frameMessage.correlationToken !== token) {
        //   console.log('correlation token mismatch:', frameMessage.correlationToken, token);
        //   return;
        // }
        callback(frameMessage);
    }, eventListenerOptions);
    return abortSignal;
}
exports.addReactEventListener = addReactEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnBjL2xpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFxRDtBQUNyRCw0Q0FBa0Q7QUFDbEQsd0NBQThDO0FBRzlDOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsV0FBcUI7SUFDdEUsTUFBTSxDQUFDLGdCQUFnQixDQUNyQixTQUFTLEVBQ1QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFL0MsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLGdDQUFvQixFQUFFO1lBQ3pDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN6QyxPQUFPO1NBQ1I7UUFFRCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLDZCQUE2QixLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUUvRixJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0NBQStDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNFLE9BQU87U0FDUjtRQUVELGFBQWE7UUFDYixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx1RUFBdUU7UUFFbkosSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsOERBQThELEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFGLE9BQU87U0FDUjtRQUVELE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDcEQsT0FBTztTQUNSO1FBRUQsZ0RBQWdEO1FBRWhELDREQUE0RDtRQUU1RCxhQUFhO1FBQ2IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUMsRUFDRCxLQUFLLENBQ04sQ0FBQztBQUNKLENBQUM7QUE5Q0QsZ0RBOENDO0FBRUQsU0FBZ0IscUJBQXFCLENBQ25DLE1BQWMsRUFDZCxVQUEyQixFQUMzQixRQUFnRDtJQUVoRCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRXRDLDJEQUEyRDtJQUMzRCxhQUFhO0lBQ2IsTUFBTSxvQkFBb0IsR0FBNEIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFFOUUsTUFBTSxDQUFDLGdCQUFnQixDQUNyQixTQUFTLEVBQ1QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNSLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxnQ0FBb0IsRUFBRTtZQUN6QyxPQUFPO1NBQ1I7UUFFRCxNQUFNLFlBQVksR0FBRyxvQkFBYSxDQUFzQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEUsa0NBQWtDO1FBQ2xDLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtZQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ25ELE9BQU87U0FDUjtRQUVELHdCQUF3QjtRQUN4QixpREFBaUQ7UUFDakQsc0ZBQXNGO1FBQ3RGLFlBQVk7UUFDWixJQUFJO1FBRUosUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pCLENBQUMsRUFDRCxvQkFBb0IsQ0FDckIsQ0FBQztJQUVGLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUF0Q0Qsc0RBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHtwYXRjaFN0eWxlfSBmcm9tICcuLi9zdHlsZS1wYXRjaGVyL3dyaXRlJztcbmltcG9ydCB7X19TRUNVUkVfRlJBTUVfVVJMX199IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBzYWZlUGFyc2VKc29uIH0gZnJvbSAnLi4vdXRpbHMvanNvbic7XG5pbXBvcnQgeyBVbmtub3duRnJhbWVNZXNzYWdlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogVGhlIGdvYWwgb2YgdGhpcyBmdW5jdGlvbiBpcyB0byByZWNlaXZlIFJQQyBjYWxscyBmcm9tIHRoZSBzZWN1cmUgZnJhbWUuXG4gKiBAcGFyYW0gd2luZG93IEJyb3dzZXIgYHdpbmRvd2AgaW5zdGFuY2UuXG4gKiBAcGFyYW0gZG9tSW5zdGFuY2UgQnJvd3NlciBgZG9jdW1lbnRgIGluc3RhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkTWVzc2FnZUxpc3RlbmVyKHdpbmRvdzogV2luZG93LCBkb21JbnN0YW5jZTogRG9jdW1lbnQpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgJ21lc3NhZ2UnLFxuICAgIChldmVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3BhcmVudCBtZXNzYWdlIHJlY2VpdmVkOicsIGV2ZW50KTtcblxuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiAhPT0gX19TRUNVUkVfRlJBTUVfVVJMX18pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWV2ZW50LnNvdXJjZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdpbnZhbGlkIHNvdXJjZSBvZiBldmVudCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlY3VyZUNvbnRhaW5lciA9IGRvbUluc3RhbmNlLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNlY3VyZS1mcmFtZS1ub25jZT1cIiR7ZXZlbnQuZGF0YX1cIl1gKTtcblxuICAgICAgaWYgKCFzZWN1cmVDb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIGxvY2F0ZSBzZWN1cmUgY29udGFpbmVyIHdpdGggbm9uY2U6JywgZXZlbnQuZGF0YSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgaW5wdXRFbGVtZW50U3R5bGUgPSB3aW5kb3cuU0VDVVJFX0ZPUk1fT1JJR0lOQUxfRUxFTUVOVFNbZXZlbnQuZGF0YV07IC8vIHNlY3VyZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpIGFzIChIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCk7XG5cbiAgICAgIGlmICghaW5wdXRFbGVtZW50U3R5bGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIGZpbmQgY2hpbGQgaW5wdXQgZWxlbWVudCBmb3IgY29udGFpbmVyIHdpdGggbm9uY2U6JywgZXZlbnQuZGF0YSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2VjdXJlSWZyYW1lID0gc2VjdXJlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xuXG4gICAgICBpZiAoIXNlY3VyZUlmcmFtZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdNaXNzaW5nIGlmcmFtZSBpbiBzZWN1cmUgY29udGFpbmVyJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY29uc3Qgc3R5bGVJbmZvID0gZ2V0U3R5bGVJbmZvKGlucHV0RWxlbWVudCk7XG5cbiAgICAgIC8vIHBhdGNoU3R5bGUoZG9tSW5zdGFuY2UsIHNlY3VyZUlmcmFtZSwgaW5wdXRFbGVtZW50U3R5bGUpO1xuXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBldmVudC5zb3VyY2UucG9zdE1lc3NhZ2UoaW5wdXRFbGVtZW50U3R5bGUsIGV2ZW50Lm9yaWdpbik7XG4gICAgfSxcbiAgICBmYWxzZVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkUmVhY3RFdmVudExpc3RlbmVyKFxuICB3aW5kb3c6IFdpbmRvdyxcbiAgY29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyLFxuICBjYWxsYmFjazogKG1lc3NhZ2U6IFVua25vd25GcmFtZU1lc3NhZ2UpID0+IHZvaWRcbik6IEFib3J0U2lnbmFsIHtcbiAgY29uc3QgYWJvcnRTaWduYWwgPSBjb250cm9sbGVyLnNpZ25hbDtcblxuICAvLyBOb3RlOiBUaGUgQWJvcnRTaWduYWwgc2VlbXMgdG8gYmUgdW5rbm93biB0byBUeXBlc2NyaXB0LlxuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGV2ZW50TGlzdGVuZXJPcHRpb25zOiBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyA9IHsgc2lnbmFsOiBhYm9ydFNpZ25hbCB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICdtZXNzYWdlJyxcbiAgICAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IF9fU0VDVVJFX0ZSQU1FX1VSTF9fKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZnJhbWVNZXNzYWdlID0gc2FmZVBhcnNlSnNvbjxVbmtub3duRnJhbWVNZXNzYWdlPihldmVudC5kYXRhKTtcblxuICAgICAgLy8gSW52YWxpZCBkYXRhIHBhc3NlZCBmcm9tIGZyYW1lLlxuICAgICAgaWYgKGZyYW1lTWVzc2FnZSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGcmFtZSBtZXNzYWdlIG51bGw6JywgZnJhbWVNZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBNZXNzYWdlIGlzIG5vdCBmb3IgdXNcbiAgICAgIC8vIGlmIChmcmFtZU1lc3NhZ2UuY29ycmVsYXRpb25Ub2tlbiAhPT0gdG9rZW4pIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ2NvcnJlbGF0aW9uIHRva2VuIG1pc21hdGNoOicsIGZyYW1lTWVzc2FnZS5jb3JyZWxhdGlvblRva2VuLCB0b2tlbik7XG4gICAgICAvLyAgIHJldHVybjtcbiAgICAgIC8vIH1cblxuICAgICAgY2FsbGJhY2soZnJhbWVNZXNzYWdlKTtcbiAgICB9LFxuICAgIGV2ZW50TGlzdGVuZXJPcHRpb25zXG4gICk7XG5cbiAgcmV0dXJuIGFib3J0U2lnbmFsO1xufVxuIl19

/***/ }),

/***/ "../../browser-common/build/main/rpc/types.js":
/*!****************************************************!*\
  !*** ../../browser-common/build/main/rpc/types.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutboundToInboundMessageValueMap = void 0;
exports.OutboundToInboundMessageValueMap = {
    CommitToken: 'ReceiveCommittedToken',
    Attributes: 'ReceiveAttributesConfirmation',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnBjL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQTJFYSxRQUFBLGdDQUFnQyxHQUE4QjtJQUN6RSxXQUFXLEVBQUUsdUJBQXVCO0lBQ3BDLFVBQVUsRUFBRSwrQkFBK0I7Q0FDNUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgRnJhbWVNZXNzYWdlPEssIFQgZXh0ZW5kcyBrZXlvZiBLPiB7XG4gIGNvbW1hbmQ6IFQ7XG4gIGNvcnJlbGF0aW9uVG9rZW46IHN0cmluZztcbiAgZGF0YTogS1tUXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVbmtub3duRnJhbWVNZXNzYWdlIHtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBjb3JyZWxhdGlvblRva2VuOiBzdHJpbmc7XG4gIGZyYW1lTm9uY2U/OiB1bmRlZmluZWQ7XG4gIGRhdGE6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGcmFtZU5vdGlmaWNhdGlvbjxLLCBUIGV4dGVuZHMga2V5b2YgSz4ge1xuICBjb21tYW5kOiBUO1xuICBmcmFtZU5vbmNlOiBzdHJpbmc7XG4gIGRhdGE6IEtbVF07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVW5rbm93bkZyYW1lTm90aWZpY2F0aW9uIHtcbiAgY29tbWFuZDogc3RyaW5nO1xuICAvLyBOb3RpZmljYXRpb25zIGRvbid0IGhhdmUgY29ycmVsYXRpb24gdG9rZW5zXG4gIGNvcnJlbGF0aW9uVG9rZW4/OiB1bmRlZmluZWQ7XG4gIGZyYW1lTm9uY2U6IHN0cmluZztcbiAgZGF0YTogYW55O1xufVxuXG4vLyBUZWxsIHRoZSBpZnJhbWUgdG8gY29tbWl0IGl0cyBkYXRhIHRvIHRoZSBzZXJ2ZXIgYW5kIHNlbmQgYmFjayBhIHRva2VuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1pdFRva2VuTWVzc2FnZSB7fVxuLy8gSW5pdGlhbGl6ZSBvciB1cGRhdGUgc29tZSBhdHRyaWJ1dGUgb2YgdGhlIGlmcmFtZVxuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGVzTWVzc2FnZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHN0eWxlPzogc3RyaW5nO1xuICB0b2tlbj86IHN0cmluZztcbiAgdHlwZT86IHN0cmluZztcbn1cblxuLy8gTm90aWZpY2F0aW9ucyBmcm9tIHRoZSBpZnJhbWVcbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZ5T25CbHVyTWVzc2FnZSB7fVxuZXhwb3J0IGludGVyZmFjZSBOb3RpZnlPblN0YXJ0TWVzc2FnZSB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlY2VpdmVDb21taXR0ZWRUb2tlbk1lc3NhZ2Uge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICB0b2tlbj86IHN0cmluZztcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjZWl2ZWRBdHRyaWJ1dGVzTWVzc2FnZSB7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG4gIGVycm9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE91dGJvdW5kRnJhbWVNZXNzYWdlTWFwIHtcbiAgQ29tbWl0VG9rZW46IENvbW1pdFRva2VuTWVzc2FnZTtcbiAgQXR0cmlidXRlczogQXR0cmlidXRlc01lc3NhZ2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5ib3VuZEZyYW1lTWVzc2FnZU1hcCB7XG4gIFJlY2VpdmVDb21taXR0ZWRUb2tlbjogUmVjZWl2ZUNvbW1pdHRlZFRva2VuTWVzc2FnZTtcbiAgUmVjZWl2ZUF0dHJpYnV0ZXNDb25maXJtYXRpb246IFJlY2VpdmVkQXR0cmlidXRlc01lc3NhZ2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5ib3VuZEZyYW1lTm90aWZpY2F0aW9uTWFwIHtcbiAgTm90aWZ5T25CbHVyOiBOb3RpZnlPbkJsdXJNZXNzYWdlO1xuICBOb3RpZnlPblN0YXJ0OiBOb3RpZnlPblN0YXJ0TWVzc2FnZTtcbn1cblxuZXhwb3J0IHR5cGUgT3V0Ym91bmRNZXNzYWdlTG9va3VwVHlwZSA9IHtcbiAgW2tleSBpbiBrZXlvZiBPdXRib3VuZEZyYW1lTWVzc2FnZU1hcF06IGtleW9mIEluYm91bmRGcmFtZU1lc3NhZ2VNYXA7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIE91dGJvdW5kVG9JbmJvdW5kTWVzc2FnZVR5cGVNYXAgZXh0ZW5kcyBPdXRib3VuZE1lc3NhZ2VMb29rdXBUeXBlIHtcbiAgQ29tbWl0VG9rZW46ICdSZWNlaXZlQ29tbWl0dGVkVG9rZW4nO1xufVxuXG5leHBvcnQgY29uc3QgT3V0Ym91bmRUb0luYm91bmRNZXNzYWdlVmFsdWVNYXA6IE91dGJvdW5kTWVzc2FnZUxvb2t1cFR5cGUgPSB7XG4gIENvbW1pdFRva2VuOiAnUmVjZWl2ZUNvbW1pdHRlZFRva2VuJyxcbiAgQXR0cmlidXRlczogJ1JlY2VpdmVBdHRyaWJ1dGVzQ29uZmlybWF0aW9uJyxcbn07XG4iXX0=

/***/ }),

/***/ "../../browser-common/build/main/style-patcher/constants.js":
/*!******************************************************************!*\
  !*** ../../browser-common/build/main/style-patcher/constants.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.INLINE_SKIPPED_PROPERTIES = exports.SKIPPED_PROPERTIES = exports.PLACEHOLDER_ELEMENTS = exports.NO_GENERATE_CONTENT_ELEMENTS = exports.ELEMENT_ATTRIBUTE_WHITELIST = exports.PARENT_ELEMENT_STYLE_ATTRIBUTES = exports.VOID_ELEMENTS = exports.REPLACED_ELEMENTS = exports.SUPPORTED_PSEUDO_SELECTORS = void 0;
exports.SUPPORTED_PSEUDO_SELECTORS = [
    '::after',
    '::before',
    '::first-letter',
    '::first-line',
    '::marker',
    '::placeholder',
    '::selection',
];
exports.REPLACED_ELEMENTS = [
    'iframe',
    'video',
    'embed',
    'img',
    'audio',
    'option',
    'canvas',
    'object',
    'applet',
];
exports.VOID_ELEMENTS = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
];
exports.PARENT_ELEMENT_STYLE_ATTRIBUTES = [
    'align-self',
    'block-size',
    'flex',
    'flex-grow',
    'flex-shrink',
    'height',
    'max-block-size',
    'max-height',
    'max-inline-size',
    'max-width',
    'margin',
    'margin-block-end',
    'margin-block-start',
    'margin-bottom',
    'margin-inline-end',
    'margin-inline-start',
    'margin-left',
    'margin-right',
    'margin-top',
    'min-height',
    'min-width',
    'vertical-align',
    'width',
];
exports.ELEMENT_ATTRIBUTE_WHITELIST = [
    'align-content',
    'align-items',
    'appearance',
    'backface-visibility',
    'background-attachment',
    'background-blend-mode',
    'background-clip',
    'background-color',
    'background-image',
    'background-origin',
    'background-position',
    'background-position-x',
    'background-position-y',
    'background-repeat',
    'background-size',
    'border-block-end-color',
    'border-block-end-style',
    'border-block-end-width',
    'border-block-start-color',
    'border-block-start-style',
    'border-block-start-width',
    'border-bottom-color',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
    'border-bottom-style',
    'border-bottom-width',
    'border-collapse',
    'border-end-end-radius',
    'border-end-start-radius',
    'border-image-outset',
    'border-image-repeat',
    'border-image-slice',
    'border-image-source',
    'border-image-width',
    'border-inline-end-color',
    'border-inline-end-style',
    'border-inline-end-width',
    'border-inline-start-color',
    'border-inline-start-style',
    'border-inline-start-width',
    'border-left-color',
    'border-left-style',
    'border-left-width',
    'border-right-color',
    'border-right-style',
    'border-right-width',
    'border-spacing',
    'border-start-end-radius',
    'border-start-start-radius',
    'border-top-color',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-top-style',
    'border-top-width',
    'box-decoration-break',
    'box-shadow',
    'box-sizing',
    'break-after',
    'break-before',
    'break-inside',
    'caption-side',
    'caret-color',
    'clear',
    'clip',
    'clip-path',
    'clip-rule',
    'color',
    'color-adjust',
    'color-interpolation',
    'color-interpolation-filters',
    'column-count',
    'column-fill',
    'column-gap',
    'column-rule-color',
    'column-rule-style',
    'column-rule-width',
    'column-span',
    'column-width',
    'contain',
    'content',
    'counter-increment',
    'counter-reset',
    'counter-set',
    'cursor',
    'direction',
    'dominant-baseline',
    'fill',
    'fill-opacity',
    'fill-rule',
    'filter',
    'flood-color',
    'flood-opacity',
    'font-family',
    'font-feature-settings',
    'font-kerning',
    'font-language-override',
    'font-optical-sizing',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-synthesis',
    'font-variant',
    'font-variant-alternates',
    'font-variant-caps',
    'font-variant-east-asian',
    'font-variant-ligatures',
    'font-variant-numeric',
    'font-variant-position',
    'font-variation-settings',
    'font-weight',
    'hyphens',
    'image-orientation',
    'image-rendering',
    'ime-mode',
    'inline-size',
    'inset-block-end',
    'inset-block-start',
    'inset-inline-end',
    'inset-inline-start',
    'letter-spacing',
    'lighting-color',
    'line-break',
    'line-height',
    'list-style-image',
    'list-style-position',
    'list-style-type',
    'marker-end',
    'marker-mid',
    'marker-start',
    'mask',
    'mask-clip',
    'mask-composite',
    'mask-image',
    'mask-mode',
    'mask-origin',
    'mask-position',
    'mask-position-x',
    'mask-position-y',
    'mask-repeat',
    'mask-size',
    'mask-type',
    'mix-blend-mode',
    'object-fit',
    'object-position',
    'offset-anchor',
    'offset-distance',
    'offset-path',
    'offset-rotate',
    'order',
    'outline-color',
    'outline-offset',
    'outline-style',
    'outline-width',
    'overflow',
    'overflow-anchor',
    'overflow-block',
    'overflow-inline',
    'overflow-wrap',
    'overflow-x',
    'overflow-y',
    'overscroll-behavior-block',
    'overscroll-behavior-inline',
    'overscroll-behavior-x',
    'overscroll-behavior-y',
    'padding-block-end',
    'padding-block-start',
    'padding-bottom',
    'padding-inline-end',
    'padding-inline-start',
    'padding-left',
    'padding-right',
    'padding-top',
    'page-break-after',
    'page-break-before',
    'perspective',
    'perspective-origin',
    'pointer-events',
    'quotes',
    'r',
    'resize',
    'rotate',
    'row-gap',
    'ruby-align',
    'ruby-position',
    'scale',
    'scroll-behavior',
    'scroll-margin-block-end',
    'scroll-margin-block-start',
    'scroll-margin-bottom',
    'scroll-margin-inline-end',
    'scroll-margin-inline-start',
    'scroll-margin-left',
    'scroll-margin-right',
    'scroll-margin-top',
    'scroll-padding-block-end',
    'scroll-padding-block-start',
    'scroll-padding-bottom',
    'scroll-padding-inline-end',
    'scroll-padding-inline-start',
    'scroll-padding-left',
    'scroll-padding-right',
    'scroll-padding-top',
    'scroll-snap-align',
    'scroll-snap-type',
    'scrollbar-color',
    'scrollbar-width',
    'shape-image-threshold',
    'shape-margin',
    'shape-outside',
    'shape-rendering',
    'stop-color',
    'stop-opacity',
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'text-align',
    'text-align-last',
    'text-anchor',
    'text-combine-upright',
    'text-decoration',
    'text-decoration-color',
    'text-decoration-line',
    'text-decoration-skip-ink',
    'text-decoration-style',
    'text-decoration-thickness',
    'text-emphasis-color',
    'text-emphasis-position',
    'text-emphasis-style',
    'text-indent',
    'text-justify',
    'text-orientation',
    'text-overflow',
    'text-rendering',
    'text-shadow',
    'text-transform',
    'text-underline-offset',
    'text-underline-position',
    'transition-delay',
    'transition-duration',
    'transition-property',
    'transition-timing-function',
    'unicode-bidi',
    'user-select',
    'vector-effect',
    'white-space',
    'will-change',
    'word-break',
    'word-spacing',
    'writing-mode',
];
exports.NO_GENERATE_CONTENT_ELEMENTS = exports.REPLACED_ELEMENTS.concat(exports.VOID_ELEMENTS);
exports.PLACEHOLDER_ELEMENTS = ['input', 'textarea', 'span'];
exports.SKIPPED_PROPERTIES = ['-webkit-locale', '--tridactyl'];
exports.INLINE_SKIPPED_PROPERTIES = null;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0eWxlLXBhdGNoZXIvY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1hLFFBQUEsMEJBQTBCLEdBQUc7SUFDeEMsU0FBUztJQUNULFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLFVBQVU7SUFDVixlQUFlO0lBQ2YsYUFBYTtDQUNkLENBQUM7QUFFVyxRQUFBLGlCQUFpQixHQUE4QjtJQUMxRCxRQUFRO0lBQ1IsT0FBTztJQUNQLE9BQU87SUFDUCxLQUFLO0lBQ0wsT0FBTztJQUNQLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7Q0FDVCxDQUFDO0FBRVcsUUFBQSxhQUFhLEdBQThCO0lBQ3RELE1BQU07SUFDTixNQUFNO0lBQ04sSUFBSTtJQUNKLEtBQUs7SUFDTCxPQUFPO0lBQ1AsSUFBSTtJQUNKLEtBQUs7SUFDTCxPQUFPO0lBQ1AsTUFBTTtJQUNOLE1BQU07SUFDTixPQUFPO0lBQ1AsUUFBUTtJQUNSLE9BQU87SUFDUCxLQUFLO0NBQ04sQ0FBQztBQUVXLFFBQUEsK0JBQStCLEdBQUc7SUFDN0MsWUFBWTtJQUNaLFlBQVk7SUFDWixNQUFNO0lBQ04sV0FBVztJQUNYLGFBQWE7SUFDYixRQUFRO0lBQ1IsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsV0FBVztJQUNYLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIscUJBQXFCO0lBQ3JCLGFBQWE7SUFDYixjQUFjO0lBQ2QsWUFBWTtJQUNaLFlBQVk7SUFDWixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLE9BQU87Q0FDUixDQUFDO0FBRVcsUUFBQSwyQkFBMkIsR0FBRztJQUN6QyxlQUFlO0lBQ2YsYUFBYTtJQUNiLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2QixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIscUJBQXFCO0lBQ3JCLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQix3QkFBd0I7SUFDeEIsd0JBQXdCO0lBQ3hCLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQixxQkFBcUI7SUFDckIsMkJBQTJCO0lBQzNCLDRCQUE0QjtJQUM1QixxQkFBcUI7SUFDckIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIseUJBQXlCO0lBQ3pCLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixvQkFBb0I7SUFDcEIseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsZ0JBQWdCO0lBQ2hCLHlCQUF5QjtJQUN6QiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLHdCQUF3QjtJQUN4Qix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLFlBQVk7SUFDWixhQUFhO0lBQ2IsY0FBYztJQUNkLGNBQWM7SUFDZCxjQUFjO0lBQ2QsYUFBYTtJQUNiLE9BQU87SUFDUCxNQUFNO0lBQ04sV0FBVztJQUNYLFdBQVc7SUFDWCxPQUFPO0lBQ1AsY0FBYztJQUNkLHFCQUFxQjtJQUNyQiw2QkFBNkI7SUFDN0IsY0FBYztJQUNkLGFBQWE7SUFDYixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLGNBQWM7SUFDZCxTQUFTO0lBQ1QsU0FBUztJQUNULG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsYUFBYTtJQUNiLFFBQVE7SUFDUixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLE1BQU07SUFDTixjQUFjO0lBQ2QsV0FBVztJQUNYLFFBQVE7SUFDUixhQUFhO0lBQ2IsZUFBZTtJQUNmLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsY0FBYztJQUNkLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsV0FBVztJQUNYLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsd0JBQXdCO0lBQ3hCLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYixTQUFTO0lBQ1QsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixVQUFVO0lBQ1YsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLG9CQUFvQjtJQUNwQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsWUFBWTtJQUNaLFlBQVk7SUFDWixjQUFjO0lBQ2QsTUFBTTtJQUNOLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFdBQVc7SUFDWCxhQUFhO0lBQ2IsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLFdBQVc7SUFDWCxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsZUFBZTtJQUNmLE9BQU87SUFDUCxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixlQUFlO0lBQ2YsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixZQUFZO0lBQ1osWUFBWTtJQUNaLDJCQUEyQjtJQUMzQiw0QkFBNEI7SUFDNUIsdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIscUJBQXFCO0lBQ3JCLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLG9CQUFvQjtJQUNwQixnQkFBZ0I7SUFDaEIsUUFBUTtJQUNSLEdBQUc7SUFDSCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxZQUFZO0lBQ1osZUFBZTtJQUNmLE9BQU87SUFDUCxpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLDJCQUEyQjtJQUMzQixzQkFBc0I7SUFDdEIsMEJBQTBCO0lBQzFCLDRCQUE0QjtJQUM1QixvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQiwwQkFBMEI7SUFDMUIsNEJBQTRCO0lBQzVCLHVCQUF1QjtJQUN2QiwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBQzdCLHFCQUFxQjtJQUNyQixzQkFBc0I7SUFDdEIsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIsY0FBYztJQUNkLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsWUFBWTtJQUNaLGNBQWM7SUFDZCxRQUFRO0lBQ1Isa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixpQkFBaUI7SUFDakIsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtJQUN0QiwwQkFBMEI7SUFDMUIsdUJBQXVCO0lBQ3ZCLDJCQUEyQjtJQUMzQixxQkFBcUI7SUFDckIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQiw0QkFBNEI7SUFDNUIsY0FBYztJQUNkLGFBQWE7SUFDYixlQUFlO0lBQ2YsYUFBYTtJQUNiLGFBQWE7SUFDYixZQUFZO0lBQ1osY0FBYztJQUNkLGNBQWM7Q0FDZixDQUFDO0FBRVcsUUFBQSw0QkFBNEIsR0FBRyx5QkFBaUIsQ0FBQyxNQUFNLENBQUMscUJBQWEsQ0FBQyxDQUFDO0FBRXZFLFFBQUEsb0JBQW9CLEdBQThCLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUVoRixRQUFBLGtCQUFrQixHQUFHLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFFdkQsUUFBQSx5QkFBeUIsR0FBRyxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFN1cnByaXNpbmdseSwgPHN0eWxlPiBlbGVtZW50IGNhbiBiZSBhcHBlbmRlZCB0byA8aW5wdXQ+IGFuZCA8dGV4dGFyZWE+XG4gKiBzbyB3ZSBjYW4gc3VwcG9ydCA6OnBsYWNlaG9sZGVyLCBhbmQgOjpzZWxlY3Rpb24gZXZlbiBmb3IgdGhlbS5cbiAqL1xuaW1wb3J0IHsgU3VwcG9ydGVkRWxlbWVudFRhZ05hbWUgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IFNVUFBPUlRFRF9QU0VVRE9fU0VMRUNUT1JTID0gW1xuICAnOjphZnRlcicsXG4gICc6OmJlZm9yZScsXG4gICc6OmZpcnN0LWxldHRlcicsXG4gICc6OmZpcnN0LWxpbmUnLFxuICAnOjptYXJrZXInLFxuICAnOjpwbGFjZWhvbGRlcicsXG4gICc6OnNlbGVjdGlvbicsXG5dO1xuXG5leHBvcnQgY29uc3QgUkVQTEFDRURfRUxFTUVOVFM6IFN1cHBvcnRlZEVsZW1lbnRUYWdOYW1lW10gPSBbXG4gICdpZnJhbWUnLFxuICAndmlkZW8nLFxuICAnZW1iZWQnLFxuICAnaW1nJyxcbiAgJ2F1ZGlvJyxcbiAgJ29wdGlvbicsXG4gICdjYW52YXMnLFxuICAnb2JqZWN0JyxcbiAgJ2FwcGxldCcsXG5dO1xuXG5leHBvcnQgY29uc3QgVk9JRF9FTEVNRU5UUzogU3VwcG9ydGVkRWxlbWVudFRhZ05hbWVbXSA9IFtcbiAgJ2FyZWEnLFxuICAnYmFzZScsXG4gICdicicsXG4gICdjb2wnLFxuICAnZW1iZWQnLFxuICAnaHInLFxuICAnaW1nJyxcbiAgJ2lucHV0JyxcbiAgJ2xpbmsnLFxuICAnbWV0YScsXG4gICdwYXJhbScsXG4gICdzb3VyY2UnLFxuICAndHJhY2snLFxuICAnd2JyJyxcbl07XG5cbmV4cG9ydCBjb25zdCBQQVJFTlRfRUxFTUVOVF9TVFlMRV9BVFRSSUJVVEVTID0gW1xuICAnYWxpZ24tc2VsZicsXG4gICdibG9jay1zaXplJyxcbiAgJ2ZsZXgnLFxuICAnZmxleC1ncm93JyxcbiAgJ2ZsZXgtc2hyaW5rJyxcbiAgJ2hlaWdodCcsXG4gICdtYXgtYmxvY2stc2l6ZScsXG4gICdtYXgtaGVpZ2h0JyxcbiAgJ21heC1pbmxpbmUtc2l6ZScsXG4gICdtYXgtd2lkdGgnLFxuICAnbWFyZ2luJyxcbiAgJ21hcmdpbi1ibG9jay1lbmQnLFxuICAnbWFyZ2luLWJsb2NrLXN0YXJ0JyxcbiAgJ21hcmdpbi1ib3R0b20nLFxuICAnbWFyZ2luLWlubGluZS1lbmQnLFxuICAnbWFyZ2luLWlubGluZS1zdGFydCcsXG4gICdtYXJnaW4tbGVmdCcsXG4gICdtYXJnaW4tcmlnaHQnLFxuICAnbWFyZ2luLXRvcCcsXG4gICdtaW4taGVpZ2h0JyxcbiAgJ21pbi13aWR0aCcsXG4gICd2ZXJ0aWNhbC1hbGlnbicsXG4gICd3aWR0aCcsXG5dO1xuXG5leHBvcnQgY29uc3QgRUxFTUVOVF9BVFRSSUJVVEVfV0hJVEVMSVNUID0gW1xuICAnYWxpZ24tY29udGVudCcsXG4gICdhbGlnbi1pdGVtcycsXG4gICdhcHBlYXJhbmNlJyxcbiAgJ2JhY2tmYWNlLXZpc2liaWxpdHknLFxuICAnYmFja2dyb3VuZC1hdHRhY2htZW50JyxcbiAgJ2JhY2tncm91bmQtYmxlbmQtbW9kZScsXG4gICdiYWNrZ3JvdW5kLWNsaXAnLFxuICAnYmFja2dyb3VuZC1jb2xvcicsXG4gICdiYWNrZ3JvdW5kLWltYWdlJyxcbiAgJ2JhY2tncm91bmQtb3JpZ2luJyxcbiAgJ2JhY2tncm91bmQtcG9zaXRpb24nLFxuICAnYmFja2dyb3VuZC1wb3NpdGlvbi14JyxcbiAgJ2JhY2tncm91bmQtcG9zaXRpb24teScsXG4gICdiYWNrZ3JvdW5kLXJlcGVhdCcsXG4gICdiYWNrZ3JvdW5kLXNpemUnLFxuICAnYm9yZGVyLWJsb2NrLWVuZC1jb2xvcicsXG4gICdib3JkZXItYmxvY2stZW5kLXN0eWxlJyxcbiAgJ2JvcmRlci1ibG9jay1lbmQtd2lkdGgnLFxuICAnYm9yZGVyLWJsb2NrLXN0YXJ0LWNvbG9yJyxcbiAgJ2JvcmRlci1ibG9jay1zdGFydC1zdHlsZScsXG4gICdib3JkZXItYmxvY2stc3RhcnQtd2lkdGgnLFxuICAnYm9yZGVyLWJvdHRvbS1jb2xvcicsXG4gICdib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzJyxcbiAgJ2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzJyxcbiAgJ2JvcmRlci1ib3R0b20tc3R5bGUnLFxuICAnYm9yZGVyLWJvdHRvbS13aWR0aCcsXG4gICdib3JkZXItY29sbGFwc2UnLFxuICAnYm9yZGVyLWVuZC1lbmQtcmFkaXVzJyxcbiAgJ2JvcmRlci1lbmQtc3RhcnQtcmFkaXVzJyxcbiAgJ2JvcmRlci1pbWFnZS1vdXRzZXQnLFxuICAnYm9yZGVyLWltYWdlLXJlcGVhdCcsXG4gICdib3JkZXItaW1hZ2Utc2xpY2UnLFxuICAnYm9yZGVyLWltYWdlLXNvdXJjZScsXG4gICdib3JkZXItaW1hZ2Utd2lkdGgnLFxuICAnYm9yZGVyLWlubGluZS1lbmQtY29sb3InLFxuICAnYm9yZGVyLWlubGluZS1lbmQtc3R5bGUnLFxuICAnYm9yZGVyLWlubGluZS1lbmQtd2lkdGgnLFxuICAnYm9yZGVyLWlubGluZS1zdGFydC1jb2xvcicsXG4gICdib3JkZXItaW5saW5lLXN0YXJ0LXN0eWxlJyxcbiAgJ2JvcmRlci1pbmxpbmUtc3RhcnQtd2lkdGgnLFxuICAnYm9yZGVyLWxlZnQtY29sb3InLFxuICAnYm9yZGVyLWxlZnQtc3R5bGUnLFxuICAnYm9yZGVyLWxlZnQtd2lkdGgnLFxuICAnYm9yZGVyLXJpZ2h0LWNvbG9yJyxcbiAgJ2JvcmRlci1yaWdodC1zdHlsZScsXG4gICdib3JkZXItcmlnaHQtd2lkdGgnLFxuICAnYm9yZGVyLXNwYWNpbmcnLFxuICAnYm9yZGVyLXN0YXJ0LWVuZC1yYWRpdXMnLFxuICAnYm9yZGVyLXN0YXJ0LXN0YXJ0LXJhZGl1cycsXG4gICdib3JkZXItdG9wLWNvbG9yJyxcbiAgJ2JvcmRlci10b3AtbGVmdC1yYWRpdXMnLFxuICAnYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMnLFxuICAnYm9yZGVyLXRvcC1zdHlsZScsXG4gICdib3JkZXItdG9wLXdpZHRoJyxcbiAgJ2JveC1kZWNvcmF0aW9uLWJyZWFrJyxcbiAgJ2JveC1zaGFkb3cnLFxuICAnYm94LXNpemluZycsXG4gICdicmVhay1hZnRlcicsXG4gICdicmVhay1iZWZvcmUnLFxuICAnYnJlYWstaW5zaWRlJyxcbiAgJ2NhcHRpb24tc2lkZScsXG4gICdjYXJldC1jb2xvcicsXG4gICdjbGVhcicsXG4gICdjbGlwJyxcbiAgJ2NsaXAtcGF0aCcsXG4gICdjbGlwLXJ1bGUnLFxuICAnY29sb3InLFxuICAnY29sb3ItYWRqdXN0JyxcbiAgJ2NvbG9yLWludGVycG9sYXRpb24nLFxuICAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJyxcbiAgJ2NvbHVtbi1jb3VudCcsXG4gICdjb2x1bW4tZmlsbCcsXG4gICdjb2x1bW4tZ2FwJyxcbiAgJ2NvbHVtbi1ydWxlLWNvbG9yJyxcbiAgJ2NvbHVtbi1ydWxlLXN0eWxlJyxcbiAgJ2NvbHVtbi1ydWxlLXdpZHRoJyxcbiAgJ2NvbHVtbi1zcGFuJyxcbiAgJ2NvbHVtbi13aWR0aCcsXG4gICdjb250YWluJyxcbiAgJ2NvbnRlbnQnLFxuICAnY291bnRlci1pbmNyZW1lbnQnLFxuICAnY291bnRlci1yZXNldCcsXG4gICdjb3VudGVyLXNldCcsXG4gICdjdXJzb3InLFxuICAnZGlyZWN0aW9uJyxcbiAgJ2RvbWluYW50LWJhc2VsaW5lJyxcbiAgJ2ZpbGwnLFxuICAnZmlsbC1vcGFjaXR5JyxcbiAgJ2ZpbGwtcnVsZScsXG4gICdmaWx0ZXInLFxuICAnZmxvb2QtY29sb3InLFxuICAnZmxvb2Qtb3BhY2l0eScsXG4gICdmb250LWZhbWlseScsXG4gICdmb250LWZlYXR1cmUtc2V0dGluZ3MnLFxuICAnZm9udC1rZXJuaW5nJyxcbiAgJ2ZvbnQtbGFuZ3VhZ2Utb3ZlcnJpZGUnLFxuICAnZm9udC1vcHRpY2FsLXNpemluZycsXG4gICdmb250LXNpemUnLFxuICAnZm9udC1zaXplLWFkanVzdCcsXG4gICdmb250LXN0cmV0Y2gnLFxuICAnZm9udC1zdHlsZScsXG4gICdmb250LXN5bnRoZXNpcycsXG4gICdmb250LXZhcmlhbnQnLFxuICAnZm9udC12YXJpYW50LWFsdGVybmF0ZXMnLFxuICAnZm9udC12YXJpYW50LWNhcHMnLFxuICAnZm9udC12YXJpYW50LWVhc3QtYXNpYW4nLFxuICAnZm9udC12YXJpYW50LWxpZ2F0dXJlcycsXG4gICdmb250LXZhcmlhbnQtbnVtZXJpYycsXG4gICdmb250LXZhcmlhbnQtcG9zaXRpb24nLFxuICAnZm9udC12YXJpYXRpb24tc2V0dGluZ3MnLFxuICAnZm9udC13ZWlnaHQnLFxuICAnaHlwaGVucycsXG4gICdpbWFnZS1vcmllbnRhdGlvbicsXG4gICdpbWFnZS1yZW5kZXJpbmcnLFxuICAnaW1lLW1vZGUnLFxuICAnaW5saW5lLXNpemUnLFxuICAnaW5zZXQtYmxvY2stZW5kJyxcbiAgJ2luc2V0LWJsb2NrLXN0YXJ0JyxcbiAgJ2luc2V0LWlubGluZS1lbmQnLFxuICAnaW5zZXQtaW5saW5lLXN0YXJ0JyxcbiAgJ2xldHRlci1zcGFjaW5nJyxcbiAgJ2xpZ2h0aW5nLWNvbG9yJyxcbiAgJ2xpbmUtYnJlYWsnLFxuICAnbGluZS1oZWlnaHQnLFxuICAnbGlzdC1zdHlsZS1pbWFnZScsXG4gICdsaXN0LXN0eWxlLXBvc2l0aW9uJyxcbiAgJ2xpc3Qtc3R5bGUtdHlwZScsXG4gICdtYXJrZXItZW5kJyxcbiAgJ21hcmtlci1taWQnLFxuICAnbWFya2VyLXN0YXJ0JyxcbiAgJ21hc2snLFxuICAnbWFzay1jbGlwJyxcbiAgJ21hc2stY29tcG9zaXRlJyxcbiAgJ21hc2staW1hZ2UnLFxuICAnbWFzay1tb2RlJyxcbiAgJ21hc2stb3JpZ2luJyxcbiAgJ21hc2stcG9zaXRpb24nLFxuICAnbWFzay1wb3NpdGlvbi14JyxcbiAgJ21hc2stcG9zaXRpb24teScsXG4gICdtYXNrLXJlcGVhdCcsXG4gICdtYXNrLXNpemUnLFxuICAnbWFzay10eXBlJyxcbiAgJ21peC1ibGVuZC1tb2RlJyxcbiAgJ29iamVjdC1maXQnLFxuICAnb2JqZWN0LXBvc2l0aW9uJyxcbiAgJ29mZnNldC1hbmNob3InLFxuICAnb2Zmc2V0LWRpc3RhbmNlJyxcbiAgJ29mZnNldC1wYXRoJyxcbiAgJ29mZnNldC1yb3RhdGUnLFxuICAnb3JkZXInLFxuICAnb3V0bGluZS1jb2xvcicsXG4gICdvdXRsaW5lLW9mZnNldCcsXG4gICdvdXRsaW5lLXN0eWxlJyxcbiAgJ291dGxpbmUtd2lkdGgnLFxuICAnb3ZlcmZsb3cnLFxuICAnb3ZlcmZsb3ctYW5jaG9yJyxcbiAgJ292ZXJmbG93LWJsb2NrJyxcbiAgJ292ZXJmbG93LWlubGluZScsXG4gICdvdmVyZmxvdy13cmFwJyxcbiAgJ292ZXJmbG93LXgnLFxuICAnb3ZlcmZsb3cteScsXG4gICdvdmVyc2Nyb2xsLWJlaGF2aW9yLWJsb2NrJyxcbiAgJ292ZXJzY3JvbGwtYmVoYXZpb3ItaW5saW5lJyxcbiAgJ292ZXJzY3JvbGwtYmVoYXZpb3IteCcsXG4gICdvdmVyc2Nyb2xsLWJlaGF2aW9yLXknLFxuICAncGFkZGluZy1ibG9jay1lbmQnLFxuICAncGFkZGluZy1ibG9jay1zdGFydCcsXG4gICdwYWRkaW5nLWJvdHRvbScsXG4gICdwYWRkaW5nLWlubGluZS1lbmQnLFxuICAncGFkZGluZy1pbmxpbmUtc3RhcnQnLFxuICAncGFkZGluZy1sZWZ0JyxcbiAgJ3BhZGRpbmctcmlnaHQnLFxuICAncGFkZGluZy10b3AnLFxuICAncGFnZS1icmVhay1hZnRlcicsXG4gICdwYWdlLWJyZWFrLWJlZm9yZScsXG4gICdwZXJzcGVjdGl2ZScsXG4gICdwZXJzcGVjdGl2ZS1vcmlnaW4nLFxuICAncG9pbnRlci1ldmVudHMnLFxuICAncXVvdGVzJyxcbiAgJ3InLFxuICAncmVzaXplJyxcbiAgJ3JvdGF0ZScsXG4gICdyb3ctZ2FwJyxcbiAgJ3J1YnktYWxpZ24nLFxuICAncnVieS1wb3NpdGlvbicsXG4gICdzY2FsZScsXG4gICdzY3JvbGwtYmVoYXZpb3InLFxuICAnc2Nyb2xsLW1hcmdpbi1ibG9jay1lbmQnLFxuICAnc2Nyb2xsLW1hcmdpbi1ibG9jay1zdGFydCcsXG4gICdzY3JvbGwtbWFyZ2luLWJvdHRvbScsXG4gICdzY3JvbGwtbWFyZ2luLWlubGluZS1lbmQnLFxuICAnc2Nyb2xsLW1hcmdpbi1pbmxpbmUtc3RhcnQnLFxuICAnc2Nyb2xsLW1hcmdpbi1sZWZ0JyxcbiAgJ3Njcm9sbC1tYXJnaW4tcmlnaHQnLFxuICAnc2Nyb2xsLW1hcmdpbi10b3AnLFxuICAnc2Nyb2xsLXBhZGRpbmctYmxvY2stZW5kJyxcbiAgJ3Njcm9sbC1wYWRkaW5nLWJsb2NrLXN0YXJ0JyxcbiAgJ3Njcm9sbC1wYWRkaW5nLWJvdHRvbScsXG4gICdzY3JvbGwtcGFkZGluZy1pbmxpbmUtZW5kJyxcbiAgJ3Njcm9sbC1wYWRkaW5nLWlubGluZS1zdGFydCcsXG4gICdzY3JvbGwtcGFkZGluZy1sZWZ0JyxcbiAgJ3Njcm9sbC1wYWRkaW5nLXJpZ2h0JyxcbiAgJ3Njcm9sbC1wYWRkaW5nLXRvcCcsXG4gICdzY3JvbGwtc25hcC1hbGlnbicsXG4gICdzY3JvbGwtc25hcC10eXBlJyxcbiAgJ3Njcm9sbGJhci1jb2xvcicsXG4gICdzY3JvbGxiYXItd2lkdGgnLFxuICAnc2hhcGUtaW1hZ2UtdGhyZXNob2xkJyxcbiAgJ3NoYXBlLW1hcmdpbicsXG4gICdzaGFwZS1vdXRzaWRlJyxcbiAgJ3NoYXBlLXJlbmRlcmluZycsXG4gICdzdG9wLWNvbG9yJyxcbiAgJ3N0b3Atb3BhY2l0eScsXG4gICdzdHJva2UnLFxuICAnc3Ryb2tlLWRhc2hhcnJheScsXG4gICdzdHJva2UtZGFzaG9mZnNldCcsXG4gICdzdHJva2UtbGluZWNhcCcsXG4gICdzdHJva2UtbGluZWpvaW4nLFxuICAnc3Ryb2tlLW1pdGVybGltaXQnLFxuICAnc3Ryb2tlLW9wYWNpdHknLFxuICAnc3Ryb2tlLXdpZHRoJyxcbiAgJ3RleHQtYWxpZ24nLFxuICAndGV4dC1hbGlnbi1sYXN0JyxcbiAgJ3RleHQtYW5jaG9yJyxcbiAgJ3RleHQtY29tYmluZS11cHJpZ2h0JyxcbiAgJ3RleHQtZGVjb3JhdGlvbicsXG4gICd0ZXh0LWRlY29yYXRpb24tY29sb3InLFxuICAndGV4dC1kZWNvcmF0aW9uLWxpbmUnLFxuICAndGV4dC1kZWNvcmF0aW9uLXNraXAtaW5rJyxcbiAgJ3RleHQtZGVjb3JhdGlvbi1zdHlsZScsXG4gICd0ZXh0LWRlY29yYXRpb24tdGhpY2tuZXNzJyxcbiAgJ3RleHQtZW1waGFzaXMtY29sb3InLFxuICAndGV4dC1lbXBoYXNpcy1wb3NpdGlvbicsXG4gICd0ZXh0LWVtcGhhc2lzLXN0eWxlJyxcbiAgJ3RleHQtaW5kZW50JyxcbiAgJ3RleHQtanVzdGlmeScsXG4gICd0ZXh0LW9yaWVudGF0aW9uJyxcbiAgJ3RleHQtb3ZlcmZsb3cnLFxuICAndGV4dC1yZW5kZXJpbmcnLFxuICAndGV4dC1zaGFkb3cnLFxuICAndGV4dC10cmFuc2Zvcm0nLFxuICAndGV4dC11bmRlcmxpbmUtb2Zmc2V0JyxcbiAgJ3RleHQtdW5kZXJsaW5lLXBvc2l0aW9uJyxcbiAgJ3RyYW5zaXRpb24tZGVsYXknLFxuICAndHJhbnNpdGlvbi1kdXJhdGlvbicsXG4gICd0cmFuc2l0aW9uLXByb3BlcnR5JyxcbiAgJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJyxcbiAgJ3VuaWNvZGUtYmlkaScsXG4gICd1c2VyLXNlbGVjdCcsXG4gICd2ZWN0b3ItZWZmZWN0JyxcbiAgJ3doaXRlLXNwYWNlJyxcbiAgJ3dpbGwtY2hhbmdlJyxcbiAgJ3dvcmQtYnJlYWsnLFxuICAnd29yZC1zcGFjaW5nJyxcbiAgJ3dyaXRpbmctbW9kZScsXG5dO1xuXG5leHBvcnQgY29uc3QgTk9fR0VORVJBVEVfQ09OVEVOVF9FTEVNRU5UUyA9IFJFUExBQ0VEX0VMRU1FTlRTLmNvbmNhdChWT0lEX0VMRU1FTlRTKTtcblxuZXhwb3J0IGNvbnN0IFBMQUNFSE9MREVSX0VMRU1FTlRTOiBTdXBwb3J0ZWRFbGVtZW50VGFnTmFtZVtdID0gWydpbnB1dCcsICd0ZXh0YXJlYScsICdzcGFuJ107XG5cbmV4cG9ydCBjb25zdCBTS0lQUEVEX1BST1BFUlRJRVMgPSBbJy13ZWJraXQtbG9jYWxlJywgJy0tdHJpZGFjdHlsJ107XG5cbmV4cG9ydCBjb25zdCBJTkxJTkVfU0tJUFBFRF9QUk9QRVJUSUVTID0gbnVsbDtcbiJdfQ==

/***/ }),

/***/ "../../browser-common/build/main/style-patcher/dom-utils.js":
/*!******************************************************************!*\
  !*** ../../browser-common/build/main/style-patcher/dom-utils.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generatePseudoElementCSS = exports.generateCssText = exports.getParentStyle = exports.getChildStyle = exports.filterStyleWith = exports.getStyleSnapshot = exports.createStyleElement = exports.isTagName = void 0;
const constants_1 = __webpack_require__(/*! ./constants */ "../../browser-common/build/main/style-patcher/constants.js");
function isTagName(el, tagNames) {
    return tagNames.indexOf(el.tagName.toLowerCase()) !== -1;
}
exports.isTagName = isTagName;
function createStyleElement(doc, css) {
    const style = doc.createElement('style');
    style.appendChild(doc.createTextNode(css));
    return style;
}
exports.createStyleElement = createStyleElement;
function getStyleSnapshot(style) {
    const snapshot = Object.create({});
    for (let i = 0; i < style.length; i++) {
        const prop = style[i];
        snapshot[prop] = style.getPropertyValue(prop);
    }
    return snapshot;
}
exports.getStyleSnapshot = getStyleSnapshot;
function filterStyleWith(style, filterFn) {
    return Object.keys(style).reduce((outputStyle, key) => {
        const shouldSkip = constants_1.SKIPPED_PROPERTIES.some((skipped) => key.startsWith(skipped));
        if (shouldSkip) {
            return outputStyle;
        }
        if (filterFn(key)) {
            outputStyle[key] = style[key];
        }
        return outputStyle;
    }, {});
}
exports.filterStyleWith = filterStyleWith;
function getChildStyle(style) {
    function filterChildAttributes(key) {
        return constants_1.ELEMENT_ATTRIBUTE_WHITELIST.some((property) => property === key.toLowerCase());
    }
    return filterStyleWith(style, filterChildAttributes);
}
exports.getChildStyle = getChildStyle;
function getParentStyle(style) {
    function filterChildAttributes(key) {
        return constants_1.PARENT_ELEMENT_STYLE_ATTRIBUTES.some((property) => property === key.toLowerCase());
    }
    return filterStyleWith(style, filterChildAttributes);
}
exports.getParentStyle = getParentStyle;
function generateCssText(style) {
    const declarations = [];
    for (const key in style) {
        if (!style.hasOwnProperty(key)) {
            continue;
        }
        declarations.push(`${key}:${style[key]};`);
    }
    return declarations.join('');
}
exports.generateCssText = generateCssText;
function generatePseudoElementCSS(target, selector, cssText) {
    if (!cssText) {
        return '';
    }
    // TODO: Is this a security issue?
    return `#${target.id}${selector}{${cssText}}`;
}
exports.generatePseudoElementCSS = generatePseudoElementCSS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0eWxlLXBhdGNoZXIvZG9tLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUErRztBQUcvRyxTQUFnQixTQUFTLENBQ3ZCLEVBQW9CLEVBQ3BCLFFBQWE7SUFFYixPQUFRLFFBQXFCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBTEQsOEJBS0M7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxHQUFhLEVBQUUsR0FBVztJQUMzRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTNDLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUxELGdEQUtDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBMEI7SUFDekQsTUFBTSxRQUFRLEdBQTJCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0M7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBUkQsNENBUUM7QUFFRCxTQUFnQixlQUFlLENBQUMsS0FBb0IsRUFBRSxRQUFrQztJQUN0RixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3BELE1BQU0sVUFBVSxHQUFHLDhCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQyxFQUFFLEVBQW1CLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBYkQsMENBYUM7QUFFRCxTQUFnQixhQUFhLENBQUMsS0FBb0I7SUFDaEQsU0FBUyxxQkFBcUIsQ0FBQyxHQUFXO1FBQ3hDLE9BQU8sdUNBQTJCLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVELE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFORCxzQ0FNQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxLQUFvQjtJQUNqRCxTQUFTLHFCQUFxQixDQUFDLEdBQVc7UUFDeEMsT0FBTywyQ0FBK0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsT0FBTyxlQUFlLENBQUMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDdkQsQ0FBQztBQU5ELHdDQU1DO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLEtBQW9CO0lBQ2xELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUV4QixLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QixTQUFTO1NBQ1Y7UUFDRCxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUM7SUFFRCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQVhELDBDQVdDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQUMsTUFBd0IsRUFBRSxRQUFnQixFQUFFLE9BQWU7SUFDbEcsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxrQ0FBa0M7SUFDbEMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLEdBQUcsUUFBUSxJQUFJLE9BQU8sR0FBRyxDQUFDO0FBQ2hELENBQUM7QUFQRCw0REFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVMRU1FTlRfQVRUUklCVVRFX1dISVRFTElTVCwgUEFSRU5UX0VMRU1FTlRfU1RZTEVfQVRUUklCVVRFUywgU0tJUFBFRF9QUk9QRVJUSUVTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgU3R5bGVTbmFwc2hvdCwgU3VwcG9ydGVkRWxlbWVudCwgU3VwcG9ydGVkRWxlbWVudFRhZ05hbWUsIFN1cHBvcnRlZEVsZW1lbnRUYWdOYW1lTWFwIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RhZ05hbWU8VCBleHRlbmRzIFN1cHBvcnRlZEVsZW1lbnRUYWdOYW1lPihcbiAgZWw6IFN1cHBvcnRlZEVsZW1lbnQsXG4gIHRhZ05hbWVzOiBUW11cbik6IGVsIGlzIFN1cHBvcnRlZEVsZW1lbnRUYWdOYW1lTWFwW1RdIHtcbiAgcmV0dXJuICh0YWdOYW1lcyBhcyBzdHJpbmdbXSkuaW5kZXhPZihlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChkb2M6IERvY3VtZW50LCBjc3M6IHN0cmluZyk6IEhUTUxTdHlsZUVsZW1lbnQge1xuICBjb25zdCBzdHlsZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVTbmFwc2hvdChzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbik6IFN0eWxlU25hcHNob3Qge1xuICBjb25zdCBzbmFwc2hvdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IE9iamVjdC5jcmVhdGUoe30pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJvcCA9IHN0eWxlW2ldO1xuICAgIHNuYXBzaG90W3Byb3BdID0gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKTtcbiAgfVxuXG4gIHJldHVybiBzbmFwc2hvdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclN0eWxlV2l0aChzdHlsZTogU3R5bGVTbmFwc2hvdCwgZmlsdGVyRm46IChrZXk6IHN0cmluZykgPT4gYm9vbGVhbik6IFN0eWxlU25hcHNob3Qge1xuICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGUpLnJlZHVjZSgob3V0cHV0U3R5bGUsIGtleSkgPT4ge1xuICAgIGNvbnN0IHNob3VsZFNraXAgPSBTS0lQUEVEX1BST1BFUlRJRVMuc29tZSgoc2tpcHBlZCkgPT4ga2V5LnN0YXJ0c1dpdGgoc2tpcHBlZCkpO1xuICAgIGlmIChzaG91bGRTa2lwKSB7XG4gICAgICByZXR1cm4gb3V0cHV0U3R5bGU7XG4gICAgfVxuXG4gICAgaWYgKGZpbHRlckZuKGtleSkpIHtcbiAgICAgIG91dHB1dFN0eWxlW2tleV0gPSBzdHlsZVtrZXldO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRTdHlsZTtcbiAgfSwge30gYXMgU3R5bGVTbmFwc2hvdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGlsZFN0eWxlKHN0eWxlOiBTdHlsZVNuYXBzaG90KSB7XG4gIGZ1bmN0aW9uIGZpbHRlckNoaWxkQXR0cmlidXRlcyhrZXk6IHN0cmluZykge1xuICAgIHJldHVybiBFTEVNRU5UX0FUVFJJQlVURV9XSElURUxJU1Quc29tZSgocHJvcGVydHkpID0+IHByb3BlcnR5ID09PSBrZXkudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyU3R5bGVXaXRoKHN0eWxlLCBmaWx0ZXJDaGlsZEF0dHJpYnV0ZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50U3R5bGUoc3R5bGU6IFN0eWxlU25hcHNob3QpIHtcbiAgZnVuY3Rpb24gZmlsdGVyQ2hpbGRBdHRyaWJ1dGVzKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFBBUkVOVF9FTEVNRU5UX1NUWUxFX0FUVFJJQlVURVMuc29tZSgocHJvcGVydHkpID0+IHByb3BlcnR5ID09PSBrZXkudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyU3R5bGVXaXRoKHN0eWxlLCBmaWx0ZXJDaGlsZEF0dHJpYnV0ZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDc3NUZXh0KHN0eWxlOiBTdHlsZVNuYXBzaG90KTogc3RyaW5nIHtcbiAgY29uc3QgZGVjbGFyYXRpb25zID0gW107XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGUpIHtcbiAgICBpZiAoIXN0eWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBkZWNsYXJhdGlvbnMucHVzaChgJHtrZXl9OiR7c3R5bGVba2V5XX07YCk7XG4gIH1cblxuICByZXR1cm4gZGVjbGFyYXRpb25zLmpvaW4oJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVQc2V1ZG9FbGVtZW50Q1NTKHRhcmdldDogU3VwcG9ydGVkRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZywgY3NzVGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKCFjc3NUZXh0KSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLy8gVE9ETzogSXMgdGhpcyBhIHNlY3VyaXR5IGlzc3VlP1xuICByZXR1cm4gYCMke3RhcmdldC5pZH0ke3NlbGVjdG9yfXske2Nzc1RleHR9fWA7XG59XG4iXX0=

/***/ }),

/***/ "../../browser-common/build/main/style-patcher/index.js":
/*!**************************************************************!*\
  !*** ../../browser-common/build/main/style-patcher/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./constants */ "../../browser-common/build/main/style-patcher/constants.js"), exports);
__exportStar(__webpack_require__(/*! ./dom-utils */ "../../browser-common/build/main/style-patcher/dom-utils.js"), exports);
__exportStar(__webpack_require__(/*! ./types */ "../../browser-common/build/main/style-patcher/types.js"), exports);
__exportStar(__webpack_require__(/*! ./read */ "../../browser-common/build/main/style-patcher/read.js"), exports);
__exportStar(__webpack_require__(/*! ./write */ "../../browser-common/build/main/style-patcher/write.js"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3R5bGUtcGF0Y2hlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNEI7QUFDNUIsOENBQTRCO0FBQzVCLDBDQUF3QjtBQUN4Qix5Q0FBdUI7QUFDdkIsMENBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9kb20tdXRpbHMnO1xuZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL3JlYWQnO1xuZXhwb3J0ICogZnJvbSAnLi93cml0ZSc7XG4iXX0=

/***/ }),

/***/ "../../browser-common/build/main/style-patcher/read.js":
/*!*************************************************************!*\
  !*** ../../browser-common/build/main/style-patcher/read.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getStyleInfo = void 0;
const dom_utils_1 = __webpack_require__(/*! ./dom-utils */ "../../browser-common/build/main/style-patcher/dom-utils.js");
// import {
//   NO_GENERATE_CONTENT_ELEMENTS,
//   PLACEHOLDER_ELEMENTS,
//   // SUPPORTED_PSEUDO_SELECTORS
// } from './constants';
function getStyleInfo(source, pseudoSelector) {
    const computed = window.getComputedStyle(source, pseudoSelector);
    const allStyleInfo = dom_utils_1.getStyleSnapshot(computed);
    const framedInputStyle = dom_utils_1.getChildStyle(allStyleInfo);
    const parentStyle = dom_utils_1.getParentStyle(allStyleInfo);
    const { display, content } = framedInputStyle;
    if (display === 'none' || (pseudoSelector && content === 'none')) {
        console.debug("Can't generate style from hidden element ", source);
        return null;
    }
    if (!pseudoSelector) {
        const { width, height } = source.getBoundingClientRect();
        // TODO: Figure out why we were doing this in the first place
        // if (width * height === 0) {
        //   console.debug('elements width times height is 0, bail ', source);
        //   return null;
        // }
        const allPseudoStyleInfo = Object.create(null);
        // TODO: Figure out implementing pseudo selectors for cloned element
        // for (const selector of SUPPORTED_PSEUDO_SELECTORS) {
        //   const pseudoStyleInfo = getStyleInfo(source, selector);
        //
        //   if (pseudoStyleInfo) {
        //     allPseudoStyleInfo[selector] = pseudoStyleInfo;
        //   }
        // }
        return {
            parentStyle: parentStyle,
            width: `${width}px`,
            height: `${height}px`,
            childStyle: {
                style: framedInputStyle,
                pseudo: allPseudoStyleInfo,
            },
        };
    }
    throw new Error('Pseudo selector support is broken. Fix it if you want it');
    // pseudo elements
    // if (
    //   content === "none" ||
    //   (pseudoSelector === "::marker" && display !== "list-item") ||
    //   ((pseudoSelector === "::before" || pseudoSelector === "::after") &&
    //     isTagName(source as SupportedElement, NO_GENERATE_CONTENT_ELEMENTS)) ||
    //   (pseudoSelector === "::placeholder" &&
    //     !isTagName(source as SupportedElement, PLACEHOLDER_ELEMENTS))
    // ) {
    //   return null;
    // }
    //
    // return {
    //   style,
    // };
}
exports.getStyleInfo = getStyleInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHlsZS1wYXRjaGVyL3JlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQThFO0FBRTlFLFdBQVc7QUFDWCxrQ0FBa0M7QUFDbEMsMEJBQTBCO0FBQzFCLGtDQUFrQztBQUNsQyx3QkFBd0I7QUFFeEIsU0FBZ0IsWUFBWSxDQUFDLE1BQXdCLEVBQUUsY0FBdUI7SUFDNUUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqRSxNQUFNLFlBQVksR0FBRyw0QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxNQUFNLGdCQUFnQixHQUFHLHlCQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDckQsTUFBTSxXQUFXLEdBQUcsMEJBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLGdCQUFnQixDQUFDO0lBRTlDLElBQUksT0FBTyxLQUFLLE1BQU0sSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLEtBQUssTUFBTSxDQUFDLEVBQUU7UUFDaEUsT0FBTyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuRSxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRXpELDZEQUE2RDtRQUM3RCw4QkFBOEI7UUFDOUIsc0VBQXNFO1FBQ3RFLGlCQUFpQjtRQUNqQixJQUFJO1FBRUosTUFBTSxrQkFBa0IsR0FBdUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRSxvRUFBb0U7UUFDcEUsdURBQXVEO1FBQ3ZELDREQUE0RDtRQUM1RCxFQUFFO1FBQ0YsMkJBQTJCO1FBQzNCLHNEQUFzRDtRQUN0RCxNQUFNO1FBQ04sSUFBSTtRQUVKLE9BQU87WUFDTCxXQUFXLEVBQUUsV0FBVztZQUN4QixLQUFLLEVBQUUsR0FBRyxLQUFLLElBQUk7WUFDbkIsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFJO1lBQ3JCLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2QixNQUFNLEVBQUUsa0JBQWtCO2FBQzNCO1NBQ0YsQ0FBQztLQUNIO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0lBRTVFLGtCQUFrQjtJQUNsQixPQUFPO0lBQ1AsMEJBQTBCO0lBQzFCLGtFQUFrRTtJQUNsRSx3RUFBd0U7SUFDeEUsOEVBQThFO0lBQzlFLDJDQUEyQztJQUMzQyxvRUFBb0U7SUFDcEUsTUFBTTtJQUNOLGlCQUFpQjtJQUNqQixJQUFJO0lBQ0osRUFBRTtJQUNGLFdBQVc7SUFDWCxXQUFXO0lBQ1gsS0FBSztBQUNQLENBQUM7QUE1REQsb0NBNERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Q2hpbGRTdHlsZSwgZ2V0UGFyZW50U3R5bGUsIGdldFN0eWxlU25hcHNob3QgfSBmcm9tICcuL2RvbS11dGlscyc7XG5pbXBvcnQgeyBQZXN1ZG9TdHlsZUluZm9NYXAsIFJlYWRFbGVtZW50U3R5bGUsIFN1cHBvcnRlZEVsZW1lbnQgfSBmcm9tICcuL3R5cGVzJztcbi8vIGltcG9ydCB7XG4vLyAgIE5PX0dFTkVSQVRFX0NPTlRFTlRfRUxFTUVOVFMsXG4vLyAgIFBMQUNFSE9MREVSX0VMRU1FTlRTLFxuLy8gICAvLyBTVVBQT1JURURfUFNFVURPX1NFTEVDVE9SU1xuLy8gfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZUluZm8oc291cmNlOiBTdXBwb3J0ZWRFbGVtZW50LCBwc2V1ZG9TZWxlY3Rvcj86IHN0cmluZyk6IFJlYWRFbGVtZW50U3R5bGUgfCBudWxsIHtcbiAgY29uc3QgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzb3VyY2UsIHBzZXVkb1NlbGVjdG9yKTtcbiAgY29uc3QgYWxsU3R5bGVJbmZvID0gZ2V0U3R5bGVTbmFwc2hvdChjb21wdXRlZCk7XG4gIGNvbnN0IGZyYW1lZElucHV0U3R5bGUgPSBnZXRDaGlsZFN0eWxlKGFsbFN0eWxlSW5mbyk7XG4gIGNvbnN0IHBhcmVudFN0eWxlID0gZ2V0UGFyZW50U3R5bGUoYWxsU3R5bGVJbmZvKTtcbiAgY29uc3QgeyBkaXNwbGF5LCBjb250ZW50IH0gPSBmcmFtZWRJbnB1dFN0eWxlO1xuXG4gIGlmIChkaXNwbGF5ID09PSAnbm9uZScgfHwgKHBzZXVkb1NlbGVjdG9yICYmIGNvbnRlbnQgPT09ICdub25lJykpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiQ2FuJ3QgZ2VuZXJhdGUgc3R5bGUgZnJvbSBoaWRkZW4gZWxlbWVudCBcIiwgc291cmNlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICghcHNldWRvU2VsZWN0b3IpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHNvdXJjZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIFRPRE86IEZpZ3VyZSBvdXQgd2h5IHdlIHdlcmUgZG9pbmcgdGhpcyBpbiB0aGUgZmlyc3QgcGxhY2VcbiAgICAvLyBpZiAod2lkdGggKiBoZWlnaHQgPT09IDApIHtcbiAgICAvLyAgIGNvbnNvbGUuZGVidWcoJ2VsZW1lbnRzIHdpZHRoIHRpbWVzIGhlaWdodCBpcyAwLCBiYWlsICcsIHNvdXJjZSk7XG4gICAgLy8gICByZXR1cm4gbnVsbDtcbiAgICAvLyB9XG5cbiAgICBjb25zdCBhbGxQc2V1ZG9TdHlsZUluZm86IFBlc3Vkb1N0eWxlSW5mb01hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IGltcGxlbWVudGluZyBwc2V1ZG8gc2VsZWN0b3JzIGZvciBjbG9uZWQgZWxlbWVudFxuICAgIC8vIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgU1VQUE9SVEVEX1BTRVVET19TRUxFQ1RPUlMpIHtcbiAgICAvLyAgIGNvbnN0IHBzZXVkb1N0eWxlSW5mbyA9IGdldFN0eWxlSW5mbyhzb3VyY2UsIHNlbGVjdG9yKTtcbiAgICAvL1xuICAgIC8vICAgaWYgKHBzZXVkb1N0eWxlSW5mbykge1xuICAgIC8vICAgICBhbGxQc2V1ZG9TdHlsZUluZm9bc2VsZWN0b3JdID0gcHNldWRvU3R5bGVJbmZvO1xuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXJlbnRTdHlsZTogcGFyZW50U3R5bGUsXG4gICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgLFxuICAgICAgY2hpbGRTdHlsZToge1xuICAgICAgICBzdHlsZTogZnJhbWVkSW5wdXRTdHlsZSxcbiAgICAgICAgcHNldWRvOiBhbGxQc2V1ZG9TdHlsZUluZm8sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1BzZXVkbyBzZWxlY3RvciBzdXBwb3J0IGlzIGJyb2tlbi4gRml4IGl0IGlmIHlvdSB3YW50IGl0Jyk7XG5cbiAgLy8gcHNldWRvIGVsZW1lbnRzXG4gIC8vIGlmIChcbiAgLy8gICBjb250ZW50ID09PSBcIm5vbmVcIiB8fFxuICAvLyAgIChwc2V1ZG9TZWxlY3RvciA9PT0gXCI6Om1hcmtlclwiICYmIGRpc3BsYXkgIT09IFwibGlzdC1pdGVtXCIpIHx8XG4gIC8vICAgKChwc2V1ZG9TZWxlY3RvciA9PT0gXCI6OmJlZm9yZVwiIHx8IHBzZXVkb1NlbGVjdG9yID09PSBcIjo6YWZ0ZXJcIikgJiZcbiAgLy8gICAgIGlzVGFnTmFtZShzb3VyY2UgYXMgU3VwcG9ydGVkRWxlbWVudCwgTk9fR0VORVJBVEVfQ09OVEVOVF9FTEVNRU5UUykpIHx8XG4gIC8vICAgKHBzZXVkb1NlbGVjdG9yID09PSBcIjo6cGxhY2Vob2xkZXJcIiAmJlxuICAvLyAgICAgIWlzVGFnTmFtZShzb3VyY2UgYXMgU3VwcG9ydGVkRWxlbWVudCwgUExBQ0VIT0xERVJfRUxFTUVOVFMpKVxuICAvLyApIHtcbiAgLy8gICByZXR1cm4gbnVsbDtcbiAgLy8gfVxuICAvL1xuICAvLyByZXR1cm4ge1xuICAvLyAgIHN0eWxlLFxuICAvLyB9O1xufVxuIl19

/***/ }),

/***/ "../../browser-common/build/main/style-patcher/types.js":
/*!**************************************************************!*\
  !*** ../../browser-common/build/main/style-patcher/types.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3R5bGUtcGF0Y2hlci90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgU3VwcG9ydGVkRWxlbWVudCA9IEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudDtcblxuZXhwb3J0IHR5cGUgU3VwcG9ydGVkRWxlbWVudFRhZ05hbWVNYXAgPSBIVE1MRWxlbWVudFRhZ05hbWVNYXAgJiBTVkdFbGVtZW50VGFnTmFtZU1hcDtcblxuZXhwb3J0IHR5cGUgU3VwcG9ydGVkRWxlbWVudFRhZ05hbWUgPSBrZXlvZiBTdXBwb3J0ZWRFbGVtZW50VGFnTmFtZU1hcDtcblxuZXhwb3J0IHR5cGUgU3R5bGVTbmFwc2hvdCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5cbmV4cG9ydCB0eXBlIFBlc3Vkb1N0eWxlSW5mb01hcCA9IHtcbiAgW3BzZXVkbzogc3RyaW5nXTogUHNldWRvRWxlbWVudFN0eWxlSW5mbztcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWxlbWVudFN0eWxlSW5mbyB7XG4gIHN0eWxlOiBTdHlsZVNuYXBzaG90O1xuICBwc2V1ZG86IFBlc3Vkb1N0eWxlSW5mb01hcDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQc2V1ZG9FbGVtZW50U3R5bGVJbmZvIHtcbiAgc3R5bGU6IFN0eWxlU25hcHNob3Q7XG59XG5cbmV4cG9ydCB0eXBlIFN0eWxlSW5mbyA9IEVsZW1lbnRTdHlsZUluZm8gfCBudWxsO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRFbGVtZW50U3R5bGUge1xuICBwYXJlbnRTdHlsZTogU3R5bGVTbmFwc2hvdDtcbiAgd2lkdGg6IHN0cmluZztcbiAgaGVpZ2h0OiBzdHJpbmc7XG4gIGNoaWxkU3R5bGU6IEVsZW1lbnRTdHlsZUluZm87XG59XG4iXX0=

/***/ }),

/***/ "../../browser-common/build/main/style-patcher/write.js":
/*!**************************************************************!*\
  !*** ../../browser-common/build/main/style-patcher/write.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.patchStyle = void 0;
const dom_utils_1 = __webpack_require__(/*! ./dom-utils */ "../../browser-common/build/main/style-patcher/dom-utils.js");
// TODO: Figure out if this is a security concern before re-enabling
function patchStyle(target, styleInfo) {
    if (!styleInfo) {
        return;
    }
    const { style } = styleInfo;
    // also possible to concat target.style.cssText onto this, but for now we don't have any, so forget it
    target.style.cssText = dom_utils_1.generateCssText(style);
    /**
     * Patch size
     *
     * TODO: how to deal with inline elements?
     *
     */
    // This is brittle but checking for display: inline was not working.
    // Remember to add any inline elements we need here
    // Another option is to use HTML5 content categories "phrasing content" but worried about browser support
    if (target.nodeName !== 'SPAN') {
        target.style.boxSizing = 'border-box';
        target.style.width = '100%';
        target.style.height = '100%';
        target.style.maxWidth = 'none';
        target.style.minWidth = 'auto';
    }
    // TODO: Pseudo element support is disabled.
    // const pseudoCssTextList = [];
    //
    //
    // for (const selector in pseudo) {
    //
    //   const pseudoStyleInfo = pseudo[selector];
    //   const pseudoDefaultStyleInfo = pseudoDefault[selector];
    //
    //   if (!pseudoDefaultStyleInfo) {
    //     continue;
    //   }
    //
    //   const pseudoStyle = pseudoStyleInfo && pseudoStyleInfo.style;
    //   const pseudoDefaultStyle = pseudoDefaultStyleInfo && pseudoDefaultStyleInfo.style;
    //   const cssText = generateCssText(
    //     getStyleDiff(pseudoStyle, pseudoDefaultStyle)
    //   );
    //
    //   const css = generatePseudoElementCSS(target, selector, cssText);
    //
    //   if (css) {
    //     pseudoCssTextList.push(css);
    //   }
    // }
    //
    // if (pseudoCssTextList.length) {
    //   const style = createStyleElement(doc, pseudoCssTextList.join("\n"));
    //
    //   target.appendChild(style);
    // }
}
exports.patchStyle = patchStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3R5bGUtcGF0Y2hlci93cml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBOEM7QUFHOUMsb0VBQW9FO0FBQ3BFLFNBQWdCLFVBQVUsQ0FBQyxNQUF3QixFQUFFLFNBQW9CO0lBQ3ZFLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxPQUFPO0tBQ1I7SUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQzVCLHNHQUFzRztJQUN0RyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRywyQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlDOzs7OztPQUtHO0lBQ0gsb0VBQW9FO0lBQ3BFLG1EQUFtRDtJQUNuRCx5R0FBeUc7SUFDekcsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7UUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO0tBQ2hDO0lBRUQsNENBQTRDO0lBQzVDLGdDQUFnQztJQUNoQyxFQUFFO0lBQ0YsRUFBRTtJQUNGLG1DQUFtQztJQUNuQyxFQUFFO0lBQ0YsOENBQThDO0lBQzlDLDREQUE0RDtJQUM1RCxFQUFFO0lBQ0YsbUNBQW1DO0lBQ25DLGdCQUFnQjtJQUNoQixNQUFNO0lBQ04sRUFBRTtJQUNGLGtFQUFrRTtJQUNsRSx1RkFBdUY7SUFDdkYscUNBQXFDO0lBQ3JDLG9EQUFvRDtJQUNwRCxPQUFPO0lBQ1AsRUFBRTtJQUNGLHFFQUFxRTtJQUNyRSxFQUFFO0lBQ0YsZUFBZTtJQUNmLG1DQUFtQztJQUNuQyxNQUFNO0lBQ04sSUFBSTtJQUNKLEVBQUU7SUFDRixrQ0FBa0M7SUFDbEMseUVBQXlFO0lBQ3pFLEVBQUU7SUFDRiwrQkFBK0I7SUFDL0IsSUFBSTtBQUNOLENBQUM7QUF6REQsZ0NBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJhdGVDc3NUZXh0IH0gZnJvbSAnLi9kb20tdXRpbHMnO1xuaW1wb3J0IHsgU3R5bGVJbmZvLCBTdXBwb3J0ZWRFbGVtZW50IH0gZnJvbSAnLi90eXBlcyc7XG5cbi8vIFRPRE86IEZpZ3VyZSBvdXQgaWYgdGhpcyBpcyBhIHNlY3VyaXR5IGNvbmNlcm4gYmVmb3JlIHJlLWVuYWJsaW5nXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hTdHlsZSh0YXJnZXQ6IFN1cHBvcnRlZEVsZW1lbnQsIHN0eWxlSW5mbzogU3R5bGVJbmZvKTogdm9pZCB7XG4gIGlmICghc3R5bGVJbmZvKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBzdHlsZSB9ID0gc3R5bGVJbmZvO1xuICAvLyBhbHNvIHBvc3NpYmxlIHRvIGNvbmNhdCB0YXJnZXQuc3R5bGUuY3NzVGV4dCBvbnRvIHRoaXMsIGJ1dCBmb3Igbm93IHdlIGRvbid0IGhhdmUgYW55LCBzbyBmb3JnZXQgaXRcbiAgdGFyZ2V0LnN0eWxlLmNzc1RleHQgPSBnZW5lcmF0ZUNzc1RleHQoc3R5bGUpO1xuXG4gIC8qKlxuICAgKiBQYXRjaCBzaXplXG4gICAqXG4gICAqIFRPRE86IGhvdyB0byBkZWFsIHdpdGggaW5saW5lIGVsZW1lbnRzP1xuICAgKlxuICAgKi9cbiAgLy8gVGhpcyBpcyBicml0dGxlIGJ1dCBjaGVja2luZyBmb3IgZGlzcGxheTogaW5saW5lIHdhcyBub3Qgd29ya2luZy5cbiAgLy8gUmVtZW1iZXIgdG8gYWRkIGFueSBpbmxpbmUgZWxlbWVudHMgd2UgbmVlZCBoZXJlXG4gIC8vIEFub3RoZXIgb3B0aW9uIGlzIHRvIHVzZSBIVE1MNSBjb250ZW50IGNhdGVnb3JpZXMgXCJwaHJhc2luZyBjb250ZW50XCIgYnV0IHdvcnJpZWQgYWJvdXQgYnJvd3NlciBzdXBwb3J0XG4gIGlmICh0YXJnZXQubm9kZU5hbWUgIT09ICdTUEFOJykge1xuICAgIHRhcmdldC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgdGFyZ2V0LnN0eWxlLm1heFdpZHRoID0gJ25vbmUnO1xuICAgIHRhcmdldC5zdHlsZS5taW5XaWR0aCA9ICdhdXRvJztcbiAgfVxuXG4gIC8vIFRPRE86IFBzZXVkbyBlbGVtZW50IHN1cHBvcnQgaXMgZGlzYWJsZWQuXG4gIC8vIGNvbnN0IHBzZXVkb0Nzc1RleHRMaXN0ID0gW107XG4gIC8vXG4gIC8vXG4gIC8vIGZvciAoY29uc3Qgc2VsZWN0b3IgaW4gcHNldWRvKSB7XG4gIC8vXG4gIC8vICAgY29uc3QgcHNldWRvU3R5bGVJbmZvID0gcHNldWRvW3NlbGVjdG9yXTtcbiAgLy8gICBjb25zdCBwc2V1ZG9EZWZhdWx0U3R5bGVJbmZvID0gcHNldWRvRGVmYXVsdFtzZWxlY3Rvcl07XG4gIC8vXG4gIC8vICAgaWYgKCFwc2V1ZG9EZWZhdWx0U3R5bGVJbmZvKSB7XG4gIC8vICAgICBjb250aW51ZTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgY29uc3QgcHNldWRvU3R5bGUgPSBwc2V1ZG9TdHlsZUluZm8gJiYgcHNldWRvU3R5bGVJbmZvLnN0eWxlO1xuICAvLyAgIGNvbnN0IHBzZXVkb0RlZmF1bHRTdHlsZSA9IHBzZXVkb0RlZmF1bHRTdHlsZUluZm8gJiYgcHNldWRvRGVmYXVsdFN0eWxlSW5mby5zdHlsZTtcbiAgLy8gICBjb25zdCBjc3NUZXh0ID0gZ2VuZXJhdGVDc3NUZXh0KFxuICAvLyAgICAgZ2V0U3R5bGVEaWZmKHBzZXVkb1N0eWxlLCBwc2V1ZG9EZWZhdWx0U3R5bGUpXG4gIC8vICAgKTtcbiAgLy9cbiAgLy8gICBjb25zdCBjc3MgPSBnZW5lcmF0ZVBzZXVkb0VsZW1lbnRDU1ModGFyZ2V0LCBzZWxlY3RvciwgY3NzVGV4dCk7XG4gIC8vXG4gIC8vICAgaWYgKGNzcykge1xuICAvLyAgICAgcHNldWRvQ3NzVGV4dExpc3QucHVzaChjc3MpO1xuICAvLyAgIH1cbiAgLy8gfVxuICAvL1xuICAvLyBpZiAocHNldWRvQ3NzVGV4dExpc3QubGVuZ3RoKSB7XG4gIC8vICAgY29uc3Qgc3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQoZG9jLCBwc2V1ZG9Dc3NUZXh0TGlzdC5qb2luKFwiXFxuXCIpKTtcbiAgLy9cbiAgLy8gICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAvLyB9XG59XG4iXX0=

/***/ }),

/***/ "../../browser-common/build/main/utils/async.js":
/*!******************************************************!*\
  !*** ../../browser-common/build/main/utils/async.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timeout = void 0;
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.timeout = timeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvYXN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0IsT0FBTyxDQUFDLEVBQVU7SUFDaEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFGRCwwQkFFQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiB0aW1lb3V0KG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG59XG4iXX0=

/***/ }),

/***/ "../../browser-common/build/main/utils/element-event-triggers.js":
/*!***********************************************************************!*\
  !*** ../../browser-common/build/main/utils/element-event-triggers.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.triggerBlur = exports.triggerFocus = void 0;
/**
 * Creates events in a cross-browser compatible way.
 * @param eventType String of the event type to pass.
 * @param bubbles True of false if the event should bubble up.
 */
function createEvent(eventType, bubbles) {
    if ("createEvent" in document) {
        const event = document.createEvent("Event");
        event.initEvent(eventType, bubbles, true);
        return event;
    }
    if ("Event" in window) {
        return new Event(eventType, { bubbles: bubbles, cancelable: true });
    }
    throw new Error('Unable to create a new event: Unknown environment');
}
/**
 * Forces an element to gain "focus" in the browser.
 * Note: Element must be visible to gain focus.
 * @param element Element to snap focus to.
 */
function triggerFocus(element) {
    const eventType = "onfocusin" in element ? "focusin" : "focus";
    const bubbles = "onfocusin" in element;
    "focus" in element && element.focus();
    element.dispatchEvent(createEvent(eventType, bubbles));
}
exports.triggerFocus = triggerFocus;
/**
 * Forces an element to lose "focus" in the browser.
 * Note: Element must be visible for this to succeed.
 * Note: If an element doesn't have focus prior to calling this function, blur may not trigger.
 * @param element Element to remove focus from.
 */
function triggerBlur(element) {
    element.blur();
    element.dispatchEvent(createEvent('blur', true));
}
exports.triggerBlur = triggerBlur;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC1ldmVudC10cmlnZ2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9lbGVtZW50LWV2ZW50LXRyaWdnZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7O0dBSUc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxTQUFpQixFQUFFLE9BQWdCO0lBQ3RELElBQUksYUFBYSxJQUFJLFFBQVEsRUFBRTtRQUM3QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFO1FBQ3JCLE9BQU8sSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNyRTtJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFlBQVksQ0FBQyxPQUFtQztJQUM5RCxNQUFNLFNBQVMsR0FBRyxXQUFXLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUMvRCxNQUFNLE9BQU8sR0FBRyxXQUFXLElBQUksT0FBTyxDQUFDO0lBRXZDLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFORCxvQ0FNQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsV0FBVyxDQUFDLE9BQXlCO0lBQ25ELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNmLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFIRCxrQ0FHQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlcyBldmVudHMgaW4gYSBjcm9zcy1icm93c2VyIGNvbXBhdGlibGUgd2F5LlxuICogQHBhcmFtIGV2ZW50VHlwZSBTdHJpbmcgb2YgdGhlIGV2ZW50IHR5cGUgdG8gcGFzcy5cbiAqIEBwYXJhbSBidWJibGVzIFRydWUgb2YgZmFsc2UgaWYgdGhlIGV2ZW50IHNob3VsZCBidWJibGUgdXAuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGV2ZW50VHlwZTogc3RyaW5nLCBidWJibGVzOiBib29sZWFuKSB7XG4gIGlmIChcImNyZWF0ZUV2ZW50XCIgaW4gZG9jdW1lbnQpIHtcbiAgICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XG4gICAgZXZlbnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgYnViYmxlcywgdHJ1ZSk7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgaWYgKFwiRXZlbnRcIiBpbiB3aW5kb3cpIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50KGV2ZW50VHlwZSwgeyBidWJibGVzOiBidWJibGVzLCBjYW5jZWxhYmxlOiB0cnVlIH0pO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY3JlYXRlIGEgbmV3IGV2ZW50OiBVbmtub3duIGVudmlyb25tZW50Jyk7XG59XG5cbi8qKlxuICogRm9yY2VzIGFuIGVsZW1lbnQgdG8gZ2FpbiBcImZvY3VzXCIgaW4gdGhlIGJyb3dzZXIuXG4gKiBOb3RlOiBFbGVtZW50IG11c3QgYmUgdmlzaWJsZSB0byBnYWluIGZvY3VzLlxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byBzbmFwIGZvY3VzIHRvLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlckZvY3VzKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBFbGVtZW50KSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9IFwib25mb2N1c2luXCIgaW4gZWxlbWVudCA/IFwiZm9jdXNpblwiIDogXCJmb2N1c1wiO1xuICBjb25zdCBidWJibGVzID0gXCJvbmZvY3VzaW5cIiBpbiBlbGVtZW50O1xuXG4gIFwiZm9jdXNcIiBpbiBlbGVtZW50ICYmIGVsZW1lbnQuZm9jdXMoKTtcbiAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KGV2ZW50VHlwZSwgYnViYmxlcykpO1xufVxuXG4vKipcbiAqIEZvcmNlcyBhbiBlbGVtZW50IHRvIGxvc2UgXCJmb2N1c1wiIGluIHRoZSBicm93c2VyLlxuICogTm90ZTogRWxlbWVudCBtdXN0IGJlIHZpc2libGUgZm9yIHRoaXMgdG8gc3VjY2VlZC5cbiAqIE5vdGU6IElmIGFuIGVsZW1lbnQgZG9lc24ndCBoYXZlIGZvY3VzIHByaW9yIHRvIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgYmx1ciBtYXkgbm90IHRyaWdnZXIuXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHRvIHJlbW92ZSBmb2N1cyBmcm9tLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlckJsdXIoZWxlbWVudDogSFRNTElucHV0RWxlbWVudCkge1xuICBlbGVtZW50LmJsdXIoKTtcbiAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KCdibHVyJywgdHJ1ZSkpO1xufVxuIl19

/***/ }),

/***/ "../../browser-common/build/main/utils/index.js":
/*!******************************************************!*\
  !*** ../../browser-common/build/main/utils/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./async */ "../../browser-common/build/main/utils/async.js"), exports);
__exportStar(__webpack_require__(/*! ./element-event-triggers */ "../../browser-common/build/main/utils/element-event-triggers.js"), exports);
__exportStar(__webpack_require__(/*! ./json */ "../../browser-common/build/main/utils/json.js"), exports);
__exportStar(__webpack_require__(/*! ./random */ "../../browser-common/build/main/utils/random.js"), exports);
__exportStar(__webpack_require__(/*! ./to-camel-case */ "../../browser-common/build/main/utils/to-camel-case.js"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXdCO0FBQ3hCLDJEQUF5QztBQUN6Qyx5Q0FBdUI7QUFDdkIsMkNBQXlCO0FBQ3pCLGtEQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vYXN5bmMnO1xuZXhwb3J0ICogZnJvbSAnLi9lbGVtZW50LWV2ZW50LXRyaWdnZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vanNvbic7XG5leHBvcnQgKiBmcm9tICcuL3JhbmRvbSc7XG5leHBvcnQgKiBmcm9tICcuL3RvLWNhbWVsLWNhc2UnO1xuIl19

/***/ }),

/***/ "../../browser-common/build/main/utils/json.js":
/*!*****************************************************!*\
  !*** ../../browser-common/build/main/utils/json.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.safeParseJson = void 0;
function safeParseJson(json) {
    try {
        return JSON.parse(json);
    }
    catch (e) {
        return null;
    }
}
exports.safeParseJson = safeParseJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLGFBQWEsQ0FBSSxJQUFZO0lBQzNDLElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFNLENBQUM7S0FDOUI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBTkQsc0NBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gc2FmZVBhcnNlSnNvbjxUPihqc29uOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShqc29uKSBhcyBUO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "../../browser-common/build/main/utils/random.js":
/*!*******************************************************!*\
  !*** ../../browser-common/build/main/utils/random.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateSecureNonce = void 0;
function generateSecureNonce() {
    if (typeof crypto === "undefined") {
        // TODO: Figure out how to do this isomorphically
        return '12341234';
    }
    const r = crypto.getRandomValues(new Uint32Array(4));
    return Array.from(r)
        .map((i) => i.toString(16))
        .join('');
}
exports.generateSecureNonce = generateSecureNonce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL3JhbmRvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxTQUFnQixtQkFBbUI7SUFDakMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakMsaURBQWlEO1FBQ2pELE9BQU8sVUFBVSxDQUFDO0tBQ25CO0lBQ0QsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDakIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNkLENBQUM7QUFWRCxrREFVQyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2VjdXJlTm9uY2UoKSB7XG4gIGlmICh0eXBlb2YgY3J5cHRvID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgLy8gVE9ETzogRmlndXJlIG91dCBob3cgdG8gZG8gdGhpcyBpc29tb3JwaGljYWxseVxuICAgIHJldHVybiAnMTIzNDEyMzQnO1xuICB9XG4gIGNvbnN0IHIgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSg0KSk7XG5cbiAgcmV0dXJuIEFycmF5LmZyb20ocilcbiAgICAubWFwKChpKSA9PiBpLnRvU3RyaW5nKDE2KSlcbiAgICAuam9pbignJyk7XG59XG4iXX0=

/***/ }),

/***/ "../../browser-common/build/main/utils/to-camel-case.js":
/*!**************************************************************!*\
  !*** ../../browser-common/build/main/utils/to-camel-case.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Fork of: https://github.com/sindresorhus/camelcase/blob/main/index.js
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.camelCaseObject = exports.toCamelCase = exports.postProcess = exports.preserveConsecutiveUppercase = exports.preserveCamelCase = void 0;
function preserveCamelCase(str, locale) {
    let isLastCharLower = false;
    let isLastCharUpper = false;
    let isLastLastCharUpper = false;
    for (let i = 0; i < str.length; i++) {
        const character = str[i];
        if (isLastCharLower && /[\p{Lu}]/u.test(character)) {
            str = str.slice(0, i) + '-' + str.slice(i);
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            i++;
        }
        else if (isLastCharUpper && isLastLastCharUpper && /[\p{Ll}]/u.test(character)) {
            str = str.slice(0, i - 1) + '-' + str.slice(i - 1);
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
        }
        else {
            isLastCharLower =
                character.toLocaleLowerCase(locale) === character && character.toLocaleUpperCase(locale) !== character;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper =
                character.toLocaleUpperCase(locale) === character && character.toLocaleLowerCase(locale) !== character;
        }
    }
    return str;
}
exports.preserveCamelCase = preserveCamelCase;
function preserveConsecutiveUppercase(input) {
    return input.replace(/^[\p{Lu}](?![\p{Lu}])/gu, (m1) => m1.toLowerCase());
}
exports.preserveConsecutiveUppercase = preserveConsecutiveUppercase;
function postProcess(input, options) {
    return input
        .replace(/[_.\- ]+([\p{Alpha}\p{N}_]|$)/gu, (_, p1) => p1.toLocaleUpperCase(options.locale))
        .replace(/\d+([\p{Alpha}\p{N}_]|$)/gu, (m) => m.toLocaleUpperCase(options.locale));
}
exports.postProcess = postProcess;
function toCamelCase(input, options) {
    if (!options) {
        options = {
            pascalCase: false,
            preserveConsecutiveUppercase: false,
        };
    }
    if (Array.isArray(input)) {
        input = input
            .map((x) => x.trim())
            .filter((x) => x.length)
            .join('-');
    }
    else {
        input = input.trim();
    }
    if (input.length === 0) {
        return '';
    }
    if (input.length === 1) {
        return options.pascalCase ? input.toLocaleUpperCase(options.locale) : input.toLocaleLowerCase(options.locale);
    }
    const hasUpperCase = input !== input.toLocaleLowerCase(options.locale);
    if (hasUpperCase) {
        input = preserveCamelCase(input, options.locale);
    }
    input = input.replace(/^[_.\- ]+/, '');
    if (options.preserveConsecutiveUppercase) {
        input = preserveConsecutiveUppercase(input);
    }
    else {
        input = input.toLocaleLowerCase();
    }
    if (options.pascalCase) {
        input = input.charAt(0).toLocaleUpperCase(options.locale) + input.slice(1);
    }
    return postProcess(input, options);
}
exports.toCamelCase = toCamelCase;
function camelCaseObject(obj) {
    return Object.keys(obj).reduce((camelCaseObj, key) => {
        camelCaseObj[toCamelCase(key)] = obj[key];
        return camelCaseObj;
    }, {});
}
exports.camelCaseObject = camelCaseObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tY2FtZWwtY2FzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy90by1jYW1lbC1jYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3RUFBd0U7OztBQVF4RSxTQUFnQixpQkFBaUIsQ0FBQyxHQUFXLEVBQUUsTUFBZTtJQUM1RCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDNUIsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQzVCLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6QixJQUFJLGVBQWUsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2xELEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLG1CQUFtQixHQUFHLGVBQWUsQ0FBQztZQUN0QyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsRUFBRSxDQUFDO1NBQ0w7YUFBTSxJQUFJLGVBQWUsSUFBSSxtQkFBbUIsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2hGLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELG1CQUFtQixHQUFHLGVBQWUsQ0FBQztZQUN0QyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDeEI7YUFBTTtZQUNMLGVBQWU7Z0JBQ2IsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLFNBQVMsSUFBSSxTQUFTLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssU0FBUyxDQUFDO1lBQ3pHLG1CQUFtQixHQUFHLGVBQWUsQ0FBQztZQUN0QyxlQUFlO2dCQUNiLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTLElBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLFNBQVMsQ0FBQztTQUMxRztLQUNGO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBN0JELDhDQTZCQztBQUVELFNBQWdCLDRCQUE0QixDQUFDLEtBQWE7SUFDeEQsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRkQsb0VBRUM7QUFFRCxTQUFnQixXQUFXLENBQUMsS0FBYSxFQUFFLE9BQXlCO0lBQ2xFLE9BQU8sS0FBSztTQUNULE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0YsT0FBTyxDQUFDLDRCQUE0QixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdkYsQ0FBQztBQUpELGtDQUlDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLEtBQWEsRUFBRSxPQUEwQjtJQUNuRSxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxHQUFHO1lBQ1IsVUFBVSxFQUFFLEtBQUs7WUFDakIsNEJBQTRCLEVBQUUsS0FBSztTQUNwQyxDQUFDO0tBQ0g7SUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEIsS0FBSyxHQUFHLEtBQUs7YUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7YUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2Q7U0FBTTtRQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdEI7SUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvRztJQUVELE1BQU0sWUFBWSxHQUFHLEtBQUssS0FBSyxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXZFLElBQUksWUFBWSxFQUFFO1FBQ2hCLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXZDLElBQUksT0FBTyxDQUFDLDRCQUE0QixFQUFFO1FBQ3hDLEtBQUssR0FBRyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3QztTQUFNO1FBQ0wsS0FBSyxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQ25DO0lBRUQsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1FBQ3RCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVFO0lBRUQsT0FBTyxXQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUE1Q0Qsa0NBNENDO0FBRUQsU0FBZ0IsZUFBZSxDQUFJLEdBQXNCO0lBQ3ZELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDbkQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDLEVBQUUsRUFBdUIsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFMRCwwQ0FLQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZvcmsgb2Y6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvY2FtZWxjYXNlL2Jsb2IvbWFpbi9pbmRleC5qc1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbWVsQ2FzZU9wdGlvbnMge1xuICBwYXNjYWxDYXNlOiBib29sZWFuO1xuICBwcmVzZXJ2ZUNvbnNlY3V0aXZlVXBwZXJjYXNlOiBib29sZWFuO1xuICBsb2NhbGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVzZXJ2ZUNhbWVsQ2FzZShzdHI6IHN0cmluZywgbG9jYWxlPzogc3RyaW5nKSB7XG4gIGxldCBpc0xhc3RDaGFyTG93ZXIgPSBmYWxzZTtcbiAgbGV0IGlzTGFzdENoYXJVcHBlciA9IGZhbHNlO1xuICBsZXQgaXNMYXN0TGFzdENoYXJVcHBlciA9IGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhcmFjdGVyID0gc3RyW2ldO1xuXG4gICAgaWYgKGlzTGFzdENoYXJMb3dlciAmJiAvW1xccHtMdX1dL3UudGVzdChjaGFyYWN0ZXIpKSB7XG4gICAgICBzdHIgPSBzdHIuc2xpY2UoMCwgaSkgKyAnLScgKyBzdHIuc2xpY2UoaSk7XG4gICAgICBpc0xhc3RDaGFyTG93ZXIgPSBmYWxzZTtcbiAgICAgIGlzTGFzdExhc3RDaGFyVXBwZXIgPSBpc0xhc3RDaGFyVXBwZXI7XG4gICAgICBpc0xhc3RDaGFyVXBwZXIgPSB0cnVlO1xuICAgICAgaSsrO1xuICAgIH0gZWxzZSBpZiAoaXNMYXN0Q2hhclVwcGVyICYmIGlzTGFzdExhc3RDaGFyVXBwZXIgJiYgL1tcXHB7TGx9XS91LnRlc3QoY2hhcmFjdGVyKSkge1xuICAgICAgc3RyID0gc3RyLnNsaWNlKDAsIGkgLSAxKSArICctJyArIHN0ci5zbGljZShpIC0gMSk7XG4gICAgICBpc0xhc3RMYXN0Q2hhclVwcGVyID0gaXNMYXN0Q2hhclVwcGVyO1xuICAgICAgaXNMYXN0Q2hhclVwcGVyID0gZmFsc2U7XG4gICAgICBpc0xhc3RDaGFyTG93ZXIgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc0xhc3RDaGFyTG93ZXIgPVxuICAgICAgICBjaGFyYWN0ZXIudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKSA9PT0gY2hhcmFjdGVyICYmIGNoYXJhY3Rlci50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICE9PSBjaGFyYWN0ZXI7XG4gICAgICBpc0xhc3RMYXN0Q2hhclVwcGVyID0gaXNMYXN0Q2hhclVwcGVyO1xuICAgICAgaXNMYXN0Q2hhclVwcGVyID1cbiAgICAgICAgY2hhcmFjdGVyLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgPT09IGNoYXJhY3RlciAmJiBjaGFyYWN0ZXIudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKSAhPT0gY2hhcmFjdGVyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVzZXJ2ZUNvbnNlY3V0aXZlVXBwZXJjYXNlKGlucHV0OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15bXFxwe0x1fV0oPyFbXFxwe0x1fV0pL2d1LCAobTEpID0+IG0xLnRvTG93ZXJDYXNlKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zdFByb2Nlc3MoaW5wdXQ6IHN0cmluZywgb3B0aW9uczogQ2FtZWxDYXNlT3B0aW9ucykge1xuICByZXR1cm4gaW5wdXRcbiAgICAucmVwbGFjZSgvW18uXFwtIF0rKFtcXHB7QWxwaGF9XFxwe059X118JCkvZ3UsIChfLCBwMSkgPT4gcDEudG9Mb2NhbGVVcHBlckNhc2Uob3B0aW9ucy5sb2NhbGUpKVxuICAgIC5yZXBsYWNlKC9cXGQrKFtcXHB7QWxwaGF9XFxwe059X118JCkvZ3UsIChtKSA9PiBtLnRvTG9jYWxlVXBwZXJDYXNlKG9wdGlvbnMubG9jYWxlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0NhbWVsQ2FzZShpbnB1dDogc3RyaW5nLCBvcHRpb25zPzogQ2FtZWxDYXNlT3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgcGFzY2FsQ2FzZTogZmFsc2UsXG4gICAgICBwcmVzZXJ2ZUNvbnNlY3V0aXZlVXBwZXJjYXNlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgaW5wdXQgPSBpbnB1dFxuICAgICAgLm1hcCgoeCkgPT4geC50cmltKCkpXG4gICAgICAuZmlsdGVyKCh4KSA9PiB4Lmxlbmd0aClcbiAgICAgIC5qb2luKCctJyk7XG4gIH0gZWxzZSB7XG4gICAgaW5wdXQgPSBpbnB1dC50cmltKCk7XG4gIH1cblxuICBpZiAoaW5wdXQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBvcHRpb25zLnBhc2NhbENhc2UgPyBpbnB1dC50b0xvY2FsZVVwcGVyQ2FzZShvcHRpb25zLmxvY2FsZSkgOiBpbnB1dC50b0xvY2FsZUxvd2VyQ2FzZShvcHRpb25zLmxvY2FsZSk7XG4gIH1cblxuICBjb25zdCBoYXNVcHBlckNhc2UgPSBpbnB1dCAhPT0gaW5wdXQudG9Mb2NhbGVMb3dlckNhc2Uob3B0aW9ucy5sb2NhbGUpO1xuXG4gIGlmIChoYXNVcHBlckNhc2UpIHtcbiAgICBpbnB1dCA9IHByZXNlcnZlQ2FtZWxDYXNlKGlucHV0LCBvcHRpb25zLmxvY2FsZSk7XG4gIH1cblxuICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL15bXy5cXC0gXSsvLCAnJyk7XG5cbiAgaWYgKG9wdGlvbnMucHJlc2VydmVDb25zZWN1dGl2ZVVwcGVyY2FzZSkge1xuICAgIGlucHV0ID0gcHJlc2VydmVDb25zZWN1dGl2ZVVwcGVyY2FzZShpbnB1dCk7XG4gIH0gZWxzZSB7XG4gICAgaW5wdXQgPSBpbnB1dC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucGFzY2FsQ2FzZSkge1xuICAgIGlucHV0ID0gaW5wdXQuY2hhckF0KDApLnRvTG9jYWxlVXBwZXJDYXNlKG9wdGlvbnMubG9jYWxlKSArIGlucHV0LnNsaWNlKDEpO1xuICB9XG5cbiAgcmV0dXJuIHBvc3RQcm9jZXNzKGlucHV0LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZU9iamVjdDxUPihvYmo6IFJlY29yZDxzdHJpbmcsIFQ+KSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZSgoY2FtZWxDYXNlT2JqLCBrZXkpID0+IHtcbiAgICBjYW1lbENhc2VPYmpbdG9DYW1lbENhc2Uoa2V5KV0gPSBvYmpba2V5XTtcbiAgICByZXR1cm4gY2FtZWxDYXNlT2JqO1xuICB9LCB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBUPik7XG59XG4iXX0=

/***/ }),

/***/ "./rpc/index.ts":
/*!**********************!*\
  !*** ./rpc/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listenForRPCMessages = exports.processMessage = exports.notifyParentOfEvent = exports.respondAttributesReceived = exports.respondWithTokenizedValue = exports.sendMessageToParentFrame = exports.detokenize = void 0;
const tokenizer_sdk_1 = __webpack_require__(/*! @lunasec/tokenizer-sdk */ "../../tokenizer-sdk/build/module/index.js");
const browser_common_1 = __webpack_require__(/*! @lunasec/browser-common */ "../../browser-common/build/main/index.js");
function createMessageToFrame(s, correlationToken, createMessage) {
    const innerMessage = createMessage();
    return {
        command: s,
        correlationToken: correlationToken,
        data: innerMessage
    };
}
function createNotificationToFrame(s, frameNonce, createNotification = () => ({})) {
    const innerMessage = createNotification();
    return {
        command: s,
        frameNonce: frameNonce,
        data: innerMessage
    };
}
async function tokenizeField() {
    const secureInput = document.querySelector('.secure-input');
    if (!secureInput) {
        throw new Error('Unable to read value to tokenize');
    }
    const value = secureInput.value;
    const tokenizer = new tokenizer_sdk_1.Tokenizer();
    const resp = await tokenizer.tokenize(value);
    if (!resp.success) {
        console.error("tokenizer error:", resp);
        return null;
    }
    return resp.tokenId;
}
async function detokenize(token) {
    const tokenizer = new tokenizer_sdk_1.Tokenizer();
    const resp = await tokenizer.detokenize(token);
    if (!resp.success || resp.value === null) {
        throw new Error(`Detokenizer error ${resp}`);
    }
    return resp.value;
}
exports.detokenize = detokenize;
function sendMessageToParentFrame(origin, message) {
    window.parent.postMessage(JSON.stringify(message), origin);
}
exports.sendMessageToParentFrame = sendMessageToParentFrame;
function respondWithTokenizedValue(origin, rawMessage, token) {
    const message = createMessageToFrame('ReceiveCommittedToken', rawMessage.correlationToken, () => {
        if (token === null) {
            return {
                success: false,
                error: "tokenizer failed to tokenize data"
            };
        }
        return {
            success: true,
            token: token
        };
    });
    sendMessageToParentFrame(origin, message);
    return;
}
exports.respondWithTokenizedValue = respondWithTokenizedValue;
// Just tell the outside app that we got the message, kind of boilerplate
function respondAttributesReceived(origin, rawMessage) {
    const message = createMessageToFrame('ReceiveAttributesConfirmation', rawMessage.correlationToken, () => {
        return {
            success: true,
        };
    });
    sendMessageToParentFrame(origin, message);
    return;
}
exports.respondAttributesReceived = respondAttributesReceived;
function notifyParentOfEvent(eventName, origin, frameNonce) {
    const message = createNotificationToFrame(eventName, frameNonce);
    sendMessageToParentFrame(origin, message);
}
exports.notifyParentOfEvent = notifyParentOfEvent;
async function processMessage(origin, rawMessage, updateAttrCallback) {
    // TODO: Make this type safe (require every message to be handled)
    if (rawMessage.command === 'CommitToken') {
        const serverResponse = await tokenizeField();
        respondWithTokenizedValue(origin, rawMessage, serverResponse);
        return;
    }
    if (rawMessage.command === 'Attributes') {
        updateAttrCallback(rawMessage.data);
        respondAttributesReceived(origin, rawMessage);
        return;
    }
    throw new Error('Secure frame unable to process message of command type: ' + rawMessage.command);
}
exports.processMessage = processMessage;
// TODO: Passing a callback here that only gets called in certain situations kind of stinks
function listenForRPCMessages(origin, updateAttrCallback) {
    window.addEventListener('message', (event) => {
        // TODO: Is this a security problem?
        if (origin !== event.origin) {
            console.log('rejected origin', event.origin, origin);
            return;
        }
        const rawMessage = browser_common_1.safeParseJson(event.data);
        if (!rawMessage) {
            console.error('Invalid message received by secure frame.');
            return;
        }
        processMessage(origin, rawMessage, updateAttrCallback);
    });
}
exports.listenForRPCMessages = listenForRPCMessages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnBjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVNBLDBEQUFpRDtBQUNqRCw0REFBc0Q7QUFFdEQsU0FBUyxvQkFBb0IsQ0FBeUMsQ0FBSSxFQUFFLGdCQUF3QixFQUFFLGFBQThDO0lBRWxKLE1BQU0sWUFBWSxHQUFHLGFBQWEsRUFBRSxDQUFDO0lBRXJDLE9BQU87UUFDTCxPQUFPLEVBQUUsQ0FBQztRQUNWLGdCQUFnQixFQUFFLGdCQUFnQjtRQUNsQyxJQUFJLEVBQUUsWUFBWTtLQUNuQixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQ2hDLENBQUksRUFDSixVQUFrQixFQUNsQixxQkFBMkQsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFckUsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQztJQUUxQyxPQUFPO1FBQ0wsT0FBTyxFQUFFLENBQUM7UUFDVixVQUFVLEVBQUUsVUFBVTtRQUN0QixJQUFJLEVBQUUsWUFBWTtLQUNuQixDQUFDO0FBQ0osQ0FBQztBQUVELEtBQUssVUFBVSxhQUFhO0lBQzFCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFNUQsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7S0FDckQ7SUFDRCxNQUFNLEtBQUssR0FBSSxXQUFnQyxDQUFDLEtBQUssQ0FBQztJQUN0RCxNQUFNLFNBQVMsR0FBRyxJQUFJLHlCQUFTLEVBQUUsQ0FBQztJQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3JCLENBQUM7QUFFTSxLQUFLLFVBQVUsVUFBVSxDQUFDLEtBQWE7SUFDNUMsTUFBTSxTQUFTLEdBQUcsSUFBSSx5QkFBUyxFQUFFLENBQUM7SUFDbEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1FBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUE7S0FDN0M7SUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDcEIsQ0FBQztBQVBELGdDQU9DO0FBRUQsU0FBZ0Isd0JBQXdCLENBQUMsTUFBYyxFQUFFLE9BQXVEO0lBQzlHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUZELDREQUVDO0FBRUQsU0FBZ0IseUJBQXlCLENBQUMsTUFBYyxFQUFFLFVBQStCLEVBQUUsS0FBb0I7SUFDN0csTUFBTSxPQUFPLEdBQUcsb0JBQW9CLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5RixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsT0FBTztnQkFDTCxPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsbUNBQW1DO2FBQzNDLENBQUM7U0FDSDtRQUVELE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsd0JBQXdCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLE9BQU87QUFDVCxDQUFDO0FBakJELDhEQWlCQztBQUVELHlFQUF5RTtBQUN6RSxTQUFnQix5QkFBeUIsQ0FBQyxNQUFjLEVBQUUsVUFBK0I7SUFDdkYsTUFBTSxPQUFPLEdBQUcsb0JBQW9CLENBQUMsK0JBQStCLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUN0RyxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSCx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsT0FBTztBQUNULENBQUM7QUFSRCw4REFRQztBQUdELFNBQWdCLG1CQUFtQixDQUFDLFNBQTRDLEVBQUUsTUFBYyxFQUFFLFVBQWtCO0lBQ2xILE1BQU0sT0FBTyxHQUFHLHlCQUF5QixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRSx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUhELGtEQUdDO0FBRU0sS0FBSyxVQUFVLGNBQWMsQ0FBQyxNQUFjLEVBQUUsVUFBK0IsRUFBRSxrQkFBaUQ7SUFFckksa0VBQWtFO0lBQ2xFLElBQUksVUFBVSxDQUFDLE9BQU8sS0FBSyxhQUFhLEVBQUU7UUFDeEMsTUFBTSxjQUFjLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQztRQUM3Qyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzlELE9BQU87S0FDUjtJQUNELElBQUksVUFBVSxDQUFDLE9BQU8sS0FBSyxZQUFZLEVBQUU7UUFDdkMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLElBQXlCLENBQUMsQ0FBQztRQUN6RCx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsT0FBTztLQUNSO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkcsQ0FBQztBQWZELHdDQWVDO0FBRUQsMkZBQTJGO0FBQzNGLFNBQWdCLG9CQUFvQixDQUFDLE1BQWMsRUFBRSxrQkFBaUQ7SUFDcEcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzNDLG9DQUFvQztRQUNwQyxJQUFJLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNyRCxPQUFPO1NBQ1I7UUFFRCxNQUFNLFVBQVUsR0FBRyw4QkFBYSxDQUFzQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztZQUMzRCxPQUFPO1NBQ1I7UUFDRCxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWZELG9EQWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRnJhbWVNZXNzYWdlLFxuICBJbmJvdW5kRnJhbWVNZXNzYWdlTWFwLFxuICBVbmtub3duRnJhbWVNZXNzYWdlLFxuICBGcmFtZU5vdGlmaWNhdGlvbixcbiAgSW5ib3VuZEZyYW1lTm90aWZpY2F0aW9uTWFwLFxuICBVbmtub3duRnJhbWVOb3RpZmljYXRpb24sXG4gIEF0dHJpYnV0ZXNNZXNzYWdlXG59IGZyb20gJ0BsdW5hc2VjL2Jyb3dzZXItY29tbW9uJztcbmltcG9ydCB7VG9rZW5pemVyfSBmcm9tIFwiQGx1bmFzZWMvdG9rZW5pemVyLXNka1wiO1xuaW1wb3J0IHtzYWZlUGFyc2VKc29ufSBmcm9tICdAbHVuYXNlYy9icm93c2VyLWNvbW1vbic7XG5cbmZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VUb0ZyYW1lPEsgZXh0ZW5kcyBrZXlvZiBJbmJvdW5kRnJhbWVNZXNzYWdlTWFwPihzOiBLLCBjb3JyZWxhdGlvblRva2VuOiBzdHJpbmcsIGNyZWF0ZU1lc3NhZ2U6ICgpID0+IEluYm91bmRGcmFtZU1lc3NhZ2VNYXBbS10pOiBGcmFtZU1lc3NhZ2U8SW5ib3VuZEZyYW1lTWVzc2FnZU1hcCwgSz4ge1xuXG4gIGNvbnN0IGlubmVyTWVzc2FnZSA9IGNyZWF0ZU1lc3NhZ2UoKTtcblxuICByZXR1cm4ge1xuICAgIGNvbW1hbmQ6IHMsXG4gICAgY29ycmVsYXRpb25Ub2tlbjogY29ycmVsYXRpb25Ub2tlbixcbiAgICBkYXRhOiBpbm5lck1lc3NhZ2VcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm90aWZpY2F0aW9uVG9GcmFtZTxLIGV4dGVuZHMga2V5b2YgSW5ib3VuZEZyYW1lTm90aWZpY2F0aW9uTWFwPihcbiAgczogSyxcbiAgZnJhbWVOb25jZTogc3RyaW5nLFxuICBjcmVhdGVOb3RpZmljYXRpb246ICgpID0+IEluYm91bmRGcmFtZU5vdGlmaWNhdGlvbk1hcFtLXSA9ICgpID0+ICh7fSlcbik6IEZyYW1lTm90aWZpY2F0aW9uPEluYm91bmRGcmFtZU5vdGlmaWNhdGlvbk1hcCwgSz4ge1xuICBjb25zdCBpbm5lck1lc3NhZ2UgPSBjcmVhdGVOb3RpZmljYXRpb24oKTtcblxuICByZXR1cm4ge1xuICAgIGNvbW1hbmQ6IHMsXG4gICAgZnJhbWVOb25jZTogZnJhbWVOb25jZSxcbiAgICBkYXRhOiBpbm5lck1lc3NhZ2VcbiAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdG9rZW5pemVGaWVsZCgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgY29uc3Qgc2VjdXJlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdXJlLWlucHV0Jyk7XG5cbiAgaWYgKCFzZWN1cmVJbnB1dCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHJlYWQgdmFsdWUgdG8gdG9rZW5pemUnKTtcbiAgfVxuICBjb25zdCB2YWx1ZSA9IChzZWN1cmVJbnB1dCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgY29uc3QgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcigpO1xuICBjb25zdCByZXNwID0gYXdhaXQgdG9rZW5pemVyLnRva2VuaXplKHZhbHVlKTtcblxuICBpZiAoIXJlc3Auc3VjY2Vzcykge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJ0b2tlbml6ZXIgZXJyb3I6XCIsIHJlc3ApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZXNwLnRva2VuSWRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRldG9rZW5pemUodG9rZW46IHN0cmluZyl7XG4gIGNvbnN0IHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIoKTtcbiAgY29uc3QgcmVzcCA9IGF3YWl0IHRva2VuaXplci5kZXRva2VuaXplKHRva2VuKTtcbiAgaWYgKCFyZXNwLnN1Y2Nlc3MgfHwgcmVzcC52YWx1ZSA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRGV0b2tlbml6ZXIgZXJyb3IgJHtyZXNwfWApXG4gIH1cbiAgcmV0dXJuIHJlc3AudmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZW5kTWVzc2FnZVRvUGFyZW50RnJhbWUob3JpZ2luOiBzdHJpbmcsIG1lc3NhZ2U6IFVua25vd25GcmFtZU1lc3NhZ2UgfCBVbmtub3duRnJhbWVOb3RpZmljYXRpb24pIHtcbiAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgb3JpZ2luKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbmRXaXRoVG9rZW5pemVkVmFsdWUob3JpZ2luOiBzdHJpbmcsIHJhd01lc3NhZ2U6IFVua25vd25GcmFtZU1lc3NhZ2UsIHRva2VuOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlVG9GcmFtZSgnUmVjZWl2ZUNvbW1pdHRlZFRva2VuJywgcmF3TWVzc2FnZS5jb3JyZWxhdGlvblRva2VuLCAoKSA9PiB7XG4gICAgaWYgKHRva2VuID09PSBudWxsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IFwidG9rZW5pemVyIGZhaWxlZCB0byB0b2tlbml6ZSBkYXRhXCJcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICB0b2tlbjogdG9rZW5cbiAgICB9O1xuICB9KTtcblxuICBzZW5kTWVzc2FnZVRvUGFyZW50RnJhbWUob3JpZ2luLCBtZXNzYWdlKTtcbiAgcmV0dXJuO1xufVxuXG4vLyBKdXN0IHRlbGwgdGhlIG91dHNpZGUgYXBwIHRoYXQgd2UgZ290IHRoZSBtZXNzYWdlLCBraW5kIG9mIGJvaWxlcnBsYXRlXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uZEF0dHJpYnV0ZXNSZWNlaXZlZChvcmlnaW46IHN0cmluZywgcmF3TWVzc2FnZTogVW5rbm93bkZyYW1lTWVzc2FnZSk6IHZvaWQge1xuICBjb25zdCBtZXNzYWdlID0gY3JlYXRlTWVzc2FnZVRvRnJhbWUoJ1JlY2VpdmVBdHRyaWJ1dGVzQ29uZmlybWF0aW9uJywgcmF3TWVzc2FnZS5jb3JyZWxhdGlvblRva2VuLCAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgfTtcbiAgfSk7XG4gIHNlbmRNZXNzYWdlVG9QYXJlbnRGcmFtZShvcmlnaW4sIG1lc3NhZ2UpO1xuICByZXR1cm47XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmeVBhcmVudE9mRXZlbnQoZXZlbnROYW1lOiBrZXlvZiBJbmJvdW5kRnJhbWVOb3RpZmljYXRpb25NYXAsIG9yaWdpbjogc3RyaW5nLCBmcmFtZU5vbmNlOiBzdHJpbmcpIHtcbiAgY29uc3QgbWVzc2FnZSA9IGNyZWF0ZU5vdGlmaWNhdGlvblRvRnJhbWUoZXZlbnROYW1lLCBmcmFtZU5vbmNlKTtcbiAgc2VuZE1lc3NhZ2VUb1BhcmVudEZyYW1lKG9yaWdpbiwgbWVzc2FnZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzTWVzc2FnZShvcmlnaW46IHN0cmluZywgcmF3TWVzc2FnZTogVW5rbm93bkZyYW1lTWVzc2FnZSwgdXBkYXRlQXR0ckNhbGxiYWNrOiAobTogQXR0cmlidXRlc01lc3NhZ2UpID0+IGFueSkge1xuXG4gIC8vIFRPRE86IE1ha2UgdGhpcyB0eXBlIHNhZmUgKHJlcXVpcmUgZXZlcnkgbWVzc2FnZSB0byBiZSBoYW5kbGVkKVxuICBpZiAocmF3TWVzc2FnZS5jb21tYW5kID09PSAnQ29tbWl0VG9rZW4nKSB7XG4gICAgY29uc3Qgc2VydmVyUmVzcG9uc2UgPSBhd2FpdCB0b2tlbml6ZUZpZWxkKCk7XG4gICAgcmVzcG9uZFdpdGhUb2tlbml6ZWRWYWx1ZShvcmlnaW4sIHJhd01lc3NhZ2UsIHNlcnZlclJlc3BvbnNlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHJhd01lc3NhZ2UuY29tbWFuZCA9PT0gJ0F0dHJpYnV0ZXMnKSB7XG4gICAgdXBkYXRlQXR0ckNhbGxiYWNrKHJhd01lc3NhZ2UuZGF0YSBhcyBBdHRyaWJ1dGVzTWVzc2FnZSk7XG4gICAgcmVzcG9uZEF0dHJpYnV0ZXNSZWNlaXZlZChvcmlnaW4sIHJhd01lc3NhZ2UpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignU2VjdXJlIGZyYW1lIHVuYWJsZSB0byBwcm9jZXNzIG1lc3NhZ2Ugb2YgY29tbWFuZCB0eXBlOiAnICsgcmF3TWVzc2FnZS5jb21tYW5kKTtcbn1cblxuLy8gVE9ETzogUGFzc2luZyBhIGNhbGxiYWNrIGhlcmUgdGhhdCBvbmx5IGdldHMgY2FsbGVkIGluIGNlcnRhaW4gc2l0dWF0aW9ucyBraW5kIG9mIHN0aW5rc1xuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlbkZvclJQQ01lc3NhZ2VzKG9yaWdpbjogc3RyaW5nLCB1cGRhdGVBdHRyQ2FsbGJhY2s6IChtOiBBdHRyaWJ1dGVzTWVzc2FnZSkgPT4gYW55KSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgLy8gVE9ETzogSXMgdGhpcyBhIHNlY3VyaXR5IHByb2JsZW0/XG4gICAgaWYgKG9yaWdpbiAhPT0gZXZlbnQub3JpZ2luKSB7XG4gICAgICBjb25zb2xlLmxvZygncmVqZWN0ZWQgb3JpZ2luJywgZXZlbnQub3JpZ2luLCBvcmlnaW4pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd01lc3NhZ2UgPSBzYWZlUGFyc2VKc29uPFVua25vd25GcmFtZU1lc3NhZ2U+KGV2ZW50LmRhdGEpO1xuICAgIGlmICghcmF3TWVzc2FnZSkge1xuICAgICAgY29uc29sZS5lcnJvcignSW52YWxpZCBtZXNzYWdlIHJlY2VpdmVkIGJ5IHNlY3VyZSBmcmFtZS4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHJvY2Vzc01lc3NhZ2Uob3JpZ2luLCByYXdNZXNzYWdlLCB1cGRhdGVBdHRyQ2FsbGJhY2spO1xuICB9KTtcbn1cbiJdfQ==

/***/ }),

/***/ "./secure-frame.ts":
/*!*************************!*\
  !*** ./secure-frame.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecureFrame = void 0;
const browser_common_1 = __webpack_require__(/*! @lunasec/browser-common */ "../../browser-common/build/main/index.js");
const browser_common_2 = __webpack_require__(/*! @lunasec/browser-common */ "../../browser-common/build/main/index.js");
const rpc_1 = __webpack_require__(/*! ./rpc */ "./rpc/index.ts");
// Would be nice if class could take <element type parameter> but couldn't quite get it working
class SecureFrame {
    constructor(elementName, loadingText) {
        this.initialized = false;
        this.elementType = elementName;
        this.loadingText = loadingText;
        this.secureElement = this.insertSecureElement(elementName);
        this.origin = this.getURLSearchParam('origin');
        this.frameNonce = this.getURLSearchParam('n');
        rpc_1.listenForRPCMessages(this.origin, (attrs) => { void this.setAttributesFromRPC(attrs); });
        rpc_1.notifyParentOfEvent('NotifyOnStart', this.origin, this.frameNonce);
    }
    insertSecureElement(elementName) {
        const body = document.getElementsByTagName("BODY")[0];
        const secureElement = document.createElement(elementName);
        secureElement.className = 'secure-input d-none';
        body.appendChild(secureElement);
        return secureElement;
    }
    getURLSearchParam(paramName) {
        const searchParams = (new URL(document.location.href)).searchParams;
        const param = searchParams.get(paramName);
        if (!param) {
            throw new Error(`Missing parameter from iframe url ${paramName}`);
        }
        return param;
    }
    // Set up the iframe attributes, used on both page load and on any subsequent changes
    async setAttributesFromRPC(attrs) {
        // First time setup
        if (!this.initialized) {
            this.loadingText.classList.add('d-none');
            this.secureElement.classList.remove('d-none');
            if (!attrs.style) {
                console.error('Attribute frame message missing necessary style parameter for first time frame startup', attrs);
                return;
            }
        }
        if (attrs.style) {
            browser_common_2.patchStyle(this.secureElement, browser_common_1.safeParseJson(attrs.style));
        }
        if (attrs.type && this.elementType === 'input') {
            this.secureElement.setAttribute('type', attrs.type);
        }
        if (attrs.token) {
            const value = await rpc_1.detokenize(attrs.token);
            if (this.elementType === 'input' || this.elementType === 'textarea') {
                const input = this.secureElement;
                input.value = value;
            }
            if (this.elementType === 'span') {
                this.secureElement.textContent = value;
            }
        }
        if (this.elementType === 'input') {
            this.attachOnBlurNotifier();
        }
        this.initialized = true;
        return;
    }
    attachOnBlurNotifier() {
        this.secureElement.addEventListener('blur', () => {
            rpc_1.notifyParentOfEvent('NotifyOnBlur', this.origin, this.frameNonce);
        });
    }
}
exports.SecureFrame = SecureFrame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlY3VyZS1mcmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFBc0Q7QUFFdEQsNERBQWlEO0FBQ2pELCtCQUE0RTtBQWE1RSwrRkFBK0Y7QUFDL0YsTUFBYSxXQUFXO0lBUXBCLFlBQVksV0FBK0IsRUFBRSxXQUFvQjtRQUR6RCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QywwQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRSxLQUFLLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLHlCQUFtQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsbUJBQW1CLENBQUMsV0FBOEI7UUFDOUMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUQsYUFBYSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxTQUFpQjtRQUMvQixNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFDcEUsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN6QyxJQUFHLENBQUMsS0FBSyxFQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsU0FBUyxFQUFFLENBQUMsQ0FBQTtTQUNwRTtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxxRkFBcUY7SUFDckYsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEtBQXdCO1FBQy9DLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0ZBQXdGLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQy9HLE9BQU87YUFDVjtTQUNKO1FBRUQsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2IsMkJBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLDhCQUFhLENBQVksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDekU7UUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2RDtRQUVELElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNiLE1BQU0sS0FBSyxHQUFHLE1BQU0sZ0JBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDM0MsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFJLFVBQVUsRUFBQztnQkFDL0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWlDLENBQUE7Z0JBQ3BELEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBQztnQkFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2FBQzFDO1NBQ0o7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxFQUFDO1lBQzdCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsT0FBTztJQUNYLENBQUM7SUFFRCxvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQzdDLHlCQUFtQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTlFRCxrQ0E4RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3NhZmVQYXJzZUpzb259IGZyb20gJ0BsdW5hc2VjL2Jyb3dzZXItY29tbW9uJztcbmltcG9ydCB7U3R5bGVJbmZvfSBmcm9tIFwiQGx1bmFzZWMvYnJvd3Nlci1jb21tb25cIjtcbmltcG9ydCB7cGF0Y2hTdHlsZX0gZnJvbVwiQGx1bmFzZWMvYnJvd3Nlci1jb21tb25cIlxuaW1wb3J0IHtkZXRva2VuaXplLCBub3RpZnlQYXJlbnRPZkV2ZW50LCBsaXN0ZW5Gb3JSUENNZXNzYWdlc30gZnJvbSAnLi9ycGMnO1xuaW1wb3J0IHtfX1NFQ1VSRV9GUkFNRV9VUkxfX30gZnJvbSBcIkBsdW5hc2VjL2Jyb3dzZXItY29tbW9uXCI7XG5pbXBvcnQge0F0dHJpYnV0ZXNNZXNzYWdlfSBmcm9tIFwiQGx1bmFzZWMvYnJvd3Nlci1jb21tb25cIjtcbi8vIGltcG9ydCB7IEdlbmVyaWNJZnJhbWVFbGVtZW50IH0gZnJvbSAnLi9nZW5lcmljLWlmcmFtZS1lbGVtZW50J1xuXG5leHBvcnQgaW50ZXJmYWNlIEVsZW1lbnRUeXBlcyB7XG4gICAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQsXG4gICAgc3BhbjogSFRNTFNwYW5FbGVtZW50LFxuICAgIHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50XG59XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZEVsZW1lbnQgPSBFbGVtZW50VHlwZXNba2V5b2YgRWxlbWVudFR5cGVzXVxuXG4vLyBXb3VsZCBiZSBuaWNlIGlmIGNsYXNzIGNvdWxkIHRha2UgPGVsZW1lbnQgdHlwZSBwYXJhbWV0ZXI+IGJ1dCBjb3VsZG4ndCBxdWl0ZSBnZXQgaXQgd29ya2luZ1xuZXhwb3J0IGNsYXNzIFNlY3VyZUZyYW1lIHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VjdXJlRWxlbWVudDogU3VwcG9ydGVkRWxlbWVudDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnRUeXBlOiBrZXlvZiBFbGVtZW50VHlwZXM7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2FkaW5nVGV4dDogRWxlbWVudDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZyYW1lTm9uY2U6IHN0cmluZztcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9yaWdpbjogc3RyaW5nO1xuICAgIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50TmFtZToga2V5b2YgRWxlbWVudFR5cGVzLCBsb2FkaW5nVGV4dDogRWxlbWVudCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRUeXBlID0gZWxlbWVudE5hbWU7XG4gICAgICAgIHRoaXMubG9hZGluZ1RleHQgPSBsb2FkaW5nVGV4dDtcbiAgICAgICAgdGhpcy5zZWN1cmVFbGVtZW50ID0gdGhpcy5pbnNlcnRTZWN1cmVFbGVtZW50KGVsZW1lbnROYW1lKTtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLmdldFVSTFNlYXJjaFBhcmFtKCdvcmlnaW4nKTtcbiAgICAgICAgdGhpcy5mcmFtZU5vbmNlID0gdGhpcy5nZXRVUkxTZWFyY2hQYXJhbSgnbicpO1xuXG4gICAgICAgIGxpc3RlbkZvclJQQ01lc3NhZ2VzKHRoaXMub3JpZ2luLCAoYXR0cnMpID0+IHt2b2lkIHRoaXMuc2V0QXR0cmlidXRlc0Zyb21SUEMoYXR0cnMpfSk7XG4gICAgICAgIG5vdGlmeVBhcmVudE9mRXZlbnQoJ05vdGlmeU9uU3RhcnQnLCB0aGlzLm9yaWdpbiwgdGhpcy5mcmFtZU5vbmNlKTtcbiAgICB9XG5cbiAgICBpbnNlcnRTZWN1cmVFbGVtZW50KGVsZW1lbnROYW1lOmtleW9mIEVsZW1lbnRUeXBlcyl7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkJPRFlcIilbMF07XG4gICAgICAgIGNvbnN0IHNlY3VyZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lKTtcbiAgICAgICAgc2VjdXJlRWxlbWVudC5jbGFzc05hbWUgPSAnc2VjdXJlLWlucHV0IGQtbm9uZSc7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoc2VjdXJlRWxlbWVudCk7XG4gICAgICAgIHJldHVybiBzZWN1cmVFbGVtZW50O1xuICAgIH1cblxuICAgIGdldFVSTFNlYXJjaFBhcmFtKHBhcmFtTmFtZTogc3RyaW5nKXtcbiAgICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gKG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24uaHJlZikpLnNlYXJjaFBhcmFtcztcbiAgICAgICAgY29uc3QgcGFyYW0gPSBzZWFyY2hQYXJhbXMuZ2V0KHBhcmFtTmFtZSlcbiAgICAgICAgaWYoIXBhcmFtKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBwYXJhbWV0ZXIgZnJvbSBpZnJhbWUgdXJsICR7cGFyYW1OYW1lfWApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtXG4gICAgfVxuXG4gICAgLy8gU2V0IHVwIHRoZSBpZnJhbWUgYXR0cmlidXRlcywgdXNlZCBvbiBib3RoIHBhZ2UgbG9hZCBhbmQgb24gYW55IHN1YnNlcXVlbnQgY2hhbmdlc1xuICAgIGFzeW5jIHNldEF0dHJpYnV0ZXNGcm9tUlBDKGF0dHJzOiBBdHRyaWJ1dGVzTWVzc2FnZSkge1xuICAgICAgICAvLyBGaXJzdCB0aW1lIHNldHVwXG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nVGV4dC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIHRoaXMuc2VjdXJlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIGlmICghYXR0cnMuc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBdHRyaWJ1dGUgZnJhbWUgbWVzc2FnZSBtaXNzaW5nIG5lY2Vzc2FyeSBzdHlsZSBwYXJhbWV0ZXIgZm9yIGZpcnN0IHRpbWUgZnJhbWUgc3RhcnR1cCcsIGF0dHJzKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXR0cnMuc3R5bGUpIHtcbiAgICAgICAgICAgIHBhdGNoU3R5bGUodGhpcy5zZWN1cmVFbGVtZW50LCBzYWZlUGFyc2VKc29uPFN0eWxlSW5mbz4oYXR0cnMuc3R5bGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdHRycy50eXBlICYmIHRoaXMuZWxlbWVudFR5cGUgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VjdXJlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBhdHRycy50eXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdHRycy50b2tlbikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhd2FpdCBkZXRva2VuaXplKGF0dHJzLnRva2VuKVxuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudFR5cGUgPT09ICdpbnB1dCcgfHwgdGhpcy5lbGVtZW50VHlwZSA9PT0ndGV4dGFyZWEnKXtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuc2VjdXJlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRUeXBlID09PSAnc3Bhbicpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VjdXJlRWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRUeXBlID09PSAnaW5wdXQnKXtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoT25CbHVyTm90aWZpZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF0dGFjaE9uQmx1ck5vdGlmaWVyKCkge1xuICAgICAgICB0aGlzLnNlY3VyZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgICAgICAgIG5vdGlmeVBhcmVudE9mRXZlbnQoJ05vdGlmeU9uQmx1cicsIHRoaXMub3JpZ2luLCB0aGlzLmZyYW1lTm9uY2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbiJdfQ==

/***/ }),

/***/ "../../server-common/build/module/index.js":
/*!*************************************************!*\
  !*** ../../server-common/build/module/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BadHttpResponseError": () => (/* reexport safe */ _lib_http__WEBPACK_IMPORTED_MODULE_0__.BadHttpResponseError),
/* harmony export */   "FailedJsonDeserializationError": () => (/* reexport safe */ _lib_http__WEBPACK_IMPORTED_MODULE_0__.FailedJsonDeserializationError),
/* harmony export */   "getUrl": () => (/* reexport safe */ _lib_http__WEBPACK_IMPORTED_MODULE_0__.getUrl),
/* harmony export */   "makeRawRequest": () => (/* reexport safe */ _lib_http__WEBPACK_IMPORTED_MODULE_0__.makeRawRequest),
/* harmony export */   "makeRequest": () => (/* reexport safe */ _lib_http__WEBPACK_IMPORTED_MODULE_0__.makeRequest),
/* harmony export */   "getRequestBody": () => (/* reexport safe */ _lib_api__WEBPACK_IMPORTED_MODULE_1__.getRequestBody)
/* harmony export */ });
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/http */ "../../server-common/build/module/lib/http.js");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/api */ "../../server-common/build/module/lib/api.js");


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsY0FBYyxZQUFZLENBQUM7QUFDM0IsY0FBYyxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2h0dHAnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvYXBpJztcbiJdfQ==

/***/ }),

/***/ "../../server-common/build/module/lib/api.js":
/*!***************************************************!*\
  !*** ../../server-common/build/module/lib/api.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRequestBody": () => (/* binding */ getRequestBody)
/* harmony export */ });
function getRequestBody(request) {
    if (request === undefined || request === null) {
        return undefined;
    }
    return JSON.stringify(request);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxVQUFVLGNBQWMsQ0FBSSxPQUFVO0lBQzFDLElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1FBQzdDLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXF1ZXN0Qm9keTxUPihyZXF1ZXN0OiBUKSB7XG4gIGlmIChyZXF1ZXN0ID09PSB1bmRlZmluZWQgfHwgcmVxdWVzdCA9PT0gbnVsbCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVxdWVzdCk7XG59XG4iXX0=

/***/ }),

/***/ "../../server-common/build/module/lib/http.js":
/*!****************************************************!*\
  !*** ../../server-common/build/module/lib/http.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUrl": () => (/* binding */ getUrl),
/* harmony export */   "FailedJsonDeserializationError": () => (/* binding */ FailedJsonDeserializationError),
/* harmony export */   "BadHttpResponseError": () => (/* binding */ BadHttpResponseError),
/* harmony export */   "makeRawRequest": () => (/* binding */ makeRawRequest),
/* harmony export */   "makeRequest": () => (/* binding */ makeRequest)
/* harmony export */ });
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "../../../../../node_modules/stream-http/index.js");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https */ "../../../../../node_modules/https-browserify/index.js");
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(https__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "../../../../../node_modules/buffer/index.js")["Buffer"];


// Apparently this is automatically imported in both Node and the Browser.
// It's kind of janky to _not_ explicitly import this, but this is the best "isomorphic" way.
// If we do import it, then the Browser webpack build step complains.
// If we do this, then both Node.js and the browser seem to work. *shrug*
function getUrl() {
    // @ts-ignore
    return URL;
}
function getRequestModule(protocol) {
    if (protocol === 'http:') {
        return http__WEBPACK_IMPORTED_MODULE_0__;
    }
    if (protocol === 'https:') {
        return https__WEBPACK_IMPORTED_MODULE_1__;
    }
    throw new Error('Unable to identify request method for Refinery API Client');
}
class FailedJsonDeserializationError extends Error {
    constructor(rawData) {
        super('Failed to deserialize JSON data');
        this.rawData = rawData;
    }
}
class BadHttpResponseError extends Error {
    constructor(responseCode, rawData) {
        super('Bad Http response received');
        this.responseCode = responseCode;
        this.rawData = rawData;
    }
}
function getRequestParams(host, path, params) {
    const URL = getUrl();
    const requestUri = new URL(path, host);
    const requestModule = getRequestModule(requestUri.protocol);
    const searchParams = requestUri.search !== undefined ? `?${requestUri.search}` : '';
    const requestConfig = {
        protocol: requestUri.protocol,
        hostname: requestUri.hostname,
        port: requestUri.port,
        path: requestUri.pathname + searchParams,
        ...params
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQiwwRUFBMEU7QUFDMUUsNkZBQTZGO0FBQzdGLHFFQUFxRTtBQUNyRSx5RUFBeUU7QUFDekUsTUFBTSxVQUFVLE1BQU07SUFDcEIsYUFBYTtJQUNiLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsUUFBZ0I7SUFDeEMsSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDekIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztBQUMvRSxDQUFDO0FBRUQsTUFBTSxPQUFPLDhCQUErQixTQUFRLEtBQUs7SUFHdkQsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsS0FBSztJQUk3QyxZQUFZLFlBQWdDLEVBQUUsT0FBZTtRQUMzRCxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUFFRCxTQUFTLGdCQUFnQixDQUFDLElBQVksRUFBRSxJQUFZLEVBQUUsTUFBOEI7SUFDbEYsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFFckIsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXZDLE1BQU0sYUFBYSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU1RCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVuRixNQUFNLGFBQWEsR0FBMkI7UUFDNUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO1FBQzdCLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUTtRQUM3QixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7UUFDckIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsWUFBWTtRQUN4QyxHQUFHLE1BQU07S0FDVixDQUFDO0lBRUYsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxJQUFZLEVBQUUsSUFBWSxFQUFFLE1BQThCLEVBQUUsSUFBYTtJQUN0RyxNQUFNLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBQyxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFNUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUVyQyxJQUFJLGNBQXNCLENBQUM7UUFDM0IsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDckQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtnQkFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDakIsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN4QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFckQsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDbEIsY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE9BQU87YUFDUjtZQUVELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVyQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ1osT0FBTyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQzthQUM3QztZQUVELGNBQWMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7UUFFRCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLFdBQVcsQ0FBSSxJQUFZLEVBQUUsSUFBWSxFQUFFLE1BQThCLEVBQUUsSUFBYTtJQUM1RyxNQUFNLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTdFLE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUUvQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7UUFDckUsTUFBTSxJQUFJLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxJQUFJO1FBQ0Ysc0RBQXNEO1FBQ3RELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQU0sQ0FBQztLQUN0QztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsMENBQTBDO1FBQzFDLE1BQU0sS0FBSyxHQUFHLElBQUksOEJBQThCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixNQUFNLEtBQUssQ0FBQztLQUNiO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgKiBhcyBodHRwcyBmcm9tICdodHRwcyc7XG5cbi8vIEFwcGFyZW50bHkgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IGltcG9ydGVkIGluIGJvdGggTm9kZSBhbmQgdGhlIEJyb3dzZXIuXG4vLyBJdCdzIGtpbmQgb2YgamFua3kgdG8gX25vdF8gZXhwbGljaXRseSBpbXBvcnQgdGhpcywgYnV0IHRoaXMgaXMgdGhlIGJlc3QgXCJpc29tb3JwaGljXCIgd2F5LlxuLy8gSWYgd2UgZG8gaW1wb3J0IGl0LCB0aGVuIHRoZSBCcm93c2VyIHdlYnBhY2sgYnVpbGQgc3RlcCBjb21wbGFpbnMuXG4vLyBJZiB3ZSBkbyB0aGlzLCB0aGVuIGJvdGggTm9kZS5qcyBhbmQgdGhlIGJyb3dzZXIgc2VlbSB0byB3b3JrLiAqc2hydWcqXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXJsKCkge1xuICAvLyBAdHMtaWdub3JlXG4gIHJldHVybiBVUkw7XG59XG5cbmZ1bmN0aW9uIGdldFJlcXVlc3RNb2R1bGUocHJvdG9jb2w6IHN0cmluZykge1xuICBpZiAocHJvdG9jb2wgPT09ICdodHRwOicpIHtcbiAgICByZXR1cm4gaHR0cDtcbiAgfVxuXG4gIGlmIChwcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcbiAgICByZXR1cm4gaHR0cHM7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBpZGVudGlmeSByZXF1ZXN0IG1ldGhvZCBmb3IgUmVmaW5lcnkgQVBJIENsaWVudCcpO1xufVxuXG5leHBvcnQgY2xhc3MgRmFpbGVkSnNvbkRlc2VyaWFsaXphdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICByZWFkb25seSByYXdEYXRhPzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHJhd0RhdGE/OiBzdHJpbmcpIHtcbiAgICBzdXBlcignRmFpbGVkIHRvIGRlc2VyaWFsaXplIEpTT04gZGF0YScpO1xuICAgIHRoaXMucmF3RGF0YSA9IHJhd0RhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhZEh0dHBSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICByZWFkb25seSByZXNwb25zZUNvZGU/OiBudW1iZXI7XG4gIHJlYWRvbmx5IHJhd0RhdGEhOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocmVzcG9uc2VDb2RlOiBudW1iZXIgfCB1bmRlZmluZWQsIHJhd0RhdGE6IHN0cmluZykge1xuICAgIHN1cGVyKCdCYWQgSHR0cCByZXNwb25zZSByZWNlaXZlZCcpO1xuICAgIHRoaXMucmVzcG9uc2VDb2RlID0gcmVzcG9uc2VDb2RlO1xuICAgIHRoaXMucmF3RGF0YSA9IHJhd0RhdGE7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmVxdWVzdFBhcmFtcyhob3N0OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcGFyYW1zOiBodHRwLkNsaWVudFJlcXVlc3RBcmdzKSB7XG4gIGNvbnN0IFVSTCA9IGdldFVybCgpO1xuXG4gIGNvbnN0IHJlcXVlc3RVcmkgPSBuZXcgVVJMKHBhdGgsIGhvc3QpO1xuXG4gIGNvbnN0IHJlcXVlc3RNb2R1bGUgPSBnZXRSZXF1ZXN0TW9kdWxlKHJlcXVlc3RVcmkucHJvdG9jb2wpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHJlcXVlc3RVcmkuc2VhcmNoICE9PSB1bmRlZmluZWQgPyBgPyR7cmVxdWVzdFVyaS5zZWFyY2h9YDogJyc7XG5cbiAgY29uc3QgcmVxdWVzdENvbmZpZzogaHR0cC5DbGllbnRSZXF1ZXN0QXJncyA9IHtcbiAgICBwcm90b2NvbDogcmVxdWVzdFVyaS5wcm90b2NvbCxcbiAgICBob3N0bmFtZTogcmVxdWVzdFVyaS5ob3N0bmFtZSxcbiAgICBwb3J0OiByZXF1ZXN0VXJpLnBvcnQsXG4gICAgcGF0aDogcmVxdWVzdFVyaS5wYXRobmFtZSArIHNlYXJjaFBhcmFtcyxcbiAgICAuLi5wYXJhbXNcbiAgfTtcblxuICByZXR1cm4ge3JlcXVlc3RNb2R1bGUsIHJlcXVlc3RDb25maWd9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVJhd1JlcXVlc3QoaG9zdDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHBhcmFtczogaHR0cC5DbGllbnRSZXF1ZXN0QXJncywgYm9keT86IHN0cmluZyk6IFByb21pc2U8cmVhZG9ubHkgW2h0dHAuSW5jb21pbmdNZXNzYWdlLCBCdWZmZXJdPiB7XG4gIGNvbnN0IHtyZXF1ZXN0TW9kdWxlLCByZXF1ZXN0Q29uZmlnfSA9IGdldFJlcXVlc3RQYXJhbXMoaG9zdCwgcGF0aCwgcGFyYW1zKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgbGV0IHJlc3BvbnNlQnVmZmVyOiBCdWZmZXI7XG4gICAgY29uc3QgcmVxID0gcmVxdWVzdE1vZHVsZS5yZXF1ZXN0KHJlcXVlc3RDb25maWcsIHJlcyA9PiB7XG4gICAgICByZXMub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICBjaHVuay5jb3B5KHJlc3BvbnNlQnVmZmVyKTtcbiAgICAgIH0pO1xuICAgICAgcmVzLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoW3JlcywgcmVzcG9uc2VCdWZmZXJdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmVxLm9uKCdlcnJvcicsIChlKSA9PiByZWplY3QoZSkpO1xuICAgIHJlcS5vbigncmVzcG9uc2UnLCByZXNwID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGggPSByZXNwLmhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ107XG5cbiAgICAgIGlmICghY29udGVudExlbmd0aCkge1xuICAgICAgICByZXNwb25zZUJ1ZmZlciA9IEJ1ZmZlci5hbGxvYygwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzaXplID0gcGFyc2VJbnQoY29udGVudExlbmd0aCk7XG5cbiAgICAgIGlmIChzaXplIDwgMCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KCdDb250ZW50IGxlbmd0aCBpcyBuZWdhdGl2ZScpO1xuICAgICAgfVxuXG4gICAgICByZXNwb25zZUJ1ZmZlciA9IEJ1ZmZlci5hbGxvYyhzaXplKTtcbiAgICB9KTtcblxuICAgIGlmIChib2R5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcS53cml0ZShib2R5KTtcbiAgICB9XG5cbiAgICByZXEuZW5kKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZVJlcXVlc3Q8VD4oaG9zdDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHBhcmFtczogaHR0cC5DbGllbnRSZXF1ZXN0QXJncywgYm9keT86IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICBjb25zdCBbcmVzLCByZXNwb25zZUJ1ZmZlcl0gPSBhd2FpdCBtYWtlUmF3UmVxdWVzdChob3N0LCBwYXRoLCBwYXJhbXMsIGJvZHkpO1xuXG4gIGNvbnN0IHJlc3BvbnNlRGF0YSA9IHJlc3BvbnNlQnVmZmVyLnRvU3RyaW5nKCk7XG5cbiAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICBjb25zb2xlLmxvZygnYmFkIHJlc3BvbnNlJywge2hvc3QsIHBhdGgsIHBhcmFtcywgcmVzLCByZXNwb25zZURhdGF9KTtcbiAgICB0aHJvdyBuZXcgQmFkSHR0cFJlc3BvbnNlRXJyb3IocmVzLnN0YXR1c0NvZGUsIHJlc3BvbnNlRGF0YSk7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIFRPRE86IFZhbGlkYXRlIHRoaXMgcGFyc2VkIEpTT04gYWdhaW5zdCBzb21lIHNjaGVtYVxuICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlRGF0YSkgYXMgVDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIElmIGRhdGEgY2FuJ3QgYmUgcGFyc2VkLCB3cmFwIHRoZSBkYXRhLlxuICAgIGNvbnN0IGVycm9yID0gbmV3IEZhaWxlZEpzb25EZXNlcmlhbGl6YXRpb25FcnJvcihyZXNwb25zZURhdGEpO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbiJdfQ==

/***/ }),

/***/ "../../tokenizer-sdk/build/module/api/client.js":
/*!******************************************************!*\
  !*** ../../tokenizer-sdk/build/module/api/client.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TOKENIZER_ERROR_CODES": () => (/* binding */ TOKENIZER_ERROR_CODES),
/* harmony export */   "makeSecureApiRequest": () => (/* binding */ makeSecureApiRequest),
/* harmony export */   "makeGenericApiClient": () => (/* binding */ makeGenericApiClient),
/* harmony export */   "makeSpecificApiClient": () => (/* binding */ makeSpecificApiClient)
/* harmony export */ });
/* harmony import */ var _lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lunasec/server-common */ "../../server-common/build/module/index.js");

var TOKENIZER_ERROR_CODES;
(function (TOKENIZER_ERROR_CODES) {
    TOKENIZER_ERROR_CODES[TOKENIZER_ERROR_CODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    TOKENIZER_ERROR_CODES[TOKENIZER_ERROR_CODES["NOT_FOUND"] = 404] = "NOT_FOUND";
    TOKENIZER_ERROR_CODES[TOKENIZER_ERROR_CODES["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(TOKENIZER_ERROR_CODES || (TOKENIZER_ERROR_CODES = {}));
async function makeSecureApiRequest(request, host, path, params) {
    try {
        // TODO: Add runtime JSON validation for response
        const response = await (0,_lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__.makeRequest)(host, path, params, (0,_lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__.getRequestBody)(request));
        if (!response) {
            return {
                success: false,
                error: new Error(response !== undefined ? response : 'Malformed response from API with missing error message'),
            };
        }
        return {
            success: true,
            data: response,
        };
    }
    catch (e) {
        return {
            success: false,
            error: e,
        };
    }
}
function makeGenericApiClient(host, path, requestBaseConfig) {
    return async (request, requestOverrides) => {
        const requestConfig = Object.assign({}, requestBaseConfig, requestOverrides);
        return await makeSecureApiRequest(request, host, path, requestConfig);
    };
}
function makeSpecificApiClient(host, path, requestBaseConfig) {
    const genericApiClient = makeGenericApiClient(host, path, requestBaseConfig);
    return async (request, requestOverrides) => {
        return await genericApiClient(request, requestOverrides);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRSxNQUFNLENBQU4sSUFBWSxxQkFJWDtBQUpELFdBQVkscUJBQXFCO0lBQy9CLGlGQUFpQixDQUFBO0lBQ2pCLDZFQUFlLENBQUE7SUFDZix1RkFBb0IsQ0FBQTtBQUN0QixDQUFDLEVBSlcscUJBQXFCLEtBQXJCLHFCQUFxQixRQUloQztBQWFELE1BQU0sQ0FBQyxLQUFLLFVBQVUsb0JBQW9CLENBSXhDLE9BQWlCLEVBQ2pCLElBQVksRUFDWixJQUFZLEVBQ1osTUFBOEI7SUFFOUIsSUFBSTtRQUNGLGlEQUFpRDtRQUNqRCxNQUFNLFFBQVEsR0FBRyxNQUFNLFdBQVcsQ0FDaEMsSUFBSSxFQUNKLElBQUksRUFDSixNQUFNLEVBQ04sY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUN4QixDQUFDO1FBRUYsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE9BQU87Z0JBQ0wsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsd0RBQXdELENBQUM7YUFDL0csQ0FBQztTQUNIO1FBRUQsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO0tBQ0g7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU87WUFDTCxPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQztLQUNIO0FBQ0gsQ0FBQztBQU9ELE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsSUFBWSxFQUNaLElBQVksRUFDWixpQkFBeUM7SUFFekMsT0FBTyxLQUFLLEVBQ1YsT0FBc0MsRUFDdEMsZ0JBQXlDLEVBQ3pDLEVBQUU7UUFDRixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTdFLE9BQU8sTUFBTSxvQkFBb0IsQ0FBbUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDMUcsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQU9ELE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsSUFBWSxFQUNaLElBQVksRUFDWixpQkFBeUM7SUFFekMsTUFBTSxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFFN0UsT0FBTyxLQUFLLEVBQUUsT0FBc0MsRUFBRSxnQkFBeUMsRUFBRSxFQUFFO1FBQ2pHLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBSSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RCxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCB7IFRva2VuaXplclJlcXVlc3RNZXNzYWdlTWFwLCBUb2tlbml6ZXJSZXF1ZXN0UmVzcG9uc2VNZXNzYWdlTWFwLCBWYWxpZFRva2VuaXplckFwaVJlcXVlc3RUeXBlcyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0UmVxdWVzdEJvZHksIG1ha2VSZXF1ZXN0IH0gZnJvbSAnQGx1bmFzZWMvc2VydmVyLWNvbW1vbic7XG5cbmV4cG9ydCBlbnVtIFRPS0VOSVpFUl9FUlJPUl9DT0RFUyB7XG4gIEJBRF9SRVFVRVNUID0gNDAwLFxuICBOT1RfRk9VTkQgPSA0MDQsXG4gIElOVEVSTkFMX0VSUk9SID0gNTAwLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuaXplclN1Y2Nlc3NBcGlSZXNwb25zZTxUPiB7XG4gIHN1Y2Nlc3M6IHRydWU7XG4gIGRhdGE6IFQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5pemVyRmFpbEFwaVJlc3BvbnNlIHtcbiAgc3VjY2VzczogZmFsc2U7XG4gIGVycm9yOiBFcnJvcjtcbiAgZXJyb3JDb2RlPzogVE9LRU5JWkVSX0VSUk9SX0NPREVTO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZVNlY3VyZUFwaVJlcXVlc3Q8XG4gIFQgZXh0ZW5kcyBWYWxpZFRva2VuaXplckFwaVJlcXVlc3RUeXBlcyxcbiAgVFJlcXVlc3QgZXh0ZW5kcyBUb2tlbml6ZXJSZXF1ZXN0TWVzc2FnZU1hcFtUXVxuPihcbiAgcmVxdWVzdDogVFJlcXVlc3QsXG4gIGhvc3Q6IHN0cmluZyxcbiAgcGF0aDogc3RyaW5nLFxuICBwYXJhbXM6IGh0dHAuQ2xpZW50UmVxdWVzdEFyZ3Ncbik6IFByb21pc2U8VG9rZW5pemVyU3VjY2Vzc0FwaVJlc3BvbnNlPFRva2VuaXplclJlcXVlc3RSZXNwb25zZU1lc3NhZ2VNYXBbVF0+IHwgVG9rZW5pemVyRmFpbEFwaVJlc3BvbnNlPiB7XG4gIHRyeSB7XG4gICAgLy8gVE9ETzogQWRkIHJ1bnRpbWUgSlNPTiB2YWxpZGF0aW9uIGZvciByZXNwb25zZVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWFrZVJlcXVlc3Q8VG9rZW5pemVyUmVxdWVzdFJlc3BvbnNlTWVzc2FnZU1hcFtUXT4oXG4gICAgICBob3N0LFxuICAgICAgcGF0aCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIGdldFJlcXVlc3RCb2R5KHJlcXVlc3QpXG4gICAgKTtcblxuICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogbmV3IEVycm9yKHJlc3BvbnNlICE9PSB1bmRlZmluZWQgPyByZXNwb25zZSA6ICdNYWxmb3JtZWQgcmVzcG9uc2UgZnJvbSBBUEkgd2l0aCBtaXNzaW5nIGVycm9yIG1lc3NhZ2UnKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBkYXRhOiByZXNwb25zZSxcbiAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6IGUsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBHZW5lcmljQXBpQ2xpZW50ID0gPFQgZXh0ZW5kcyBWYWxpZFRva2VuaXplckFwaVJlcXVlc3RUeXBlcz4oXG4gIHJlcXVlc3Q6IFRva2VuaXplclJlcXVlc3RNZXNzYWdlTWFwW1RdLFxuICByZXF1ZXN0T3ZlcnJpZGVzPzogaHR0cC5DbGllbnRSZXF1ZXN0QXJnc1xuKSA9PiBQcm9taXNlPFRva2VuaXplclN1Y2Nlc3NBcGlSZXNwb25zZTxUb2tlbml6ZXJSZXF1ZXN0UmVzcG9uc2VNZXNzYWdlTWFwW1RdPiB8IFRva2VuaXplckZhaWxBcGlSZXNwb25zZT47XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlR2VuZXJpY0FwaUNsaWVudChcbiAgaG9zdDogc3RyaW5nLFxuICBwYXRoOiBzdHJpbmcsXG4gIHJlcXVlc3RCYXNlQ29uZmlnOiBodHRwLkNsaWVudFJlcXVlc3RBcmdzXG4pOiBHZW5lcmljQXBpQ2xpZW50IHtcbiAgcmV0dXJuIGFzeW5jIDxUIGV4dGVuZHMgVmFsaWRUb2tlbml6ZXJBcGlSZXF1ZXN0VHlwZXM+KFxuICAgIHJlcXVlc3Q6IFRva2VuaXplclJlcXVlc3RNZXNzYWdlTWFwW1RdLFxuICAgIHJlcXVlc3RPdmVycmlkZXM/OiBodHRwLkNsaWVudFJlcXVlc3RBcmdzXG4gICkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3RDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCByZXF1ZXN0QmFzZUNvbmZpZywgcmVxdWVzdE92ZXJyaWRlcyk7XG5cbiAgICByZXR1cm4gYXdhaXQgbWFrZVNlY3VyZUFwaVJlcXVlc3Q8VCwgVG9rZW5pemVyUmVxdWVzdE1lc3NhZ2VNYXBbVF0+KHJlcXVlc3QsIGhvc3QsIHBhdGgsIHJlcXVlc3RDb25maWcpO1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBTcGVjaWZpY0FwaUNsaWVudDxUIGV4dGVuZHMgVmFsaWRUb2tlbml6ZXJBcGlSZXF1ZXN0VHlwZXM+ID0gKFxuICByZXF1ZXN0OiBUb2tlbml6ZXJSZXF1ZXN0TWVzc2FnZU1hcFtUXSxcbiAgcmVxdWVzdE92ZXJyaWRlcz86IGh0dHAuQ2xpZW50UmVxdWVzdEFyZ3NcbikgPT4gUHJvbWlzZTxUb2tlbml6ZXJTdWNjZXNzQXBpUmVzcG9uc2U8VG9rZW5pemVyUmVxdWVzdFJlc3BvbnNlTWVzc2FnZU1hcFtUXT4gfCBUb2tlbml6ZXJGYWlsQXBpUmVzcG9uc2U+O1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVNwZWNpZmljQXBpQ2xpZW50PFQgZXh0ZW5kcyBWYWxpZFRva2VuaXplckFwaVJlcXVlc3RUeXBlcz4oXG4gIGhvc3Q6IHN0cmluZyxcbiAgcGF0aDogc3RyaW5nLFxuICByZXF1ZXN0QmFzZUNvbmZpZzogaHR0cC5DbGllbnRSZXF1ZXN0QXJnc1xuKSB7XG4gIGNvbnN0IGdlbmVyaWNBcGlDbGllbnQgPSBtYWtlR2VuZXJpY0FwaUNsaWVudChob3N0LCBwYXRoLCByZXF1ZXN0QmFzZUNvbmZpZyk7XG5cbiAgcmV0dXJuIGFzeW5jIChyZXF1ZXN0OiBUb2tlbml6ZXJSZXF1ZXN0TWVzc2FnZU1hcFtUXSwgcmVxdWVzdE92ZXJyaWRlcz86IGh0dHAuQ2xpZW50UmVxdWVzdEFyZ3MpID0+IHtcbiAgICByZXR1cm4gYXdhaXQgZ2VuZXJpY0FwaUNsaWVudDxUPihyZXF1ZXN0LCByZXF1ZXN0T3ZlcnJpZGVzKTtcbiAgfTtcbn1cbiJdfQ==

/***/ }),

/***/ "../../tokenizer-sdk/build/module/aws.js":
/*!***********************************************!*\
  !*** ../../tokenizer-sdk/build/module/aws.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uploadToS3WithSignedUrl": () => (/* binding */ uploadToS3WithSignedUrl),
/* harmony export */   "downloadFromS3WithSignedUrl": () => (/* binding */ downloadFromS3WithSignedUrl)
/* harmony export */ });
/* harmony import */ var _lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lunasec/server-common */ "../../server-common/build/module/index.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "../../../../../node_modules/buffer/index.js")["Buffer"];

function getUploadHeaders(input) {
    if (input !== undefined) {
        const contentLength = Buffer.byteLength(input);
        return {
            'Content-Length': contentLength,
        };
    }
    return {};
}
function makeS3HttpRequestOptions(signedUrl, headers, method, input) {
    const URL = (0,_lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__.getUrl)();
    const uploadUrl = new URL(signedUrl);
    const host = uploadUrl.protocol + '//' + uploadUrl.hostname;
    const httpParams = {
        method: method,
        headers: {
            ...headers,
            ...getUploadHeaders(input),
        },
        hostname: uploadUrl.hostname,
        port: uploadUrl.port,
        path: uploadUrl.pathname + uploadUrl.search,
        protocol: uploadUrl.protocol,
    };
    return [host, uploadUrl.pathname, httpParams, input];
}
async function uploadToS3WithSignedUrl(signedUrl, headers, input) {
    // TODO: Add some retry logic here, but it'll need to retry only on 500s or other "known" retry cases.
    // TODO: Make this stream to S3 so we don't have to read the entire "input" ahead of time.
    const [res, responseBuffer] = await (0,_lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__.makeRawRequest)(...makeS3HttpRequestOptions(signedUrl, headers, 'PUT', input));
    const responseData = responseBuffer.toString();
    if (res.statusCode !== 200) {
        throw new _lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__.BadHttpResponseError(res.statusCode, responseData);
    }
}
async function downloadFromS3WithSignedUrl(signedUrl, headers) {
    // TODO: Add some retry logic here, but it'll need to retry only on 500s or other "known" retry cases.
    // TODO: Stream back the output so that large files aren't just buffered straight to memory... Or at least the option for that.
    const [res, responseBuffer] = await (0,_lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__.makeRawRequest)(...makeS3HttpRequestOptions(signedUrl, headers, 'GET'));
    const responseData = responseBuffer.toString();
    if (res.statusCode !== 200) {
        throw new _lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__.BadHttpResponseError(res.statusCode, responseData);
    }
    return responseData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2F3cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBR3BGLFNBQVMsZ0JBQWdCLENBQUMsS0FBYztJQUN0QyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDdkIsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvQyxPQUFPO1lBQ0wsZ0JBQWdCLEVBQUUsYUFBYTtTQUNoQyxDQUFDO0tBQ0g7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRCxTQUFTLHdCQUF3QixDQUMvQixTQUFpQixFQUNqQixPQUFpQyxFQUNqQyxNQUFxQixFQUNyQixLQUFjO0lBRWQsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFFckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFckMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUU1RCxNQUFNLFVBQVUsR0FBMkI7UUFDekMsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUU7WUFDUCxHQUFHLE9BQU87WUFDVixHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUTtRQUM1QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7UUFDcEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU07UUFDM0MsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO0tBQzdCLENBQUM7SUFFRixPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLHVCQUF1QixDQUFDLFNBQWlCLEVBQUUsT0FBaUMsRUFBRSxLQUFhO0lBQy9HLHNHQUFzRztJQUN0RywwRkFBMEY7SUFDMUYsTUFBTSxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFbEgsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRS9DLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7UUFDMUIsTUFBTSxJQUFJLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDOUQ7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSwyQkFBMkIsQ0FBQyxTQUFpQixFQUFFLE9BQWlDO0lBQ3BHLHNHQUFzRztJQUN0RywrSEFBK0g7SUFDL0gsTUFBTSxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUUzRyxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFL0MsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtRQUMxQixNQUFNLElBQUksb0JBQW9CLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztLQUM5RDtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0JhZEh0dHBSZXNwb25zZUVycm9yLCBnZXRVcmwsIG1ha2VSYXdSZXF1ZXN0fSBmcm9tICdAbHVuYXNlYy9zZXJ2ZXItY29tbW9uJztcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XG5cbmZ1bmN0aW9uIGdldFVwbG9hZEhlYWRlcnMoaW5wdXQ/OiBzdHJpbmcpIHtcbiAgaWYgKGlucHV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBjb250ZW50TGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoaW5wdXQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICdDb250ZW50LUxlbmd0aCc6IGNvbnRlbnRMZW5ndGgsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gbWFrZVMzSHR0cFJlcXVlc3RPcHRpb25zKFxuICBzaWduZWRVcmw6IHN0cmluZyxcbiAgaGVhZGVyczogaHR0cC5PdXRnb2luZ0h0dHBIZWFkZXJzLFxuICBtZXRob2Q6ICdQVVQnIHwgJ0dFVCcsXG4gIGlucHV0Pzogc3RyaW5nXG4pOiBbc3RyaW5nLCBzdHJpbmcsIGh0dHAuQ2xpZW50UmVxdWVzdEFyZ3MsIHN0cmluZyB8IHVuZGVmaW5lZF0ge1xuICBjb25zdCBVUkwgPSBnZXRVcmwoKTtcblxuICBjb25zdCB1cGxvYWRVcmwgPSBuZXcgVVJMKHNpZ25lZFVybCk7XG5cbiAgY29uc3QgaG9zdCA9IHVwbG9hZFVybC5wcm90b2NvbCArICcvLycgKyB1cGxvYWRVcmwuaG9zdG5hbWU7XG5cbiAgY29uc3QgaHR0cFBhcmFtczogaHR0cC5DbGllbnRSZXF1ZXN0QXJncyA9IHtcbiAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAuLi5oZWFkZXJzLFxuICAgICAgLi4uZ2V0VXBsb2FkSGVhZGVycyhpbnB1dCksXG4gICAgfSxcbiAgICBob3N0bmFtZTogdXBsb2FkVXJsLmhvc3RuYW1lLFxuICAgIHBvcnQ6IHVwbG9hZFVybC5wb3J0LFxuICAgIHBhdGg6IHVwbG9hZFVybC5wYXRobmFtZSArIHVwbG9hZFVybC5zZWFyY2gsXG4gICAgcHJvdG9jb2w6IHVwbG9hZFVybC5wcm90b2NvbCxcbiAgfTtcblxuICByZXR1cm4gW2hvc3QsIHVwbG9hZFVybC5wYXRobmFtZSwgaHR0cFBhcmFtcywgaW5wdXRdO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkVG9TM1dpdGhTaWduZWRVcmwoc2lnbmVkVXJsOiBzdHJpbmcsIGhlYWRlcnM6IGh0dHAuT3V0Z29pbmdIdHRwSGVhZGVycywgaW5wdXQ6IHN0cmluZykge1xuICAvLyBUT0RPOiBBZGQgc29tZSByZXRyeSBsb2dpYyBoZXJlLCBidXQgaXQnbGwgbmVlZCB0byByZXRyeSBvbmx5IG9uIDUwMHMgb3Igb3RoZXIgXCJrbm93blwiIHJldHJ5IGNhc2VzLlxuICAvLyBUT0RPOiBNYWtlIHRoaXMgc3RyZWFtIHRvIFMzIHNvIHdlIGRvbid0IGhhdmUgdG8gcmVhZCB0aGUgZW50aXJlIFwiaW5wdXRcIiBhaGVhZCBvZiB0aW1lLlxuICBjb25zdCBbcmVzLCByZXNwb25zZUJ1ZmZlcl0gPSBhd2FpdCBtYWtlUmF3UmVxdWVzdCguLi5tYWtlUzNIdHRwUmVxdWVzdE9wdGlvbnMoc2lnbmVkVXJsLCBoZWFkZXJzLCAnUFVUJywgaW5wdXQpKTtcblxuICBjb25zdCByZXNwb25zZURhdGEgPSByZXNwb25zZUJ1ZmZlci50b1N0cmluZygpO1xuXG4gIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgdGhyb3cgbmV3IEJhZEh0dHBSZXNwb25zZUVycm9yKHJlcy5zdGF0dXNDb2RlLCByZXNwb25zZURhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEZyb21TM1dpdGhTaWduZWRVcmwoc2lnbmVkVXJsOiBzdHJpbmcsIGhlYWRlcnM6IGh0dHAuT3V0Z29pbmdIdHRwSGVhZGVycykge1xuICAvLyBUT0RPOiBBZGQgc29tZSByZXRyeSBsb2dpYyBoZXJlLCBidXQgaXQnbGwgbmVlZCB0byByZXRyeSBvbmx5IG9uIDUwMHMgb3Igb3RoZXIgXCJrbm93blwiIHJldHJ5IGNhc2VzLlxuICAvLyBUT0RPOiBTdHJlYW0gYmFjayB0aGUgb3V0cHV0IHNvIHRoYXQgbGFyZ2UgZmlsZXMgYXJlbid0IGp1c3QgYnVmZmVyZWQgc3RyYWlnaHQgdG8gbWVtb3J5Li4uIE9yIGF0IGxlYXN0IHRoZSBvcHRpb24gZm9yIHRoYXQuXG4gIGNvbnN0IFtyZXMsIHJlc3BvbnNlQnVmZmVyXSA9IGF3YWl0IG1ha2VSYXdSZXF1ZXN0KC4uLm1ha2VTM0h0dHBSZXF1ZXN0T3B0aW9ucyhzaWduZWRVcmwsIGhlYWRlcnMsICdHRVQnKSk7XG5cbiAgY29uc3QgcmVzcG9uc2VEYXRhID0gcmVzcG9uc2VCdWZmZXIudG9TdHJpbmcoKTtcblxuICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgIHRocm93IG5ldyBCYWRIdHRwUmVzcG9uc2VFcnJvcihyZXMuc3RhdHVzQ29kZSwgcmVzcG9uc2VEYXRhKTtcbiAgfVxuXG4gIHJldHVybiByZXNwb25zZURhdGE7XG59XG4iXX0=

/***/ }),

/***/ "../../tokenizer-sdk/build/module/constants.js":
/*!*****************************************************!*\
  !*** ../../tokenizer-sdk/build/module/constants.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONFIG_DEFAULTS": () => (/* binding */ CONFIG_DEFAULTS)
/* harmony export */ });
const __TOKENIZER_URL__ = "http://localhost:37766";
const CONFIG_DEFAULTS = {
    host: __TOKENIZER_URL__ || 'http://localhost:37767',
    metaEncoding: 'base64',
    endpoints: {
        setMetadata: '/metadata/set',
        getMetadata: '/metadata/get',
        getToken: '/detokenize',
        setToken: '/tokenize',
    },
    headers: {
        auth: 'Authorization'.toLowerCase(),
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLGlCQUFpQixHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBMEI7SUFDcEQsSUFBSSxFQUFFLGlCQUFpQixJQUFJLHdCQUF3QjtJQUNuRCxZQUFZLEVBQUUsUUFBUTtJQUN0QixTQUFTLEVBQUU7UUFDVCxXQUFXLEVBQUUsZUFBZTtRQUM1QixXQUFXLEVBQUUsZUFBZTtRQUM1QixRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUUsV0FBVztLQUN0QjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxlQUFlLENBQUMsV0FBVyxFQUFFO0tBQ3BDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRva2VuaXplckNsaWVudENvbmZpZyB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBfX1RPS0VOSVpFUl9VUkxfXzogc3RyaW5nID0gcHJvY2Vzcy5lbnYuVE9LRU5JWkVSX1VSTDtcblxuZXhwb3J0IGNvbnN0IENPTkZJR19ERUZBVUxUUzogVG9rZW5pemVyQ2xpZW50Q29uZmlnID0ge1xuICBob3N0OiBfX1RPS0VOSVpFUl9VUkxfXyB8fCAnaHR0cDovL2xvY2FsaG9zdDozNzc2NycsXG4gIG1ldGFFbmNvZGluZzogJ2Jhc2U2NCcsXG4gIGVuZHBvaW50czoge1xuICAgIHNldE1ldGFkYXRhOiAnL21ldGFkYXRhL3NldCcsXG4gICAgZ2V0TWV0YWRhdGE6ICcvbWV0YWRhdGEvZ2V0JyxcbiAgICBnZXRUb2tlbjogJy9kZXRva2VuaXplJyxcbiAgICBzZXRUb2tlbjogJy90b2tlbml6ZScsXG4gIH0sXG4gIGhlYWRlcnM6IHtcbiAgICBhdXRoOiAnQXV0aG9yaXphdGlvbicudG9Mb3dlckNhc2UoKSxcbiAgfSxcbn07XG4iXX0=

/***/ }),

/***/ "../../tokenizer-sdk/build/module/index.js":
/*!*************************************************!*\
  !*** ../../tokenizer-sdk/build/module/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tokenizer": () => (/* binding */ Tokenizer)
/* harmony export */ });
/* harmony import */ var _lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lunasec/server-common */ "../../server-common/build/module/index.js");
/* harmony import */ var _api_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/client */ "../../tokenizer-sdk/build/module/api/client.js");
/* harmony import */ var _aws__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aws */ "../../tokenizer-sdk/build/module/aws.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "../../tokenizer-sdk/build/module/constants.js");




class Tokenizer {
    constructor(config) {
        // Deep clone config for mutation safety.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.config = JSON.parse(JSON.stringify(Object.assign({}, _constants__WEBPACK_IMPORTED_MODULE_3__.CONFIG_DEFAULTS, config)));
        const jwtToken = this.config.token;
        const headers = {};
        if (jwtToken) {
            headers[this.config.headers.auth] = jwtToken;
        }
        const makeApiClient = (endpoint) => {
            return (0,_api_client__WEBPACK_IMPORTED_MODULE_1__.makeSpecificApiClient)(this.config.host, endpoint, {
                method: 'POST',
                headers,
            });
        };
        this.getMetadataClient = makeApiClient(this.config.endpoints.getMetadata);
        this.setMetadataClient = makeApiClient(this.config.endpoints.setMetadata);
        this.getTokenClient = makeApiClient(this.config.endpoints.getToken);
        this.setTokenClient = makeApiClient(this.config.endpoints.setToken);
    }
    // TODO: Evaluate adding back keygenSet and keygenGet methods
    async getMetadata(tokenId) {
        const response = await this.getMetadataClient({
            tokenId: tokenId,
        });
        if (!response.success) {
            return response;
        }
        return {
            success: true,
            tokenId,
            metadata: response.data.data.metadata,
        };
    }
    async setMetadata(tokenId, metadata) {
        if (typeof metadata !== 'string') {
            throw new Error('Metadata must be a string value');
        }
        const response = await this.setMetadataClient({
            tokenId,
            metadata,
        });
        if (!response.success) {
            return response;
        }
        return {
            success: true,
            tokenId,
            metadata,
        };
    }
    // TODO: Add another method that _doesn't_ take a key, so that we handle generation.
    async tokenize(input) {
        const response = await this.setTokenClient({
            value: input,
        });
        if (!response.success) {
            return response;
        }
        if (!response.data.data) {
            return {
                success: false,
                error: new Error('Invalid response from Tokenizer when tokenizing data'),
            };
        }
        const data = response.data.data;
        try {
            await (0,_aws__WEBPACK_IMPORTED_MODULE_2__.uploadToS3WithSignedUrl)(data.uploadUrl, data.headers, input);
            return {
                success: true,
                tokenId: data.tokenId,
            };
        }
        catch (e) {
            console.error('S3 upload error', e);
            return {
                success: false,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                error: e,
            };
        }
    }
    async detokenize(tokenId) {
        const response = await this.detokenizeToUrl(tokenId);
        if (!response.success) {
            return response;
        }
        const { headers, downloadUrl } = response;
        return {
            success: true,
            tokenId: tokenId,
            value: await (0,_aws__WEBPACK_IMPORTED_MODULE_2__.downloadFromS3WithSignedUrl)(downloadUrl, headers),
        };
    }
    async detokenizeToUrl(tokenId) {
        const response = await this.getTokenClient({
            tokenId: tokenId,
        });
        if (!response.success) {
            if (response.error instanceof _lunasec_server_common__WEBPACK_IMPORTED_MODULE_0__.BadHttpResponseError) {
                const httpError = response.error;
                return {
                    ...response,
                    errorCode: httpError.responseCode,
                };
            }
            return response;
        }
        if (!response.data.data) {
            return {
                success: false,
                error: new Error('Invalid response from Tokenizer when detokenizing data'),
            };
        }
        const { downloadUrl, headers } = response.data.data;
        return {
            success: true,
            tokenId: tokenId,
            headers: headers,
            downloadUrl: downloadUrl,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFOUQsT0FBTyxFQUFFLHFCQUFxQixFQUErQyxNQUFNLGNBQWMsQ0FBQztBQUVsRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVU5QyxNQUFNLE9BQU8sU0FBUztJQVFwQixZQUFZLE1BQXVDO1FBQ2pELHlDQUF5QztRQUN6QyxtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUVuQyxNQUFNLE9BQU8sR0FBMkIsRUFBRSxDQUFDO1FBQzNDLElBQUksUUFBUSxFQUFFO1lBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUM5QztRQUVELE1BQU0sYUFBYSxHQUFHLENBQTBDLFFBQWdCLEVBQUUsRUFBRTtZQUNsRixPQUFPLHFCQUFxQixDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDMUQsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTzthQUNSLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCw2REFBNkQ7SUFFN0QsS0FBSyxDQUFDLFdBQVcsQ0FBSSxPQUFlO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQzVDLE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3JCLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTztZQUNQLFFBQVEsRUFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1NBQ3pDLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FDZixPQUFlLEVBQ2YsUUFBVztRQUVYLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztTQUNwRDtRQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQzVDLE9BQU87WUFDUCxRQUFRO1NBQ1QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDckIsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFFRCxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPO1lBQ1AsUUFBUTtTQUNULENBQUM7SUFDSixDQUFDO0lBRUQsb0ZBQW9GO0lBQ3BGLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBYTtRQUMxQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDekMsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNyQixPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUN2QixPQUFPO2dCQUNMLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQzthQUN6RSxDQUFDO1NBQ0g7UUFFRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVoQyxJQUFJO1lBQ0YsTUFBTSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFbkUsT0FBTztnQkFDTCxPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQztTQUNIO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU87Z0JBQ0wsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsbUVBQW1FO2dCQUNuRSxLQUFLLEVBQUUsQ0FBQzthQUNULENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWU7UUFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3JCLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFFMUMsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLE9BQU87WUFDaEIsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztTQUMvRCxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBZTtRQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDekMsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDckIsSUFBSSxRQUFRLENBQUMsS0FBSyxZQUFZLG9CQUFvQixFQUFFO2dCQUNsRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUVqQyxPQUFPO29CQUNMLEdBQUcsUUFBUTtvQkFDWCxTQUFTLEVBQUUsU0FBUyxDQUFDLFlBQVk7aUJBQ2xDLENBQUM7YUFDSDtZQUVELE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3ZCLE9BQU87Z0JBQ0wsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDO2FBQzNFLENBQUM7U0FDSDtRQUVELE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFcEQsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsV0FBVyxFQUFFLFdBQVc7U0FDekIsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhZEh0dHBSZXNwb25zZUVycm9yIH0gZnJvbSAnQGx1bmFzZWMvc2VydmVyLWNvbW1vbic7XG5cbmltcG9ydCB7IG1ha2VTcGVjaWZpY0FwaUNsaWVudCwgU3BlY2lmaWNBcGlDbGllbnQsIFRva2VuaXplckZhaWxBcGlSZXNwb25zZSB9IGZyb20gJy4vYXBpL2NsaWVudCc7XG5pbXBvcnQgeyBWYWxpZFRva2VuaXplckFwaVJlcXVlc3RUeXBlcyB9IGZyb20gJy4vYXBpL3R5cGVzJztcbmltcG9ydCB7IGRvd25sb2FkRnJvbVMzV2l0aFNpZ25lZFVybCwgdXBsb2FkVG9TM1dpdGhTaWduZWRVcmwgfSBmcm9tICcuL2F3cyc7XG5pbXBvcnQgeyBDT05GSUdfREVGQVVMVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge1xuICBUb2tlbml6ZXJDbGllbnRDb25maWcsXG4gIFRva2VuaXplckRldG9rZW5pemVSZXNwb25zZSxcbiAgVG9rZW5pemVyRGV0b2tlbml6ZVRvVXJsUmVzcG9uc2UsXG4gIFRva2VuaXplckdldE1ldGFkYXRhUmVzcG9uc2UsXG4gIFRva2VuaXplclNldE1ldGFkYXRhUmVzcG9uc2UsXG4gIFRva2VuaXplclRva2VuaXplUmVzcG9uc2UsXG59IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgVG9rZW5pemVyIHtcbiAgcmVhZG9ubHkgY29uZmlnITogVG9rZW5pemVyQ2xpZW50Q29uZmlnO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZ2V0TWV0YWRhdGFDbGllbnQhOiBTcGVjaWZpY0FwaUNsaWVudDwnZ2V0TWV0YWRhdGEnPjtcbiAgcHJpdmF0ZSByZWFkb25seSBzZXRNZXRhZGF0YUNsaWVudCE6IFNwZWNpZmljQXBpQ2xpZW50PCdzZXRNZXRhZGF0YSc+O1xuICBwcml2YXRlIHJlYWRvbmx5IGdldFRva2VuQ2xpZW50ITogU3BlY2lmaWNBcGlDbGllbnQ8J2dldFRva2VuJz47XG4gIHByaXZhdGUgcmVhZG9ubHkgc2V0VG9rZW5DbGllbnQhOiBTcGVjaWZpY0FwaUNsaWVudDwnc2V0VG9rZW4nPjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OiBQYXJ0aWFsPFRva2VuaXplckNsaWVudENvbmZpZz4pIHtcbiAgICAvLyBEZWVwIGNsb25lIGNvbmZpZyBmb3IgbXV0YXRpb24gc2FmZXR5LlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcbiAgICB0aGlzLmNvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbih7fSwgQ09ORklHX0RFRkFVTFRTLCBjb25maWcpKSk7XG5cbiAgICBjb25zdCBqd3RUb2tlbiA9IHRoaXMuY29uZmlnLnRva2VuO1xuXG4gICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgIGlmIChqd3RUb2tlbikge1xuICAgICAgaGVhZGVyc1t0aGlzLmNvbmZpZy5oZWFkZXJzLmF1dGhdID0gand0VG9rZW47XG4gICAgfVxuXG4gICAgY29uc3QgbWFrZUFwaUNsaWVudCA9IDxUIGV4dGVuZHMgVmFsaWRUb2tlbml6ZXJBcGlSZXF1ZXN0VHlwZXM+KGVuZHBvaW50OiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBtYWtlU3BlY2lmaWNBcGlDbGllbnQ8VD4odGhpcy5jb25maWcuaG9zdCwgZW5kcG9pbnQsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRNZXRhZGF0YUNsaWVudCA9IG1ha2VBcGlDbGllbnQ8J2dldE1ldGFkYXRhJz4odGhpcy5jb25maWcuZW5kcG9pbnRzLmdldE1ldGFkYXRhKTtcbiAgICB0aGlzLnNldE1ldGFkYXRhQ2xpZW50ID0gbWFrZUFwaUNsaWVudDwnc2V0TWV0YWRhdGEnPih0aGlzLmNvbmZpZy5lbmRwb2ludHMuc2V0TWV0YWRhdGEpO1xuICAgIHRoaXMuZ2V0VG9rZW5DbGllbnQgPSBtYWtlQXBpQ2xpZW50PCdnZXRUb2tlbic+KHRoaXMuY29uZmlnLmVuZHBvaW50cy5nZXRUb2tlbik7XG4gICAgdGhpcy5zZXRUb2tlbkNsaWVudCA9IG1ha2VBcGlDbGllbnQ8J3NldFRva2VuJz4odGhpcy5jb25maWcuZW5kcG9pbnRzLnNldFRva2VuKTtcbiAgfVxuXG4gIC8vIFRPRE86IEV2YWx1YXRlIGFkZGluZyBiYWNrIGtleWdlblNldCBhbmQga2V5Z2VuR2V0IG1ldGhvZHNcblxuICBhc3luYyBnZXRNZXRhZGF0YTxUPih0b2tlbklkOiBzdHJpbmcpOiBQcm9taXNlPFRva2VuaXplckZhaWxBcGlSZXNwb25zZSB8IFRva2VuaXplckdldE1ldGFkYXRhUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0TWV0YWRhdGFDbGllbnQoe1xuICAgICAgdG9rZW5JZDogdG9rZW5JZCxcbiAgICB9KTtcblxuICAgIGlmICghcmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdG9rZW5JZCxcbiAgICAgIG1ldGFkYXRhOiA8VD5yZXNwb25zZS5kYXRhLmRhdGEubWV0YWRhdGEsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHNldE1ldGFkYXRhPFQ+KFxuICAgIHRva2VuSWQ6IHN0cmluZyxcbiAgICBtZXRhZGF0YTogVFxuICApOiBQcm9taXNlPFRva2VuaXplckZhaWxBcGlSZXNwb25zZSB8IFRva2VuaXplclNldE1ldGFkYXRhUmVzcG9uc2U+IHtcbiAgICBpZiAodHlwZW9mIG1ldGFkYXRhICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRhZGF0YSBtdXN0IGJlIGEgc3RyaW5nIHZhbHVlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNldE1ldGFkYXRhQ2xpZW50KHtcbiAgICAgIHRva2VuSWQsXG4gICAgICBtZXRhZGF0YSxcbiAgICB9KTtcblxuICAgIGlmICghcmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdG9rZW5JZCxcbiAgICAgIG1ldGFkYXRhLFxuICAgIH07XG4gIH1cblxuICAvLyBUT0RPOiBBZGQgYW5vdGhlciBtZXRob2QgdGhhdCBfZG9lc24ndF8gdGFrZSBhIGtleSwgc28gdGhhdCB3ZSBoYW5kbGUgZ2VuZXJhdGlvbi5cbiAgYXN5bmMgdG9rZW5pemUoaW5wdXQ6IHN0cmluZyk6IFByb21pc2U8VG9rZW5pemVyRmFpbEFwaVJlc3BvbnNlIHwgVG9rZW5pemVyVG9rZW5pemVSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZXRUb2tlbkNsaWVudCh7XG4gICAgICB2YWx1ZTogaW5wdXQsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3BvbnNlLmRhdGEuZGF0YSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBuZXcgRXJyb3IoJ0ludmFsaWQgcmVzcG9uc2UgZnJvbSBUb2tlbml6ZXIgd2hlbiB0b2tlbml6aW5nIGRhdGEnKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGEuZGF0YTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB1cGxvYWRUb1MzV2l0aFNpZ25lZFVybChkYXRhLnVwbG9hZFVybCwgZGF0YS5oZWFkZXJzLCBpbnB1dCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIHRva2VuSWQ6IGRhdGEudG9rZW5JZCxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcignUzMgdXBsb2FkIGVycm9yJywgZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudFxuICAgICAgICBlcnJvcjogZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGV0b2tlbml6ZSh0b2tlbklkOiBzdHJpbmcpOiBQcm9taXNlPFRva2VuaXplckZhaWxBcGlSZXNwb25zZSB8IFRva2VuaXplckRldG9rZW5pemVSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5kZXRva2VuaXplVG9VcmwodG9rZW5JZCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGhlYWRlcnMsIGRvd25sb2FkVXJsIH0gPSByZXNwb25zZTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdG9rZW5JZDogdG9rZW5JZCxcbiAgICAgIHZhbHVlOiBhd2FpdCBkb3dubG9hZEZyb21TM1dpdGhTaWduZWRVcmwoZG93bmxvYWRVcmwsIGhlYWRlcnMpLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBkZXRva2VuaXplVG9VcmwodG9rZW5JZDogc3RyaW5nKTogUHJvbWlzZTxUb2tlbml6ZXJGYWlsQXBpUmVzcG9uc2UgfCBUb2tlbml6ZXJEZXRva2VuaXplVG9VcmxSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRUb2tlbkNsaWVudCh7XG4gICAgICB0b2tlbklkOiB0b2tlbklkLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICBpZiAocmVzcG9uc2UuZXJyb3IgaW5zdGFuY2VvZiBCYWRIdHRwUmVzcG9uc2VFcnJvcikge1xuICAgICAgICBjb25zdCBodHRwRXJyb3IgPSByZXNwb25zZS5lcnJvcjtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnJlc3BvbnNlLFxuICAgICAgICAgIGVycm9yQ29kZTogaHR0cEVycm9yLnJlc3BvbnNlQ29kZSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIGlmICghcmVzcG9uc2UuZGF0YS5kYXRhKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IG5ldyBFcnJvcignSW52YWxpZCByZXNwb25zZSBmcm9tIFRva2VuaXplciB3aGVuIGRldG9rZW5pemluZyBkYXRhJyksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHsgZG93bmxvYWRVcmwsIGhlYWRlcnMgfSA9IHJlc3BvbnNlLmRhdGEuZGF0YTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgdG9rZW5JZDogdG9rZW5JZCxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBkb3dubG9hZFVybDogZG93bmxvYWRVcmwsXG4gICAgfTtcbiAgfVxufVxuIl19

/***/ }),

/***/ "../../../../../node_modules/base64-js/index.js":
/*!******************************************************!*\
  !*** ../../../../../node_modules/base64-js/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "../../../../../node_modules/buffer/index.js":
/*!***************************************************!*\
  !*** ../../../../../node_modules/buffer/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "../../../../../node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "../../../../../node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "../../../../../node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = __webpack_require__.g.TYPED_ARRAY_SUPPORT !== undefined
  ? __webpack_require__.g.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


/***/ }),

/***/ "../../../../../node_modules/builtin-status-codes/browser.js":
/*!*******************************************************************!*\
  !*** ../../../../../node_modules/builtin-status-codes/browser.js ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),

/***/ "../../../../../node_modules/events/events.js":
/*!****************************************************!*\
  !*** ../../../../../node_modules/events/events.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "../../../../../node_modules/https-browserify/index.js":
/*!*************************************************************!*\
  !*** ../../../../../node_modules/https-browserify/index.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var http = __webpack_require__(/*! http */ "../../../../../node_modules/stream-http/index.js")
var url = __webpack_require__(/*! url */ "../../../../../node_modules/url/url.js")

var https = module.exports

for (var key in http) {
  if (http.hasOwnProperty(key)) https[key] = http[key]
}

https.request = function (params, cb) {
  params = validateParams(params)
  return http.request.call(this, params, cb)
}

https.get = function (params, cb) {
  params = validateParams(params)
  return http.get.call(this, params, cb)
}

function validateParams (params) {
  if (typeof params === 'string') {
    params = url.parse(params)
  }
  if (!params.protocol) {
    params.protocol = 'https:'
  }
  if (params.protocol !== 'https:') {
    throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"')
  }
  return params
}


/***/ }),

/***/ "../../../../../node_modules/ieee754/index.js":
/*!****************************************************!*\
  !*** ../../../../../node_modules/ieee754/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "../../../../../node_modules/inherits/inherits_browser.js":
/*!****************************************************************!*\
  !*** ../../../../../node_modules/inherits/inherits_browser.js ***!
  \****************************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "../../../../../node_modules/isarray/index.js":
/*!****************************************************!*\
  !*** ../../../../../node_modules/isarray/index.js ***!
  \****************************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "../../../../../node_modules/process/browser.js":
/*!******************************************************!*\
  !*** ../../../../../node_modules/process/browser.js ***!
  \******************************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../../../../../node_modules/querystring/decode.js":
/*!*********************************************************!*\
  !*** ../../../../../node_modules/querystring/decode.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};


/***/ }),

/***/ "../../../../../node_modules/querystring/encode.js":
/*!*********************************************************!*\
  !*** ../../../../../node_modules/querystring/encode.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};


/***/ }),

/***/ "../../../../../node_modules/querystring/index.js":
/*!********************************************************!*\
  !*** ../../../../../node_modules/querystring/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "../../../../../node_modules/querystring/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "../../../../../node_modules/querystring/encode.js");


/***/ }),

/***/ "../../../../../node_modules/safe-buffer/index.js":
/*!********************************************************!*\
  !*** ../../../../../node_modules/safe-buffer/index.js ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "../../../../../node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "../../../../../node_modules/stream-http/index.js":
/*!********************************************************!*\
  !*** ../../../../../node_modules/stream-http/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var ClientRequest = __webpack_require__(/*! ./lib/request */ "../../../../../node_modules/stream-http/lib/request.js")
var response = __webpack_require__(/*! ./lib/response */ "../../../../../node_modules/stream-http/lib/response.js")
var extend = __webpack_require__(/*! xtend */ "../../../../../node_modules/xtend/immutable.js")
var statusCodes = __webpack_require__(/*! builtin-status-codes */ "../../../../../node_modules/builtin-status-codes/browser.js")
var url = __webpack_require__(/*! url */ "../../../../../node_modules/url/url.js")

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = __webpack_require__.g.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.ClientRequest = ClientRequest
http.IncomingMessage = response.IncomingMessage

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.globalAgent = new http.Agent()

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]

/***/ }),

/***/ "../../../../../node_modules/stream-http/lib/capability.js":
/*!*****************************************************************!*\
  !*** ../../../../../node_modules/stream-http/lib/capability.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.fetch = isFunction(__webpack_require__.g.fetch) && isFunction(__webpack_require__.g.ReadableStream)

exports.writableStream = isFunction(__webpack_require__.g.WritableStream)

exports.abortController = isFunction(__webpack_require__.g.AbortController)

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (__webpack_require__.g.XMLHttpRequest) {
		xhr = new __webpack_require__.g.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', __webpack_require__.g.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || checkTypeSupport('arraybuffer')

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc


/***/ }),

/***/ "../../../../../node_modules/stream-http/lib/request.js":
/*!**************************************************************!*\
  !*** ../../../../../node_modules/stream-http/lib/request.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "../../../../../node_modules/buffer/index.js")["Buffer"];
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../../../node_modules/process/browser.js");
var capability = __webpack_require__(/*! ./capability */ "../../../../../node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "../../../../../node_modules/inherits/inherits_browser.js")
var response = __webpack_require__(/*! ./response */ "../../../../../node_modules/stream-http/lib/response.js")
var stream = __webpack_require__(/*! readable-stream */ "../../../../../node_modules/stream-http/node_modules/readable-stream/readable-browser.js")

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + Buffer.from(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || ('requestTimeout' in opts && !capability.abortController)) {
		// If the use of XHR should be preferred. Not typically needed.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)
	self._fetchTimer = null
	self._socketTimeout = null
	self._socketTimer = null

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	if ('timeout' in opts && opts.timeout !== 0) {
		self.setTimeout(opts.timeout)
	}

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
        body = new Blob(self._body, {
            type: (headersObj['content-type'] || {}).value || ''
        });
    }

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		var signal = null
		if (capability.abortController) {
			var controller = new AbortController()
			signal = controller.signal
			self._fetchAbortController = controller

			if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
				self._fetchTimer = __webpack_require__.g.setTimeout(function () {
					self.emit('requestTimeout')
					if (self._fetchAbortController)
						self._fetchAbortController.abort()
				}, opts.requestTimeout)
			}
		}

		__webpack_require__.g.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin',
			signal: signal
		}).then(function (response) {
			self._fetchResponse = response
			self._resetTimers(false)
			self._connect()
		}, function (reason) {
			self._resetTimers(true)
			if (!self._destroyed)
				self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new __webpack_require__.g.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('requestTimeout' in opts) {
			xhr.timeout = opts.requestTimeout
			xhr.ontimeout = function () {
				self.emit('requestTimeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self._resetTimers(true)
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	self._resetTimers(false)

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress(self._resetTimers.bind(self))
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._resetTimers.bind(self))
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype._resetTimers = function (done) {
	var self = this

	__webpack_require__.g.clearTimeout(self._socketTimer)
	self._socketTimer = null

	if (done) {
		__webpack_require__.g.clearTimeout(self._fetchTimer)
		self._fetchTimer = null
	} else if (self._socketTimeout) {
		self._socketTimer = __webpack_require__.g.setTimeout(function () {
			self.emit('timeout')
		}, self._socketTimeout)
	}
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function (err) {
	var self = this
	self._destroyed = true
	self._resetTimers(true)
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	else if (self._fetchAbortController)
		self._fetchAbortController.abort()

	if (err)
		self.emit('error', err)
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.setTimeout = function (timeout, cb) {
	var self = this

	if (cb)
		self.once('timeout', cb)

	self._socketTimeout = timeout
	self._resetTimers(false)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via'
]


/***/ }),

/***/ "../../../../../node_modules/stream-http/lib/response.js":
/*!***************************************************************!*\
  !*** ../../../../../node_modules/stream-http/lib/response.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../../../node_modules/process/browser.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "../../../../../node_modules/buffer/index.js")["Buffer"];
var capability = __webpack_require__(/*! ./capability */ "../../../../../node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "../../../../../node_modules/inherits/inherits_browser.js")
var stream = __webpack_require__(/*! readable-stream */ "../../../../../node_modules/stream-http/node_modules/readable-stream/readable-browser.js")

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode, resetTimers) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function (header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})

		if (capability.writableStream) {
			var writable = new WritableStream({
				write: function (chunk) {
					resetTimers(false)
					return new Promise(function (resolve, reject) {
						if (self._destroyed) {
							reject()
						} else if(self.push(Buffer.from(chunk))) {
							resolve()
						} else {
							self._resumeFetch = resolve
						}
					})
				},
				close: function () {
					resetTimers(true)
					if (!self._destroyed)
						self.push(null)
				},
				abort: function (err) {
					resetTimers(true)
					if (!self._destroyed)
						self.emit('error', err)
				}
			})

			try {
				response.body.pipeTo(writable).catch(function (err) {
					resetTimers(true)
					if (!self._destroyed)
						self.emit('error', err)
				})
				return
			} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
		}
		// fallback for when writableStream or pipeTo aren't available
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				resetTimers(result.done)
				if (result.done) {
					self.push(null)
					return
				}
				self.push(Buffer.from(result.value))
				read()
			}).catch(function (err) {
				resetTimers(true)
				if (!self._destroyed)
					self.emit('error', err)
			})
		}
		read()
	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {
	var self = this

	var resolve = self._resumeFetch
	if (resolve) {
		self._resumeFetch = null
		resolve()
	}
}

IncomingMessage.prototype._onXHRProgress = function (resetTimers) {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text':
			response = xhr.responseText
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = Buffer.alloc(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(Buffer.from(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(Buffer.from(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new __webpack_require__.g.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(Buffer.from(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				resetTimers(true)
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		resetTimers(true)
		self.push(null)
	}
}


/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/errors-browser.js":
/*!**********************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/errors-browser.js ***!
  \**********************************************************************************************/
/***/ ((module) => {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;


/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js":
/*!**************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js ***!
  \**************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../../../node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = __webpack_require__(/*! ./_stream_readable */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_readable.js");

var Writable = __webpack_require__(/*! ./_stream_writable */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_writable.js");

__webpack_require__(/*! inherits */ "../../../../../node_modules/inherits/inherits_browser.js")(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_passthrough.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_passthrough.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.


module.exports = PassThrough;

var Transform = __webpack_require__(/*! ./_stream_transform */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_transform.js");

__webpack_require__(/*! inherits */ "../../../../../node_modules/inherits/inherits_browser.js")(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_readable.js":
/*!****************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_readable.js ***!
  \****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../../../node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = __webpack_require__(/*! events */ "../../../../../node_modules/events/events.js").EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = __webpack_require__(/*! ./internal/streams/stream */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/


var Buffer = __webpack_require__(/*! buffer */ "../../../../../node_modules/buffer/index.js").Buffer;

var OurUint8Array = __webpack_require__.g.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = __webpack_require__(/*! util */ "?3c26");

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = __webpack_require__(/*! ./internal/streams/buffer_list */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/buffer_list.js");

var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js");

var _require = __webpack_require__(/*! ./internal/streams/state */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/state.js"),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = __webpack_require__(/*! ../errors */ "../../../../../node_modules/stream-http/node_modules/readable-stream/errors-browser.js").codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

__webpack_require__(/*! inherits */ "../../../../../node_modules/inherits/inherits_browser.js")(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "../../../../../node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(/*! string_decoder/ */ "../../../../../node_modules/string_decoder/lib/string_decoder.js").StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = __webpack_require__(/*! ./internal/streams/async_iterator */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/async_iterator.js");
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = __webpack_require__(/*! ./internal/streams/from */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/from-browser.js");
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_transform.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_transform.js ***!
  \*****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.


module.exports = Transform;

var _require$codes = __webpack_require__(/*! ../errors */ "../../../../../node_modules/stream-http/node_modules/readable-stream/errors-browser.js").codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = __webpack_require__(/*! ./_stream_duplex */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");

__webpack_require__(/*! inherits */ "../../../../../node_modules/inherits/inherits_browser.js")(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_writable.js":
/*!****************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_writable.js ***!
  \****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../../../node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.


module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: __webpack_require__(/*! util-deprecate */ "../../../../../node_modules/util-deprecate/browser.js")
};
/*</replacement>*/

/*<replacement>*/

var Stream = __webpack_require__(/*! ./internal/streams/stream */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/


var Buffer = __webpack_require__(/*! buffer */ "../../../../../node_modules/buffer/index.js").Buffer;

var OurUint8Array = __webpack_require__.g.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js");

var _require = __webpack_require__(/*! ./internal/streams/state */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/state.js"),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = __webpack_require__(/*! ../errors */ "../../../../../node_modules/stream-http/node_modules/readable-stream/errors-browser.js").codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

__webpack_require__(/*! inherits */ "../../../../../node_modules/inherits/inherits_browser.js")(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js"); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/async_iterator.js":
/*!*******************************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/async_iterator.js ***!
  \*******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../../../node_modules/process/browser.js");


var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = __webpack_require__(/*! ./end-of-stream */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/end-of-stream.js");

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/buffer_list.js":
/*!****************************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/buffer_list.js ***!
  \****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(/*! buffer */ "../../../../../node_modules/buffer/index.js"),
    Buffer = _require.Buffer;

var _require2 = __webpack_require__(/*! util */ "?fd0a"),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js":
/*!************************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "../../../../../node_modules/process/browser.js");
 // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/end-of-stream.js":
/*!******************************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/end-of-stream.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).


var ERR_STREAM_PREMATURE_CLOSE = __webpack_require__(/*! ../../../errors */ "../../../../../node_modules/stream-http/node_modules/readable-stream/errors-browser.js").codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/from-browser.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/from-browser.js ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};


/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/pipeline.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/pipeline.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).


var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = __webpack_require__(/*! ../../../errors */ "../../../../../node_modules/stream-http/node_modules/readable-stream/errors-browser.js").codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = __webpack_require__(/*! ./end-of-stream */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/end-of-stream.js");
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/state.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/state.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ERR_INVALID_OPT_VALUE = __webpack_require__(/*! ../../../errors */ "../../../../../node_modules/stream-http/node_modules/readable-stream/errors-browser.js").codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};

/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js":
/*!*******************************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js ***!
  \*******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! events */ "../../../../../node_modules/events/events.js").EventEmitter;


/***/ }),

/***/ "../../../../../node_modules/stream-http/node_modules/readable-stream/readable-browser.js":
/*!************************************************************************************************!*\
  !*** ../../../../../node_modules/stream-http/node_modules/readable-stream/readable-browser.js ***!
  \************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

exports = module.exports = __webpack_require__(/*! ./lib/_stream_readable.js */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_readable.js");
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(/*! ./lib/_stream_writable.js */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_writable.js");
exports.Duplex = __webpack_require__(/*! ./lib/_stream_duplex.js */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js");
exports.Transform = __webpack_require__(/*! ./lib/_stream_transform.js */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_transform.js");
exports.PassThrough = __webpack_require__(/*! ./lib/_stream_passthrough.js */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/_stream_passthrough.js");
exports.finished = __webpack_require__(/*! ./lib/internal/streams/end-of-stream.js */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/end-of-stream.js");
exports.pipeline = __webpack_require__(/*! ./lib/internal/streams/pipeline.js */ "../../../../../node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/pipeline.js");


/***/ }),

/***/ "../../../../../node_modules/string_decoder/lib/string_decoder.js":
/*!************************************************************************!*\
  !*** ../../../../../node_modules/string_decoder/lib/string_decoder.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "../../../../../node_modules/safe-buffer/index.js").Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ "../../../../../node_modules/url/node_modules/punycode/punycode.js":
/*!*************************************************************************!*\
  !*** ../../../../../node_modules/url/node_modules/punycode/punycode.js ***!
  \*************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));


/***/ }),

/***/ "../../../../../node_modules/url/url.js":
/*!**********************************************!*\
  !*** ../../../../../node_modules/url/url.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "../../../../../node_modules/url/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "../../../../../node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "../../../../../node_modules/querystring/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "../../../../../node_modules/url/util.js":
/*!***********************************************!*\
  !*** ../../../../../node_modules/url/util.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "../../../../../node_modules/util-deprecate/browser.js":
/*!*************************************************************!*\
  !*** ../../../../../node_modules/util-deprecate/browser.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!__webpack_require__.g.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = __webpack_require__.g.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}


/***/ }),

/***/ "../../../../../node_modules/xtend/immutable.js":
/*!******************************************************!*\
  !*** ../../../../../node_modules/xtend/immutable.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),

/***/ "?fd0a":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?3c26":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const secure_frame_1 = __webpack_require__(/*! ./secure-frame */ "./secure-frame.ts");
const supportedElements = ['input', 'textarea', 'span'];
function startup() {
    const elementType = (new URL(document.location.href)).searchParams.get('element');
    if (!elementType || !supportedElements.includes(elementType)) {
        throw new Error('Invalid element type passed in iframe URL, unsure what to render');
    }
    const loadingText = document.querySelector('.loading-text');
    if (!loadingText) {
        throw new Error('Couldnt find loading text element in iframe HTML');
    }
    new secure_frame_1.SecureFrame(elementType, loadingText);
}
startup();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaURBQTBEO0FBRTFELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JELFNBQVMsT0FBTztJQUNkLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUE4QixDQUFDO0lBRS9HLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUM7UUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO0tBQ3JGO0lBRUQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQVksQ0FBQztJQUV2RSxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO0tBQ3RFO0lBQ0QsSUFBSSwwQkFBVyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBQ0QsT0FBTyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFNlY3VyZUZyYW1lLCBFbGVtZW50VHlwZXMgfSBmcm9tICcuL3NlY3VyZS1mcmFtZSdcblxuY29uc3Qgc3VwcG9ydGVkRWxlbWVudHMgPSBbJ2lucHV0JywndGV4dGFyZWEnLCdzcGFuJ11cbmZ1bmN0aW9uIHN0YXJ0dXAoKSB7XG4gIGNvbnN0IGVsZW1lbnRUeXBlID0gKG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24uaHJlZikpLnNlYXJjaFBhcmFtcy5nZXQoJ2VsZW1lbnQnKSBhcyBrZXlvZiBFbGVtZW50VHlwZXMgfCBudWxsO1xuXG4gIGlmICghZWxlbWVudFR5cGUgfHwgIXN1cHBvcnRlZEVsZW1lbnRzLmluY2x1ZGVzKGVsZW1lbnRUeXBlKSl7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGVsZW1lbnQgdHlwZSBwYXNzZWQgaW4gaWZyYW1lIFVSTCwgdW5zdXJlIHdoYXQgdG8gcmVuZGVyJyk7XG4gIH1cblxuICBjb25zdCBsb2FkaW5nVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nLXRleHQnKSBhcyBFbGVtZW50O1xuXG4gIGlmICghbG9hZGluZ1RleHQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGRudCBmaW5kIGxvYWRpbmcgdGV4dCBlbGVtZW50IGluIGlmcmFtZSBIVE1MJylcbiAgfVxuICBuZXcgU2VjdXJlRnJhbWUoZWxlbWVudFR5cGUsIGxvYWRpbmdUZXh0KTtcbn1cbnN0YXJ0dXAoKTtcblxuIl19
})();

/******/ })()
;
//# sourceMappingURL=main-dev.js.map