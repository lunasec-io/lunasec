/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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
  public ensureSession() {
    return fetch(this.getURL('/session/ensure'), {
      credentials: 'include',
      mode: 'no-cors',
      redirect: 'follow',
    });
  }
}
