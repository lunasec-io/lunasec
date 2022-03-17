/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import fs from 'fs';
import { URL as URI } from 'url';

import { makeRequest, safeParseJson } from '@lunasec/server-common';

import {
  GenericApiClient,
  makeGenericApiClient,
  SecureEnclaveFailApiResponse,
  SecureEnclaveSuccessApiResponse,
} from '../api/client';
import { BuildResolverResponse } from '../api/types';
import { fetch } from '../fetch';

import { deploymentEndpoint } from './constants';
import { DeploymentStage, FunctionConfig, SecureResolverSdkConfig } from './types';

class SecureResolverCallError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = SecureResolverCallError.name; // stack traces display correctly now
  }
}

export interface FunctionInvocationResult {
  success: boolean;
  error?: string;
  completeError?: unknown;
  result?: unknown;
}

interface SecureResolverFunctions {
  deploy: (
    containerUri: string
  ) => Promise<SecureEnclaveFailApiResponse | SecureEnclaveSuccessApiResponse<BuildResolverResponse>>;
  call: (functionName: string, args: unknown) => Promise<FunctionInvocationResult>;
}

export class SecureResolver {
  readonly config!: SecureResolverSdkConfig;

  readonly functionConfig!: FunctionConfig;

  readonly refineryHeaders!: Record<string, string>;
  readonly containerHeaders!: Record<string, string>;

  readonly apiClient!: GenericApiClient;

  readonly functionStageLookup: Record<DeploymentStage, SecureResolverFunctions> = {
    [DeploymentStage.DEV]: {
      call: (functionName, args) => this.callDev(functionName, args),
      deploy: (containerUri) => this.deployDev(containerUri),
    },
    [DeploymentStage.PROD]: {
      call: (functionName, args) => this.callProd(functionName, args),
      deploy: (containerUri) => this.deployProd(containerUri),
    },
  };

  constructor(config: SecureResolverSdkConfig) {
    // Deep clone the config to prevent nested mutation.
    this.config = config;

    if (this.config.deploymentId === undefined) {
      throw new Error('Secure Resolver SDK cannot be initialized: deployment ID is not set in config ');
    }

    if (!this.config?.functionsConfig && !this.config?.functionsConfigPath) {
      throw new Error('Unable to create Secure Resolver SDK with missing function configuration');
    }

    if (this.config?.functionsConfigPath) {
      // TODO: Extract into a function that processes the schema of this or throws reasonable error messages.
      this.functionConfig = JSON.parse(fs.readFileSync(this.config.functionsConfigPath, 'utf8'));
    }

    if (this.config?.functionsConfig) {
      // This will override any values read from the file, just in case.
      this.functionConfig = Object.assign({}, this.functionConfig, this.config.functionsConfig);
    }

    this.refineryHeaders = {
      refinerySecretHeader: config.deploymentSecret,
    };

    this.containerHeaders = {
      containerSecretHeader: config.containerHeaders,
    };

    this.apiClient = makeGenericApiClient(this.config.deploymentUrl, deploymentEndpoint, {
      method: 'POST',
      headers: this.refineryHeaders,
    });
  }

  // TODO: Disabled until we identify how this should actually work (it should probably use import instead of require)
  // We don't want to ship this in an unused state and then have to fix it when some customer relies on it...
  // secureImport(moduleName: string): unknown {
  //   const importedModule = require(moduleName);
  //   const exports = Object.keys(importedModule);
  //   return exports.reduce((wrappedExports, _export) => {
  //     const newExport = typeof _export === 'function' ? this.wrap(_export) : _export;
  //     return {
  //       ...wrappedExports,
  //       newExport,
  //     };
  //   }, {});
  // }

  wrap<T extends Array<unknown>, U>(fn: (...args: T) => U) {
    return async (...args: T): Promise<U | undefined> => {
      // TODO (cthompson) we catch all errors here as a convenience to the caller so they don't have to change their code that much
      // is this a good idea?
      try {
        const res = await this.call(fn.name, args);
        if (!res.success) {
          const e = new SecureResolverCallError(res.error);
          console.error(e);
          return undefined;
        }
        return <U>res.result;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    };
  }

  async deploy(containerUri: string) {
    const deployFunction = this.functionStageLookup[this.config.stage].deploy;
    return await deployFunction(containerUri);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deployDev(
    containerUri: string
  ): Promise<SecureEnclaveFailApiResponse | SecureEnclaveSuccessApiResponse<BuildResolverResponse>> {
    // TODO (cthompson) call into the docker container modifier cli to modify the container
    console.log(containerUri);
    throw new Error('Not implemented yet');
  }

  async deployProd(
    containerUri: string
  ): Promise<SecureEnclaveFailApiResponse | SecureEnclaveSuccessApiResponse<BuildResolverResponse>> {
    if (!this.config.language) {
      throw new Error('Unable to deploy Secure Resolver: no language provided');
    }

    if (!this.config.appDir) {
      throw new Error('Unable to deploy Secure Resolver: no container application directory specified');
    }

    const response = await this.apiClient<'build'>({
      action: 'build',
      payload: {
        stage: 'prod',
        container_uri: containerUri,
        language: this.config.language,
        app_dir: this.config.appDir,
        functions: this.functionConfig.functions,
      },
    });

    if (!response) {
      return {
        success: false,
        error: response,
      };
    }

    return response;
  }

  async call(functionName: string, args: unknown): Promise<FunctionInvocationResult> {
    const callFunction = this.functionStageLookup[this.config.stage].call;
    return callFunction(functionName, args);
  }

  async callDev(functionName: string, functionArgs: unknown): Promise<FunctionInvocationResult> {
    const data = JSON.stringify({
      function_name: functionName,
      block_input: functionArgs,
    });
    try {
      const res = await fetch(
        {
          host: 'localhost',
          port: 9001,
          path: '/2015-03-31/functions/function/invocations',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
          },
        },
        data
      );

      if (!res.success) {
        return {
          success: false,
          error: res.errorType,
          completeError: res.error,
        };
      }

      // TODO: Add schema validation during parsing
      const response = safeParseJson<unknown>(res.body);

      return {
        success: true,
        result: response,
      };
    } catch (e) {
      console.error('Unable to call function:', e);
      return {
        success: false,
        error: e as string,
      };
    }
  }

  async callProd(functionName: string, functionArgs: unknown): Promise<FunctionInvocationResult> {
    if (!this.config.deploymentId) {
      throw new SecureResolverCallError('deployment ID is not configured');
    }

    const urlResponse = await this.getFunctionUrl(this.config.deploymentId);

    if (!urlResponse.success) {
      return {
        success: false,
        error: urlResponse.error.message,
        completeError: urlResponse,
      };
    }

    const body = JSON.stringify({
      function_name: functionName,
      block_input: functionArgs,
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
