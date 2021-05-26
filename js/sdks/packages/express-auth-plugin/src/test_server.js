"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./index");
const cookieParser = require('cookie-parser');
const app = express_1.default();
app.use(cookieParser());
app.use(cors_1.default({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}));
app.get('/set-id-token', async function (req, res) {
    const id_token = req.query.id_token;
    if (typeof id_token !== 'string') {
        res.status(400).send({
            'success': false,
            'error': 'id_token is not a string',
            'id_token': id_token
        });
        return;
    }
    res.cookie('id_token', id_token);
    res.status(200).send({
        'success': true
    });
});
index_1.authPlugin(app);
app.listen(3001, () => console.log('Example app is listening on port 3001.'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9zZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0X3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixnREFBd0I7QUFDeEIsbUNBQW1DO0FBQ25DLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUU5QyxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBRXhCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDO0lBQ1QsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixvQkFBb0IsRUFBRSxHQUFHO0NBQzVCLENBQUMsQ0FBQyxDQUFBO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUMsS0FBSyxXQUFVLEdBQUcsRUFBRSxHQUFHO0lBQzdDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQ3BDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE9BQU8sRUFBRSwwQkFBMEI7WUFDbkMsVUFBVSxFQUFFLFFBQVE7U0FDckIsQ0FBQyxDQUFDO1FBQ0gsT0FBTTtLQUNQO0lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkIsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRWhCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCB7YXV0aFBsdWdpbn0gZnJvbSBcIi4vaW5kZXhcIjtcbmNvbnN0IGNvb2tpZVBhcnNlciA9IHJlcXVpcmUoJ2Nvb2tpZS1wYXJzZXInKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG5cbmFwcC51c2UoY29ycyh7XG4gICAgb3JpZ2luOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICBvcHRpb25zU3VjY2Vzc1N0YXR1czogMjAwLFxufSkpXG5cbmFwcC5nZXQoJy9zZXQtaWQtdG9rZW4nLGFzeW5jIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIGNvbnN0IGlkX3Rva2VuID0gcmVxLnF1ZXJ5LmlkX3Rva2VuO1xuICBpZiAodHlwZW9mIGlkX3Rva2VuICE9PSAnc3RyaW5nJykge1xuICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHtcbiAgICAgICdzdWNjZXNzJzogZmFsc2UsXG4gICAgICAnZXJyb3InOiAnaWRfdG9rZW4gaXMgbm90IGEgc3RyaW5nJyxcbiAgICAgICdpZF90b2tlbic6IGlkX3Rva2VuXG4gICAgfSk7XG4gICAgcmV0dXJuXG4gIH1cbiAgcmVzLmNvb2tpZSgnaWRfdG9rZW4nLCBpZF90b2tlbik7XG4gIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtcbiAgICAnc3VjY2Vzcyc6IHRydWVcbiAgfSlcbn0pO1xuXG5hdXRoUGx1Z2luKGFwcCk7XG5cbmFwcC5saXN0ZW4oMzAwMSwgKCkgPT4gY29uc29sZS5sb2coJ0V4YW1wbGUgYXBwIGlzIGxpc3RlbmluZyBvbiBwb3J0IDMwMDEuJykpO1xuIl19