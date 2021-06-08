import {
  IRestResponse,
  RestClient
} from 'typed-rest-client/RestClient';
import {IRequestOptions} from "typed-rest-client/Interfaces";

const containerSecretHeader: string = 'X-Container-Secret';

export interface SecureResolverRequest {
  function_name: string,
  block_input: any[],
}

export interface SecureResolverResponse {
  error?: string;
  completeError?: unknown;
  result?: unknown;
}

function checkResponse<T>(resp: IRestResponse<T>): T {
  if (resp.result === null || resp.statusCode !== 200) {
    throw new Error(`request did not succeed (status code: ${resp.statusCode})`)
  }
  return resp.result
}

export class SecureResolverClient {
  private client: RestClient;
  constructor(secureResolverURL: string, containerSecret: string) {
    const requestOptions: IRequestOptions = {
      headers: {
        [containerSecretHeader]: containerSecret
      }
    };

    this.client = new RestClient(
      "lunasec-node-sdk",
      secureResolverURL,
      [],
      requestOptions
    )
  }

  public async execute(req: SecureResolverRequest): Promise<SecureResolverResponse> {
    const resp = await this.client.create<SecureResolverResponse>(
      "/", req
    )
    return checkResponse<SecureResolverResponse>(resp);
  }

  public async executeLocal(req: SecureResolverRequest): Promise<SecureResolverResponse> {
    const resp = await this.client.create<SecureResolverResponse>(
      "/2015-03-31/functions/function/invocations", req
    )
    return checkResponse<SecureResolverResponse>(resp);
  }
}
