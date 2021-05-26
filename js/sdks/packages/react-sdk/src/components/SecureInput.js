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
exports.SecureInput = exports.supportedElements = exports.supportedInputTypes = void 0;
const secure_frame_common_1 = require("@lunasec/secure-frame-common");
const read_1 = require("@lunasec/secure-frame-common/build/main/style-patcher/read");
const random_1 = require("@lunasec/secure-frame-common/build/main/utils/random");
const to_camel_case_1 = require("@lunasec/secure-frame-common/build/main/utils/to-camel-case");
const react_1 = __importStar(require("react"));
const SecureFormContext_1 = require("./SecureFormContext");
exports.supportedInputTypes = ['text', 'password', 'email'];
exports.supportedElements = ['input', 'textarea'];
class SecureInput extends react_1.Component {
    constructor(props) {
        super(props);
        this.frameId = random_1.generateSecureNonce();
        this.frameRef = react_1.default.createRef();
        this.inputRef = react_1.default.createRef();
        const secureFrameURL = new URL(secure_frame_common_1.__SECURE_FRAME_URL__);
        secureFrameURL.pathname = secure_frame_common_1.secureFramePathname;
        this.state = {
            // TODO: Ensure that the security threat model around an attacker setting this URL is sane.
            secureFrameUrl: secureFrameURL.toString(),
            frameStyleInfo: null,
        };
    }
    componentDidMount() {
        this.context.addComponent(this);
        this.generateElementStyle();
        this.setResizeListener();
    }
    componentWillUnmount() {
        this.context.removeComponent(this.frameId);
    }
    generateElementStyle() {
        if (!this.inputRef.current) {
            throw new Error('Unable to locate `inputRef` in SecureInput component');
        }
        const frameStyleInfo = read_1.getStyleInfo(this.inputRef.current);
        this.setState({
            frameStyleInfo: frameStyleInfo,
        });
    }
    // Generate some attributes for sending to the iframe via RPC.  This is called from SecureForm
    generateIframeAttributes() {
        const id = this.frameId;
        // initialize the attributes with the only required property
        const attrs = { id };
        // Build the style for the iframe
        if (!this.state.frameStyleInfo) {
            console.debug('Attempted to build style for input but it wasnt populated yet. Omitting style from attribute message');
        }
        else {
            attrs.style = JSON.stringify(this.state.frameStyleInfo.childStyle);
        }
        if (this.props.value) {
            attrs.token = this.props.value;
        }
        if (this.props.type) {
            if (!exports.supportedInputTypes.includes(this.props.type)) {
                throw new Error(`SecureInput not set to allowed type.  Permitted types are: ${exports.supportedInputTypes.toString()}`);
            }
            attrs.type = this.props.type;
        }
        return attrs;
    }
    generateUrl() {
        const urlFrameId = this.frameId;
        const frameURL = new URL('frame', this.state.secureFrameUrl);
        frameURL.searchParams.set('n', urlFrameId);
        frameURL.searchParams.set('origin', window.location.origin);
        if (this.props.element && !exports.supportedElements.includes(this.props.element)) {
            throw new Error(`SecureInput not set to allowed element.  Permitted elements are: ${exports.supportedElements.toString()}`);
        }
        // default to input if user didn't set an element type
        frameURL.searchParams.set('element', this.props.element || 'input');
        return frameURL.toString();
    }
    setResizeListener() {
        const observer = new ResizeObserver(() => {
            const hiddenInput = this.inputRef.current;
            const iframe = this.frameRef.current;
            if (!hiddenInput || !iframe || !hiddenInput.offsetHeight) {
                // DOMs not actually ready
                return;
            }
            iframe.style.width = `${hiddenInput.offsetWidth}px`;
            iframe.style.height = `${hiddenInput.offsetHeight}px`;
        });
        const hiddenInput = this.inputRef.current;
        if (hiddenInput) {
            observer.observe(hiddenInput);
        }
    }
    renderFrame() {
        if (!this.state.frameStyleInfo) {
            return null;
        }
        const { parentStyle, width, height } = this.state.frameStyleInfo;
        const iframeStyle = Object.assign(Object.assign({}, to_camel_case_1.camelCaseObject(parentStyle)), { display: 'block', width: width, height: height });
        const frameUrl = this.generateUrl();
        return react_1.default.createElement("iframe", { ref: this.frameRef, src: frameUrl, frameBorder: 0, style: iframeStyle, key: frameUrl });
    }
    renderHiddenElement(props) {
        if (this.props.element === 'textarea') {
            return react_1.default.createElement("textarea", Object.assign({}, props));
        }
        else {
            return react_1.default.createElement("input", Object.assign({}, props));
        }
    }
    render() {
        const _a = this.props, { value, children } = _a, otherProps = __rest(_a, ["value", "children"]);
        const parentContainerStyle = {
            position: 'relative',
            display: 'block',
        };
        const isRendered = this.state.frameStyleInfo !== undefined;
        const hiddenInputStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            // We can't set the "visibility" to "collapsed" or "hidden",
            // Or else the "on focus" and "on blur" events won't fire.
            // So we use zIndex instead to "hide" the input.
            zIndex: isRendered ? -1 : 1,
            opacity: isRendered ? 0 : 1,
            display: 'block',
            resize: 'none',
        };
        const inputClassName = this.props.className !== undefined ? this.props.className : '';
        const elementProps = Object.assign(Object.assign({}, otherProps), { className: isRendered ? `secure-form-input--hidden ${inputClassName}` : `${inputClassName}`, 
            // TODO: support setting type to the passed prop to catch all possible style selectors, rare case
            type: 'text', ref: this.inputRef, name: this.props.name, defaultValue: isRendered ? this.props.value : '', style: Object.assign(Object.assign({}, this.props.style), hiddenInputStyle), onChange: isRendered ? this.props.onChange : undefined, onBlur: this.props.onBlur, onFocus: this.props.onFocus });
        return (react_1.default.createElement("div", { className: `secure-form-container-${this.frameId} secure-form-container-${this.props.name}`, style: parentContainerStyle },
            this.renderHiddenElement(elementProps),
            this.renderFrame()));
    }
}
exports.SecureInput = SecureInput;
SecureInput.contextType = SecureFormContext_1.SecureFormContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJlSW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZWN1cmVJbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQXlGO0FBRXpGLHFGQUEwRjtBQUUxRixpRkFBMkY7QUFDM0YsK0ZBQThGO0FBQzlGLCtDQUFtRTtBQUVuRSwyREFBd0Q7QUFFM0MsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDcEQsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQW9CdkQsTUFBYSxXQUFZLFNBQVEsaUJBQTZDO0lBZTVFLFlBQVksS0FBdUI7UUFDakMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLE9BQU8sR0FBRyw0QkFBbUIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWxDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLDBDQUFvQixDQUFDLENBQUM7UUFDckQsY0FBYyxDQUFDLFFBQVEsR0FBRyx5Q0FBbUIsQ0FBQztRQUU5QyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsMkZBQTJGO1lBQzNGLGNBQWMsRUFBRSxjQUFjLENBQUMsUUFBUSxFQUFFO1lBQ3pDLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7SUFDSixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJ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RyxJQUFJLEVBQUUsTUFBTSxFQUNaLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUNsQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQ3JCLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ2hELEtBQUssa0NBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUssZ0JBQWdCLEdBQ2pELFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQ3RELE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUM1QixDQUFDO1FBRUYsT0FBTyxDQUNMLHVDQUNFLFNBQVMsRUFBRSx5QkFBeUIsSUFBSSxDQUFDLE9BQU8sMEJBQTBCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQzNGLEtBQUssRUFBRSxvQkFBb0I7WUFFMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQztZQUV0QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQ2YsQ0FDUCxDQUFDO0lBQ0osQ0FBQzs7QUFuTUgsa0NBb01DO0FBak1RLHVCQUFXLEdBQUcscUNBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfX1NFQ1VSRV9GUkFNRV9VUkxfXywgc2VjdXJlRnJhbWVQYXRobmFtZSB9IGZyb20gJ0BsdW5hc2VjL3NlY3VyZS1mcmFtZS1jb21tb24nO1xuaW1wb3J0IHsgQXR0cmlidXRlc01lc3NhZ2UgfSBmcm9tICdAbHVuYXNlYy9zZWN1cmUtZnJhbWUtY29tbW9uL2J1aWxkL21haW4vcnBjL3R5cGVzJztcbmltcG9ydCB7IGdldFN0eWxlSW5mbyB9IGZyb20gJ0BsdW5hc2VjL3NlY3VyZS1mcmFtZS1jb21tb24vYnVpbGQvbWFpbi9zdHlsZS1wYXRjaGVyL3JlYWQnO1xuaW1wb3J0IHsgUmVhZEVsZW1lbnRTdHlsZSB9IGZyb20gJ0BsdW5hc2VjL3NlY3VyZS1mcmFtZS1jb21tb24vYnVpbGQvbWFpbi9zdHlsZS1wYXRjaGVyL3R5cGVzJztcbmltcG9ydCB7IGdlbmVyYXRlU2VjdXJlTm9uY2UgfSBmcm9tICdAbHVuYXNlYy9zZWN1cmUtZnJhbWUtY29tbW9uL2J1aWxkL21haW4vdXRpbHMvcmFuZG9tJztcbmltcG9ydCB7IGNhbWVsQ2FzZU9iamVjdCB9IGZyb20gJ0BsdW5hc2VjL3NlY3VyZS1mcmFtZS1jb21tb24vYnVpbGQvbWFpbi91dGlscy90by1jYW1lbC1jYXNlJztcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIENTU1Byb3BlcnRpZXMsIFJlZk9iamVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgU2VjdXJlRm9ybUNvbnRleHQgfSBmcm9tICcuL1NlY3VyZUZvcm1Db250ZXh0JztcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZElucHV0VHlwZXMgPSBbJ3RleHQnLCAncGFzc3dvcmQnLCAnZW1haWwnXTtcbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWRFbGVtZW50cyA9IFsnaW5wdXQnLCAndGV4dGFyZWEnXTtcblxuZXhwb3J0IGludGVyZmFjZSBTZWN1cmVJbnB1dFByb3BzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50UHJvcHNXaXRob3V0UmVmPCdpbnB1dCc+IHtcbiAgdmFsdWU/OiBzdHJpbmc7XG4gIHNlY3VyZUZyYW1lVXJsPzogc3RyaW5nO1xuICAvLyBUT0RPOiBXaWxsIHRoaXMgZm9yY2UgdGhlIGNvbXBvbmVudCB0byBoYXZlIGEga2V5P1xuICBuYW1lOiBzdHJpbmc7XG4gIC8vIFRPRE86IEFkZCBmb3JtIHZhbGlkYXRpb24gbG9naWMuLj9cbiAgb25DaGFuZ2U/OiBSZWFjdC5DaGFuZ2VFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG4gIG9uQmx1cj86IFJlYWN0LkZvY3VzRXZlbnRIYW5kbGVyPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICBvbkZvY3VzPzogUmVhY3QuRm9jdXNFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG4gIHR5cGU/OiB0eXBlb2Ygc3VwcG9ydGVkSW5wdXRUeXBlc1tudW1iZXJdO1xuICBlbGVtZW50PzogdHlwZW9mIHN1cHBvcnRlZEVsZW1lbnRzW251bWJlcl07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VjdXJlSW5wdXRTdGF0ZSB7XG4gIHNlY3VyZUZyYW1lVXJsOiBzdHJpbmc7XG4gIGZyYW1lU3R5bGVJbmZvOiBSZWFkRWxlbWVudFN0eWxlIHwgbnVsbDtcbn1cblxuZXhwb3J0IGNsYXNzIFNlY3VyZUlucHV0IGV4dGVuZHMgQ29tcG9uZW50PFNlY3VyZUlucHV0UHJvcHMsIFNlY3VyZUlucHV0U3RhdGU+IHtcbiAgZGVjbGFyZSBjb250ZXh0OiBSZWFjdC5Db250ZXh0VHlwZTx0eXBlb2YgU2VjdXJlRm9ybUNvbnRleHQ+O1xuXG4gIHN0YXRpYyBjb250ZXh0VHlwZSA9IFNlY3VyZUZvcm1Db250ZXh0O1xuXG4gIHJlYWRvbmx5IGZyYW1lUmVmITogUmVmT2JqZWN0PEhUTUxJRnJhbWVFbGVtZW50PjtcbiAgcmVhZG9ubHkgaW5wdXRSZWYhOiBSZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudD47XG5cbiAgLyoqXG4gICAqIFRoZSBmcmFtZUlkIGlzIGEgdW5pcXVlIHZhbHVlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gaWZyYW1lIGluc3RhbmNlLlxuICAgKi9cbiAgcmVhZG9ubHkgZnJhbWVJZCE6IHN0cmluZztcblxuICByZWFkb25seSBzdGF0ZSE6IFNlY3VyZUlucHV0U3RhdGU7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFNlY3VyZUlucHV0UHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmZyYW1lSWQgPSBnZW5lcmF0ZVNlY3VyZU5vbmNlKCk7XG4gICAgdGhpcy5mcmFtZVJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICAgIHRoaXMuaW5wdXRSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICAgIGNvbnN0IHNlY3VyZUZyYW1lVVJMID0gbmV3IFVSTChfX1NFQ1VSRV9GUkFNRV9VUkxfXyk7XG4gICAgc2VjdXJlRnJhbWVVUkwucGF0aG5hbWUgPSBzZWN1cmVGcmFtZVBhdGhuYW1lO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC8vIFRPRE86IEVuc3VyZSB0aGF0IHRoZSBzZWN1cml0eSB0aHJlYXQgbW9kZWwgYXJvdW5kIGFuIGF0dGFja2VyIHNldHRpbmcgdGhpcyBVUkwgaXMgc2FuZS5cbiAgICAgIHNlY3VyZUZyYW1lVXJsOiBzZWN1cmVGcmFtZVVSTC50b1N0cmluZygpLFxuICAgICAgZnJhbWVTdHlsZUluZm86IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuY29udGV4dC5hZGRDb21wb25lbnQodGhpcyk7XG5cbiAgICB0aGlzLmdlbmVyYXRlRWxlbWVudFN0eWxlKCk7XG4gICAgdGhpcy5zZXRSZXNpemVMaXN0ZW5lcigpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5jb250ZXh0LnJlbW92ZUNvbXBvbmVudCh0aGlzLmZyYW1lSWQpO1xuICB9XG5cbiAgZ2VuZXJhdGVFbGVtZW50U3R5bGUoKSB7XG4gICAgaWYgKCF0aGlzLmlucHV0UmVmLmN1cnJlbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGxvY2F0ZSBgaW5wdXRSZWZgIGluIFNlY3VyZUlucHV0IGNvbXBvbmVudCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGZyYW1lU3R5bGVJbmZvID0gZ2V0U3R5bGVJbmZvKHRoaXMuaW5wdXRSZWYuY3VycmVudCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZyYW1lU3R5bGVJbmZvOiBmcmFtZVN0eWxlSW5mbyxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHNvbWUgYXR0cmlidXRlcyBmb3Igc2VuZGluZyB0byB0aGUgaWZyYW1lIHZpYSBSUEMuICBUaGlzIGlzIGNhbGxlZCBmcm9tIFNlY3VyZUZvcm1cbiAgZ2VuZXJhdGVJZnJhbWVBdHRyaWJ1dGVzKCk6IEF0dHJpYnV0ZXNNZXNzYWdlIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuZnJhbWVJZDtcbiAgICAvLyBpbml0aWFsaXplIHRoZSBhdHRyaWJ1dGVzIHdpdGggdGhlIG9ubHkgcmVxdWlyZWQgcHJvcGVydHlcblxuICAgIGNvbnN0IGF0dHJzOiBBdHRyaWJ1dGVzTWVzc2FnZSA9IHsgaWQgfTtcblxuICAgIC8vIEJ1aWxkIHRoZSBzdHlsZSBmb3IgdGhlIGlmcmFtZVxuICAgIGlmICghdGhpcy5zdGF0ZS5mcmFtZVN0eWxlSW5mbykge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcbiAgICAgICAgJ0F0dGVtcHRlZCB0byBidWlsZCBzdHlsZSBmb3IgaW5wdXQgYnV0IGl0IHdhc250IHBvcHVsYXRlZCB5ZXQuIE9taXR0aW5nIHN0eWxlIGZyb20gYXR0cmlidXRlIG1lc3NhZ2UnXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhdHRycy5zdHlsZSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuZnJhbWVTdHlsZUluZm8uY2hpbGRTdHlsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgIGF0dHJzLnRva2VuID0gdGhpcy5wcm9wcy52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy50eXBlKSB7XG4gICAgICBpZiAoIXN1cHBvcnRlZElucHV0VHlwZXMuaW5jbHVkZXModGhpcy5wcm9wcy50eXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlY3VyZUlucHV0IG5vdCBzZXQgdG8gYWxsb3dlZCB0eXBlLiAgUGVybWl0dGVkIHR5cGVzIGFyZTogJHtzdXBwb3J0ZWRJbnB1dFR5cGVzLnRvU3RyaW5nKCl9YCk7XG4gICAgICB9XG4gICAgICBhdHRycy50eXBlID0gdGhpcy5wcm9wcy50eXBlO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRycztcbiAgfVxuXG4gIGdlbmVyYXRlVXJsKCkge1xuICAgIGNvbnN0IHVybEZyYW1lSWQgPSB0aGlzLmZyYW1lSWQ7XG4gICAgY29uc3QgZnJhbWVVUkwgPSBuZXcgVVJMKCdmcmFtZScsIHRoaXMuc3RhdGUuc2VjdXJlRnJhbWVVcmwpO1xuICAgIGZyYW1lVVJMLnNlYXJjaFBhcmFtcy5zZXQoJ24nLCB1cmxGcmFtZUlkKTtcbiAgICBmcmFtZVVSTC5zZWFyY2hQYXJhbXMuc2V0KCdvcmlnaW4nLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcblxuICAgIGlmICh0aGlzLnByb3BzLmVsZW1lbnQgJiYgIXN1cHBvcnRlZEVsZW1lbnRzLmluY2x1ZGVzKHRoaXMucHJvcHMuZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFNlY3VyZUlucHV0IG5vdCBzZXQgdG8gYWxsb3dlZCBlbGVtZW50LiAgUGVybWl0dGVkIGVsZW1lbnRzIGFyZTogJHtzdXBwb3J0ZWRFbGVtZW50cy50b1N0cmluZygpfWBcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIGRlZmF1bHQgdG8gaW5wdXQgaWYgdXNlciBkaWRuJ3Qgc2V0IGFuIGVsZW1lbnQgdHlwZVxuICAgIGZyYW1lVVJMLnNlYXJjaFBhcmFtcy5zZXQoJ2VsZW1lbnQnLCB0aGlzLnByb3BzLmVsZW1lbnQgfHwgJ2lucHV0Jyk7XG4gICAgcmV0dXJuIGZyYW1lVVJMLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzZXRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICBjb25zdCBoaWRkZW5JbnB1dCA9IHRoaXMuaW5wdXRSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMuZnJhbWVSZWYuY3VycmVudDtcbiAgICAgIGlmICghaGlkZGVuSW5wdXQgfHwgIWlmcmFtZSB8fCAhaGlkZGVuSW5wdXQub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgIC8vIERPTXMgbm90IGFjdHVhbGx5IHJlYWR5XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmcmFtZS5zdHlsZS53aWR0aCA9IGAke2hpZGRlbklucHV0Lm9mZnNldFdpZHRofXB4YDtcbiAgICAgIGlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtoaWRkZW5JbnB1dC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaGlkZGVuSW5wdXQgPSB0aGlzLmlucHV0UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGhpZGRlbklucHV0KSB7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKGhpZGRlbklucHV0IGFzIEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckZyYW1lKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5mcmFtZVN0eWxlSW5mbykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwYXJlbnRTdHlsZSwgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5zdGF0ZS5mcmFtZVN0eWxlSW5mbztcblxuICAgIGNvbnN0IGlmcmFtZVN0eWxlOiBDU1NQcm9wZXJ0aWVzID0ge1xuICAgICAgLi4uY2FtZWxDYXNlT2JqZWN0KHBhcmVudFN0eWxlKSxcbiAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuXG4gICAgY29uc3QgZnJhbWVVcmwgPSB0aGlzLmdlbmVyYXRlVXJsKCk7XG5cbiAgICByZXR1cm4gPGlmcmFtZSByZWY9e3RoaXMuZnJhbWVSZWZ9IHNyYz17ZnJhbWVVcmx9IGZyYW1lQm9yZGVyPXswfSBzdHlsZT17aWZyYW1lU3R5bGV9IGtleT17ZnJhbWVVcmx9IC8+O1xuICB9XG5cbiAgcmVuZGVySGlkZGVuRWxlbWVudChwcm9wczogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIGlmICh0aGlzLnByb3BzLmVsZW1lbnQgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgIHJldHVybiA8dGV4dGFyZWEgey4uLnByb3BzfSAvPjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDxpbnB1dCB7Li4ucHJvcHN9IC8+O1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHZhbHVlLCBjaGlsZHJlbiwgLi4ub3RoZXJQcm9wcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHBhcmVudENvbnRhaW5lclN0eWxlOiBDU1NQcm9wZXJ0aWVzID0ge1xuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIH07XG5cbiAgICBjb25zdCBpc1JlbmRlcmVkID0gdGhpcy5zdGF0ZS5mcmFtZVN0eWxlSW5mbyAhPT0gdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgaGlkZGVuSW5wdXRTdHlsZTogQ1NTUHJvcGVydGllcyA9IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIC8vIFdlIGNhbid0IHNldCB0aGUgXCJ2aXNpYmlsaXR5XCIgdG8gXCJjb2xsYXBzZWRcIiBvciBcImhpZGRlblwiLFxuICAgICAgLy8gT3IgZWxzZSB0aGUgXCJvbiBmb2N1c1wiIGFuZCBcIm9uIGJsdXJcIiBldmVudHMgd29uJ3QgZmlyZS5cbiAgICAgIC8vIFNvIHdlIHVzZSB6SW5kZXggaW5zdGVhZCB0byBcImhpZGVcIiB0aGUgaW5wdXQuXG4gICAgICB6SW5kZXg6IGlzUmVuZGVyZWQgPyAtMSA6IDEsXG4gICAgICBvcGFjaXR5OiBpc1JlbmRlcmVkID8gMCA6IDEsXG4gICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgcmVzaXplOiAnbm9uZScsXG4gICAgfTtcblxuICAgIGNvbnN0IGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgIT09IHVuZGVmaW5lZCA/IHRoaXMucHJvcHMuY2xhc3NOYW1lIDogJyc7XG5cbiAgICBjb25zdCBlbGVtZW50UHJvcHMgPSB7XG4gICAgICAuLi5vdGhlclByb3BzLFxuICAgICAgY2xhc3NOYW1lOiBpc1JlbmRlcmVkID8gYHNlY3VyZS1mb3JtLWlucHV0LS1oaWRkZW4gJHtpbnB1dENsYXNzTmFtZX1gIDogYCR7aW5wdXRDbGFzc05hbWV9YCxcbiAgICAgIC8vIFRPRE86IHN1cHBvcnQgc2V0dGluZyB0eXBlIHRvIHRoZSBwYXNzZWQgcHJvcCB0byBjYXRjaCBhbGwgcG9zc2libGUgc3R5bGUgc2VsZWN0b3JzLCByYXJlIGNhc2VcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHJlZjogdGhpcy5pbnB1dFJlZixcbiAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogaXNSZW5kZXJlZCA/IHRoaXMucHJvcHMudmFsdWUgOiAnJyxcbiAgICAgIHN0eWxlOiB7IC4uLnRoaXMucHJvcHMuc3R5bGUsIC4uLmhpZGRlbklucHV0U3R5bGUgfSxcbiAgICAgIG9uQ2hhbmdlOiBpc1JlbmRlcmVkID8gdGhpcy5wcm9wcy5vbkNoYW5nZSA6IHVuZGVmaW5lZCxcbiAgICAgIG9uQmx1cjogdGhpcy5wcm9wcy5vbkJsdXIsXG4gICAgICBvbkZvY3VzOiB0aGlzLnByb3BzLm9uRm9jdXMsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17YHNlY3VyZS1mb3JtLWNvbnRhaW5lci0ke3RoaXMuZnJhbWVJZH0gc2VjdXJlLWZvcm0tY29udGFpbmVyLSR7dGhpcy5wcm9wcy5uYW1lfWB9XG4gICAgICAgIHN0eWxlPXtwYXJlbnRDb250YWluZXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVySGlkZGVuRWxlbWVudChlbGVtZW50UHJvcHMpfVxuXG4gICAgICAgIHt0aGlzLnJlbmRlckZyYW1lKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=