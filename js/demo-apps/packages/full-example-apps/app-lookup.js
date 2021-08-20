const path = require('path');

const tokenizerType = process.env.TOKENIZER_TYPE;
const exampleApplication = process.env.EXAMPLE_APPLICATION;

// tokenizer types
const dedicatedTokenizer = 'dedicated-tokenizer';
const embeddedTokenizer = 'embedded-tokenizer';

// app types
const passportAuthExample = 'passport-auth-example';
const basicExample = 'basic-example';

const clientBasePath = './src/client/';
const serverBasePath = './dist/server/';

const clientEntryFile = 'client';
const serverEntryFile = 'main';

const tokenizerLookup = {
    [dedicatedTokenizer]: [
        passportAuthExample
    ],
    [embeddedTokenizer]: [
        basicExample
    ]
}

const appLookup = tokenizerLookup[tokenizerType];
if (!appLookup) {
    throw new Error(`Demo application provided does not exist: ${path.join(tokenizerType, exampleApplication)}`);
}

if (!appLookup.includes(exampleApplication)) {
    throw new Error(`Demo application provided does not exist: ${path.join(tokenizerType, exampleApplication)}`);
}

const serverEntry = './' + path.join(serverBasePath, tokenizerType, exampleApplication, serverEntryFile);
const clientEntry = './' + path.join(clientBasePath, tokenizerType, exampleApplication, clientEntryFile);

module.exports = {
    tokenizerType,
    exampleApplication,
    serverEntry,
    clientEntry
}
