import fs from 'fs';
import { URL as URI } from 'url';

import { makeRequest } from '@lunasec/common';

import { GenericApiClient, makeGenericApiClient } from './api-client';
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

const defaultConfig: SecureResolverSdkConfig = {
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

export interface FunctionInvocationResult {
  success: boolean;
  error?: string;
  completeError?: unknown;
  result?: unknown;
}

export class SecureResolver {
  readonly config!: SecureResolverSdkConfig;

  readonly functionConfig!: {
    functions: BuildActionFunctionConfig[];
  };

  readonly refineryHeaders!: Record<string, string>;
  readonly containerHeaders!: Record<string, string>;

  readonly apiClient!: GenericApiClient;

  constructor(config?: SecureResolverSdkConfig) {
    // Deep clone the config to prevent nested mutation.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.config = JSON.parse(JSON.stringify(Object.assign({}, defaultConfig, config)));

    if (!this.config?.functionsConfig && !this.config?.functionsPath) {
      throw new Error('Unable to create Secure Resolver SDK with missing function configuration');
    }

    if (this.config?.functionsPath) {
      // TODO: Extract into a function that processes the schema of this or throws reasonable error messages.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.functionConfig = JSON.parse(fs.readFileSync(this.config.functionsPath, 'utf8'));
    }

    if (this.config?.functionsConfig) {
      // This will override any values read from the file, just in case.
      this.functionConfig = Object.assign({}, this.functionConfig, this.config.functionsConfig);
    }

    this.refineryHeaders = {
      [this.config.refinerySecretHeader]: this.config.refinerySecret,
    };

    this.containerHeaders = {
      [this.config.containerSecretHeader]: this.config.containerSecret,
    };

    this.apiClient = makeGenericApiClient(this.config.endpoints.secureResolver, {
      method: 'POST',
      headers: this.refineryHeaders,
    });
  }

  async deploy(containerUri: string) {
    const functions = this.functionConfig['functions'];

    const response = await this.apiClient<'build'>({
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

  async invoke(functionName: string, args: string): Promise<FunctionInvocationResult> {
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

    const resolverUrl = new URI(urlResponse.data.url);

    const response = await makeRequest<{ error?: string; result?: unknown }>(
      resolverUrl.host,
      resolverUrl.pathname,
      {
        ...resolverUrl,
        method: 'POST',
        headers: this.containerHeaders,
      },
      body
    );

    if (!response || response.error) {
      return {
        success: false,
        ...response,
      };
    }

    return {
      success: true,
      ...response,
    };
  }

  async getFunctionUrl(deploymentId: string) {
    return await this.apiClient<'url'>({
      action: 'url',
      payload: {
        deployment_id: deploymentId,
      },
    });
  }

  async removeDeployment() {
    return await this.apiClient<'remove'>({
      action: 'remove',
      payload: {
        stage: 'prod',
      },
    });
  }

  async listFunctions(deploymentId: string) {
    return await this.apiClient<'listFunctions'>({
      action: 'listFunctions',
      payload: {
        stage: 'prod',
        deployment_id: deploymentId,
      },
    });
  }

  async listDeployments() {
    return await this.apiClient<'listDeployments'>({
      action: 'listDeployments',
      payload: {
        stage: 'prod',
      },
    });
  }
}
