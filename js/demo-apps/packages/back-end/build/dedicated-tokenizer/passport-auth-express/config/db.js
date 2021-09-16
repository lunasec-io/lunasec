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
exports.getDb = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
sqlite3_1.default.verbose();
function initDb() {
    return sqlite_1.open({
        filename: 'db.dedicated-passport-auth-express.sqlite3',
        driver: sqlite3_1.default.Database,
    }).then((db) => __awaiter(this, void 0, void 0, function* () {
        yield db.migrate({
            force: false,
            migrationsPath: __dirname + '/../migrations',
        });
        return db;
    }));
}
let DBPromise;
function getDb() {
    if (typeof DBPromise === 'undefined') {
        DBPromise = initDb();
    }
    return DBPromise;
}
exports.getDb = getDb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVkaWNhdGVkLXRva2VuaXplci9wYXNzcG9ydC1hdXRoLWV4cHJlc3MvY29uZmlnL2RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF3QztBQUN4QyxzREFBOEI7QUFDOUIsaUJBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUVsQixTQUFTLE1BQU07SUFDYixPQUFPLGFBQUksQ0FBQztRQUNWLFFBQVEsRUFBRSw0Q0FBNEM7UUFDdEQsTUFBTSxFQUFFLGlCQUFPLENBQUMsUUFBUTtLQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sRUFBRSxFQUFFLEVBQUU7UUFDbkIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixjQUFjLEVBQUUsU0FBUyxHQUFHLGdCQUFnQjtTQUM3QyxDQUFDLENBQUM7UUFDSCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsSUFBSSxTQUFpRSxDQUFDO0FBQ3RFLFNBQWdCLEtBQUs7SUFDbkIsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLEVBQUU7UUFDcEMsU0FBUyxHQUFHLE1BQU0sRUFBRSxDQUFDO0tBQ3RCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUxELHNCQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YWJhc2UsIG9wZW4gfSBmcm9tICdzcWxpdGUnO1xuaW1wb3J0IHNxbGl0ZTMgZnJvbSAnc3FsaXRlMyc7XG5zcWxpdGUzLnZlcmJvc2UoKTtcblxuZnVuY3Rpb24gaW5pdERiKCkge1xuICByZXR1cm4gb3Blbih7XG4gICAgZmlsZW5hbWU6ICdkYi5kZWRpY2F0ZWQtcGFzc3BvcnQtYXV0aC1leHByZXNzLnNxbGl0ZTMnLFxuICAgIGRyaXZlcjogc3FsaXRlMy5EYXRhYmFzZSxcbiAgfSkudGhlbihhc3luYyAoZGIpID0+IHtcbiAgICBhd2FpdCBkYi5taWdyYXRlKHtcbiAgICAgIGZvcmNlOiBmYWxzZSwgLy8gd2lwZSB0aGUgZGF0YWJhc2UgaWYgdHJ1ZVxuICAgICAgbWlncmF0aW9uc1BhdGg6IF9fZGlybmFtZSArICcvLi4vbWlncmF0aW9ucycsXG4gICAgfSk7XG4gICAgcmV0dXJuIGRiO1xuICB9KTtcbn1cblxubGV0IERCUHJvbWlzZTogUHJvbWlzZTxEYXRhYmFzZTxzcWxpdGUzLkRhdGFiYXNlLCBzcWxpdGUzLlN0YXRlbWVudD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGdldERiKCkge1xuICBpZiAodHlwZW9mIERCUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBEQlByb21pc2UgPSBpbml0RGIoKTtcbiAgfVxuICByZXR1cm4gREJQcm9taXNlO1xufVxuIl19