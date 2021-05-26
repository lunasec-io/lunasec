"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureFormEventBus = exports.SecureFormElementType = void 0;
var SecureFormElementType;
(function (SecureFormElementType) {
    SecureFormElementType["Submit"] = "Submit";
    SecureFormElementType["Text"] = "Text";
})(SecureFormElementType = exports.SecureFormElementType || (exports.SecureFormElementType = {}));
class SecureFormEventBus {
    constructor() {
        this.nonceToEntry = {};
    }
    add(type, frameId, getFrameWindow) {
        this.nonceToEntry[frameId] = {
            type,
            frameId,
            getFrameWindow: getFrameWindow
        };
    }
    remove(nonce) {
        if (this.nonceToEntry[nonce]) {
            delete this.nonceToEntry[nonce];
        }
    }
    getAllListeners() {
        return Object.values(this.nonceToEntry);
    }
}
exports.SecureFormEventBus = SecureFormEventBus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtYnVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnQtYnVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLElBQVkscUJBR1g7QUFIRCxXQUFZLHFCQUFxQjtJQUMvQiwwQ0FBaUIsQ0FBQTtJQUNqQixzQ0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBR2hDO0FBYUQsTUFBYSxrQkFBa0I7SUFHN0I7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQTJCLEVBQUUsT0FBZSxFQUFFLGNBQXFDO1FBQ3JGLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUc7WUFDM0IsSUFBSTtZQUNKLE9BQU87WUFDUCxjQUFjLEVBQUUsY0FBYztTQUMvQixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFhO1FBQ2xCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBeEJELGdEQXdCQyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGVudW0gU2VjdXJlRm9ybUVsZW1lbnRUeXBlIHtcbiAgU3VibWl0ID0gJ1N1Ym1pdCcsXG4gIFRleHQgPSAnVGV4dCdcbn1cblxuZXhwb3J0IHR5cGUgU2VjdXJlRm9ybUV2ZW50UmVnaXN0cnkgPSB7XG4gIGFkZCh0eXBlOiBTZWN1cmVGb3JtRWxlbWVudFR5cGUsIG5vbmNlOiBzdHJpbmcsIHRyaWdnZXJUb2tlbkNvbW1pdDogKCkgPT4gUHJvbWlzZTxXaW5kb3c+KTogdm9pZDtcbiAgcmVtb3ZlKGZyYW1lSWQ6IHN0cmluZyk6IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBTZWN1cmVGb3JtRXZlbnRCdXNFbnRyeSA9IHtcbiAgcmVhZG9ubHkgdHlwZTogU2VjdXJlRm9ybUVsZW1lbnRUeXBlLFxuICByZWFkb25seSBmcmFtZUlkOiBzdHJpbmcsXG4gIHJlYWRvbmx5IGdldEZyYW1lV2luZG93OiAoKSA9PiBQcm9taXNlPFdpbmRvdz5cbn07XG5cbmV4cG9ydCBjbGFzcyBTZWN1cmVGb3JtRXZlbnRCdXMgaW1wbGVtZW50cyBTZWN1cmVGb3JtRXZlbnRSZWdpc3RyeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbm9uY2VUb0VudHJ5ITogUmVjb3JkPHN0cmluZywgU2VjdXJlRm9ybUV2ZW50QnVzRW50cnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubm9uY2VUb0VudHJ5ID0ge307XG4gIH1cblxuICBhZGQodHlwZTogU2VjdXJlRm9ybUVsZW1lbnRUeXBlLCBmcmFtZUlkOiBzdHJpbmcsIGdldEZyYW1lV2luZG93OiAoKSA9PiBQcm9taXNlPFdpbmRvdz4pIHtcbiAgICB0aGlzLm5vbmNlVG9FbnRyeVtmcmFtZUlkXSA9IHtcbiAgICAgIHR5cGUsXG4gICAgICBmcmFtZUlkLFxuICAgICAgZ2V0RnJhbWVXaW5kb3c6IGdldEZyYW1lV2luZG93XG4gICAgfTtcbiAgfVxuXG4gIHJlbW92ZShub25jZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubm9uY2VUb0VudHJ5W25vbmNlXSkge1xuICAgICAgZGVsZXRlIHRoaXMubm9uY2VUb0VudHJ5W25vbmNlXTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxMaXN0ZW5lcnMoKSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5ub25jZVRvRW50cnkpO1xuICB9XG59XG4iXX0=