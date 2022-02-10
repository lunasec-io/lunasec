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
import os from 'os';
import path from 'path';

import { Request, Response } from 'express';
import semver from 'semver';

import { GrypeVuln, Convert as VulnCast } from '../types/grypeVulnerabilities';
import { GrypeMeta, Convert as MetaCast } from '../types/grypeVulnerabilityMetadata';
import { DbType, initDb } from '../utils/vulnerability-loader';

let db: DbType | null = null;

void (async () => {
  const grypeDbPath = path.join(os.homedir(), '.cache/grype/db/3/vulnerability.db');
  db = await initDb(grypeDbPath);
})();

export async function searchVulns(packageName: string): Promise<GrypeVuln[]> {
  if (db === null) {
    console.error('db is null');
    return [];
  }

  const rawVulns = await db.all(`SELECT * FROM vulnerability WHERE package_name = '${packageName}'`);
  return VulnCast.jsonBlobToVulnerabilities(rawVulns as Record<string, any>);
}

export async function getVulnMeta(vulnId: string): Promise<GrypeMeta[]> {
  if (db === null) {
    console.error('db is null');
    return [];
  }

  const rawMeta = await db.all(`SELECT * FROM vulnerability_metadata WHERE id = '${vulnId}'`);
  return MetaCast.jsonBlobToVulnerabilityMetadata(rawMeta as Record<string, any>);
}

async function vulnsForPackageVersion(name: string, version: string): Promise<object[]> {
  const vulns = await searchVulns(name);

  const affectedVulns = vulns.filter((vuln) => semver.satisfies(version, vuln.version_constraint));

  return await affectedVulns.reduce(async (vulnsWithSev, vuln) => {
    const awaitedVulnsWithSev = await vulnsWithSev;

    const vulnMetadata = await getVulnMeta(vuln.id);

    if (vulnMetadata.length === 0) {
      console.error(`no vuln metadata for ${vuln.id}`);
      return awaitedVulnsWithSev;
    }

    return [
      ...awaitedVulnsWithSev,
      {
        ...vuln,
        ...vulnMetadata[0],
      },
    ];
  }, Promise.resolve([] as object[]));
}

export async function findVulnsForPackages(req: Request, res: Response): Promise<void> {
  const vulnsForPackages = await Promise.all(
    req.body.packages.map(async (p: { name: string; version: string }) => {
      return await vulnsForPackageVersion(p.name, p.version);
    })
  );

  res.send(
    JSON.stringify({
      vulnerabilities: vulnsForPackages,
    })
  );
}
