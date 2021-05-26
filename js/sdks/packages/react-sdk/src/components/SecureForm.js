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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureForm = void 0;
const secure_frame_common_1 = require("@lunasec/secure-frame-common");
const frame_message_creator_1 = require("@lunasec/secure-frame-common/build/main/rpc/frame-message-creator");
const listener_1 = require("@lunasec/secure-frame-common/build/main/rpc/listener");
const react_1 = __importStar(require("react"));
const set_native_value_1 = __importDefault(require("../set-native-value"));
const SecureFormContext_1 = require("./SecureFormContext");
const element_event_triggers_1 = require("@lunasec/secure-frame-common/build/main/utils/element-event-triggers");
class SecureForm extends react_1.Component {
    constructor(props) {
        super(props);
        this.childInputs = {};
        this.messageCreator = new frame_message_creator_1.FrameMessageCreator((notification) => this.frameNotificationCallback(notification));
    }
    async componentDidMount() {
        this.abortController = new AbortController();
        // Pushes events received back up.
        listener_1.addReactEventListener(window, this.abortController, (message) => this.messageCreator.postReceived(message));
        await this.authenticateSession();
        // TODO (cthompson) here in the code we have verification that the secure form should be able to tokenize data
    }
    componentWillUnmount() {
        this.abortController.abort();
    }
    async authenticateSession() {
        const secureFrameVerifySessionURL = new URL(secure_frame_common_1.__SECURE_FRAME_URL__);
        secureFrameVerifySessionURL.pathname = '/session/verify';
        const secureFrameEnsureSessionURL = new URL(secure_frame_common_1.__SECURE_FRAME_URL__);
        secureFrameEnsureSessionURL.pathname = '/session/ensure';
        const response = await fetch(secureFrameEnsureSessionURL.toString(), {
            credentials: 'include',
            mode: 'cors',
        });
        if (response.status === 200) {
            console.debug('secure frame session is verified');
            return;
        }
        // dispatch to the secure frame session verifier to ensure that a secure frame session exists
        await fetch(secureFrameVerifySessionURL.toString(), {
            credentials: 'include',
            mode: 'cors',
        });
        const resp = await fetch(secureFrameEnsureSessionURL.toString());
        if (resp.status !== 200) {
            // TODO: Throw or escalate this error in a better way.
            console.error('unable to create secure frame session');
            return;
        }
        return;
    }
    // Blur happens after the element loses focus
    blur(notification) {
        const child = this.childInputs[notification.frameNonce];
        const input = child.inputRef;
        const inputElement = input.current;
        if (!inputElement) {
            throw new Error('Missing element to trigger notification for in secure frame');
        }
        const currentlyFocusedElement = document.activeElement;
        // In order to trigger a blur event, we must first focus the element.
        element_event_triggers_1.triggerFocus(inputElement);
        // Only then will the blur be triggered.
        element_event_triggers_1.triggerBlur(inputElement);
        if (currentlyFocusedElement) {
            element_event_triggers_1.triggerFocus(currentlyFocusedElement);
        }
    }
    // Give the iframe all the information it needs to exist when it wakes up
    async iframeStartup(notification) {
        const input = this.childInputs[notification.frameNonce];
        const frameAttributes = input.generateIframeAttributes();
        const message = this.messageCreator.createMessageToFrame('Attributes', frameAttributes);
        if (!input.frameRef.current || !input.frameRef.current.contentWindow) {
            console.error('Frame not initialized for message sending');
            return;
        }
        await this.messageCreator.sendMessageToFrameWithReply(input.frameRef.current.contentWindow, message);
        return;
    }
    frameNotificationCallback(notification) {
        if (!this.childInputs[notification.frameNonce]) {
            console.debug('Received notification intended for different listener, discarding');
            return;
        }
        switch (notification.command) {
            case 'NotifyOnBlur':
                this.blur(notification);
                break;
            case 'NotifyOnStart':
                void this.iframeStartup(notification);
                break;
        }
    }
    async onStyleChange(component) {
        component.generateElementStyle();
        const { id, style } = component.generateIframeAttributes();
        const message = this.messageCreator.createMessageToFrame('Attributes', { id, style });
        if (!component.frameRef.current || !component.frameRef.current.contentWindow) {
            return console.error('Style watcher updated for component that no longer has iframe ');
        }
        await this.messageCreator.sendMessageToFrameWithReply(component.frameRef.current.contentWindow, message);
        return;
    }
    watchStyle(component) {
        const observer = new MutationObserver(() => this.onStyleChange(component));
        if (!component.inputRef.current) {
            return console.error('Attempted to register style watcher on component not yet mounted');
        }
        observer.observe(component.inputRef.current, {
            attributeFilter: ['style'],
        });
    }
    async onSubmit(e) {
        e.preventDefault();
        const awaitedPromises = [];
        Object.keys(this.childInputs).forEach((key) => {
            const child = this.childInputs[key];
            const ref = child.frameRef;
            if (!ref.current || !ref.current.contentWindow) {
                console.error('Invalid frame detected', key, ref);
                return;
            }
            awaitedPromises.push(this.triggerTokenCommit(ref.current.contentWindow, key));
        });
        const responses = await Promise.all(awaitedPromises);
        responses.forEach((data) => {
            if (data === null) {
                return;
            }
            const { nonce, response } = data;
            if (!response.data.success) {
                console.error('error while tokenizing data:', response.data.error);
                return;
            }
            const childInput = this.childInputs[nonce];
            // Set the value back to the input element so that everything behaves like a normal html form,
            // and then force the react events to fire
            const inputElement = childInput.inputRef.current;
            if (inputElement !== null) {
                // TODO: Throw an error here or something instead of "defaulting"
                set_native_value_1.default(inputElement, response.data.token || '');
                const e = new Event('input', { bubbles: true });
                inputElement.dispatchEvent(e);
            }
        });
        // This timeout is an attempt to give the above events time to propagate and any user code time to execute,
        // like it would have in a normal form where the user pressed submit
        await new Promise((resolve) => {
            setTimeout(resolve, 5);
        });
        this.props.onSubmit(e);
        return;
    }
    async triggerTokenCommit(frameContext, nonce) {
        const message = this.messageCreator.createMessageToFrame('CommitToken', {});
        if (message === null) {
            console.error('Unable to create CommitToken message');
            return null;
        }
        const response = await this.messageCreator.sendMessageToFrameWithReply(frameContext, message);
        if (response === null) {
            console.error('Unable to retrieve reply for frame');
            return null;
        }
        return { nonce, response };
    }
    render() {
        return (react_1.default.createElement(SecureFormContext_1.SecureFormContext.Provider, { value: {
                addComponent: (component) => {
                    this.childInputs[component.frameId] = component;
                    // Assume that this will be destroyed or otherwise stop sending messages when the component unmounts
                    this.watchStyle(component);
                },
                removeComponent: (frameId) => {
                    if (this.childInputs[frameId]) {
                        delete this.childInputs[frameId];
                    }
                },
            } },
            react_1.default.createElement("form", Object.assign({}, this.props, { onSubmit: (e) => this.onSubmit(e) }), this.props.children)));
    }
}
exports.SecureForm = SecureForm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJlRm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlY3VyZUZvcm0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRUFBb0U7QUFDcEUsNkdBQXdHO0FBQ3hHLG1GQUE2RjtBQVE3RiwrQ0FBeUM7QUFFekMsMkVBQWlEO0FBRWpELDJEQUF3RDtBQUV4RCxpSEFHOEU7QUFNOUUsTUFBYSxVQUFXLFNBQVEsaUJBQTBCO0lBU3hELFlBQVksS0FBc0I7UUFDaEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLDJDQUFtQixDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGlCQUFpQjtRQUNyQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFFN0Msa0NBQWtDO1FBQ2xDLGdDQUFxQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTVHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFakMsOEdBQThHO0lBQ2hILENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSyxDQUFDLG1CQUFtQjtRQUN2QixNQUFNLDJCQUEyQixHQUFHLElBQUksR0FBRyxDQUFDLDBDQUFvQixDQUFDLENBQUM7UUFDbEUsMkJBQTJCLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO1FB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LDJCQUEyQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU5RixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxDQUNMLDhCQUFDLHFDQUFpQixDQUFDLFFBQVEsSUFDekIsS0FBSyxFQUFFO2dCQUNMLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7b0JBQ2hELG9HQUFvRztvQkFDcEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztnQkFDRCxlQUFlLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDM0IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUM3QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2xDO2dCQUNILENBQUM7YUFDRjtZQUVELHdEQUFVLElBQUksQ0FBQyxLQUFLLElBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDZixDQUNvQixDQUM5QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBOU9ELGdDQThPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9fU0VDVVJFX0ZSQU1FX1VSTF9fIH0gZnJvbSAnQGx1bmFzZWMvc2VjdXJlLWZyYW1lLWNvbW1vbic7XG5pbXBvcnQgeyBGcmFtZU1lc3NhZ2VDcmVhdG9yIH0gZnJvbSAnQGx1bmFzZWMvc2VjdXJlLWZyYW1lLWNvbW1vbi9idWlsZC9tYWluL3JwYy9mcmFtZS1tZXNzYWdlLWNyZWF0b3InO1xuaW1wb3J0IHsgYWRkUmVhY3RFdmVudExpc3RlbmVyIH0gZnJvbSAnQGx1bmFzZWMvc2VjdXJlLWZyYW1lLWNvbW1vbi9idWlsZC9tYWluL3JwYy9saXN0ZW5lcic7XG5pbXBvcnQge1xuICBGcmFtZU1lc3NhZ2UsXG4gIEZyYW1lTm90aWZpY2F0aW9uLFxuICBJbmJvdW5kRnJhbWVNZXNzYWdlTWFwLFxuICBJbmJvdW5kRnJhbWVOb3RpZmljYXRpb25NYXAsXG4gIFVua25vd25GcmFtZU5vdGlmaWNhdGlvbixcbn0gZnJvbSAnQGx1bmFzZWMvc2VjdXJlLWZyYW1lLWNvbW1vbi9idWlsZC9tYWluL3JwYy90eXBlcyc7XG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc2V0TmF0aXZlVmFsdWUgZnJvbSAnLi4vc2V0LW5hdGl2ZS12YWx1ZSc7XG5cbmltcG9ydCB7IFNlY3VyZUZvcm1Db250ZXh0IH0gZnJvbSAnLi9TZWN1cmVGb3JtQ29udGV4dCc7XG5pbXBvcnQgeyBTZWN1cmVJbnB1dCB9IGZyb20gJy4vU2VjdXJlSW5wdXQnO1xuaW1wb3J0IHtcbiAgdHJpZ2dlckJsdXIsXG4gIHRyaWdnZXJGb2N1c1xufSBmcm9tICdAbHVuYXNlYy9zZWN1cmUtZnJhbWUtY29tbW9uL2J1aWxkL21haW4vdXRpbHMvZWxlbWVudC1ldmVudC10cmlnZ2Vycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VjdXJlRm9ybVByb3BzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50UHJvcHNXaXRob3V0UmVmPCdmb3JtJz4ge1xuICByZWFkb25seSBvblN1Ym1pdDogKGU6IFJlYWN0LkZvcm1FdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgU2VjdXJlRm9ybSBleHRlbmRzIENvbXBvbmVudDxTZWN1cmVGb3JtUHJvcHM+IHtcbiAgZGVjbGFyZSByZWFkb25seSBjb250ZXh0OiBSZWFjdC5Db250ZXh0VHlwZTx0eXBlb2YgU2VjdXJlRm9ybUNvbnRleHQ+O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZUNyZWF0b3I6IEZyYW1lTWVzc2FnZUNyZWF0b3I7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2hpbGRJbnB1dHM6IFJlY29yZDxzdHJpbmcsIFNlY3VyZUlucHV0PjtcblxuICAvLyBUaGlzIGlzIGNyZWF0ZWQgb24gY29tcG9uZW50IG1vdW50ZWQgdG8gZW5hYmxlIHNlcnZlci1zaWRlIHJlbmRlcmluZ1xuICBwcml2YXRlIGFib3J0Q29udHJvbGxlciE6IEFib3J0Q29udHJvbGxlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogU2VjdXJlRm9ybVByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hpbGRJbnB1dHMgPSB7fTtcbiAgICB0aGlzLm1lc3NhZ2VDcmVhdG9yID0gbmV3IEZyYW1lTWVzc2FnZUNyZWF0b3IoKG5vdGlmaWNhdGlvbikgPT4gdGhpcy5mcmFtZU5vdGlmaWNhdGlvbkNhbGxiYWNrKG5vdGlmaWNhdGlvbikpO1xuICB9XG5cbiAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5hYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICAvLyBQdXNoZXMgZXZlbnRzIHJlY2VpdmVkIGJhY2sgdXAuXG4gICAgYWRkUmVhY3RFdmVudExpc3RlbmVyKHdpbmRvdywgdGhpcy5hYm9ydENvbnRyb2xsZXIsIChtZXNzYWdlKSA9PiB0aGlzLm1lc3NhZ2VDcmVhdG9yLnBvc3RSZWNlaXZlZChtZXNzYWdlKSk7XG5cbiAgICBhd2FpdCB0aGlzLmF1dGhlbnRpY2F0ZVNlc3Npb24oKTtcblxuICAgIC8vIFRPRE8gKGN0aG9tcHNvbikgaGVyZSBpbiB0aGUgY29kZSB3ZSBoYXZlIHZlcmlmaWNhdGlvbiB0aGF0IHRoZSBzZWN1cmUgZm9ybSBzaG91bGQgYmUgYWJsZSB0byB0b2tlbml6ZSBkYXRhXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICB9XG5cbiAgYXN5bmMgYXV0aGVudGljYXRlU2Vzc2lvbigpIHtcbiAgICBjb25zdCBzZWN1cmVGcmFtZVZlcmlmeVNlc3Npb25VUkwgPSBuZXcgVVJMKF9fU0VDVVJFX0ZSQU1FX1VSTF9fKTtcbiAgICBzZWN1cmVGcmFtZVZlcmlmeVNlc3Npb25VUkwucGF0aG5hbWUgPSAnL3Nlc3Npb24vdmVyaWZ5JztcblxuICAgIGNvbnN0IHNlY3VyZUZyYW1lRW5zdXJlU2Vzc2lvblVSTCA9IG5ldyBVUkwoX19TRUNVUkVfRlJBTUVfVVJMX18pO1xuICAgIHNlY3VyZUZyYW1lRW5zdXJlU2Vzc2lvblVSTC5wYXRobmFtZSA9ICcvc2Vzc2lvbi9lbnN1cmUnO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzZWN1cmVGcmFtZUVuc3VyZVNlc3Npb25VUkwudG9TdHJpbmcoKSwge1xuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgY29uc29sZS5kZWJ1Zygnc2VjdXJlIGZyYW1lIHNlc3Npb24gaXMgdmVyaWZpZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBkaXNwYXRjaCB0byB0aGUgc2VjdXJlIGZyYW1lIHNlc3Npb24gdmVyaWZpZXIgdG8gZW5zdXJlIHRoYXQgYSBzZWN1cmUgZnJhbWUgc2Vzc2lvbiBleGlzdHNcbiAgICBhd2FpdCBmZXRjaChzZWN1cmVGcmFtZVZlcmlmeVNlc3Npb25VUkwudG9TdHJpbmcoKSwge1xuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChzZWN1cmVGcmFtZUVuc3VyZVNlc3Npb25VUkwudG9TdHJpbmcoKSk7XG5cbiAgICBpZiAocmVzcC5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgLy8gVE9ETzogVGhyb3cgb3IgZXNjYWxhdGUgdGhpcyBlcnJvciBpbiBhIGJldHRlciB3YXkuXG4gICAgICBjb25zb2xlLmVycm9yKCd1bmFibGUgdG8gY3JlYXRlIHNlY3VyZSBmcmFtZSBzZXNzaW9uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICAvLyBCbHVyIGhhcHBlbnMgYWZ0ZXIgdGhlIGVsZW1lbnQgbG9zZXMgZm9jdXNcbiAgYmx1cihub3RpZmljYXRpb246IEZyYW1lTm90aWZpY2F0aW9uPEluYm91bmRGcmFtZU5vdGlmaWNhdGlvbk1hcCwgJ05vdGlmeU9uQmx1cic+KSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLmNoaWxkSW5wdXRzW25vdGlmaWNhdGlvbi5mcmFtZU5vbmNlXTtcblxuICAgIGNvbnN0IGlucHV0ID0gY2hpbGQuaW5wdXRSZWY7XG5cbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBpbnB1dC5jdXJyZW50O1xuXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBlbGVtZW50IHRvIHRyaWdnZXIgbm90aWZpY2F0aW9uIGZvciBpbiBzZWN1cmUgZnJhbWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50bHlGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICAvLyBJbiBvcmRlciB0byB0cmlnZ2VyIGEgYmx1ciBldmVudCwgd2UgbXVzdCBmaXJzdCBmb2N1cyB0aGUgZWxlbWVudC5cbiAgICB0cmlnZ2VyRm9jdXMoaW5wdXRFbGVtZW50KTtcbiAgICAvLyBPbmx5IHRoZW4gd2lsbCB0aGUgYmx1ciBiZSB0cmlnZ2VyZWQuXG4gICAgdHJpZ2dlckJsdXIoaW5wdXRFbGVtZW50KTtcblxuICAgIGlmIChjdXJyZW50bHlGb2N1c2VkRWxlbWVudCkge1xuICAgICAgdHJpZ2dlckZvY3VzKGN1cnJlbnRseUZvY3VzZWRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvLyBHaXZlIHRoZSBpZnJhbWUgYWxsIHRoZSBpbmZvcm1hdGlvbiBpdCBuZWVkcyB0byBleGlzdCB3aGVuIGl0IHdha2VzIHVwXG4gIGFzeW5jIGlmcmFtZVN0YXJ0dXAobm90aWZpY2F0aW9uOiBGcmFtZU5vdGlmaWNhdGlvbjxJbmJvdW5kRnJhbWVOb3RpZmljYXRpb25NYXAsICdOb3RpZnlPblN0YXJ0Jz4pIHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuY2hpbGRJbnB1dHNbbm90aWZpY2F0aW9uLmZyYW1lTm9uY2VdO1xuICAgIGNvbnN0IGZyYW1lQXR0cmlidXRlcyA9IGlucHV0LmdlbmVyYXRlSWZyYW1lQXR0cmlidXRlcygpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VDcmVhdG9yLmNyZWF0ZU1lc3NhZ2VUb0ZyYW1lKCdBdHRyaWJ1dGVzJywgZnJhbWVBdHRyaWJ1dGVzKTtcbiAgICBpZiAoIWlucHV0LmZyYW1lUmVmLmN1cnJlbnQgfHwgIWlucHV0LmZyYW1lUmVmLmN1cnJlbnQuY29udGVudFdpbmRvdykge1xuICAgICAgY29uc29sZS5lcnJvcignRnJhbWUgbm90IGluaXRpYWxpemVkIGZvciBtZXNzYWdlIHNlbmRpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5tZXNzYWdlQ3JlYXRvci5zZW5kTWVzc2FnZVRvRnJhbWVXaXRoUmVwbHkoaW5wdXQuZnJhbWVSZWYuY3VycmVudC5jb250ZW50V2luZG93LCBtZXNzYWdlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBmcmFtZU5vdGlmaWNhdGlvbkNhbGxiYWNrKG5vdGlmaWNhdGlvbjogVW5rbm93bkZyYW1lTm90aWZpY2F0aW9uKSB7XG4gICAgaWYgKCF0aGlzLmNoaWxkSW5wdXRzW25vdGlmaWNhdGlvbi5mcmFtZU5vbmNlXSkge1xuICAgICAgY29uc29sZS5kZWJ1ZygnUmVjZWl2ZWQgbm90aWZpY2F0aW9uIGludGVuZGVkIGZvciBkaWZmZXJlbnQgbGlzdGVuZXIsIGRpc2NhcmRpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoIChub3RpZmljYXRpb24uY29tbWFuZCkge1xuICAgICAgY2FzZSAnTm90aWZ5T25CbHVyJzpcbiAgICAgICAgdGhpcy5ibHVyKG5vdGlmaWNhdGlvbiBhcyBGcmFtZU5vdGlmaWNhdGlvbjxJbmJvdW5kRnJhbWVOb3RpZmljYXRpb25NYXAsICdOb3RpZnlPbkJsdXInPik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTm90aWZ5T25TdGFydCc6XG4gICAgICAgIHZvaWQgdGhpcy5pZnJhbWVTdGFydHVwKG5vdGlmaWNhdGlvbiBhcyBGcmFtZU5vdGlmaWNhdGlvbjxJbmJvdW5kRnJhbWVOb3RpZmljYXRpb25NYXAsICdOb3RpZnlPblN0YXJ0Jz4pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBhc3luYyBvblN0eWxlQ2hhbmdlKGNvbXBvbmVudDogU2VjdXJlSW5wdXQpIHtcbiAgICBjb21wb25lbnQuZ2VuZXJhdGVFbGVtZW50U3R5bGUoKTtcbiAgICBjb25zdCB7IGlkLCBzdHlsZSB9ID0gY29tcG9uZW50LmdlbmVyYXRlSWZyYW1lQXR0cmlidXRlcygpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VDcmVhdG9yLmNyZWF0ZU1lc3NhZ2VUb0ZyYW1lKCdBdHRyaWJ1dGVzJywgeyBpZCwgc3R5bGUgfSk7XG4gICAgaWYgKCFjb21wb25lbnQuZnJhbWVSZWYuY3VycmVudCB8fCAhY29tcG9uZW50LmZyYW1lUmVmLmN1cnJlbnQuY29udGVudFdpbmRvdykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ1N0eWxlIHdhdGNoZXIgdXBkYXRlZCBmb3IgY29tcG9uZW50IHRoYXQgbm8gbG9uZ2VyIGhhcyBpZnJhbWUgJyk7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMubWVzc2FnZUNyZWF0b3Iuc2VuZE1lc3NhZ2VUb0ZyYW1lV2l0aFJlcGx5KGNvbXBvbmVudC5mcmFtZVJlZi5jdXJyZW50LmNvbnRlbnRXaW5kb3csIG1lc3NhZ2UpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHdhdGNoU3R5bGUoY29tcG9uZW50OiBTZWN1cmVJbnB1dCkge1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdGhpcy5vblN0eWxlQ2hhbmdlKGNvbXBvbmVudCkpO1xuICAgIGlmICghY29tcG9uZW50LmlucHV0UmVmLmN1cnJlbnQpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKCdBdHRlbXB0ZWQgdG8gcmVnaXN0ZXIgc3R5bGUgd2F0Y2hlciBvbiBjb21wb25lbnQgbm90IHlldCBtb3VudGVkJyk7XG4gICAgfVxuICAgIG9ic2VydmVyLm9ic2VydmUoY29tcG9uZW50LmlucHV0UmVmLmN1cnJlbnQsIHtcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZSddLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgb25TdWJtaXQoZTogUmVhY3QuRm9ybUV2ZW50PEhUTUxGb3JtRWxlbWVudD4pIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBhd2FpdGVkUHJvbWlzZXM6IFByb21pc2U8e1xuICAgICAgcmVhZG9ubHkgbm9uY2U6IHN0cmluZztcbiAgICAgIHJlYWRvbmx5IHJlc3BvbnNlOiBGcmFtZU1lc3NhZ2U8SW5ib3VuZEZyYW1lTWVzc2FnZU1hcCwgJ1JlY2VpdmVDb21taXR0ZWRUb2tlbic+O1xuICAgIH0gfCBudWxsPltdID0gW107XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmNoaWxkSW5wdXRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jaGlsZElucHV0c1trZXldO1xuICAgICAgY29uc3QgcmVmID0gY2hpbGQuZnJhbWVSZWY7XG5cbiAgICAgIGlmICghcmVmLmN1cnJlbnQgfHwgIXJlZi5jdXJyZW50LmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW52YWxpZCBmcmFtZSBkZXRlY3RlZCcsIGtleSwgcmVmKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdGVkUHJvbWlzZXMucHVzaCh0aGlzLnRyaWdnZXJUb2tlbkNvbW1pdChyZWYuY3VycmVudC5jb250ZW50V2luZG93LCBrZXkpKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlcyA9IGF3YWl0IFByb21pc2UuYWxsKGF3YWl0ZWRQcm9taXNlcyk7XG5cbiAgICByZXNwb25zZXMuZm9yRWFjaCgoZGF0YSkgPT4ge1xuICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IG5vbmNlLCByZXNwb25zZSB9ID0gZGF0YTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignZXJyb3Igd2hpbGUgdG9rZW5pemluZyBkYXRhOicsIHJlc3BvbnNlLmRhdGEuZXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkSW5wdXQgPSB0aGlzLmNoaWxkSW5wdXRzW25vbmNlXTtcblxuICAgICAgLy8gU2V0IHRoZSB2YWx1ZSBiYWNrIHRvIHRoZSBpbnB1dCBlbGVtZW50IHNvIHRoYXQgZXZlcnl0aGluZyBiZWhhdmVzIGxpa2UgYSBub3JtYWwgaHRtbCBmb3JtLFxuICAgICAgLy8gYW5kIHRoZW4gZm9yY2UgdGhlIHJlYWN0IGV2ZW50cyB0byBmaXJlXG4gICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBjaGlsZElucHV0LmlucHV0UmVmLmN1cnJlbnQ7XG5cbiAgICAgIGlmIChpbnB1dEVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgLy8gVE9ETzogVGhyb3cgYW4gZXJyb3IgaGVyZSBvciBzb21ldGhpbmcgaW5zdGVhZCBvZiBcImRlZmF1bHRpbmdcIlxuICAgICAgICBzZXROYXRpdmVWYWx1ZShpbnB1dEVsZW1lbnQsIHJlc3BvbnNlLmRhdGEudG9rZW4gfHwgJycpO1xuICAgICAgICBjb25zdCBlID0gbmV3IEV2ZW50KCdpbnB1dCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBUaGlzIHRpbWVvdXQgaXMgYW4gYXR0ZW1wdCB0byBnaXZlIHRoZSBhYm92ZSBldmVudHMgdGltZSB0byBwcm9wYWdhdGUgYW5kIGFueSB1c2VyIGNvZGUgdGltZSB0byBleGVjdXRlLFxuICAgIC8vIGxpa2UgaXQgd291bGQgaGF2ZSBpbiBhIG5vcm1hbCBmb3JtIHdoZXJlIHRoZSB1c2VyIHByZXNzZWQgc3VibWl0XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgNSk7XG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5vblN1Ym1pdChlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3luYyB0cmlnZ2VyVG9rZW5Db21taXQoXG4gICAgZnJhbWVDb250ZXh0OiBXaW5kb3csXG4gICAgbm9uY2U6IHN0cmluZ1xuICApOiBQcm9taXNlPHtcbiAgICByZWFkb25seSBub25jZTogc3RyaW5nO1xuICAgIHJlYWRvbmx5IHJlc3BvbnNlOiBGcmFtZU1lc3NhZ2U8SW5ib3VuZEZyYW1lTWVzc2FnZU1hcCwgJ1JlY2VpdmVDb21taXR0ZWRUb2tlbic+O1xuICB9IHwgbnVsbD4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VDcmVhdG9yLmNyZWF0ZU1lc3NhZ2VUb0ZyYW1lKCdDb21taXRUb2tlbicsIHt9KTtcblxuICAgIGlmIChtZXNzYWdlID09PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gY3JlYXRlIENvbW1pdFRva2VuIG1lc3NhZ2UnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5tZXNzYWdlQ3JlYXRvci5zZW5kTWVzc2FnZVRvRnJhbWVXaXRoUmVwbHkoZnJhbWVDb250ZXh0LCBtZXNzYWdlKTtcblxuICAgIGlmIChyZXNwb25zZSA9PT0gbnVsbCkge1xuICAgICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIHJldHJpZXZlIHJlcGx5IGZvciBmcmFtZScpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbm9uY2UsIHJlc3BvbnNlIH07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTZWN1cmVGb3JtQ29udGV4dC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIGFkZENvbXBvbmVudDogKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGlsZElucHV0c1tjb21wb25lbnQuZnJhbWVJZF0gPSBjb21wb25lbnQ7XG4gICAgICAgICAgICAvLyBBc3N1bWUgdGhhdCB0aGlzIHdpbGwgYmUgZGVzdHJveWVkIG9yIG90aGVyd2lzZSBzdG9wIHNlbmRpbmcgbWVzc2FnZXMgd2hlbiB0aGUgY29tcG9uZW50IHVubW91bnRzXG4gICAgICAgICAgICB0aGlzLndhdGNoU3R5bGUoY29tcG9uZW50KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZUNvbXBvbmVudDogKGZyYW1lSWQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkSW5wdXRzW2ZyYW1lSWRdKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNoaWxkSW5wdXRzW2ZyYW1lSWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxmb3JtIHsuLi50aGlzLnByb3BzfSBvblN1Ym1pdD17KGUpID0+IHRoaXMub25TdWJtaXQoZSl9PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L1NlY3VyZUZvcm1Db250ZXh0LlByb3ZpZGVyPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==