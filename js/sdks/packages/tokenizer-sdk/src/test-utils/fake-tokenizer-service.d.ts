/// <reference types="node" />
import express from 'express';
export declare type OnResponseCallback = (req: express.Request) => Promise<Record<string, any> | void>;
export interface FakeTokenizerServiceConfig {
    port: number;
    onRequestCallback?: OnResponseCallback;
    onS3Callback?: OnResponseCallback;
}
export declare function createFakeTokenizerService(config: FakeTokenizerServiceConfig): import("http").Server;
//# sourceMappingURL=fake-tokenizer-service.d.ts.map