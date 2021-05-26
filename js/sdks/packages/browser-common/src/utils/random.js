"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFuZG9tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLFNBQWdCLG1CQUFtQjtJQUNqQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtRQUNqQyxpREFBaUQ7UUFDakQsT0FBTyxVQUFVLENBQUM7S0FDbkI7SUFDRCxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNqQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDMUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQVZELGtEQVVDIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTZWN1cmVOb25jZSgpIHtcbiAgaWYgKHR5cGVvZiBjcnlwdG8gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IGhvdyB0byBkbyB0aGlzIGlzb21vcnBoaWNhbGx5XG4gICAgcmV0dXJuICcxMjM0MTIzNCc7XG4gIH1cbiAgY29uc3QgciA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDQpKTtcblxuICByZXR1cm4gQXJyYXkuZnJvbShyKVxuICAgIC5tYXAoKGkpID0+IGkudG9TdHJpbmcoMTYpKVxuICAgIC5qb2luKCcnKTtcbn1cbiJdfQ==