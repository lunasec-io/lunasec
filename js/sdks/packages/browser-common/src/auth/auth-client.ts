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
    // TODO: Add JSON schema validation
     
    return json;
  }

  // dispatch to the secure frame session verifier to check if the secure frame session exists
  public async verifySession() {
    const resp = await fetch(this.getURL('session/verify'), {
      credentials: 'include',
      mode: 'cors',
    });
    return await this.processResponse(resp);
  }

  // dispatch to the secure frame to ensure that a session exists
  public async ensureSession(authProvider?: string) {
    const authProviderOption = authProvider ? `?auth_provider=${authProvider}` : '';
    return fetch(this.getURL('session/ensure' + authProviderOption), {
      credentials: 'include',
      mode: 'no-cors',
      redirect: 'follow',
    });
  }
}
