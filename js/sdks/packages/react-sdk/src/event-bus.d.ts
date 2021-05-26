export declare enum SecureFormElementType {
    Submit = "Submit",
    Text = "Text"
}
export declare type SecureFormEventRegistry = {
    add(type: SecureFormElementType, nonce: string, triggerTokenCommit: () => Promise<Window>): void;
    remove(frameId: string): void;
};
export declare type SecureFormEventBusEntry = {
    readonly type: SecureFormElementType;
    readonly frameId: string;
    readonly getFrameWindow: () => Promise<Window>;
};
export declare class SecureFormEventBus implements SecureFormEventRegistry {
    private readonly nonceToEntry;
    constructor();
    add(type: SecureFormElementType, frameId: string, getFrameWindow: () => Promise<Window>): void;
    remove(nonce: string): void;
    getAllListeners(): SecureFormEventBusEntry[];
}
//# sourceMappingURL=event-bus.d.ts.map