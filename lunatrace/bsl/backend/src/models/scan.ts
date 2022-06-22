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
import { spawn } from 'child_process';
import { Readable } from 'stream';

import { hasura } from '../hasura-api';
import {
  Findings_Arr_Rel_Insert_Input,
  Findings_Insert_Input,
  InsertScanMutation,
  Scans_Insert_Input,
} from '../hasura-api/generated';
import { GrypeScanReport, Match, parseJsonToGrypeScanReport } from '../types/grype-scan-report';
import { log } from '../utils/log';

export type InsertedScan = NonNullable<InsertScanMutation['insert_scans_one']>;

export async function performSnapshotScanAndCollectReport(
  sbomStream: Readable,
  buildId: string
): Promise<InsertedScan> {
  const rawGrypeReport = await runLunaTraceScan(sbomStream);
  log.info('finished running lunatrace scan on sbom', {
    buildId,
  });

  const typedRawGrypeReport = parseJsonToGrypeScanReport(rawGrypeReport);
  log.info('parsing scan results into report', {
    buildId,
    typedRawGrypeReport,
  });
  const scan = mapGrypeScanToGraphql(typedRawGrypeReport, buildId);

  log.info('inserting scan results in hasura', {
    buildId,
    findingsCount: scan.findings ? scan.findings.data.length : 0,
  });
  const insertRes = await hasura.InsertScan({
    scan,
    build_id: buildId,
  });
  if (!insertRes.insert_scans_one) {
    throw new Error(`Failed to insert scan into hasura, resp: ${JSON.stringify(insertRes)}`);
  }
  return insertRes.insert_scans_one;
}

export async function runLunaTraceScan(sbomStream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const lunatraceCli = spawn(`lunatrace`, ['--log-to-stderr', '--json', 'scan', '--stdin', '--stdout']);
    lunatraceCli.on('error', reject);

    const outputBuffers: Buffer[] = [];
    lunatraceCli.stdout.on('data', (chunk) => {
      outputBuffers.push(Buffer.from(chunk));
    });
    lunatraceCli.stderr.on('data', (errorChunk) => {
      log.info('lunatrace cli stderr', {
        log: errorChunk.toString(),
      });
    });
    lunatraceCli.on('close', (code) => {
      if (code !== 0) {
        return reject(`lunatrace exited with non-zero code: ${code}`);
      }
      const result = Buffer.concat(outputBuffers).toString();
      resolve(result);
    });
    sbomStream.on('data', (chunk) => lunatraceCli.stdin.write(chunk));
    sbomStream.on('end', () =>
      lunatraceCli.stdin.end(() => log.info('Finished passing sbom contents to lunatrace CLI'))
    );
    sbomStream.on('error', (e) => {
      return reject(`error with sbom stream: ${e}`);
    });
  });
}

function mapGrypeScanToGraphql(scan: GrypeScanReport, buildId: string): Scans_Insert_Input {
  return {
    findings: mapGrypeMatchesToGraphqlFindings(buildId, scan.matches),
    source_type: scan.source.type,
    target: scan.source.target,
    db_date: scan.descriptor.db.built,
    grype_version: scan.descriptor.version,
    distro_name: scan.distro.name,
    distro_version: scan.distro.version,
    build_id: buildId,
  };
}

function escapeQuotes(s: string) {
  return s.replace(/"/g, '\\"');
}

function formatPsqlStringArray(array: string[]) {
  return `{${array.map((e) => `"${escapeQuotes(e)}"`).join(', ')}}`;
}

const mapGrypeMatchToGraphqlFinding =
  (buildId: string) =>
  (match: Match): Findings_Insert_Input | null => {
    const { vulnerability, artifact } = match;
    const details = match.matchDetails[0];

    log.info('match details', {
      vuln_id: vulnerability.id,
      vuln_namespace: vulnerability.namespace,
      artifact_name: match.artifact.name,
    });

    const vuln_slug = vulnerability.id + ':' + vulnerability.namespace;
    const pkg_slug = vuln_slug + ':' + match.artifact.name;

    const grypeFixVersions = vulnerability.fix?.versions;
    const graphqlFixVersions = grypeFixVersions ? formatPsqlStringArray(grypeFixVersions) : null;

    const locations = artifact.locations.map((l) => l.path);
    return {
      package_name: artifact.name,
      version: artifact.version,
      version_matcher: details.found.versionConstraint,
      type: artifact.type,
      locations: formatPsqlStringArray(locations),
      language: artifact.language,
      purl: artifact.purl,
      severity: vulnerability.severity,
      virtual_path: artifact.metadata ? artifact.metadata.VirtualPath : null,
      matcher: details.matcher,
      dedupe_slug: pkg_slug + locations.sort().join(':'),
      fix_state: vulnerability.fix?.state || null,
      fix_versions: graphqlFixVersions,
      build_id: buildId,
    };
  };

function mapGrypeMatchesToGraphqlFindings(buildId: string, matches: Match[]): Findings_Arr_Rel_Insert_Input {
  const parseMatchTo = mapGrypeMatchToGraphqlFinding(buildId);
  return {
    // TODO
    // on_conflict: {
    // },
    data: matches.map(parseMatchTo).filter((e) => e !== null) as Findings_Insert_Input[],
  };
}
