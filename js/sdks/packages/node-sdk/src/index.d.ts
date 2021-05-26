import { GenericApiClient } from './api-client';
import { BuildActionFunctionConfig } from './types';
interface SecureResolverSdkConfig {
    refinerySecret: string;
    refinerySecretHeader: string;
    containerSecret: string;
    containerSecretHeader: string;
    deploymentIDEnvVar: string;
    app_dir: string;
    language: string;
    functionsPath?: string;
    functionsConfig?: {
        functions: BuildActionFunctionConfig[];
    };
    endpoints: {
        secureResolver: string;
    };
}
export interface FunctionInvocationResult {
    success: boolean;
    error?: string;
    completeError?: unknown;
    result?: unknown;
}
export declare class SecureResolver {
    readonly config: SecureResolverSdkConfig;
    readonly functionConfig: {
        functions: BuildActionFunctionConfig[];
    };
    readonly refineryHeaders: Record<string, string>;
    readonly containerHeaders: Record<string, string>;
    readonly apiClient: GenericApiClient;
    constructor(config?: SecureResolverSdkConfig);
    deploy(containerUri: string): Promise<import("./api-client").SecureEnclaveFailApiResponse | import("./api-client").SecureEnclaveSuccessApiResponse<import("./types").BuildResolverResponse> | {
        error: boolean;
        message: never;
    }>;
    invoke(functionName: string, args: string): Promise<FunctionInvocationResult>;
    getFunctionUrl(deploymentId: string): Promise<import("./api-client").SecureEnclaveFailApiResponse | import("./api-client").SecureEnclaveSuccessApiResponse<import("./types").GetResolverUrlResponse>>;
    removeDeployment(): Promise<import("./api-client").SecureEnclaveFailApiResponse | import("./api-client").SecureEnclaveSuccessApiResponse<import("./types").RemoveResolverResponse>>;
    listFunctions(deploymentId: string): Promise<import("./api-client").SecureEnclaveFailApiResponse | import("./api-client").SecureEnclaveSuccessApiResponse<import("./types").ListFunctionsResponse>>;
    listDeployments(): Promise<import("./api-client").SecureEnclaveFailApiResponse | import("./api-client").SecureEnclaveSuccessApiResponse<import("./types").ListDeploymentsResponse>>;
}
export {};
//# sourceMappingURL=index.d.ts.map