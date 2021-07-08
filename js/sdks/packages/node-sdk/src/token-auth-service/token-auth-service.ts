import {isToken, Tokenizer} from '@lunasec/tokenizer-sdk';
import { KeyLike, SignJWT } from 'jose/jwt/sign';
import { JWTPayload } from 'jose/types';


import { getSecretFromSecretProvider, ValidSecretProvider } from './types';


export class LunaSecAuthenticationGrant {
  private readonly authGrant!: string;

  constructor(authGrant: string) {
    this.authGrant = authGrant;
  }

  public isValid(): boolean {
    // TODO: Check the current date against the expiration
    throw new Error('not implemented');
  }

  public toString() {
    return this.authGrant;
  }
}

export interface TokenAuthServiceConfig {
  secretProvider: ValidSecretProvider;
}

export class LunaSecTokenAuthService {
  private readonly config!: TokenAuthServiceConfig;

  constructor(config: TokenAuthServiceConfig) {
    this.config = config;
  }

  async getSigningSecretKey(): Promise<KeyLike> {
    // This is the simplest way to reduce the copy-paste code of the code below :shrug:
    // Would a @ts-ignore have been a better solution?
    function _getSecret<T, TFoo extends (provider: T) => Promise<KeyLike>>(providerFn: TFoo, provider: T) {
      return providerFn(provider);
    }

    if (this.config.secretProvider.type === 'awsSecretsManager') {
      return await _getSecret(getSecretFromSecretProvider[this.config.secretProvider.type], this.config.secretProvider);
    }

    if (this.config.secretProvider.type === 'environment') {
      return await _getSecret(getSecretFromSecretProvider[this.config.secretProvider.type], this.config.secretProvider);
    }

    throw new Error('Unknown provider specified');
  }

  private async createJwt(claims: any): Promise<string> {
    const secret = await this.getSigningSecretKey();

    const jwt = await new SignJWT(claims)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setIssuer('node-sdk')
      .setAudience('secure-frame')
      .setExpirationTime('15m')
      .sign(secret);

    return jwt.toString();
  }

  public async authenticate(payload: JWTPayload): Promise<LunaSecAuthenticationGrant> {
    const encodedJwt = await this.createJwt(payload);
    return new LunaSecAuthenticationGrant(encodedJwt);
  }

  private async requestDetokenizationGrant(sessionId: string, tokenId: string) {
    // TODO (cthompson) as long as the node-sdk is the source of truth for authentication
    // this is ok. Once we are using an auth provider for this information, this will need to change.
    const authenticationToken = await this.authenticate({session_id: sessionId});

    const tokenizer = new Tokenizer({
      token: authenticationToken.toString()
    });
    const resp = await tokenizer.setGrant(tokenId, 'read_token');
    if (!resp.success) {
      throw new Error(`unable to set detokenization grant for: ${tokenId}`)
    }
  }

  // private async verifyTokenizationGrant(sessionId: string, tokenId: string) {
  //   const tokenizer = new Tokenizer();
  //   const resp = await tokenizer.getGrant(sessionId, tokenId, 'store_token');
  //   if (!resp.success) {
  //     throw new Error(`unable to verify tokenization grant for: ${tokenId}`)
  //   }
  // }

  public async authorize(sessionId: string, tokenId: string) {
    if (!isToken(tokenId)) {
      throw new Error('Attempted to create a LunaSec Token Grant from a string that didnt look like a token');
    }
    return this.requestDetokenizationGrant(sessionId, tokenId);
  }

  // public verifyTokenGrant(sessionId: string, tokenId: string): boolean {
  // }
}
