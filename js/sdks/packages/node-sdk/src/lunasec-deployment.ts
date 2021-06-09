import {ProjectDeploymentClient} from "./project-deployment-client";
import assert from "assert";
import {
  DeploymentInfo,
  DeploymentStage,
  DeploymentState, GetDeploymentOptions,
  GetDeploymentsOptions,
  LunaSecDeploymentTemplates
} from "./types";
import {__DEPLOYMENT_SECRET__, __DEPLOYMENT_SERVER_URL__} from "./constants";
import {LunaSecDeploymentJSON} from "./deployment-json-types";

interface LunaSecDeploymentConfig {
  projectName?: string
  projectTemplate: LunaSecDeploymentTemplates;
  projectId?: string;
  projectVersion?: number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class LunaSecDeployment {
  config: LunaSecDeploymentConfig;
  client: ProjectDeploymentClient;

  constructor(config: LunaSecDeploymentConfig) {
    this.config = config;

    this.client = new ProjectDeploymentClient(
      __DEPLOYMENT_SERVER_URL__, __DEPLOYMENT_SECRET__
    );
  }

  async deployDev() {
    // TODO (cthompson) for each template
    console.log("hello");
  }

  async createProject() {
    assert(this.config.projectName !== undefined, "create project was called when projectName is undefined");

    const resp = await this.client.createProject({
      project_name: this.config.projectName
    })

    if (!resp.success) {
      throw new Error(`unable to create project: name: ${this.config.projectName} error: ${resp.error}`);
    }

    if (!resp.new_project) {
      throw new Error(`project with name ${this.config.projectName} already exists with the ID ${resp.project_id}`);
    }

    this.config.projectId = resp.project_id;
  }

  async buildProject(stage: DeploymentStage) {
    assert(this.config.projectId !== undefined, "build project was called when projectId is undefined");

    const resp = await this.client.buildProject({
      stage: stage,
      project_id: this.config.projectId,
      template_name: this.config.projectTemplate,
      inputs: {}
    })

    if (!resp.success) {
      throw new Error(`unable to build project: name: ${this.config.projectName} id: ${this.config.projectId} error: ${resp.error}`);
    }

    this.config.projectVersion = resp.project_version;
  }

  async deployProject(stage: DeploymentStage): Promise<string> {
    assert(this.config.projectId !== undefined, "deploy project was called when projectId is undefined");
    assert(this.config.projectVersion !== undefined, "deploy project was called when projectVersion is undefined");

    const resp = await this.client.deployProject({
      stage: stage,
      project_id: this.config.projectId,
      project_version: this.config.projectVersion
    })

    if (!resp.success) {
      throw new Error(`unable to deploy project: name: ${this.config.projectName} id: ${this.config.projectId} version: ${this.config.projectVersion} error: ${resp.error}`);
    }

    return resp.deployment_id;
  }

  async deploymentCompleted(deploymentId: string): Promise<boolean> {
    assert(this.config.projectId !== undefined, "projectId is undefined when attempting to get deployment info");

    const resp = await this.client.getProjectDeployment({
      deployment_id: deploymentId,
    })

    if (!resp.success) {
      throw new Error(`unable to get deployed resouces: name: ${this.config.projectName} id: ${this.config.projectId} version: ${this.config.projectVersion}`);
    }

    if (resp.state === DeploymentState.FAILED) {
      throw new Error(`unable to complete deployment, experienced error: ${resp.log}`);
    }
    return resp.state === DeploymentState.SUCCEEDED;
  }


  async deployProd(): Promise<string> {
    const stage = DeploymentStage.PROD;

    if (this.config.projectId === undefined) {
      console.log(`Creating a new project named: ${this.config.projectName}...`);
      await this.createProject();
    }

    if (this.config.projectVersion === undefined) {
      console.log(`Building project: ${this.config.projectName} - ${this.config.projectId}...`);
      await this.buildProject(stage);
    }

    console.log(`Deploying built project version: ${this.config.projectName} - ${this.config.projectVersion}...`);
    const deploymentId = await this.deployProject(stage);

    console.log(`Deployment started: ${deploymentId}, waiting for deployment to complete...`);
    while (true) {
      const succeeded = await this.deploymentCompleted(deploymentId);
      if (succeeded) {
        break;
      }
      await sleep(5000);
    }
    console.log(`Deployment has completed successfully!`);
    return deploymentId;
  }

  async getDeployments(options: GetDeploymentsOptions): Promise<LunaSecDeploymentJSON[]> {
    assert(this.config.projectId !== undefined, "projectId is undefined when attempting to get deployed resources");

    const resp = await this.client.getProjectDeployments({
      project_id: this.config.projectId,
      deployment_tag: options.deploymentTag,
      stage: options.stage
    });

    if (!resp.success) {
      throw new Error(`unable to get deployments: name: ${this.config.projectName} id: ${this.config.projectId} version: ${this.config.projectVersion}`);
    }

    return resp.deployments;
  }

  async getDeployment(options: GetDeploymentOptions): Promise<DeploymentInfo> {
    const resp = await this.client.getProjectDeployment({
      deployment_id: options.deploymentId,
      deployment_tag: options.deploymentTag,
    })

    if (!resp.success) {
      throw new Error(`unable to get deployment: deploymentId: ${options.deploymentId} deploymentTag: ${options.deploymentTag}`);
    }

    return resp;
  }
}
