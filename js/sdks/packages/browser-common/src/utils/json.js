"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0IsYUFBYSxDQUFJLElBQVk7SUFDM0MsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQU0sQ0FBQztLQUM5QjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFORCxzQ0FNQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBzYWZlUGFyc2VKc29uPFQ+KGpzb246IHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGpzb24pIGFzIFQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19