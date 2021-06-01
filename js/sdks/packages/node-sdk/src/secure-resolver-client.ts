import {Post} from "pretend";

export class SecureResolverClient {
  @Post('/execute/{id}')
  public async execute(body: any) {}
}
