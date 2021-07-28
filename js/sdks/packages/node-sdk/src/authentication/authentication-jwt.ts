export class AuthenticationJWT {
  private readonly jwt!: string;

  constructor(jwt: string) {
    this.jwt = jwt;
  }

  public isValid(): boolean {
    // TODO: Check the current date against the expiration
    throw new Error('not implemented');
  }

  public toString() {
    return this.jwt;
  }
}
