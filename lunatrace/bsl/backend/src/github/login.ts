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

import {hasura} from "../hasura";
import {getGithubAccessTokenFromKratos} from "../kratos";
import {errorResponse, logError} from "../utils/errors";
import {log} from "../utils/log";
import {catchError, threwError, Try} from "../utils/try";

import {getGithubGraphqlClient} from "./auth";
import {GetUserOrganizationsQuery} from "./generated";

export async function githubLogin(req: Request, res: Response): Promise<void> {
  // todo: fix this unsafe property access
   
  const userId: string = req.body.ctx.identity.id as string;

  log.info(`[user: ${userId}] Github login webhook started`);

  const kratosResponse = await getGithubAccessTokenFromKratos(userId);
  if (kratosResponse.error) {
    res.status(500).send(kratosResponse.message);
    return;
  }

  const github = getGithubGraphqlClient(kratosResponse.token);

  const viewerId = await catchError(
    async () => await github.GetViewerId()
  );

  if (threwError(viewerId) || viewerId === null) {
    logError(viewerId === null ? new Error('viewerId is null') : viewerId);
    res.status(500).send(errorResponse('cannot get github user id'));
    return;
  }

  const githubUserId = viewerId.viewer.id;

  const resp = await catchError(async () => await hasura.UpsertUserFromId({
    user: {
      kratos_id: userId,
      github_node_id: githubUserId
    }
  }))

  if (threwError(resp)) {
    logError(resp);
    res.status(500).send(errorResponse('cannot upsert hasura user'));
  }

  {res.send({
    error: false,
    message: 'Github login callback completed successfully',
  });}
}
