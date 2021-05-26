"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameMessageCreator = void 0;
const constants_1 = require("../constants");
const async_1 = require("../utils/async");
const random_1 = require("../utils/random");
const types_1 = require("./types");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWUtbWVzc2FnZS1jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJhbWUtbWVzc2FnZS1jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUFvRDtBQUNwRCwwQ0FBeUM7QUFDekMsNENBQXNEO0FBRXRELG1DQVFpQjtBQUVqQixNQUFhLG1CQUFtQjtJQUs5QixZQUFZLG9CQUFzRSxFQUFFLE9BQU8sR0FBRyxJQUFJO1FBQ2hHLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxvQkFBb0IsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQsb0JBQW9CLENBQ2xCLE9BQVUsRUFDVixJQUFnQztRQUVoQyxPQUFPO1lBQ0wsT0FBTztZQUNQLGdCQUFnQixFQUFFLDRCQUFtQixFQUFFO1lBQ3ZDLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZLENBQUMsV0FBMkQ7UUFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUU7WUFDNUQsTUFBTSxJQUFJLEtBQUssQ0FDYixrR0FBa0csQ0FDbkcsQ0FBQztTQUNIO1FBRUQsa0NBQWtDO1FBQ2xDLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRTtZQUMxQixJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsT0FBTztTQUNSO1FBQ0QsbUdBQW1HO1FBQ25HLElBQUksV0FBVyxDQUFDLGdCQUFnQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4QyxPQUFPO1NBQ1I7SUFDSCxDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLDBCQUEwQixDQUFDLFlBQXNDO1FBQy9ELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25IO1FBQ0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdDLE9BQU87SUFDVCxDQUFDO0lBRUQsa0VBQWtFO0lBQ2xFLHFCQUFxQixDQUFDLE9BQTRCO1FBQ2hELHlDQUF5QztRQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUMxRCxDQUFDO0lBRUQsS0FBSyxDQUFDLDJCQUEyQixDQUMvQixZQUFvQixFQUNwQixPQUFpRDtRQUVqRCxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyx5Q0FBeUM7WUFDekMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGdDQUFvQixDQUFDLENBQUM7WUFDeEUsTUFBTSxlQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakIsd0VBQXdFO1lBQ3hFLG9GQUFvRjtZQUNwRixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUNsRSxNQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUUvQiw4Q0FBOEM7Z0JBQzlDLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUM5RCxPQUFPLE1BQU0sQ0FBQyxtQ0FBbUMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDL0U7Z0JBRUQsNEJBQTRCO2dCQUM1QixNQUFNLGVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtZQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFbEUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXJELElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyx3Q0FBZ0MsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzdFLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0NBQStDLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzVFLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCx1RkFBdUY7WUFDdkYscUJBQXFCO1lBQ3JCLE9BQU8sQ0FBQyxXQUF1RixDQUFDLENBQUM7UUFDbkcsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQStCLENBQzdCLFVBQStCO1FBRS9CLE9BQU8sVUFBcUQsQ0FBQztJQUMvRCxDQUFDO0lBRUQsb0JBQW9CLENBQ2xCLE9BQTRCO1FBRTVCLDBDQUEwQztRQUMxQyxRQUFRLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDdkIsS0FBSyx1QkFBdUI7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLCtCQUErQixDQUEwQixPQUFPLENBQUMsQ0FBQztTQUNqRjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBakhELGtEQWlIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9fU0VDVVJFX0ZSQU1FX1VSTF9fIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IHRpbWVvdXQgfSBmcm9tICcuLi91dGlscy9hc3luYyc7XG5pbXBvcnQgeyBnZW5lcmF0ZVNlY3VyZU5vbmNlIH0gZnJvbSAnLi4vdXRpbHMvcmFuZG9tJztcblxuaW1wb3J0IHtcbiAgRnJhbWVNZXNzYWdlLFxuICBJbmJvdW5kRnJhbWVNZXNzYWdlTWFwLFxuICBPdXRib3VuZEZyYW1lTWVzc2FnZU1hcCxcbiAgT3V0Ym91bmRUb0luYm91bmRNZXNzYWdlVHlwZU1hcCxcbiAgT3V0Ym91bmRUb0luYm91bmRNZXNzYWdlVmFsdWVNYXAsXG4gIFVua25vd25GcmFtZU1lc3NhZ2UsXG4gIFVua25vd25GcmFtZU5vdGlmaWNhdGlvbixcbn0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBGcmFtZU1lc3NhZ2VDcmVhdG9yIHtcbiAgcHJpdmF0ZSByZWFkb25seSBmcmFtZVJlc3BvbnNlczogUmVjb3JkPHN0cmluZywgVW5rbm93bkZyYW1lTWVzc2FnZT47XG4gIHByaXZhdGUgcmVhZG9ubHkgdGltZW91dDogbnVtYmVyO1xuICBwcml2YXRlIHJlYWRvbmx5IGZyYW1lTm90aWZpY2F0aW9uQ2FsbGJhY2shOiAobm90aWZpY2F0aW9uOiBVbmtub3duRnJhbWVOb3RpZmljYXRpb24pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3Iobm90aWZpY2F0aW9uQ2FsbGJhY2s6IChub3RpZmljYXRpb246IFVua25vd25GcmFtZU5vdGlmaWNhdGlvbikgPT4gdm9pZCwgdGltZW91dCA9IDUwMDApIHtcbiAgICB0aGlzLmZyYW1lUmVzcG9uc2VzID0ge307XG4gICAgdGhpcy5mcmFtZU5vdGlmaWNhdGlvbkNhbGxiYWNrID0gbm90aWZpY2F0aW9uQ2FsbGJhY2s7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgfVxuXG4gIGNyZWF0ZU1lc3NhZ2VUb0ZyYW1lPEsgZXh0ZW5kcyBrZXlvZiBPdXRib3VuZEZyYW1lTWVzc2FnZU1hcD4oXG4gICAgY29tbWFuZDogSyxcbiAgICBkYXRhOiBPdXRib3VuZEZyYW1lTWVzc2FnZU1hcFtLXVxuICApOiBGcmFtZU1lc3NhZ2U8T3V0Ym91bmRGcmFtZU1lc3NhZ2VNYXAsIEs+IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tbWFuZCxcbiAgICAgIGNvcnJlbGF0aW9uVG9rZW46IGdlbmVyYXRlU2VjdXJlTm9uY2UoKSxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgfTtcbiAgfVxuXG4gIHBvc3RSZWNlaXZlZCh1bmtub3duUG9zdDogVW5rbm93bkZyYW1lTWVzc2FnZSB8IFVua25vd25GcmFtZU5vdGlmaWNhdGlvbik6IHZvaWQge1xuICAgIGlmICghdW5rbm93blBvc3QuZnJhbWVOb25jZSAmJiAhdW5rbm93blBvc3QuY29ycmVsYXRpb25Ub2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVW5rbm93biBwb3N0IG1lc3NhZ2UgcmVjZWl2ZWQgd2l0aG91dCBjb3JyZWxhdGlvblRva2VuIG9yIGZyYW1lTm9uY2UsIG11c3QgaGF2ZSBvbmUgb3IgdGhlIG90aGVyJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBOb3RpZmljYXRpb25zIGhhdmUgYSBmcmFtZU5vbmNlXG4gICAgaWYgKHVua25vd25Qb3N0LmZyYW1lTm9uY2UpIHtcbiAgICAgIHRoaXMuaGFuZGxlTm90aWZpY2F0aW9uUmVjZWl2ZWQodW5rbm93blBvc3QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBNZXNzYWdlcyBhcmUgcmVjZWlwdCBjb25maXJtYXRpb25zIHRvIHRoaW5ncyB3ZSBoYXZlIHNlbnQgdGhlIGZyYW1lLCBhbmQgaGF2ZSBhIGNvcnJlbGF0aW9uVG9rZW5cbiAgICBpZiAodW5rbm93blBvc3QuY29ycmVsYXRpb25Ub2tlbikge1xuICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlUmVjZWl2ZWQodW5rbm93blBvc3QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8vIE5vdGlmaWNhdGlvbnMgc3RhcnQgaW4gdGhlIGZyYW1lIGFuZCBhcmUgc2VudCBoZXJlIHRvIG5vdGlmeSB1cyBvZiBldmVudHNcbiAgaGFuZGxlTm90aWZpY2F0aW9uUmVjZWl2ZWQobm90aWZpY2F0aW9uOiBVbmtub3duRnJhbWVOb3RpZmljYXRpb24pOiB2b2lkIHtcbiAgICBjb25zdCBub3RpZmljYXRpb25UeXBlcyA9IFsnTm90aWZ5T25CbHVyJywgJ05vdGlmeU9uU3RhcnQnXTtcbiAgICBpZiAoIW5vdGlmaWNhdGlvblR5cGVzLmluY2x1ZGVzKG5vdGlmaWNhdGlvbi5jb21tYW5kKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWNlaXZlZCBGcmFtZSBOb3RpZmljYXRpb24gb2YgdW5rbm93biB0eXBlLCBhbGxvd2VkIHR5cGVzIGFyZSAke25vdGlmaWNhdGlvblR5cGVzLnRvU3RyaW5nKCl9YCk7XG4gICAgfVxuICAgIHRoaXMuZnJhbWVOb3RpZmljYXRpb25DYWxsYmFjayhub3RpZmljYXRpb24pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIE1lc3NhZ2VzIGFyZSByZXNwb25zZXMgZnJvbSB0aGUgZnJhbWUgdG8gdGhpbmdzIHdlIGhhdmUgc2VudCBpdFxuICBoYW5kbGVNZXNzYWdlUmVjZWl2ZWQobWVzc2FnZTogVW5rbm93bkZyYW1lTWVzc2FnZSk6IHZvaWQge1xuICAgIC8vIFRPRE86IFZhbGlkYXRlIHJlc3BvbnNlIGhhcyB2YWxpZCBKU09OXG4gICAgdGhpcy5mcmFtZVJlc3BvbnNlc1ttZXNzYWdlLmNvcnJlbGF0aW9uVG9rZW5dID0gbWVzc2FnZTtcbiAgfVxuXG4gIGFzeW5jIHNlbmRNZXNzYWdlVG9GcmFtZVdpdGhSZXBseTxLIGV4dGVuZHMga2V5b2YgT3V0Ym91bmRGcmFtZU1lc3NhZ2VNYXAgfCBrZXlvZiBPdXRib3VuZFRvSW5ib3VuZE1lc3NhZ2VUeXBlTWFwPihcbiAgICBmcmFtZUNvbnRleHQ6IFdpbmRvdyxcbiAgICBtZXNzYWdlOiBGcmFtZU1lc3NhZ2U8T3V0Ym91bmRGcmFtZU1lc3NhZ2VNYXAsIEs+XG4gICk6IFByb21pc2U8RnJhbWVNZXNzYWdlPEluYm91bmRGcmFtZU1lc3NhZ2VNYXAsIE91dGJvdW5kVG9JbmJvdW5kTWVzc2FnZVR5cGVNYXBbS10+IHwgbnVsbD4ge1xuICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIFRPRE86IE1ha2UgdGhpcyBkb21haW4gYmUgY29uZmlndXJhYmxlXG4gICAgICBmcmFtZUNvbnRleHQucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksIF9fU0VDVVJFX0ZSQU1FX1VSTF9fKTtcbiAgICAgIGF3YWl0IHRpbWVvdXQoMik7XG5cbiAgICAgIC8vIFNwaW4gbG9jayB0aGF0IHdhaXRzIHVudGlsIHdlIHJlY2VpdmUgYSByZXNwb25zZSBpbiBhbm90aGVyIFwidGhyZWFkXCIuXG4gICAgICAvLyBUaGlzIHdpbGwgcmV0dXJuIGZhbHNlIHdoZW4gYSBtZXNzYWdlIGlzIGluIHRoZSByZXNwb25zZSBidWZmZXIgXCJmcmFtZVJlc3BvbnNlc1wiLlxuICAgICAgd2hpbGUgKHRoaXMuZnJhbWVSZXNwb25zZXNbbWVzc2FnZS5jb3JyZWxhdGlvblRva2VuXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvLyBUaHJvdyBhIHRpbWVvdXQgaWYgd2UgZG9uJ3QgZ2V0IGEgcmVzcG9uc2UuXG4gICAgICAgIGlmIChjdXJyZW50VGltZS5nZXRUaW1lKCkgLSBzdGFydFRpbWUuZ2V0VGltZSgpID4gdGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdCgnVGltZW91dCBleGNlZWRlZCBmb3IgZnJhbWUgY2FsbDogJyArIG1lc3NhZ2UuY29ycmVsYXRpb25Ub2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWxheSBsb29wIGFzeW5jaHJvbm91c2x5XG4gICAgICAgIGF3YWl0IHRpbWVvdXQoNSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJhd1Jlc3BvbnNlID0gdGhpcy5mcmFtZVJlc3BvbnNlc1ttZXNzYWdlLmNvcnJlbGF0aW9uVG9rZW5dO1xuXG4gICAgICBkZWxldGUgdGhpcy5mcmFtZVJlc3BvbnNlc1ttZXNzYWdlLmNvcnJlbGF0aW9uVG9rZW5dO1xuXG4gICAgICBpZiAocmF3UmVzcG9uc2UuY29tbWFuZCAhPT0gT3V0Ym91bmRUb0luYm91bmRNZXNzYWdlVmFsdWVNYXBbbWVzc2FnZS5jb21tYW5kXSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdXcm9uZyByZXNwb25zZSBtZXNzYWdlIHR5cGUgZnJvbSBzZWN1cmUgZnJhbWUnLCByYXdSZXNwb25zZSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiBBZGQgSlNPTiB2YWxpZGF0aW9uIHRvIHByZXZlbnQgYmFkbHkgZm9ybWF0dGVkIG1lc3NhZ2VkIGZyb20gc2xpcHBpbmcgdGhyb3VnaC5cbiAgICAgIC8vIE9yIHVzZSBQcm90b2J1Zi4uP1xuICAgICAgcmVzb2x2ZShyYXdSZXNwb25zZSBhcyBGcmFtZU1lc3NhZ2U8SW5ib3VuZEZyYW1lTWVzc2FnZU1hcCwgT3V0Ym91bmRUb0luYm91bmRNZXNzYWdlVHlwZU1hcFtLXT4pO1xuICAgIH0pO1xuICB9XG5cbiAgY29udmVydFJhd01lc3NhZ2VUb1R5cGVkTWVzc2FnZTxLIGV4dGVuZHMga2V5b2YgSW5ib3VuZEZyYW1lTWVzc2FnZU1hcD4oXG4gICAgcmF3TWVzc2FnZTogVW5rbm93bkZyYW1lTWVzc2FnZVxuICApOiBGcmFtZU1lc3NhZ2U8SW5ib3VuZEZyYW1lTWVzc2FnZU1hcCwgSz4ge1xuICAgIHJldHVybiByYXdNZXNzYWdlIGFzIEZyYW1lTWVzc2FnZTxJbmJvdW5kRnJhbWVNZXNzYWdlTWFwLCBLPjtcbiAgfVxuXG4gIHByb2Nlc3NGcmFtZVJlc3BvbnNlKFxuICAgIG1lc3NhZ2U6IFVua25vd25GcmFtZU1lc3NhZ2VcbiAgKTogRnJhbWVNZXNzYWdlPEluYm91bmRGcmFtZU1lc3NhZ2VNYXAsIGtleW9mIEluYm91bmRGcmFtZU1lc3NhZ2VNYXA+IHwgbnVsbCB7XG4gICAgLy8gVE9ETzogQWRkIHZhbGlkYXRpb24gZm9yIHRoaXMgUlBDIGhlcmUuXG4gICAgc3dpdGNoIChtZXNzYWdlLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgJ1JlY2VpdmVDb21taXR0ZWRUb2tlbic6XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRSYXdNZXNzYWdlVG9UeXBlZE1lc3NhZ2U8J1JlY2VpdmVDb21taXR0ZWRUb2tlbic+KG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=