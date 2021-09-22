import { LunaSecError } from '@lunasec/isomorphic-common';

interface SuccessResponse {
  success: true;
}
interface FailureResponse {
  success: false;
  error: LunaSecError;
}
type SessionResponse = SuccessResponse | FailureResponse;

export class SecureFrameAuthClient {
  private readonly url: string;
  constructor(url: string) {
    this.url = url;
  }

  private getURL(path: string): string {
    const url = new URL(path, this.url);
    return url.toString();
  }

  private async processResponse(resp: Response): Promise<SessionResponse> {
    const json = await resp.json();
    // Handle the case where there were network errors or something went truly wrong
    if (json === null || resp.status !== 200) {
      return {
        success: false,
        error: new LunaSecError({
          name: 'authError',
          message: `Connected to LunaSec Auth endpoint failed`,
          code: resp.status.toString(),
        }),
      };
    }
    if (json.error) {
      return {
        success: json.success,
        error: new LunaSecError({ code: '400', name: 'authError', message: json.error }),
      };
    }
    return json;
  }

  // dispatch to the secure frame session verifier to check if the secure frame session exists
  public async verifySession() {
    const resp = await fetch(this.getURL('/session/verify'), {
      credentials: 'include',
      mode: 'cors',
    });
    return await this.processResponse(resp);
  }

  // dispatch to the secure frame to ensure that a session exists
  public async ensureSession() {
    return fetch(this.getURL('/session/ensure'), {
      credentials: 'include',
      mode: 'no-cors',
      redirect: 'follow',
    });
  }
}
