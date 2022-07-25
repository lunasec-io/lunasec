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
  Findings_Constraint,
  Findings_Insert_Input,
  Findings_Update_Column,
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
  const logger = log.child('perform-snapshot-and-collect-report', {
    buildId,
  });

  const rawGrypeReport = await runLunaTraceScan(sbomStream);
  logger.info('finished running lunatrace scan on sbom');

  const typedRawGrypeReport = parseJsonToGrypeScanReport(rawGrypeReport);
  if (typedRawGrypeReport === null) {
    throw new Error(`grype report was not able to be parsed`);
  }

  logger.info('parsing scan results into report');
  const scan = mapGrypeScanToGraphql(typedRawGrypeReport, buildId);

  logger.info('inserting scan results in hasura', {
    findingsCount: scan.findings ? scan.findings.data.length : 0,
  });
  const insertRes = await hasura.InsertScan({
    scan,
    build_id: buildId,
  });
  if (!insertRes.insert_scans_one) {
    logger.error('failed to insert scan into hasura', {
      insertRes,
    });
    throw new Error('Failed to insert scan into hasura');
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
      log.warn('lunatrace cli stderr', {
        output: errorChunk.toString(),
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
      lunatraceCli.stdin.end(() => log.info('finished passing sbom contents to lunatrace CLI'))
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

    // log.debug('match details', {
    //   vuln_id: vulnerability.id,
    //   vuln_namespace: vulnerability.namespace,
    //   artifact_name: match.artifact.name,
    // });

    // TODO (cthompson) we no longer need to use a slug here to dedup findings, we can create a unique
    // constraint on (vulnerability_id, package_id, locations)
    // To achieve this, we need to insert the package_id instead of just the package_name. Also,
    // is it possible to make a unique constraint with an array?
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
      severity: vulnerability.severity || 'Unknown',
      virtual_path: artifact.metadata ? artifact.metadata.VirtualPath : null,
      matcher: details.matcher,
      dedupe_slug: pkg_slug + locations.sort().join(':'),
      fix_state: vulnerability.fix?.state || 'unknown',
      fix_versions: graphqlFixVersions,
      build_id: buildId,
      vulnerability_id: vulnerability.id,
    };
  };

function mapGrypeMatchesToGraphqlFindings(buildId: string, matches: Match[]): Findings_Arr_Rel_Insert_Input {
  const parseMatchTo = mapGrypeMatchToGraphqlFinding(buildId);
  const formattedMatches = matches.map(parseMatchTo).filter((e) => e !== null) as Findings_Insert_Input[];
  const dedupedMatchLookup = formattedMatches.reduce((dedupedMatches, match) => {
    if (!match.dedupe_slug || dedupedMatches[match.dedupe_slug] !== undefined) {
      return dedupedMatches;
    }
    return {
      ...dedupedMatches,
      [match.dedupe_slug]: match,
    };
  }, {} as Record<string, Findings_Insert_Input>);

  return {
    on_conflict: {
      constraint: Findings_Constraint.FindingsDedupeSlugBuildIdKey,
      update_columns: [
        Findings_Update_Column.DedupeSlug,
        Findings_Update_Column.BuildId,
        Findings_Update_Column.Version,
        Findings_Update_Column.VirtualPath,
        Findings_Update_Column.Severity,
      ],
    },
    data: Object.values(dedupedMatchLookup),
  };
}
