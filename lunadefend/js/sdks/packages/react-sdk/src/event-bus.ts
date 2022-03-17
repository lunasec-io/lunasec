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
// Are we still using any of this? We should probably delete it if not
export enum SecureFormElementType {
  Submit = 'Submit',
  Text = 'Text',
}

export type SecureFormEventRegistry = {
  add(type: SecureFormElementType, nonce: string, triggerTokenCommit: () => Promise<Window>): void;
  remove(frameId: string): void;
};

export type SecureFormEventBusEntry = {
  readonly type: SecureFormElementType;
  readonly frameId: string;
  readonly getFrameWindow: () => Promise<Window>;
};

export class SecureFormEventBus implements SecureFormEventRegistry {
  private readonly nonceToEntry!: Record<string, SecureFormEventBusEntry>;

  constructor() {
    this.nonceToEntry = {};
  }

  add(type: SecureFormElementType, frameId: string, getFrameWindow: () => Promise<Window>) {
    this.nonceToEntry[frameId] = {
      type,
      frameId,
      getFrameWindow: getFrameWindow,
    };
  }

  remove(nonce: string) {
    if (this.nonceToEntry[nonce]) {
      delete this.nonceToEntry[nonce];
    }
  }

  getAllListeners() {
    return Object.values(this.nonceToEntry);
  }
}
