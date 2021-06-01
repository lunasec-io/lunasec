import {Delete, FormData, Get, Headers, Post, Put} from "pretend";

const deploymentEndpoint: string = '/api/v1/deployments/secure_enclave';

class DeploymentClient {
  @Post(deploymentEndpoint)
  public async post(body: any) {}
}
