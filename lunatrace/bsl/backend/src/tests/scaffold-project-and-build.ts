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
import { db } from '../database/db';
import {log} from "../utils/log";

export async function scaffoldBuild() {
  log.info('scaffolding project with a build and scan');
  const existingProject = await db.oneOrNone(`
  SELECT id, name FROM public.projects WHERE name = 'Personal Project' LIMIT 1
`);
  const project_id =
    existingProject?.id ||
    (await db.one(`INSERT INTO public.projects(name) VALUES ('Automatic Project') RETURNING id `)).id;

  //     INSERT INTO public.builds(project_id) VALUES ((INSERT INTO public.projects(name) VALUES ('Automatic Project') RETURNING id)) RETURNING id;
  return (await db.one(`INSERT INTO public.builds(project_id) VALUES ('${project_id as string}') RETURNING id`))
    .id as string;
}
