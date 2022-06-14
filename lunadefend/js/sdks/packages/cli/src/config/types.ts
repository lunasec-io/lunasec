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
/**
 * Configuration options for different environments the LunaSec stack can be
 * deployed to.
 */
export interface LunaSecStackConfigOptions {
  development: DevelopmentConfigOptions;
  production: DeploymentConfigOptions;
}

/**
 * JWKS authentication provider configuration
 */
export interface JwksAuthProviderConfig {
  /**
   * URL for the authentication provider.
   */
  url: string;
  /**
   * Custom url path to where the jwks key content is available. Defaults to '.lunasec/jwks.json'
   * which is automatically registered as a path in your application by the LunaSec authentication provider.
   */
  jwksPath?: string;
}

export type AuthProviderConfig = JwksAuthProviderConfig;

/**
 * Configure how grants behave.
 */
export interface GrantConfigOptions {
  /**
   * Configure how long grants are valid for by default.
   */
  grantDefaultDuration: string;
  /**
   * Configure the maximum duration of how long grants are valid for.
   */
  grantMaximumDuration: string;
}

export const grantConfigOptionsDefaults: GrantConfigOptions = {
  grantDefaultDuration: '15m',
  grantMaximumDuration: '1h',
};

/**
 * Development configuration options are properties that can be modified to configure local development
 * when using the LunaSec stack. These properties are available to assist in matching a production
 * deployment as close as possible.
 */
export interface DevelopmentConfigOptions {
  /**
   * @required The front end of your application where you will be including LunaSec Secure Components.
   */
  applicationFrontEnd: string;
  /**
   * @required The back end of your application where LunaSec's node-sdk is installed.
   */
  applicationBackEnd: string;
  /**
   * Authentication providers lets you specify multiple providers for identity for session validation. This option will override applicationBackEnd as the authentication provider
   */
  authProviders?: Record<string, AuthProviderConfig>;
  /**
   * The JWKS url where the public key for creating sessions will be available. By default, this is set to: applicationBackEnd/.lunasec/jwks.json.
   */
  sessionJwksUrl: string;
  /**
   * This is only used in demo mode. The signing key is used by the application backend in the demo for cryptographically signing sessions.
   */
  signingKey: string;
  /**
   * The URL for LocalStack.
   */
  localStackUrl?: string;
  /**
   * The URL for the LunaSec tokenizer. Can be configured to use a deployed version of the tokenizer.
   */
  tokenizerUrl: string;
  /**
   * Configure how grants behave.
   */
  grants: GrantConfigOptions;
  /**
   * Only used when building locally. Use local build artifacts when bringing up the stack, built by the monorepo.
   */
  localBuildArtifacts?: boolean;
}

export const devConfigOptionsDefaults: DevelopmentConfigOptions = {
  applicationFrontEnd: 'http://localhost:3000',
  applicationBackEnd: 'http://application-back-end:3001',
  sessionJwksUrl: '',
  signingKey:
    'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRQ1dmV1pXYWdoR01NWkQKaWxWeHl3SG5JbmNNVWkxUjczTXNWVGlkcXF4OFZnbkxBcklDd2ZqekJRZVFGZlJsRzZ1Y1FTaWEzR2FQY1gwSAo1MW41UXNWN2NtY1d0WU9NM3RjNFhIS2ZjbDllUEJWOFI4RFlYRmdzdkdEQm5GOFVXOXhZS0hhT2gwQ1U4N3JvCnNHMTVKc0NseVc5S2VudmhrY0pJU3Z3TVVLL3N0VG5SM1NnZjdHR3MzV0hwZ3U4c1l0dDBVVm1tL0RWMnNGcFgKc28yODVIeTNpb3h0eE4wT1BsOVk4R1lwbmxwamg3ZWtwZnoxSUZ6d0sxaDhGeDlJenU3aVRGMFlpMzZlUnJiMQpMSXBKZ0hGWXR6aHNVd283QmFQRFNCNzh0dWZDMFVTVkQ1SEpPanNCS1A2ZzByY0pFNUUwQnJGajQ3UHlvdlRSCnk3QzZqZG85QWdNQkFBRUNnZ0VBVGxSM01BT0F5d2dZS28rV2FlU0EyUTNYYVZKY3hJa2VLYlV5QXQ4VGFLUmYKOUlzeW5MemFGNlJHaTNqaC9MNnFWR3FWK0FWQVhPbDFhdWZBclQxVURTMCsrMUwvWmhPWGNuNnNLdElkVWE5MApmM3ZacE1Sc0lOenNmOW9rb3pRdFBMWFMvOXptZ0tGY2FFRnN1ZUt4NDVrMWxFNnNySHh4NDY4a0FrVDlUUGM3CkJpQ3d2REMwM1VCUUdJaFdESGZjZzJ5aTA3VzVLb01VNjZSS0ZxMk5WT1NwdW1Tb2VyMjVNLytKNFZCc05mb3MKeEM0eEc3aWRTNzZZa21JalBMZnZjelZRUk9xNDlnblBnMHE2SWpBZHN2TVNjMHBhYUlYNkVmRUU4K2Ewd3VoWgpqTWUxQWd1V09OMEs0ajZXeHIrT0UwMEJJNjB0akhNaVdsU2JNU3R6QVFLQmdRREhlSHdOUWQ4dE5tYlhPOXB4CmxtdFVwNENOZ09FZEp6b2ZlOG9tRzl2K2gxNGxUcjFOVkZPT3VaSFFsZUFXZnl6ZDZFdmpicDY1VU4wa1h0QnEKOFllNHY5dkJ3S2thL3d1ODJPS0dKMmQ3aTF4Z2U3YjFiSEt4VVQ2Y0F2bFU4cmYzQTEwdHp0MHNMaVlEbythTQo3R25JMkZVU2t3OTg1YU5SNnFKSUtTcFJHd0tCZ1FEQkkyQ3hkd1F3L3ZNVVZvcGN4TzZTMThzNklvODdJV0dVCnpnZXpqZUpIYW1VV3JaSWJRZ2txRU1aWVZSdFhpVXBDZEJySHpNd2pXWFBmN3pVQzRPdWZlZzhVYkJneTNhWUsKMHBzMHlXZTY4VUJpOEdTK2M0M2lhb0pnSGVwcW9ydHVUNlZvdFRJaEN0SnhKYTFNTEZoMHBQbitCN2RFakFocApLbmk4azcyUGh3S0JnUUNTT3p6T1IwVkNrd2hQcjl4VHUwOVNEejRKL3JxSnNkRkZkVzNjQkQ2Q1dXRG1mdFArCmxkeHYzSkVPVm1HaWZIYzY4MnAzQUFpeW1KcVdhRC9vdHNxbDRWbE1zRjRJb1lOTVhiK3JVOFhrWjJWQWdsRzkKbUZSNHM3UHZrYXFSNFNLR250dTNrbGpJWThpUWtKNmJIMUhwNE5aMU9JUjVMcXhOaUhLUjdrUE1rd0tCZ0NmTQpvNE5PZEVXb2MrenYvR2tyaDhJb3g4OCtDZWYwZEFoWEFJMUdvcWQyekVnRkVvT2Rjd2dCRnU1aTgxUnhqU1R1CmlnbzhNS0RrTVJXblZIUTRaeldnMEhTejViU3RxaWEyeVpieUhmY08rZWFwaFFrZUJOSHdndGROc3Qyd2xSRWgKUm9PeU94ZEdCS0dlVXZ6TWNwbnUyVGs0MjlJN1RReG0zU1IzQ1d3SEFvR0JBS1FIZitncCtFUmFOcDExdU1OQgo0b3hpbHhwaklqeE8wOTE2WnkyUWFxTjlqSGV1RFc5YmdyWDBjQm1kdExPMjdRZE9EekVwcloyd1h5SDRDSGkxClRsQzdnSksvYlNUSnYyQnpwcUtjOVVQbXpiMnhTeFJaRnBiQkp3KytnRnF4UFlST0NqRWpIc2lmaWJxSmFPdzAKZkN3dzA5SlJDTkVsUU40R2FwRElXUlQ5Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K',
  localStackUrl: 'http://localhost:4566',
  tokenizerUrl: 'http://localhost:37766',
  localBuildArtifacts: false,
  grants: grantConfigOptionsDefaults,
};

