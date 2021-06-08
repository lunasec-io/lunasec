import {
  IRestResponse,
  RestClient
} from 'typed-rest-client/RestClient';
import {IRequestOptions} from "typed-rest-client/Interfaces";
import {
  DeploymentStage,
  DeploymentState,
  DeploymentTemplateInputs
} from "./types";
import {LunaSecDeploymentJSON} from "./deployment-json-types";

const apiBaseEndpoint: string = '/api/v1/';

interface BaseResponse {
  success: boolean;
  error: string;
}

interface CreateProjectRequest {
  project_name: string;
}

interface CreateProjectResponse extends BaseResponse {
  project_id: string;
  new_project: boolean;
}

interface BuildProjectRequest {
  template_name: string;
  inputs: DeploymentTemplateInputs;
  stage: DeploymentStage;
  project_id: string;
}

interface BuildProjectResponse extends BaseResponse {
  project_version: number;
}

interface DeployProjectRequest {
  stage: DeploymentStage;
  project_id: string;
  project_version: number;
}

interface DeployProjectResponse extends BaseResponse {
  deployment_id: string;
}

interface GetProjectDeploymentsRequest {
  project_id: string;
  stage?: string;
  deployment_tag?: string;
}

interface GetProjectDeploymentsResponse extends BaseResponse {
  deployments: LunaSecDeploymentJSON[];
}

interface GetProjectDeploymentRequest {
  deployment_id: string;
}

interface GetProjectDeploymentResponse extends BaseResponse {
  project_id: string;
  organization_id: string;
  deployment_json: LunaSecDeploymentJSON;
  state: DeploymentState;
  log: string;
  tag: string;
}

function apiURL(path: string): string {
  return apiBaseEndpoint + path;
}

function checkResponse<T>(resp: IRestResponse<T>): T {
  if (resp.result === null || resp.statusCode !== 200) {
    throw new Error(`request did not succeed (status code: ${resp.statusCode})`)
  }
  return resp.result
}

export class ProjectDeploymentClient {
  private client: RestClient;
  constructor(apiURL: string, secret: string) {
    const requestOptions: IRequestOptions = {
      headers: {
        "REFINERY_DEPLOYMENT_SECRET": secret
      }
    };

    this.client = new RestClient(
      "lunasec-node-sdk",
      apiURL,
      [],
      requestOptions
    )
  }

  public async createProject(req: CreateProjectRequest): Promise<CreateProjectResponse> {
    const resp = await this.client.create<CreateProjectResponse>(
      apiURL("/project/create"), req
    )
    return checkResponse<CreateProjectResponse>(resp);
  }

  public async buildProject(req: BuildProjectRequest): Promise<BuildProjectResponse> {
    const resp = await this.client.create<BuildProjectResponse>(
      apiURL("/project/build"), req
    )
    return checkResponse<BuildProjectResponse>(resp);
  }

  public async deployProject(req: DeployProjectRequest): Promise<DeployProjectResponse> {
    const resp = await this.client.create<DeployProjectResponse>(
      apiURL("/project/deploy"), req
    )
    return checkResponse<DeployProjectResponse>(resp);
  }

  public async getProjectDeployments(req: GetProjectDeploymentsRequest): Promise<GetProjectDeploymentsResponse> {
    const resp = await this.client.create<GetProjectDeploymentsResponse>(
      apiURL("/project/deployments"), req
    )
    return checkResponse<GetProjectDeploymentsResponse>(resp);
  }

  public async getProjectDeployment(req: GetProjectDeploymentRequest): Promise<GetProjectDeploymentResponse> {
    const resp = await this.client.create<GetProjectDeploymentResponse>(
      apiURL("/project/deployment"), req
    )
    return checkResponse<GetProjectDeploymentResponse>(resp);
  }
}
