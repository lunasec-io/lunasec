import {createAppAuth} from '@octokit/auth-app';

const githubPrivateKeyRaw = process.env.GITHUB_APP_PRIVATE_KEY;

if (!githubPrivateKeyRaw || typeof githubPrivateKeyRaw !== 'string') {
  throw new Error('Must specify GitHub App Private Key in env vars');
}

const githubPrivateKey = Buffer.from(githubPrivateKeyRaw, 'base64').toString('utf-8');

const githubAppIdRaw = process.env.GITHUB_APP_ID;

if (!githubAppIdRaw || typeof githubAppIdRaw !== 'string') {
  throw new Error('Must specify GitHub App Id in env vars');
}

const githubAppId = parseInt(githubAppIdRaw, 10);

export async function pullDataForInstallation(installationId: number) {
  const auth = createAppAuth({
    appId: githubAppId,
    privateKey: githubPrivateKey,
    installationId: installationId,
  });


}
