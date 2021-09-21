interface SessionResponse {
  success: boolean;
  error: string;
}

export class SecureFrameAuthClient {
  private readonly url: string;
  constructor(url: string) {
    this.url = url;
  }

  private getURL(path: string): string {
    const url = new URL(path, this.url);
    return url.toString();
  }

  private async checkResponse<T>(resp: Response): Promise<T> {
    const json = await resp.json();
    if (json === null || resp.status !== 200) {
      throw new Error(`request did not succeed (status code: ${resp.status})`);
    }
    return json;
  }
  // dispatch to the secure frame session verifier to check if the secure frame session exists
  public async verifySession() {
    const resp = await fetch(this.getURL('/session/verify'), {
      credentials: 'include',
      mode: 'cors',
    });
    return await this.checkResponse<SessionResponse>(resp);
  }

  // dispatch to the secure frame to ensure that a session exists
  public ensureSession(authProvider?: string) {
    const authProviderOption = authProvider ? `?auth_provider=${authProvider}` : '';
    return fetch(this.getURL('/session/ensure' + authProviderOption), {
      credentials: 'include',
      mode: 'no-cors',
      redirect: 'follow',
    });
  }
}
