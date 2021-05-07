import tape from 'tape';
import { Tokenizer } from './index';
import { createFakeTokenizerService, FakeTokenizerServiceConfig } from './test-utils/fake-tokenizer-service';
import {
  makeS3Url,
  TEST_METADATA,
  TEST_PLAINTEXT_VALUE,
  TEST_S3_HEADERS,
  TEST_TOKEN,
  TEST_TOKENIZER_SECRET
} from './test-utils/test-constants';
import { verifyHeaders, verifySecretHeader } from './test-utils/http-test-utils';

interface TokenizerTestServiceConfig {
  tokenizerConfig?: Partial<FakeTokenizerServiceConfig>;
}

interface TokenizerTestConfig {
  name: string;
  fn: (test: tape.Test, tokenizer: Tokenizer, config: FakeTokenizerServiceConfig) => Promise<void>;
  beforeSetup?: (test: tape.Test) => Promise<TokenizerTestServiceConfig>;
}

async function runTokenizerTest(config: TokenizerTestConfig) {
  const { name, fn, beforeSetup } = config;

  // TODO: Pick a random port to allow concurrent test runs
  const tokenizerServerPort = 12347;

  tape(name, async (test) => {
    const setupConfig = beforeSetup ? await beforeSetup(test) : {};

    const fakeTokenizerConfig: FakeTokenizerServiceConfig = {
      port: tokenizerServerPort,
      ...setupConfig.tokenizerConfig,
    };

    const fakeTokenizerServer = createFakeTokenizerService(fakeTokenizerConfig);

    function onFinish() {
      return new Promise((resolve, reject) => {
        fakeTokenizerServer.close((err) => {
          if (err) {
            reject('Unable to close server');
            return;
          }

          resolve(true);
        });
      });
    }

    const tokenizer = new Tokenizer({
      host: `http://localhost:${tokenizerServerPort}`,
      secret: TEST_TOKENIZER_SECRET,
    });

    await fn(test, tokenizer, fakeTokenizerConfig);

    await onFinish();
  });
}

const tests: TokenizerTestConfig[] = [];

tests.push({
  name: 'Test tokenizing a value',
  fn: async (test, tokenizer) => {
    try {
      const response = await tokenizer.tokenize(TEST_PLAINTEXT_VALUE);

      if (!response.success) {
        test.fail('response indicates failure');
        test.end();
        return;
      }

      test.ok(response.success, 'response indicates success');

      test.equal(response.tokenId, TEST_TOKEN, 'token should match');
    } catch (e) {
      console.log('error', e);
      test.fail();
    }
    test.end();
  },
  async beforeSetup(test) {
    return {
      tokenizerConfig: {
        onRequestCallback: verifySecretHeader(test),
        onS3Callback: verifyHeaders(test, TEST_S3_HEADERS.PUT),
      },
    };
  },
});

tests.push({
  name: 'Test detokenizing a value',
  fn: async (test, tokenizer) => {
    try {
      const response = await tokenizer.detokenize(TEST_TOKEN);

      if (!response.success) {
        test.fail('response indicates failure');
        test.end();
        return;
      }

      test.ok(response.success, 'response indicates success');

      test.equal(response.tokenId, TEST_TOKEN, 'token should match');
      test.equal(response.value, TEST_PLAINTEXT_VALUE, 'plaintext should match');
    } catch (e) {
      console.log('error', e);
      test.fail();
    }
    test.end();
  },
  async beforeSetup(test) {
    return {
      tokenizerConfig: {
        onRequestCallback: verifySecretHeader(test),
        onS3Callback: verifyHeaders(test, TEST_S3_HEADERS.GET),
      },
    };
  },
});

tests.push({
  name: 'Test detokenizing to URL',
  fn: async (test, tokenizer, fakeTokenizerConfig) => {
    try {
      const response = await tokenizer.detokenizeToUrl(TEST_TOKEN);

      if (!response.success) {
        test.fail('response indicates failure');
        test.end();
        return;
      }

      test.ok(response.success, 'response indicates success');

      test.equal(response.tokenId, TEST_TOKEN, 'token should match');
      test.equal(response.downloadUrl, makeS3Url(fakeTokenizerConfig.port), 's3 url should match');
      test.deepEqual(response.headers, TEST_S3_HEADERS.GET, 's3 headers should match');
    } catch (e) {
      console.log('error', e);
      test.fail();
    }
    test.end();
  },
  async beforeSetup(test) {
    return {
      tokenizerConfig: {
        onRequestCallback: verifySecretHeader(test),
        onS3Callback: verifyHeaders(test, TEST_S3_HEADERS.GET),
      },
    };
  },
});

tests.push({
  name: 'Test adding metadata to a value',
  fn: async (test, tokenizer) => {
    try {
      const response = await tokenizer.setMetadata(TEST_TOKEN, TEST_METADATA);

      if (!response.success) {
        test.fail('response indicates failure');
        test.end();
        return;
      }

      test.ok(response.success, 'response indicates success');
      test.equal(response.tokenId, TEST_TOKEN, 'plaintext should match');
      test.equal(response.value, TEST_METADATA, 'plaintext should match');
    } catch (e) {
      console.log('error', e);
      test.fail();
    }
    test.end();
  },
  async beforeSetup(test) {
    return {
      tokenizerConfig: {
        onRequestCallback: verifySecretHeader(test),
      },
    };
  },
});

tests.push({
  name: 'Test reading metadata from a token',
  fn: async (test, tokenizer) => {
    try {
      const response = await tokenizer.getMetadata(TEST_TOKEN);

      if (!response.success) {
        test.fail('response indicates failure');
        test.end();
        return;
      }

      test.ok(response.success, 'response indicates success');
      test.equal(response.tokenId, TEST_TOKEN, 'plaintext should match');
      test.equal(response.value, TEST_METADATA, 'plaintext should match');
    } catch (e) {
      console.log('error', e);
      test.fail();
    }
    test.end();
  },
  async beforeSetup(test) {
    return {
      tokenizerConfig: {
        onRequestCallback: verifySecretHeader(test),
      },
    };
  },
});

tests.forEach(async (t) => {
  await runTokenizerTest(t);
});
