/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Request, Response } from 'express';

import { hasura } from '../hasura-api';
import { Users_Constraint, Users_Update_Column } from '../hasura-api/generated';
import { getGithubAccessTokenFromKratos } from '../kratos';
import { MaybeError } from '../types/util';
import { errorResponse, logError } from '../utils/errors';
import { log } from '../utils/log';
import { catchError, threwError } from '../utils/try';

import { getGithubGraphqlClient } from './auth';

interface GitHubUserData {
  githubId: string;
  githubNodeId: string;
}

async function getGitHubUserInfo(userId: string): Promise<MaybeError<GitHubUserData>> {
  const kratosResponse = await getGithubAccessTokenFromKratos(userId);
  if (kratosResponse.error) {
    return {
      error: true,
      msg: kratosResponse.message,
    };
  }

  const github = getGithubGraphqlClient(kratosResponse.token);

  const viewerId = await catchError(github.GetViewerId());

  if (threwError(viewerId)) {
    log.error('Unable to get viewer ID from GitHub', { userId, error: viewerId });
    return {
      error: true,
      msg: 'cannot get github user id',
      rawError: new Error('cannot get github user id'),
    };
  }

  if (viewerId === null) {
    const error = new Error('GitHub viewerId is null for user on login');
    log.error(error.message, { userId, error });
    return {
      error: true,
      msg: 'cannot get github user id',
      rawError: error,
    };
  }

  // This is the "new" value which could be either a base64 encoded value OR something like `U_aBcDe14f7s`
  const githubUserId = viewerId.viewer.id;

  if (!githubUserId) {
    log.error('Unable to get github user id', { userId, viewerId });
    return {
      error: true,
      msg: 'viewer.id from github is not defined',
    };
  }

  // This is the numeric ID, ie `1234567`
  const githubUserDatabaseId = viewerId.viewer.databaseId;

  if (!githubUserDatabaseId) {
    log.error('Unable to get github user database id', { userId, githubUserId, viewerId });
    return {
      error: true,
      msg: 'viewer.databaseId from github is not defined',
    };
  }

  return {
    error: false,
    res: {
      githubId: githubUserId,
      githubNodeId: githubUserDatabaseId.toString(),
    },
  };
}

async function upsertAuthenticatedGithubUser(userId: string): Promise<MaybeError<GitHubUserData>> {
  const githubUserInfo = await getGitHubUserInfo(userId);

  if (githubUserInfo.error) {
    log.error('Unable to upsert authenticated user info', { userId, error: githubUserInfo.msg });
    return {
      error: true,
      msg: githubUserInfo.msg,
    };
  }

  const { githubId, githubNodeId } = githubUserInfo.res;

  const upsertUserResponse = await catchError(
    hasura.UpsertUserFromId({
      user: {
        kratos_id: userId,
        github_id: githubNodeId,
        github_node_id: githubId,
      },
      on_conflict: {
        constraint: Users_Constraint.UsersGithubIdKey,
        update_columns: [Users_Update_Column.GithubId, Users_Update_Column.GithubNodeId, Users_Update_Column.KratosId],
      },
    })
  );

  if (threwError(upsertUserResponse)) {
    log.error('cannot upsert hasura user ', upsertUserResponse);
    return {
      error: true,
      msg: 'cannot upsert hasura user',
    };
  }

  return {
    error: false,
    res: {
      githubId,
      githubNodeId,
    },
  };
}

/*
Example contents of req.body.ctx.identity:
{
  created_at: '2022-04-11T21:05:48.361617Z',
  id: '3518f0cf-ffaa-4f0e-a261-19138d19388a',
  recovery_addresses: [
    {
      created_at: '2022-04-11T21:05:48.366247Z',
      id: 'fb5c2d11-d6ad-458c-9869-081b6131b20c',
      updated_at: '2022-04-11T21:05:48.366247Z',
      value: 'email@example.com',
      via: 'email'
    }
  ],
  schema_id: 'user_v1',
  schema_url: 'http://localhost:4455/api/kratos/schemas/dXNlcl92MQ',
  state: 'active',
  state_changed_at: '2022-04-11T21:05:48.355113Z',
  traits: {
    email: 'email@example.com',
    githubId: '1069294',
    name: 'Example',
    picture: 'https://avatars.githubusercontent.com/u/1069294?v=4',
    profileUrl: 'https://github.com/breadchris'
  },
  updated_at: '2022-04-11T21:05:48.361617Z',
  verifiable_addresses: [
    {
      created_at: '2022-04-11T21:05:48.363827Z',
      id: '86552883-d7b3-4fe2-9c51-3de65429954e',
      status: 'sent',
      updated_at: '2022-04-11T21:05:48.363827Z',
      value: 'email@example.com',
      verified: false,
      via: 'email'
    }
  ]
}
 */

async function handleUpdatingGitHubUser(userId: string, githubId: string | undefined) {
  const userGitHubDataResponse = await catchError(
    hasura.GetUserGitHubData({
      kratos_id: userId,
    })
  );

  if (threwError(userGitHubDataResponse)) {
    log.error('Unable to read User GitHub Data from database on login hook', { error: userGitHubDataResponse });
    throw userGitHubDataResponse;
  }

  if (userGitHubDataResponse.users.length === 0) {
    log.info('User does not exist in database, creating', { userId, githubId });
    const result = await upsertAuthenticatedGithubUser(userId);

    if (result.error) {
      log.error('Error creating user in github login flow', result.msg);
      throw new Error(result.msg);
    }

    log.info('Successfully created user in database', { userId, githubId, result });
    return;
  }

  if (userGitHubDataResponse.users.length > 1) {
    const error = new Error('Found multiple users in database on login hook');
    log.error('Found multiple users in database on login hook', { userId, error });
    throw error;
  }

  const user = userGitHubDataResponse.users[0];

  if (user.github_id !== githubId) {
    const error = new Error('GitHub IDs do not match from Kratos');
    log.error('GitHub ID mismatch on login from Kratos', { error, userId, githubId, user });
    throw error;
  }

  if (user.github_id && user.github_node_id) {
    log.info('User already has GitHub data, skipping update on login', { userId, githubId, user });
    return;
  }

  // If we are missing either GitHub identifier, we need to fetch them and update our database
  log.info('Missing GitHub identifiers, fetching and updating', { userId, user });
  const result = await upsertAuthenticatedGithubUser(userId);

  if (result.error) {
    log.error('Error upserting user in github login flow', result.msg);
    throw new Error(result.msg);
  }

  log.info('Successfully updated GitHub identifiers', { userId, result: result.res });
}

export async function githubLogin(req: Request, res: Response): Promise<void> {
  // todo: fix this unsafe property access
  const userId: string = req.body.ctx.identity.id as string;

  const githubId = req.body.ctx.identity.traits.githubId as string | undefined;

  log.info(`[user: ${userId}, githubId: ${githubId}] Github login webhook started`);

  try {
    await handleUpdatingGitHubUser(userId, githubId);
  } catch (e) {
    log.error('unable to update GitHub user data on login', e);
    res.status(500).send(errorResponse('internal error on login, please retry and contact support if this persists'));
  }

  log.info('GitHub login callback completed successfully', { userId, githubId });

  res.send({
    error: false,
    message: 'Github login callback completed successfully',
  });
}
