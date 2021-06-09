import {SecureResolverCallError} from "./errors";
import {
  SecureResolverClient,
  SecureResolverResponse
} from "./secure-resolver-client";
import {__CONTAINER_SECRET__} from "./constants";
import {DeploymentStage} from "./types";
import {LunaSecDeployment} from "./lunasec-deployment";
import assert from "assert";

interface SecureResolverConfig {
  stage: string;
  projectName: string;
  projectId: string;
  deploymentTag: string;
  url?: string;
  appDir?: string;
  language?: string;
  configPath?: string;
}

/*
const defaultConfig: SecureResolverConfig = {
  stage: DeploymentStage.DEV,
  projectName: 'secure-resolver',
  projectId: '',
  appDir: '/app',
  language: 'Node.js 10 Temporal',
  configPath: 'lunasec.json',
};
 */

export class SecureResolver {
  readonly config!: SecureResolverConfig;

  client: SecureResolverClient | undefined;

  constructor(config: SecureResolverConfig) {
    this.config = config;
  }

  async init() {
    if (this.config.url === undefined) {
      this.config.url = await this.getSecureResolverURL();
    }

    this.client = new SecureResolverClient(this.config.url, __CONTAINER_SECRET__);
  }

  async getSecureResolverURL(): Promise<string> {
    const deploymentClient = new LunaSecDeployment({
      projectName: this.config.projectName,
      projectId: this.config.projectId,
      projectTemplate: 'secure-resolver'
    })

    const deployment = await deploymentClient.getDeployment(
      {deploymentTag: this.config.deploymentTag});

    const matchingWorkflowStates = deployment.deployment_json.deployment_json.workflow_states.filter((value) => {
      return value.name === "/execute";
    });

    if (matchingWorkflowStates.length !== 1) {
      throw new Error(`did not find exactly one secure resolver URL for deployment: deployment tag: ${this.config.deploymentTag} workflow states: ${matchingWorkflowStates}`);
    }

    const secureResolverExecuteURL = matchingWorkflowStates[0];
    if (secureResolverExecuteURL.url === undefined) {
      throw new Error(`secure resolver url is undefined: ${secureResolverExecuteURL}`);
    }
    return secureResolverExecuteURL.url;
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
        const resp = await this.call(fn.name, args);

        if (resp.error !== undefined) {
          const e = new SecureResolverCallError(`${resp.error} - ${resp.completeError}`);
          console.error(e);
          return undefined;
        }

        return <U> resp.result;
      } catch(e) {
        console.error(e);
        return undefined;
      }
    }
  }

  async call(functionName: string, args: any): Promise<SecureResolverResponse> {
    if (this.config.stage === DeploymentStage.PROD) {
      return this.callProd(functionName, args);
    }
    return this.callDev(functionName, args);
  }

  async callDev(functionName: string, args: any): Promise<SecureResolverResponse> {
    assert(this.client !== undefined, "call to secure resolver before call to SecureResolver.init()");

    return await this.client.executeLocal({
      function_name: functionName,
      block_input: args,
    });
  }

  async callProd(functionName: string, args: any): Promise<SecureResolverResponse> {
    assert(this.client !== undefined, "call to secure resolver before call to SecureResolver.init()");

    return await this.client.execute({
      function_name: functionName,
      block_input: args,
    });
  }
}
