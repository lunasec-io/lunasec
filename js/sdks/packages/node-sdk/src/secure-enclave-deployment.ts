import fs from "fs";

export class SecureEnclaveDeployment {
  async deploy(containerUri: string) {
    const deployFunction = this.functionStageLookup[this.config.stage].deploy;
    return deployFunction(containerUri);
  }

  async deployDev(containerUri: string) {
    // TODO (cthompson) call into the docker container modifier cli to modify the container
    console.log(containerUri);
  }

  async deployProd(containerUri: string) {
    if (!this.config.configPath) {
      throw new Error("Unable to deploy Secure Resolver: no configuration path specified")
    }

    // TODO (cthompson) cleanly handle potential errors thrown here
    const functionConfig = JSON.parse(fs.readFileSync(this.config.configPath, 'utf8'));

    const functions = functionConfig['functions'];

    if (!this.config.language) {
      throw new Error("Unable to deploy Secure Resolver: no language provided")
    }

    if (!this.config.appDir) {
      throw new Error("Unable to deploy Secure Resolver: no container application directory specified")
    }

    const response = await this.apiClient<'build'>({
      action: 'build',
      payload: {
        stage: 'prod',
        container_uri: containerUri,
        language: this.config.language,
        app_dir: this.config.appDir,
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
