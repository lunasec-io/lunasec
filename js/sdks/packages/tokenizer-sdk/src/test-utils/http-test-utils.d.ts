import express from 'express';
import tape from 'tape';
export declare function verifySecretHeader(test: tape.Test, secret?: string): (req: express.Request) => Promise<void>;
export declare function verifyHeaders(test: tape.Test, headers: Record<string, string>): (req: express.Request) => Promise<void>;
//# sourceMappingURL=http-test-utils.d.ts.map