export const testsConfigOptionsDefaults: DevelopmentConfigOptions = {
  ...devConfigOptionsDefaults,
  applicationFrontEnd: 'http://application-front-end:3000',
  localStackUrl: 'http://localstack:4566',
  tokenizerUrl: 'http://tokenizer-backend:37766',
};

export const hostedLiveDemoConfigOptionsDefaults: DevelopmentConfigOptions = {
  ...devConfigOptionsDefaults,
  tokenizerUrl: 'https://tokenizer.lunasec.dev',
};

export type LunaSecServices = 'tokenizer-backend' | 'secure-frame-frontend' | 'analytics-collector';

export type ServiceVersions = Record<LunaSecServices, string>;

export type MetricProvider = 'none' | 'aws_cloudwatch';

/**
 * Configure metrics related options.
 */
export interface MetricConfigOptions {
  /**
   * Disable metric reporting for the LunaSec stack.
   */
  disabled: boolean;
  /**
   * Specify where metrics are reported to.
   */
  provider: MetricProvider;
}

export const metricConfigOptionsDefaults: MetricConfigOptions = {
  disabled: false,
  provider: 'aws_cloudwatch',
};

/**
 * Deployment configuration options can adjust how the LunaSec stack is deployed to AWS.
 */
export interface DeploymentConfigOptions {
  /**
   * [required] The front end of your application where you will be including LunaSec Secure Components.
   */
  applicationFrontEnd?: string;
  /**
   * The back end of your application where LunaSec will be registered. If specified, the tokenizer will use this URL to request the public key used to sign tokenizer sessions.
   */
  applicationBackEnd?: string;
  /**
   * Authentication providers lets you specify multiple providers for identity for session validation. This option will override applicationBackEnd as the authentication provider
   */
  authProviders?: Record<string, AuthProviderConfig>;
  /**
   * Only used for local deployments to localstack. The URL for LocalStack.
   */
  localStackUrl?: string;
  /**
   * Pin services to specific versions. This is discouraged as the LunaSec stack
   * is meant to be deployed using the same version for every component, but if
   * a service is breaking, it could be helpful to revert specific services as a hot patch.
   */
  serviceVersions?: ServiceVersions;
  /**
   * Only used when building locally. Use local build artifacts when bringing up the stack, built by the monorepo.
   */
  localBuildArtifacts?: boolean;
  grants: GrantConfigOptions;
  metrics: MetricConfigOptions;
  /**
   * Only used when building locally. Specify the build location of where the built secure frame iframe exists.
   */
  frontEndAssetsFolder?: string;
  /**
   * Turn on verbose logging for the deployed tokenizer backend. Defaults to false.
   */
  debug: boolean;
}

export const deploymentConfigOptionsDefaults: DeploymentConfigOptions = {
  metrics: metricConfigOptionsDefaults,
  grants: grantConfigOptionsDefaults,
  debug: false,
};
