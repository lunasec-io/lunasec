"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureResolver = void 0;
const fs_1 = __importDefault(require("fs"));
const url_1 = require("url");
const common_1 = require("@lunasec/common");
const api_client_1 = require("./api-client");
const defaultConfig = {
    refinerySecret: 'AeIMih3sqEYRUqLy4WS_5CXP6jdjM0dCONrry-MlXn0',
    refinerySecretHeader: 'REFINERY_DEPLOYMENT_SECRET',
    containerSecret: 'secret-value-123',
    containerSecretHeader: 'X-Container-Secret',
    deploymentIDEnvVar: 'REFINERY_DEPLOYMENT_ID',
    app_dir: '/app',
    language: 'Node.js 10 Temporal',
    functionsPath: 'functions.json',
    endpoints: {
        secureResolver: '/api/v1/deployments/secure_resolver',
    },
};
class SecureResolver {
    constructor(config) {
        var _a, _b, _c, _d;
        // Deep clone the config to prevent nested mutation.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.config = JSON.parse(JSON.stringify(Object.assign({}, defaultConfig, config)));
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.functionsConfig) && !((_b = this.config) === null || _b === void 0 ? void 0 : _b.functionsPath)) {
            throw new Error('Unable to create Secure Resolver SDK with missing function configuration');
        }
        if ((_c = this.config) === null || _c === void 0 ? void 0 : _c.functionsPath) {
            // TODO: Extract into a function that processes the schema of this or throws reasonable error messages.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.functionConfig = JSON.parse(fs_1.default.readFileSync(this.config.functionsPath, 'utf8'));
        }
        if ((_d = this.config) === null || _d === void 0 ? void 0 : _d.functionsConfig) {
            // This will override any values read from the file, just in case.
            this.functionConfig = Object.assign({}, this.functionConfig, this.config.functionsConfig);
        }
        this.refineryHeaders = {
            [this.config.refinerySecretHeader]: this.config.refinerySecret,
        };
        this.containerHeaders = {
            [this.config.containerSecretHeader]: this.config.containerSecret,
        };
        this.apiClient = api_client_1.makeGenericApiClient(this.config.endpoints.secureResolver, {
            method: 'POST',
            headers: this.refineryHeaders,
        });
    }
    async deploy(containerUri) {
        const functions = this.functionConfig['functions'];
        const response = await this.apiClient({
            action: 'build',
            payload: {
                stage: 'prod',
                container_uri: containerUri,
                language: this.config.language,
                app_dir: this.config.app_dir,
                functions: functions,
            },
        });
        if (!response) {
            return {
                error: true,
                message: response,
            };
        }
        return response;
    }
    async invoke(functionName, args) {
        const deploymentId = process.env[this.config.deploymentIDEnvVar];
        if (deploymentId === undefined) {
            throw new Error(`the environment variable ${this.config.deploymentIDEnvVar} is not set`);
        }
        const urlResponse = await this.getFunctionUrl(deploymentId);
        if (!urlResponse.success) {
            return {
                success: false,
                error: urlResponse.error.message,
                completeError: urlResponse,
            };
        }
        const body = JSON.stringify({
            function_name: functionName,
            block_input: args,
        });
        const resolverUrl = new url_1.URL(urlResponse.data.url);
        const response = await common_1.makeRequest(resolverUrl.host, resolverUrl.pathname, Object.assign(Object.assign({}, resolverUrl), { method: 'POST', headers: this.containerHeaders }), body);
        if (!response || response.error) {
            return Object.assign({ success: false }, response);
        }
        return Object.assign({ success: true }, response);
    }
    async getFunctionUrl(deploymentId) {
        return await this.apiClient({
            action: 'url',
            payload: {
                deployment_id: deploymentId,
            },
        });
    }
    async removeDeployment() {
        return await this.apiClient({
            action: 'remove',
            payload: {
                stage: 'prod',
            },
        });
    }
    async listFunctions(deploymentId) {
        return await this.apiClient({
            action: 'listFunctions',
            payload: {
                stage: 'prod',
                deployment_id: deploymentId,
            },
        });
    }
    async listDeployments() {
        return await this.apiClient({
            action: 'listDeployments',
            payload: {
                stage: 'prod',
            },
        });
    }
}
exports.SecureResolver = SecureResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsNkJBQWlDO0FBRWpDLDRDQUE4QztBQUU5Qyw2Q0FBc0U7QUFvQnRFLE1BQU0sYUFBYSxHQUE0QjtJQUM3QyxjQUFjLEVBQUUsNkNBQTZDO0lBQzdELG9CQUFvQixFQUFFLDRCQUE0QjtJQUNsRCxlQUFlLEVBQUUsa0JBQWtCO0lBQ25DLHFCQUFxQixFQUFFLG9CQUFvQjtJQUMzQyxrQkFBa0IsRUFBRSx3QkFBd0I7SUFDNUMsT0FBTyxFQUFFLE1BQU07SUFDZixRQUFRLEVBQUUscUJBQXFCO0lBQy9CLGFBQWEsRUFBRSxnQkFBZ0I7SUFDL0IsU0FBUyxFQUFFO1FBQ1QsY0FBYyxFQUFFLHFDQUFxQztLQUN0RDtDQUNGLENBQUM7QUFTRixNQUFhLGNBQWM7SUFZekIsWUFBWSxNQUFnQzs7UUFDMUMsb0RBQW9EO1FBQ3BELG1FQUFtRTtRQUNuRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5GLElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsZUFBZSxDQUFBLElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsYUFBYSxDQUFBLEVBQUU7WUFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQywwRUFBMEUsQ0FBQyxDQUFDO1NBQzdGO1FBRUQsSUFBSSxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLGFBQWEsRUFBRTtZQUM5Qix1R0FBdUc7WUFDdkcsbUVBQW1FO1lBQ25FLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxD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QUksQ0FBQyxnQkFBZ0IsS0FFaEMsSUFBSSxDQUNMLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDL0IsdUJBQ0UsT0FBTyxFQUFFLEtBQUssSUFDWCxRQUFRLEVBQ1g7U0FDSDtRQUVELHVCQUNFLE9BQU8sRUFBRSxJQUFJLElBQ1YsUUFBUSxFQUNYO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBb0I7UUFDdkMsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQVE7WUFDakMsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUU7Z0JBQ1AsYUFBYSxFQUFFLFlBQVk7YUFDNUI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNwQixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBVztZQUNwQyxNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07YUFDZDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQW9CO1FBQ3RDLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFrQjtZQUMzQyxNQUFNLEVBQUUsZUFBZTtZQUN2QixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsYUFBYSxFQUFFLFlBQVk7YUFDNUI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWU7UUFDbkIsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQW9CO1lBQzdDLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxNQUFNO2FBQ2Q7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF6SkQsd0NBeUpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IFVSTCBhcyBVUkkgfSBmcm9tICd1cmwnO1xuXG5pbXBvcnQgeyBtYWtlUmVxdWVzdCB9IGZyb20gJ0BsdW5hc2VjL2NvbW1vbic7XG5cbmltcG9ydCB7IEdlbmVyaWNBcGlDbGllbnQsIG1ha2VHZW5lcmljQXBpQ2xpZW50IH0gZnJvbSAnLi9hcGktY2xpZW50JztcbmltcG9ydCB7IEJ1aWxkQWN0aW9uRnVuY3Rpb25Db25maWcgfSBmcm9tICcuL3R5cGVzJztcblxuaW50ZXJmYWNlIFNlY3VyZVJlc29sdmVyU2RrQ29uZmlnIHtcbiAgcmVmaW5lcnlTZWNyZXQ6IHN0cmluZztcbiAgcmVmaW5lcnlTZWNyZXRIZWFkZXI6IHN0cmluZztcbiAgY29udGFpbmVyU2VjcmV0OiBzdHJpbmc7XG4gIGNvbnRhaW5lclNlY3JldEhlYWRlcjogc3RyaW5nO1xuICBkZXBsb3ltZW50SURFbnZWYXI6IHN0cmluZztcbiAgYXBwX2Rpcjogc3RyaW5nO1xuICBsYW5ndWFnZTogc3RyaW5nO1xuICBmdW5jdGlvbnNQYXRoPzogc3RyaW5nO1xuICBmdW5jdGlvbnNDb25maWc/OiB7XG4gICAgZnVuY3Rpb25zOiBCdWlsZEFjdGlvbkZ1bmN0aW9uQ29uZmlnW107XG4gIH07XG4gIGVuZHBvaW50czoge1xuICAgIHNlY3VyZVJlc29sdmVyOiBzdHJpbmc7XG4gIH07XG59XG5cbmNvbnN0IGRlZmF1bHRDb25maWc6IFNlY3VyZVJlc29sdmVyU2RrQ29uZmlnID0ge1xuICByZWZpbmVyeVNlY3JldDogJ0FlSU1paDNzcUVZUlVxTHk0V1NfNUNYUDZqZGpNMGRDT05ycnktTWxYbjAnLFxuICByZWZpbmVyeVNlY3JldEhlYWRlcjogJ1JFRklORVJZX0RFUExPWU1FTlRfU0VDUkVUJyxcbiAgY29udGFpbmVyU2VjcmV0OiAnc2VjcmV0LXZhbHVlLTEyMycsXG4gIGNvbnRhaW5lclNlY3JldEhlYWRlcjogJ1gtQ29udGFpbmVyLVNlY3JldCcsXG4gIGRlcGxveW1lbnRJREVudlZhcjogJ1JFRklORVJZX0RFUExPWU1FTlRfSUQnLFxuICBhcHBfZGlyOiAnL2FwcCcsXG4gIGxhbmd1YWdlOiAnTm9kZS5qcyAxMCBUZW1wb3JhbCcsXG4gIGZ1bmN0aW9uc1BhdGg6ICdmdW5jdGlvbnMuanNvbicsXG4gIGVuZHBvaW50czoge1xuICAgIHNlY3VyZVJlc29sdmVyOiAnL2FwaS92MS9kZXBsb3ltZW50cy9zZWN1cmVfcmVzb2x2ZXInLFxuICB9LFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBGdW5jdGlvbkludm9jYXRpb25SZXN1bHQge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBlcnJvcj86IHN0cmluZztcbiAgY29tcGxldGVFcnJvcj86IHVua25vd247XG4gIHJlc3VsdD86IHVua25vd247XG59XG5cbmV4cG9ydCBjbGFzcyBTZWN1cmVSZXNvbHZlciB7XG4gIHJlYWRvbmx5IGNvbmZpZyE6IFNlY3VyZVJlc29sdmVyU2RrQ29uZmlnO1xuXG4gIHJlYWRvbmx5IGZ1bmN0aW9uQ29uZmlnIToge1xuICAgIGZ1bmN0aW9uczogQnVpbGRBY3Rpb25GdW5jdGlvbkNvbmZpZ1tdO1xuICB9O1xuXG4gIHJlYWRvbmx5IHJlZmluZXJ5SGVhZGVycyE6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIHJlYWRvbmx5IGNvbnRhaW5lckhlYWRlcnMhOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuXG4gIHJlYWRvbmx5IGFwaUNsaWVudCE6IEdlbmVyaWNBcGlDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnPzogU2VjdXJlUmVzb2x2ZXJTZGtDb25maWcpIHtcbiAgICAvLyBEZWVwIGNsb25lIHRoZSBjb25maWcgdG8gcHJldmVudCBuZXN0ZWQgbXV0YXRpb24uXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudFxuICAgIHRoaXMuY29uZmlnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q29uZmlnLCBjb25maWcpKSk7XG5cbiAgICBpZiAoIXRoaXMuY29uZmlnPy5mdW5jdGlvbnNDb25maWcgJiYgIXRoaXMuY29uZmlnPy5mdW5jdGlvbnNQYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBjcmVhdGUgU2VjdXJlIFJlc29sdmVyIFNESyB3aXRoIG1pc3NpbmcgZnVuY3Rpb24gY29uZmlndXJhdGlvbicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZz8uZnVuY3Rpb25zUGF0aCkge1xuICAgICAgLy8gVE9ETzogRXh0cmFjdCBpbnRvIGEgZnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgdGhlIHNjaGVtYSBvZiB0aGlzIG9yIHRocm93cyByZWFzb25hYmxlIGVycm9yIG1lc3NhZ2VzLlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudFxuICAgICAgdGhpcy5mdW5jdGlvbkNvbmZpZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHRoaXMuY29uZmlnLmZ1bmN0aW9uc1BhdGgsICd1dGY4JykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZz8uZnVuY3Rpb25zQ29uZmlnKSB7XG4gICAgICAvLyBUaGlzIHdpbGwgb3ZlcnJpZGUgYW55IHZhbHVlcyByZWFkIGZyb20gdGhlIGZpbGUsIGp1c3QgaW4gY2FzZS5cbiAgICAgIHRoaXMuZnVuY3Rpb25Db25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZ1bmN0aW9uQ29uZmlnLCB0aGlzLmNvbmZpZy5mdW5jdGlvbnNDb25maWcpO1xuICAgIH1cblxuICAgIHRoaXMucmVmaW5lcnlIZWFkZXJzID0ge1xuICAgICAgW3RoaXMuY29uZmlnLnJlZmluZXJ5U2VjcmV0SGVhZGVyXTogdGhpcy5jb25maWcucmVmaW5lcnlTZWNyZXQsXG4gICAgfTtcblxuICAgIHRoaXMuY29udGFpbmVySGVhZGVycyA9IHtcbiAgICAgIFt0aGlzLmNvbmZpZy5jb250YWluZXJTZWNyZXRIZWFkZXJdOiB0aGlzLmNvbmZpZy5jb250YWluZXJTZWNyZXQsXG4gICAgfTtcblxuICAgIHRoaXMuYXBpQ2xpZW50ID0gbWFrZUdlbmVyaWNBcGlDbGllbnQodGhpcy5jb25maWcuZW5kcG9pbnRzLnNlY3VyZVJlc29sdmVyLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMucmVmaW5lcnlIZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZGVwbG95KGNvbnRhaW5lclVyaTogc3RyaW5nKSB7XG4gICAgY29uc3QgZnVuY3Rpb25zID0gdGhpcy5mdW5jdGlvbkNvbmZpZ1snZnVuY3Rpb25zJ107XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpQ2xpZW50PCdidWlsZCc+KHtcbiAgICAgIGFjdGlvbjogJ2J1aWxkJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgc3RhZ2U6ICdwcm9kJyxcbiAgICAgICAgY29udGFpbmVyX3VyaTogY29udGFpbmVyVXJpLFxuICAgICAgICBsYW5ndWFnZTogdGhpcy5jb25maWcubGFuZ3VhZ2UsXG4gICAgICAgIGFwcF9kaXI6IHRoaXMuY29uZmlnLmFwcF9kaXIsXG4gICAgICAgIGZ1bmN0aW9uczogZnVuY3Rpb25zLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiByZXNwb25zZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgYXN5bmMgaW52b2tlKGZ1bmN0aW9uTmFtZTogc3RyaW5nLCBhcmdzOiBzdHJpbmcpOiBQcm9taXNlPEZ1bmN0aW9uSW52b2NhdGlvblJlc3VsdD4ge1xuICAgIGNvbnN0IGRlcGxveW1lbnRJZCA9IHByb2Nlc3MuZW52W3RoaXMuY29uZmlnLmRlcGxveW1lbnRJREVudlZhcl07XG4gICAgaWYgKGRlcGxveW1lbnRJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZSAke3RoaXMuY29uZmlnLmRlcGxveW1lbnRJREVudlZhcn0gaXMgbm90IHNldGApO1xuICAgIH1cblxuICAgIGNvbnN0IHVybFJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRGdW5jdGlvblVybChkZXBsb3ltZW50SWQpO1xuXG4gICAgaWYgKCF1cmxSZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IHVybFJlc3BvbnNlLmVycm9yLm1lc3NhZ2UsXG4gICAgICAgIGNvbXBsZXRlRXJyb3I6IHVybFJlc3BvbnNlLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgZnVuY3Rpb25fbmFtZTogZnVuY3Rpb25OYW1lLFxuICAgICAgYmxvY2tfaW5wdXQ6IGFyZ3MsXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNvbHZlclVybCA9IG5ldyBVUkkodXJsUmVzcG9uc2UuZGF0YS51cmwpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtYWtlUmVxdWVzdDx7IGVycm9yPzogc3RyaW5nOyByZXN1bHQ/OiB1bmtub3duIH0+KFxuICAgICAgcmVzb2x2ZXJVcmwuaG9zdCxcbiAgICAgIHJlc29sdmVyVXJsLnBhdGhuYW1lLFxuICAgICAge1xuICAgICAgICAuLi5yZXNvbHZlclVybCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuY29udGFpbmVySGVhZGVycyxcbiAgICAgIH0sXG4gICAgICBib2R5XG4gICAgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAuLi5yZXNwb25zZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAuLi5yZXNwb25zZSxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0RnVuY3Rpb25VcmwoZGVwbG95bWVudElkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5hcGlDbGllbnQ8J3VybCc+KHtcbiAgICAgIGFjdGlvbjogJ3VybCcsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGRlcGxveW1lbnRfaWQ6IGRlcGxveW1lbnRJZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyByZW1vdmVEZXBsb3ltZW50KCkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmFwaUNsaWVudDwncmVtb3ZlJz4oe1xuICAgICAgYWN0aW9uOiAncmVtb3ZlJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgc3RhZ2U6ICdwcm9kJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsaXN0RnVuY3Rpb25zKGRlcGxveW1lbnRJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYXBpQ2xpZW50PCdsaXN0RnVuY3Rpb25zJz4oe1xuICAgICAgYWN0aW9uOiAnbGlzdEZ1bmN0aW9ucycsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHN0YWdlOiAncHJvZCcsXG4gICAgICAgIGRlcGxveW1lbnRfaWQ6IGRlcGxveW1lbnRJZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsaXN0RGVwbG95bWVudHMoKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYXBpQ2xpZW50PCdsaXN0RGVwbG95bWVudHMnPih7XG4gICAgICBhY3Rpb246ICdsaXN0RGVwbG95bWVudHMnLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBzdGFnZTogJ3Byb2QnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19