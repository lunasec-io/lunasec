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
exports.SecureSubmit = void 0;
const react_1 = __importStar(require("react"));
const SecureFormContext_1 = require("./SecureFormContext");
class SecureSubmit extends react_1.Component {
    render() {
        // TODO: Allow passing classes to this component for styling
        return (react_1.default.createElement("input", { type: "submit", className: `secure-form-submit` }, this.props.children));
    }
}
exports.SecureSubmit = SecureSubmit;
SecureSubmit.contextType = SecureFormContext_1.SecureFormContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJlU3VibWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VjdXJlU3VibWl0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQXVDO0FBQ3ZDLDJEQUFzRDtBQUt0RCxNQUFhLFlBQWEsU0FBUSxpQkFBNEI7SUFLNUQsTUFBTTtRQUNKLDREQUE0RDtRQUM1RCxPQUFPLENBQ0wseUNBQU8sSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUUsb0JBQW9CLElBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNkLENBQ1QsQ0FBQztJQUNKLENBQUM7O0FBWkgsb0NBYUM7QUFWUSx3QkFBVyxHQUFHLHFDQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1NlY3VyZUZvcm1Db250ZXh0fSBmcm9tICcuL1NlY3VyZUZvcm1Db250ZXh0JztcblxuZXhwb3J0IGludGVyZmFjZSBTZWN1cmVTdWJtaXRQcm9wcyB7XG59XG5cbmV4cG9ydCBjbGFzcyBTZWN1cmVTdWJtaXQgZXh0ZW5kcyBDb21wb25lbnQ8U2VjdXJlU3VibWl0UHJvcHM+IHtcbiAgZGVjbGFyZSBjb250ZXh0OiBSZWFjdC5Db250ZXh0VHlwZTx0eXBlb2YgU2VjdXJlRm9ybUNvbnRleHQ+XG5cbiAgc3RhdGljIGNvbnRleHRUeXBlID0gU2VjdXJlRm9ybUNvbnRleHQ7XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIFRPRE86IEFsbG93IHBhc3NpbmcgY2xhc3NlcyB0byB0aGlzIGNvbXBvbmVudCBmb3Igc3R5bGluZ1xuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT17YHNlY3VyZS1mb3JtLXN1Ym1pdGB9PlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvaW5wdXQ+XG4gICAgKTtcbiAgfVxufVxuIl19