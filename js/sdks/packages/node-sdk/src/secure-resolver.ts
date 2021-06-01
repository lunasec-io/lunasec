import { URL as URI } from 'url';
import {Pretend} from "pretend";

import { makeRequest } from '@lunasec/server-common';

import { GenericApiClient } from './api-client';
import { BuildActionFunctionConfig } from './types';
import {__CONTAINER_SECRET__, __DEPLOYMENT_SECRET__} from "./constants";
import * as http from "http";
import {SecureResolverClient} from "./secure-resolver-client";


const refinerySecretHeader: string = 'REFINERY_DEPLOYMENT_SECRET';
const deploymentIDEnvVar: string = 'REFINERY_DEPLOYMENT_ID';
const containerSecretHeader: string = 'X-Container-Secret';

class SecureResolverCallError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = SecureResolverCallError.name; // stack traces display correctly now
  }
}

export enum DeploymentStage {
  DEV = 'DEV',
  PROD = 'PROD'
}


interface SecureResolverSdkConfig {
  stage: DeploymentStage;
  deploymentId?: string;
  appDir?: string;
  language?: string;
  configPath?: string;
}

const defaultConfig: SecureResolverSdkConfig = {
  stage: DeploymentStage.DEV,
  appDir: '/app',
  language: 'Node.js 10 Temporal',
  configPath: 'lunasec.json',
};

export interface FunctionInvocationResult {
  success: boolean;
  error?: string;
  completeError?: unknown;
  result?: unknown;
}

interface SecureResolverFunctions {
  deploy: (containerUri: string) => void;
  call: (functionName: string, args: any) => Promise<FunctionInvocationResult>;
}

async function fetch(requestOptions: http.RequestOptions, body?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = http.request({...requestOptions, timeout: 2000}, (res) => {
      if (res.statusCode && (res.statusCode < 200 || res.statusCode > 299)) {
        return reject(new Error(`HTTP status code ${res.statusCode}`))
      }

      const body: Array<Uint8Array> = [];
      res.on('data', (chunk) => body.push(chunk));
      res.on('end', () => {
        const resString = Buffer.concat(body).toString()
        resolve(resString)
      });
    })

    request.on('error', (err) => {
      reject(err)
    })
    request.on('timeout', () => {
      request.destroy()
      reject(new Error('timed out'))
    })
    if (body !== undefined) {
      request.write(body);
      request.end();
    }
  })
}

export class SecureResolver {
  readonly config!: SecureResolverSdkConfig;

  readonly functionConfig!: {
    projectID: string;
    functions: BuildActionFunctionConfig[];
  };

  readonly refineryHeaders!: Record<string, string>;
  readonly containerHeaders!: Record<string, string>;

  readonly apiClient!: GenericApiClient;

  readonly functionStageLookup: Record<DeploymentStage, SecureResolverFunctions> = {
    [DeploymentStage.DEV]: {
      call: this.callDev,
      deploy: this.deployDev,
    },
    [DeploymentStage.PROD]: {
      call: this.callProd,
      deploy: this.deployProd,
    }
  };

  constructor(config: SecureResolverSdkConfig) {
    // Deep clone the config to prevent nested mutation.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.config = JSON.parse(JSON.stringify(Object.assign({}, defaultConfig, config)));

    const deploymentId = process.env[deploymentIDEnvVar];
    if (deploymentId !== undefined) {
      this.config.deploymentId = deploymentId;
    }

    if (deploymentId === undefined) {
      throw new Error("Secure Resolver SDK cannot be initialized: deployment ID is not set in config or environment");
    }

    this.refineryHeaders = {
      [refinerySecretHeader]: __DEPLOYMENT_SECRET__,
    };

    this.containerHeaders = {
      [containerSecretHeader]: __CONTAINER_SECRET__,
    };

    this.apiClient = Pretend
      .builder()
      .target(SecureResolverClient, secureResolverDeploymentURL);
  }


  secureImport(moduleName: string): any {
    const importedModule = require(moduleName);
    const exports = Object.keys(importedModule);
    return exports.reduce((wrappedExports, _export) => {
      const newExport = (typeof _export === 'function') ? this.wrap(_export) : _export;
      return {
        ...wrappedExports,
        newExport,
      }
    }, {});
  }

  wrap <T extends Array<any>, U>(fn: (...args: T) => U) {
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
        return <U> res.result;
      } catch(e) {
        console.error(e);
        return undefined;
      }
    }
  }

  async call(functionName: string, args: any): Promise<FunctionInvocationResult> {
    const callFunction = this.functionStageLookup[this.config.stage].call;
    return callFunction(functionName, args);
  }

  async callDev(functionName: string, args: any): Promise<FunctionInvocationResult> {
    const data = JSON.stringify({
      function_name: functionName,
      block_input: args,
    });
    try {
      const res = await fetch({
        host: "localhost",
        port: 9001,
        path: "/2015-03-31/functions/function/invocations",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        },
      }, data);
      return {
        success: true,
        result: JSON.parse(res).result
      }
    } catch(e) {
      console.error(e);
      return {
        success: false,
        error: e
      }
    }
  }

  async callProd(functionName: string, args: any): Promise<FunctionInvocationResult> {
    if (!this.config.deploymentId) {
      throw new SecureResolverCallError("deployment ID is not configured")
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
}
