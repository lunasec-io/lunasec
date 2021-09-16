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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const passport_1 = __importDefault(require("passport"));
// @ts-ignore
const passport_json_1 = require("passport-json");
const db_1 = require("./db");
function configurePassport() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield db_1.getDb();
        // Configure the local strategy for use by Passport.
        //
        // The local strategy requires a `verify` function which receives the credentials
        // (`username` and `password`) submitted by the user.  The function must verify
        // that the password is correct and then invoke `cb` with a user object, which
        // will be set at `req.user` in route handlers after authentication.
        passport_1.default.use(new passport_json_1.Strategy((username, password, done) => {
            db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [username])
                .catch((err) => done(err, false))
                .then((row) => {
                if (!row) {
                    return done('Incorrect username or password.', false);
                }
                crypto_1.default.pbkdf2(password, row.salt, 10000, 32, 'sha256', function (err, hashedPassword) {
                    if (err) {
                        return done(err, false);
                    }
                    if (!crypto_1.default.timingSafeEqual(row.hashed_password, hashedPassword)) {
                        return done('Incorrect username or password.', false);
                    }
                    const user = {
                        id: row.id.toString(),
                        username: row.username,
                        display_name: row.display_name,
                        ssn_token: row.ssn_token,
                    };
                    return done(null, user);
                });
            });
        }));
        // Configure Passport authenticated session persistence.
        //
        // In order to restore authentication state across HTTP requests, Passport needs
        // to serialize users into and deserialize users out of the session.  The
        // typical implementation of this is as simple as supplying the user ID when
        // serializing, and querying the user record by ID from the database when
        // deserializing.
        passport_1.default.serializeUser(function (user, cb) {
            cb(null, { id: user.id, username: user.username });
        });
        passport_1.default.deserializeUser(function (userInfo, cb) {
            db.get('SELECT rowid AS id, username, display_name, ssn_token FROM users WHERE rowid = ?', [userInfo.id])
                .catch((err) => cb(err))
                .then((row) => {
                const user = Object.assign(Object.assign({}, row), { id: row.id.toString() });
                cb(null, user);
            });
        });
    });
}
exports.default = configurePassport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLXBhc3Nwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvcGFzc3BvcnQtYXV0aC1leHByZXNzL2NvbmZpZy9jb25maWd1cmUtcGFzc3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFFNUIsd0RBQWdDO0FBQ2hDLGFBQWE7QUFDYixpREFBeUM7QUFJekMsNkJBQTZCO0FBRTdCLFNBQThCLGlCQUFpQjs7UUFDN0MsTUFBTSxFQUFFLEdBQUcsTUFBTSxVQUFLLEVBQUUsQ0FBQztRQUN6QixvREFBb0Q7UUFDcEQsRUFBRTtRQUNGLGlGQUFpRjtRQUNqRiwrRUFBK0U7UUFDL0UsOEVBQThFO1FBQzlFLG9FQUFvRTtRQUNwRSxrQkFBUSxDQUFDLEdBQUcsQ0FDVixJQUFJLHdCQUFRLENBQ1YsQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsSUFBbUUsRUFBRSxFQUFFO1lBQzFHLEVBQUUsQ0FBQyxHQUFHLENBQUMscURBQXFELEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdEUsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNoQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNSLE9BQU8sSUFBSSxDQUFDLGlDQUFpQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUN2RDtnQkFFRCxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEdBQUcsRUFBRSxjQUFjO29CQUNsRixJQUFJLEdBQUcsRUFBRTt3QkFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7cUJBQ3pCO29CQUNELElBQUksQ0FBQyxnQkFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxFQUFFO3dCQUNoRSxPQUFPLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDdkQ7b0JBRUQsTUFBTSxJQUFJLEdBQUc7d0JBQ1gsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO3dCQUNyQixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7d0JBQ3RCLFlBQVksRUFBRSxHQUFHLENBQUMsWUFBWTt3QkFDOUIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTO3FCQUN6QixDQUFDO29CQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FDRixDQUNGLENBQUM7UUFFRix3REFBd0Q7UUFDeEQsRUFBRTtRQUNGLGdGQUFnRjtRQUNoRix5RUFBeUU7UUFDekUsNEVBQTRFO1FBQzVFLHlFQUF5RTtRQUN6RSxpQkFBaUI7UUFDakIsa0JBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxJQUFJLEVBQUUsRUFBRTtZQUN2QyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsa0JBQVEsQ0FBQyxlQUFlLENBQUMsVUFBVSxRQUF3QixFQUFFLEVBQUU7WUFDN0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrRkFBa0YsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdEcsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3ZCLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNaLE1BQU0sSUFBSSxtQ0FDTCxHQUFHLEtBQ04sRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQ3RCLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUFBO0FBN0RELG9DQTZEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcblxuaW1wb3J0IHBhc3Nwb3J0IGZyb20gJ3Bhc3Nwb3J0Jztcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCB7IFN0cmF0ZWd5IH0gZnJvbSAncGFzc3BvcnQtanNvbic7XG5cbmltcG9ydCB7IFVzZXJNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcblxuaW1wb3J0IHsgZ2V0RGIgfSBmcm9tICcuL2RiJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gY29uZmlndXJlUGFzc3BvcnQoKSB7XG4gIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGIoKTtcbiAgLy8gQ29uZmlndXJlIHRoZSBsb2NhbCBzdHJhdGVneSBmb3IgdXNlIGJ5IFBhc3Nwb3J0LlxuICAvL1xuICAvLyBUaGUgbG9jYWwgc3RyYXRlZ3kgcmVxdWlyZXMgYSBgdmVyaWZ5YCBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyB0aGUgY3JlZGVudGlhbHNcbiAgLy8gKGB1c2VybmFtZWAgYW5kIGBwYXNzd29yZGApIHN1Ym1pdHRlZCBieSB0aGUgdXNlci4gIFRoZSBmdW5jdGlvbiBtdXN0IHZlcmlmeVxuICAvLyB0aGF0IHRoZSBwYXNzd29yZCBpcyBjb3JyZWN0IGFuZCB0aGVuIGludm9rZSBgY2JgIHdpdGggYSB1c2VyIG9iamVjdCwgd2hpY2hcbiAgLy8gd2lsbCBiZSBzZXQgYXQgYHJlcS51c2VyYCBpbiByb3V0ZSBoYW5kbGVycyBhZnRlciBhdXRoZW50aWNhdGlvbi5cbiAgcGFzc3BvcnQudXNlKFxuICAgIG5ldyBTdHJhdGVneShcbiAgICAgICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBkb25lOiAoZXJyOiBudWxsIHwgc3RyaW5nIHwgRXJyb3IsIHVzcj86IGZhbHNlIHwgVXNlck1vZGVsKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGRiLmdldCgnU0VMRUNUIHJvd2lkIEFTIGlkLCAqIEZST00gdXNlcnMgV0hFUkUgdXNlcm5hbWUgPSA/JywgW3VzZXJuYW1lXSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4gZG9uZShlcnIsIGZhbHNlKSlcbiAgICAgICAgICAudGhlbigocm93KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJvdykge1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkLicsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3J5cHRvLnBia2RmMihwYXNzd29yZCwgcm93LnNhbHQsIDEwMDAwLCAzMiwgJ3NoYTI1NicsIGZ1bmN0aW9uIChlcnIsIGhhc2hlZFBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWNyeXB0by50aW1pbmdTYWZlRXF1YWwocm93Lmhhc2hlZF9wYXNzd29yZCwgaGFzaGVkUGFzc3dvcmQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZC4nLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCB1c2VyID0ge1xuICAgICAgICAgICAgICAgIGlkOiByb3cuaWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogcm93LnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlfbmFtZTogcm93LmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICBzc25fdG9rZW46IHJvdy5zc25fdG9rZW4sXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKVxuICApO1xuXG4gIC8vIENvbmZpZ3VyZSBQYXNzcG9ydCBhdXRoZW50aWNhdGVkIHNlc3Npb24gcGVyc2lzdGVuY2UuXG4gIC8vXG4gIC8vIEluIG9yZGVyIHRvIHJlc3RvcmUgYXV0aGVudGljYXRpb24gc3RhdGUgYWNyb3NzIEhUVFAgcmVxdWVzdHMsIFBhc3Nwb3J0IG5lZWRzXG4gIC8vIHRvIHNlcmlhbGl6ZSB1c2VycyBpbnRvIGFuZCBkZXNlcmlhbGl6ZSB1c2VycyBvdXQgb2YgdGhlIHNlc3Npb24uICBUaGVcbiAgLy8gdHlwaWNhbCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGlzIGFzIHNpbXBsZSBhcyBzdXBwbHlpbmcgdGhlIHVzZXIgSUQgd2hlblxuICAvLyBzZXJpYWxpemluZywgYW5kIHF1ZXJ5aW5nIHRoZSB1c2VyIHJlY29yZCBieSBJRCBmcm9tIHRoZSBkYXRhYmFzZSB3aGVuXG4gIC8vIGRlc2VyaWFsaXppbmcuXG4gIHBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoZnVuY3Rpb24gKHVzZXIsIGNiKSB7XG4gICAgY2IobnVsbCwgeyBpZDogdXNlci5pZCwgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUgfSk7XG4gIH0pO1xuXG4gIHBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihmdW5jdGlvbiAodXNlckluZm86IHsgaWQ6IHN0cmluZyB9LCBjYikge1xuICAgIGRiLmdldCgnU0VMRUNUIHJvd2lkIEFTIGlkLCB1c2VybmFtZSwgZGlzcGxheV9uYW1lLCBzc25fdG9rZW4gRlJPTSB1c2VycyBXSEVSRSByb3dpZCA9ID8nLCBbdXNlckluZm8uaWRdKVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNiKGVycikpXG4gICAgICAudGhlbigocm93KSA9PiB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSB7XG4gICAgICAgICAgLi4ucm93LFxuICAgICAgICAgIGlkOiByb3cuaWQudG9TdHJpbmcoKSxcbiAgICAgICAgfTtcbiAgICAgICAgY2IobnVsbCwgdXNlcik7XG4gICAgICB9KTtcbiAgfSk7XG59XG4iXX0=