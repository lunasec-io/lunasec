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
