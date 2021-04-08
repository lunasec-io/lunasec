import fs from 'fs';
import {
  makeRequest
} from './http';
import {URL as URI} from 'url';
import {makeGenericApiClient, GenericApiClient} from './api-client';

interface SecureResolverSdkConfig {
  refinerySecret: string,
  refinerySecretHeader: string,
  containerSecret: string,
  containerSecretHeader: string,
  deploymentIDEnvVar: string,
  app_dir: string,
  language: string,
  functions_path: string,
  endpoints: {
    secureResolver: string,
  }
}

const defaultConfig: SecureResolverSdkConfig = {
  refinerySecret: 'AeIMih3sqEYRUqLy4WS_5CXP6jdjM0dCONrry-MlXn0',
  refinerySecretHeader: 'REFINERY_DEPLOYMENT_SECRET',
  containerSecret: 'secret-value-123',
  containerSecretHeader: 'X-Container-Secret',
  deploymentIDEnvVar: 'REFINERY_DEPLOYMENT_ID',
  app_dir: '/app',
  language: 'Node.js 10 Temporal',
  functions_path: 'functions.json',
  endpoints: {
    secureResolver: '/api/v1/deployments/secure_resolver'
  }
};

export interface FunctionInvocationResult {
  success: boolean,
  error?: string,
  completeError?: object,
  result?: object
}

export class SecureResolver {
  readonly config!: SecureResolverSdkConfig;
  readonly refineryHeaders!: Record<string, string>;
  readonly containerHeaders!: Record<string, string>;

  readonly apiClient!: GenericApiClient;

  constructor(config?: SecureResolverSdkConfig) {
    this.config = Object.assign({}, defaultConfig, config);

    this.refineryHeaders = {
      [this.config.refinerySecretHeader]: this.config.refinerySecret
    };

    this.containerHeaders = {
      [this.config.containerSecretHeader]: this.config.containerSecret
    };

    this.apiClient = makeGenericApiClient(this.config.endpoints.secureResolver, {
      method: 'POST',
      headers: this.refineryHeaders
    });
  }

  async deploy(containerUri: string) {
    const data = await fs.promises.readFile(this.config.functions_path, 'utf8');

    // TODO: Extract into a function that processes the schema of this or throws reasonable error messages.
    const functionConfig = JSON.parse(data);

    const functions = functionConfig['functions'];

    const response = await this.apiClient<'build'>({
      action: 'build',
      payload: {
        stage: 'prod',
        container_uri: containerUri,
        language: this.config.language,
        app_dir: this.config.app_dir,
        functions: functions
      }
    });

    if (!response) {
      return {
        error: true,
        message: response
      };
    }

    return response;
  }

  async call(functionName: string, args: string): Promise<FunctionInvocationResult> {
    const deploymentId = process.env[this.config.deploymentIDEnvVar];
    if (deploymentId === undefined) {
      throw new Error(`the environment variable ${this.config.deploymentIDEnvVar} is not set`);
    }

    const urlResponse = await this.getFunctionUrl(deploymentId);

    if (!urlResponse.success || urlResponse.responseData === undefined) {
      return {
        success: false,
        error: urlResponse.errorMessage?.msg,
        completeError: urlResponse
      };
    }

    let body = JSON.stringify({
      function_name: functionName,
      block_input: args
    });

    const resolverUrl = new URI(urlResponse.responseData.url)

    const response = await makeRequest<{error?: string, result?: object}>(resolverUrl.pathname, {
      ...resolverUrl,
      method: 'POST',
      headers: this.containerHeaders
    }, body);

    if (!response || response.error) {
      return {
        success: false,
        ...response
      };
    }

    return {
      success: true,
      ...response
    };
  }

  async getFunctionUrl(deploymentId: string) {
    return await this.apiClient<'url'>({
      action: 'url',
      payload: {
        deployment_id: deploymentId
      }
    });
  }

  async removeDeployment() {
    return await this.apiClient<'remove'>({
      action: 'remove',
      payload: {
        stage: 'prod',
      }
    });
  }

  async listFunctions(deploymentId: string) {
    return await this.apiClient<'listFunctions'>({
      action: 'listFunctions',
      payload: {
        stage: 'prod',
        deployment_id: deploymentId
      }
    });
  }

  async listDeployments() {
    return await this.apiClient<'listDeployments'>({
      action: 'listDeployments',
      payload: {
        stage: 'prod'
      }
    });
  }
}
