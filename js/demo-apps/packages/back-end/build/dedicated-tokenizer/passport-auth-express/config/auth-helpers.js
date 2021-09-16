"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lunaSecSessionIdProvider = exports.ensureLoggedIn = void 0;
function ensureLoggedIn(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        res.json({
            success: false,
            error: 'user is not logged in',
        });
    }
}
exports.ensureLoggedIn = ensureLoggedIn;
// Tell LunaSec how to read a user identifier out of the request object.  Can use the session ID or the User's ID if desired.
function lunaSecSessionIdProvider(req) {
    // LunaSec expects this to return a promise in case we need to do something async
    return new Promise((resolve) => {
        if (req.user) {
            resolve(req.user.id);
        }
        resolve(null);
    });
}
exports.lunaSecSessionIdProvider = lunaSecSessionIdProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtYXV0aC1leHByZXNzL2NvbmZpZy9hdXRoLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsY0FBYyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7SUFDNUUsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ1osSUFBSSxFQUFFLENBQUM7S0FDUjtTQUFNO1FBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNQLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLHVCQUF1QjtTQUMvQixDQUFDLENBQUM7S0FDSjtBQUNILENBQUM7QUFURCx3Q0FTQztBQUVELDZIQUE2SDtBQUM3SCxTQUFnQix3QkFBd0IsQ0FBQyxHQUFZO0lBQ25ELGlGQUFpRjtJQUNqRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEI7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBUkQsNERBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVMb2dnZWRJbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICBpZiAocmVxLnVzZXIpIHtcbiAgICBuZXh0KCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLmpzb24oe1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogJ3VzZXIgaXMgbm90IGxvZ2dlZCBpbicsXG4gICAgfSk7XG4gIH1cbn1cblxuLy8gVGVsbCBMdW5hU2VjIGhvdyB0byByZWFkIGEgdXNlciBpZGVudGlmaWVyIG91dCBvZiB0aGUgcmVxdWVzdCBvYmplY3QuICBDYW4gdXNlIHRoZSBzZXNzaW9uIElEIG9yIHRoZSBVc2VyJ3MgSUQgaWYgZGVzaXJlZC5cbmV4cG9ydCBmdW5jdGlvbiBsdW5hU2VjU2Vzc2lvbklkUHJvdmlkZXIocmVxOiBSZXF1ZXN0KTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gIC8vIEx1bmFTZWMgZXhwZWN0cyB0aGlzIHRvIHJldHVybiBhIHByb21pc2UgaW4gY2FzZSB3ZSBuZWVkIHRvIGRvIHNvbWV0aGluZyBhc3luY1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBpZiAocmVxLnVzZXIpIHtcbiAgICAgIHJlc29sdmUocmVxLnVzZXIuaWQpO1xuICAgIH1cbiAgICByZXNvbHZlKG51bGwpO1xuICB9KTtcbn1cbiJdfQ==