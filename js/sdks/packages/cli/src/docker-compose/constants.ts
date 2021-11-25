export const debug = process.env.DEBUG || false;
export const demoDockerFile = 'js/docker/demo.dockerfile';
export const localstackImage = 'localstack/localstack:0.12.19';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const { version } = require('../../package.json');
