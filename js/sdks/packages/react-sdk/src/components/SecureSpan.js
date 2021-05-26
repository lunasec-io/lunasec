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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureSpan = void 0;
const secure_frame_common_1 = require("@lunasec/secure-frame-common");
const react_1 = __importStar(require("react"));
class SecureSpan extends react_1.Component {
    constructor(props) {
        super(props);
        this.frameId = secure_frame_common_1.generateSecureNonce();
        this.frameRef = react_1.default.createRef();
        this.dummyElementRef = react_1.default.createRef();
        const secureFrameURL = new URL(secure_frame_common_1.__SECURE_FRAME_URL__);
        secureFrameURL.pathname = secure_frame_common_1.secureFramePathname;
        this.messageCreator = new secure_frame_common_1.FrameMessageCreator((notification) => this.frameNotificationCallback(notification));
        this.state = {
            // TODO: Ensure that the security threat model around an attacker setting this URL is sane.
            secureFrameUrl: secureFrameURL.toString(),
            frameStyleInfo: null,
            frameReady: false,
        };
    }
    componentDidMount() {
        this.abortController = new AbortController();
        secure_frame_common_1.addReactEventListener(window, this.abortController, (message) => this.messageCreator.postReceived(message));
        // presumably generateElementStyle is called here in order to read the CSS after the component mounts
        // with a side effect of causing it to re-render again once it know's its own styles
        this.setState({
            frameStyleInfo: this.generateElementStyle(),
        });
    }
    componentWillUnmount() {
        this.abortController.abort();
    }
    generateElementStyle() {
        if (!this.dummyElementRef.current) {
            throw new Error('Unable to locate `inputRef` in SecureElement component');
        }
        return secure_frame_common_1.getStyleInfo(this.dummyElementRef.current);
    }
    generateUrl() {
        const urlFrameId = this.frameId;
        const frameURL = new URL('frame', this.state.secureFrameUrl);
        frameURL.searchParams.set('n', urlFrameId);
        frameURL.searchParams.set('origin', window.location.origin);
        frameURL.searchParams.set('element', 'span');
        return frameURL.toString();
    }
    componentDidUpdate() {
        // Also causes style changes to propagate, as long as they come from within react
        if (this.state.frameReady) {
            this.sendIFrameAttributes();
        }
    }
    // Generate some attributes for sending to the iframe via RPC.
    generateIframeAttributes() {
        const id = this.frameId;
        // initialize the attributes with the only required property
        const attrs = { id };
        // Build the style for the iframe
        const style = this.generateElementStyle();
        if (!style) {
            console.error('Attempted to build style for element but it wasnt populated yet');
        }
        else {
            delete style.childStyle.style.display;
            attrs.style = JSON.stringify(style.childStyle);
        }
        if (this.props.token) {
            attrs.token = this.props.token;
        }
        return attrs;
    }
    // Give the iframe all the information it needs to exist when it wakes up
    async sendIFrameAttributes() {
        const frameAttributes = this.generateIframeAttributes();
        const message = this.messageCreator.createMessageToFrame('Attributes', frameAttributes);
        if (!this.frameRef.current || !this.frameRef.current.contentWindow) {
            console.error('Frame not initialized for message sending');
            return;
        }
        await this.messageCreator.sendMessageToFrameWithReply(this.frameRef.current.contentWindow, message);
        return;
    }
    frameNotificationCallback(notification) {
        if (notification.frameNonce !== this.frameId) {
            console.debug('Received notification intended for different listener, discarding');
            return;
        }
        switch (notification.command) {
            case 'NotifyOnStart':
                this.setState({ frameReady: true });
                void this.sendIFrameAttributes();
                break;
        }
    }
    renderFrame() {
        if (!this.state.frameStyleInfo) {
            return null;
        }
        const { height } = this.state.frameStyleInfo;
        const iframeStyle = {
            display: 'inline',
            height: height,
        };
        const frameUrl = this.generateUrl();
        return react_1.default.createElement("iframe", { ref: this.frameRef, src: frameUrl, style: iframeStyle, frameBorder: 0, key: frameUrl });
    }
    render() {
        const otherProps = __rest(this.props, []);
        return (react_1.default.createElement("span", Object.assign({}, otherProps, { className: `secure-span-container-${this.frameId} secure-span-container-${this.props.name}`, ref: this.dummyElementRef }), this.renderFrame()));
    }
}
exports.SecureSpan = SecureSpan;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJlU3Bhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlY3VyZVNwYW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQVdzQztBQUN0QywrQ0FBbUU7QUFlbkUsTUFBYSxVQUFXLFNBQVEsaUJBQTJDO0lBY3pFLFlBQVksS0FBc0I7UUFDaEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyx5Q0FBbUIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLDBDQUFvQixDQUFDLENBQUM7UUFDckQsY0FBYyxDQUFDLFFBQVEsR0FBRyx5Q0FBbUIsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUkseUNBQW1CLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzlHLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCwyRkFBMkY7WUFDM0YsY0FBYyxFQUFFLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDekMsY0FBYyxFQUFFLElBQUk7WUFDcEIsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQztJQUNKLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDN0MsMkNBQXFCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7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QyxlQUFlLEtBRXhCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDZCxDQUNSLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFoSkQsZ0NBZ0pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgX19TRUNVUkVfRlJBTUVfVVJMX18sXG4gIGFkZFJlYWN0RXZlbnRMaXN0ZW5lcixcbiAgQXR0cmlidXRlc01lc3NhZ2UsXG4gIC8vIGNhbWVsQ2FzZU9iamVjdCxcbiAgRnJhbWVNZXNzYWdlQ3JlYXRvcixcbiAgZ2VuZXJhdGVTZWN1cmVOb25jZSxcbiAgZ2V0U3R5bGVJbmZvLFxuICBSZWFkRWxlbWVudFN0eWxlLFxuICBzZWN1cmVGcmFtZVBhdGhuYW1lLFxuICBVbmtub3duRnJhbWVOb3RpZmljYXRpb24sXG59IGZyb20gJ0BsdW5hc2VjL3NlY3VyZS1mcmFtZS1jb21tb24nO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgQ1NTUHJvcGVydGllcywgUmVmT2JqZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlY3VyZVNwYW5Qcm9wcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudFByb3BzV2l0aG91dFJlZjwnc3Bhbic+IHtcbiAgdG9rZW4/OiBzdHJpbmc7XG4gIHNlY3VyZUZyYW1lVXJsPzogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGNsYXNzTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlY3VyZVNwYW5TdGF0ZSB7XG4gIHNlY3VyZUZyYW1lVXJsOiBzdHJpbmc7XG4gIGZyYW1lU3R5bGVJbmZvOiBSZWFkRWxlbWVudFN0eWxlIHwgbnVsbDtcbiAgZnJhbWVSZWFkeTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNlY3VyZVNwYW4gZXh0ZW5kcyBDb21wb25lbnQ8U2VjdXJlU3BhblByb3BzLCBTZWN1cmVTcGFuU3RhdGU+IHtcbiAgcmVhZG9ubHkgZnJhbWVSZWYhOiBSZWZPYmplY3Q8SFRNTElGcmFtZUVsZW1lbnQ+O1xuICByZWFkb25seSBkdW1teUVsZW1lbnRSZWYhOiBSZWZPYmplY3Q8SFRNTFNwYW5FbGVtZW50PjtcbiAgcmVhZG9ubHkgbWVzc2FnZUNyZWF0b3I6IEZyYW1lTWVzc2FnZUNyZWF0b3I7XG5cbiAgLy8gVGhpcyBpcyBjcmVhdGVkIG9uIGNvbXBvbmVudCBtb3VudGVkIHRvIGVuYWJsZSBzZXJ2ZXItc2lkZSByZW5kZXJpbmdcbiAgcHJpdmF0ZSBhYm9ydENvbnRyb2xsZXIhOiBBYm9ydENvbnRyb2xsZXI7XG4gIC8qKlxuICAgKiBUaGUgZnJhbWVJZCBpcyBhIHVuaXF1ZSB2YWx1ZSB0aGF0IGlzIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIGlmcmFtZSBpbnN0YW5jZS5cbiAgICovXG4gIHJlYWRvbmx5IGZyYW1lSWQhOiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgc3RhdGUhOiBTZWN1cmVTcGFuU3RhdGU7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFNlY3VyZVNwYW5Qcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmZyYW1lSWQgPSBnZW5lcmF0ZVNlY3VyZU5vbmNlKCk7XG4gICAgdGhpcy5mcmFtZVJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICAgIHRoaXMuZHVtbXlFbGVtZW50UmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgY29uc3Qgc2VjdXJlRnJhbWVVUkwgPSBuZXcgVVJMKF9fU0VDVVJFX0ZSQU1FX1VSTF9fKTtcbiAgICBzZWN1cmVGcmFtZVVSTC5wYXRobmFtZSA9IHNlY3VyZUZyYW1lUGF0aG5hbWU7XG4gICAgdGhpcy5tZXNzYWdlQ3JlYXRvciA9IG5ldyBGcmFtZU1lc3NhZ2VDcmVhdG9yKChub3RpZmljYXRpb24pID0+IHRoaXMuZnJhbWVOb3RpZmljYXRpb25DYWxsYmFjayhub3RpZmljYXRpb24pKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gVE9ETzogRW5zdXJlIHRoYXQgdGhlIHNlY3VyaXR5IHRocmVhdCBtb2RlbCBhcm91bmQgYW4gYXR0YWNrZXIgc2V0dGluZyB0aGlzIFVSTCBpcyBzYW5lLlxuICAgICAgc2VjdXJlRnJhbWVVcmw6IHNlY3VyZUZyYW1lVVJMLnRvU3RyaW5nKCksXG4gICAgICBmcmFtZVN0eWxlSW5mbzogbnVsbCxcbiAgICAgIGZyYW1lUmVhZHk6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBhZGRSZWFjdEV2ZW50TGlzdGVuZXIod2luZG93LCB0aGlzLmFib3J0Q29udHJvbGxlciwgKG1lc3NhZ2UpID0+IHRoaXMubWVzc2FnZUNyZWF0b3IucG9zdFJlY2VpdmVkKG1lc3NhZ2UpKTtcbiAgICAvLyBwcmVzdW1hYmx5IGdlbmVyYXRlRWxlbWVudFN0eWxlIGlzIGNhbGxlZCBoZXJlIGluIG9yZGVyIHRvIHJlYWQgdGhlIENTUyBhZnRlciB0aGUgY29tcG9uZW50IG1vdW50c1xuICAgIC8vIHdpdGggYSBzaWRlIGVmZmVjdCBvZiBjYXVzaW5nIGl0IHRvIHJlLXJlbmRlciBhZ2FpbiBvbmNlIGl0IGtub3cncyBpdHMgb3duIHN0eWxlc1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZnJhbWVTdHlsZUluZm86IHRoaXMuZ2VuZXJhdGVFbGVtZW50U3R5bGUoKSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG4gIH1cblxuICBnZW5lcmF0ZUVsZW1lbnRTdHlsZSgpIHtcbiAgICBpZiAoIXRoaXMuZHVtbXlFbGVtZW50UmVmLmN1cnJlbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGxvY2F0ZSBgaW5wdXRSZWZgIGluIFNlY3VyZUVsZW1lbnQgY29tcG9uZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiBnZXRTdHlsZUluZm8odGhpcy5kdW1teUVsZW1lbnRSZWYuY3VycmVudCk7XG4gIH1cblxuICBnZW5lcmF0ZVVybCgpIHtcbiAgICBjb25zdCB1cmxGcmFtZUlkID0gdGhpcy5mcmFtZUlkO1xuICAgIGNvbnN0IGZyYW1lVVJMID0gbmV3IFVSTCgnZnJhbWUnLCB0aGlzLnN0YXRlLnNlY3VyZUZyYW1lVXJsKTtcbiAgICBmcmFtZVVSTC5zZWFyY2hQYXJhbXMuc2V0KCduJywgdXJsRnJhbWVJZCk7XG4gICAgZnJhbWVVUkwuc2VhcmNoUGFyYW1zLnNldCgnb3JpZ2luJywgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gICAgZnJhbWVVUkwuc2VhcmNoUGFyYW1zLnNldCgnZWxlbWVudCcsICdzcGFuJyk7XG4gICAgcmV0dXJuIGZyYW1lVVJMLnRvU3RyaW5nKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgLy8gQWxzbyBjYXVzZXMgc3R5bGUgY2hhbmdlcyB0byBwcm9wYWdhdGUsIGFzIGxvbmcgYXMgdGhleSBjb21lIGZyb20gd2l0aGluIHJlYWN0XG4gICAgaWYgKHRoaXMuc3RhdGUuZnJhbWVSZWFkeSkge1xuICAgICAgdGhpcy5zZW5kSUZyYW1lQXR0cmlidXRlcygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHNvbWUgYXR0cmlidXRlcyBmb3Igc2VuZGluZyB0byB0aGUgaWZyYW1lIHZpYSBSUEMuXG4gIGdlbmVyYXRlSWZyYW1lQXR0cmlidXRlcygpOiBBdHRyaWJ1dGVzTWVzc2FnZSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLmZyYW1lSWQ7XG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgYXR0cmlidXRlcyB3aXRoIHRoZSBvbmx5IHJlcXVpcmVkIHByb3BlcnR5XG4gICAgY29uc3QgYXR0cnM6IEF0dHJpYnV0ZXNNZXNzYWdlID0geyBpZCB9O1xuXG4gICAgLy8gQnVpbGQgdGhlIHN0eWxlIGZvciB0aGUgaWZyYW1lXG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdlbmVyYXRlRWxlbWVudFN0eWxlKCk7XG4gICAgaWYgKCFzdHlsZSkge1xuICAgICAgY29uc29sZS5lcnJvcignQXR0ZW1wdGVkIHRvIGJ1aWxkIHN0eWxlIGZvciBlbGVtZW50IGJ1dCBpdCB3YXNudCBwb3B1bGF0ZWQgeWV0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBzdHlsZS5jaGlsZFN0eWxlLnN0eWxlLmRpc3BsYXk7XG4gICAgICBhdHRycy5zdHlsZSA9IEpTT04uc3RyaW5naWZ5KHN0eWxlLmNoaWxkU3R5bGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnRva2VuKSB7XG4gICAgICBhdHRycy50b2tlbiA9IHRoaXMucHJvcHMudG9rZW47XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG5cbiAgLy8gR2l2ZSB0aGUgaWZyYW1lIGFsbCB0aGUgaW5mb3JtYXRpb24gaXQgbmVlZHMgdG8gZXhpc3Qgd2hlbiBpdCB3YWtlcyB1cFxuICBhc3luYyBzZW5kSUZyYW1lQXR0cmlidXRlcygpIHtcbiAgICBjb25zdCBmcmFtZUF0dHJpYnV0ZXMgPSB0aGlzLmdlbmVyYXRlSWZyYW1lQXR0cmlidXRlcygpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VDcmVhdG9yLmNyZWF0ZU1lc3NhZ2VUb0ZyYW1lKCdBdHRyaWJ1dGVzJywgZnJhbWVBdHRyaWJ1dGVzKTtcbiAgICBpZiAoIXRoaXMuZnJhbWVSZWYuY3VycmVudCB8fCAhdGhpcy5mcmFtZVJlZi5jdXJyZW50LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZyYW1lIG5vdCBpbml0aWFsaXplZCBmb3IgbWVzc2FnZSBzZW5kaW5nJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IHRoaXMubWVzc2FnZUNyZWF0b3Iuc2VuZE1lc3NhZ2VUb0ZyYW1lV2l0aFJlcGx5KHRoaXMuZnJhbWVSZWYuY3VycmVudC5jb250ZW50V2luZG93LCBtZXNzYWdlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBmcmFtZU5vdGlmaWNhdGlvbkNhbGxiYWNrKG5vdGlmaWNhdGlvbjogVW5rbm93bkZyYW1lTm90aWZpY2F0aW9uKSB7XG4gICAgaWYgKG5vdGlmaWNhdGlvbi5mcmFtZU5vbmNlICE9PSB0aGlzLmZyYW1lSWQpIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoJ1JlY2VpdmVkIG5vdGlmaWNhdGlvbiBpbnRlbmRlZCBmb3IgZGlmZmVyZW50IGxpc3RlbmVyLCBkaXNjYXJkaW5nJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgJ05vdGlmeU9uU3RhcnQnOlxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZnJhbWVSZWFkeTogdHJ1ZSB9KTtcbiAgICAgICAgdm9pZCB0aGlzLnNlbmRJRnJhbWVBdHRyaWJ1dGVzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckZyYW1lKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5mcmFtZVN0eWxlSW5mbykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgeyBoZWlnaHQgfSA9IHRoaXMuc3RhdGUuZnJhbWVTdHlsZUluZm87XG5cbiAgICBjb25zdCBpZnJhbWVTdHlsZTogQ1NTUHJvcGVydGllcyA9IHtcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUnLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcblxuICAgIGNvbnN0IGZyYW1lVXJsID0gdGhpcy5nZW5lcmF0ZVVybCgpO1xuXG4gICAgcmV0dXJuIDxpZnJhbWUgcmVmPXt0aGlzLmZyYW1lUmVmfSBzcmM9e2ZyYW1lVXJsfSBzdHlsZT17aWZyYW1lU3R5bGV9IGZyYW1lQm9yZGVyPXswfSBrZXk9e2ZyYW1lVXJsfSAvPjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IC4uLm90aGVyUHJvcHMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgey4uLm90aGVyUHJvcHN9XG4gICAgICAgIGNsYXNzTmFtZT17YHNlY3VyZS1zcGFuLWNvbnRhaW5lci0ke3RoaXMuZnJhbWVJZH0gc2VjdXJlLXNwYW4tY29udGFpbmVyLSR7dGhpcy5wcm9wcy5uYW1lfWB9XG4gICAgICAgIHJlZj17dGhpcy5kdW1teUVsZW1lbnRSZWZ9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlckZyYW1lKCl9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxufVxuIl19