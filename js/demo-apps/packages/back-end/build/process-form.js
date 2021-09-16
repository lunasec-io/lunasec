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
exports.processForm = void 0;
const tokenizer_sdk_1 = require("@lunasec/tokenizer-sdk");
function processForm(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenizer = new tokenizer_sdk_1.Tokenizer();
        const resp = yield tokenizer.detokenize(formData.ssnToken);
        if (resp.success) {
            return resp.value;
        }
        return resp.error;
    });
}
exports.processForm = processForm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Byb2Nlc3MtZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwwREFBbUQ7QUFNbkQsU0FBc0IsV0FBVyxDQUFDLFFBQXdCOztRQUN4RCxNQUFNLFNBQVMsR0FBRyxJQUFJLHlCQUFTLEVBQUUsQ0FBQztRQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztDQUFBO0FBUEQsa0NBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2tlbml6ZXIgfSBmcm9tICdAbHVuYXNlYy90b2tlbml6ZXItc2RrJztcblxuZXhwb3J0IGludGVyZmFjZSBTZWN1cmVGb3JtRGF0YSB7XG4gIHNzblRva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzRm9ybShmb3JtRGF0YTogU2VjdXJlRm9ybURhdGEpIHtcbiAgY29uc3QgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcigpO1xuICBjb25zdCByZXNwID0gYXdhaXQgdG9rZW5pemVyLmRldG9rZW5pemUoZm9ybURhdGEuc3NuVG9rZW4pO1xuICBpZiAocmVzcC5zdWNjZXNzKSB7XG4gICAgcmV0dXJuIHJlc3AudmFsdWU7XG4gIH1cbiAgcmV0dXJuIHJlc3AuZXJyb3I7XG59XG4iXX0=