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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWRpY2F0ZWQtdG9rZW5pemVyL3Bhc3Nwb3J0LWF1dGgtZXhwcmVzcy9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLFNBQWdCLGNBQWMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQzVFLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtRQUNaLElBQUksRUFBRSxDQUFDO0tBQ1I7U0FBTTtRQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDUCxPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSx1QkFBdUI7U0FDL0IsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDO0FBVEQsd0NBU0M7QUFFRCw2SEFBNkg7QUFDN0gsU0FBZ0Isd0JBQXdCLENBQUMsR0FBWTtJQUNuRCxpRkFBaUY7SUFDakYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzdCLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVJELDREQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlTG9nZ2VkSW4ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcbiAgaWYgKHJlcS51c2VyKSB7XG4gICAgbmV4dCgpO1xuICB9IGVsc2Uge1xuICAgIHJlcy5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6ICd1c2VyIGlzIG5vdCBsb2dnZWQgaW4nLFxuICAgIH0pO1xuICB9XG59XG5cbi8vIFRlbGwgTHVuYVNlYyBob3cgdG8gcmVhZCBhIHVzZXIgaWRlbnRpZmllciBvdXQgb2YgdGhlIHJlcXVlc3Qgb2JqZWN0LiAgQ2FuIHVzZSB0aGUgc2Vzc2lvbiBJRCBvciB0aGUgVXNlcidzIElEIGlmIGRlc2lyZWQuXG5leHBvcnQgZnVuY3Rpb24gbHVuYVNlY1Nlc3Npb25JZFByb3ZpZGVyKHJlcTogUmVxdWVzdCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAvLyBMdW5hU2VjIGV4cGVjdHMgdGhpcyB0byByZXR1cm4gYSBwcm9taXNlIGluIGNhc2Ugd2UgbmVlZCB0byBkbyBzb21ldGhpbmcgYXN5bmNcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgaWYgKHJlcS51c2VyKSB7XG4gICAgICByZXNvbHZlKHJlcS51c2VyLmlkKTtcbiAgICB9XG4gICAgcmVzb2x2ZShudWxsKTtcbiAgfSk7XG59XG4iXX0=