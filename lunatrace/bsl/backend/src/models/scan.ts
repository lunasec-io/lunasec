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
import Stream, { Readable } from 'stream';

import { hasura } from '../hasura-api';
import {
  Findings_Arr_Rel_Insert_Input,
  Findings_Constraint,
  Findings_Insert_Input,
  Findings_Update_Column,
  Scans_Insert_Input,
} from '../hasura-api/generated';
import { Convert, GrypeScanReport, Match } from '../types/grype-scan-report';

export async function parseAndUploadScan(sbomStream: Readable, buildId: string): Promise<Scans_Insert_Input> {
  const rawGrypeReport = await runGrypeScan(sbomStream);
  const typedRawGrypeReport = Convert.toScanReport(rawGrypeReport);
  const scan = await parseScan(typedRawGrypeReport, buildId);
  await hasura.InsertScan({
    scan,
  });
  return scan;
}

export async function runGrypeScan(sbomStream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const stdoutStream = new Stream.Writable();
    // const stderrStream = new Stream.Writeable();
    const grypeCli = spawn(`lunatrace`, ['--log-to-stderr', 'scan', '--stdin', '--stdout']);
    grypeCli.on('error', reject);
    const outputBuffers: Buffer[] = [];
    grypeCli.stdout.on('data', (chunk) => {
      outputBuffers.push(Buffer.from(chunk));
    });
    grypeCli.stderr.on('data', (errorChunk) => {
      console.error(errorChunk.toString());
    });
    grypeCli.on('close', (code) => {
      if (code !== 0) {
        return reject(`Grype exited with non-zero code: ${code}`);
      }
      resolve(Buffer.concat(outputBuffers).toString());
    });
    sbomStream.on('data', (chunk) => grypeCli.stdin.write(chunk));
    sbomStream.on('end', () => grypeCli.stdin.end(() => console.log('Finished passing sbom contents to grype')));
    sbomStream.on('error', reject);
  });
}

async function parseScan(scan: GrypeScanReport, buildId: string): Promise<Scans_Insert_Input> {
  return {
    findings: await parseMatches(buildId, scan.matches),
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

function parseVersionConstraint(versionConstraint: string) {
  if (versionConstraint === 'none (unknown)') {
    return null;
  }
  return versionConstraint.replace(' (unknown)', '');
}

async function parseMatches(buildId: string, matches: Match[]): Promise<Findings_Arr_Rel_Insert_Input> {
  return {
    on_conflict: {
      constraint: Findings_Constraint.FindingsDedupeSlugBuildIdKey,
      update_columns: [
        Findings_Update_Column.Version,
        Findings_Update_Column.VirtualPath,
        Findings_Update_Column.Severity,
      ],
    },
    data: (
      await Promise.all(
        matches.map(async (match): Promise<Findings_Insert_Input | null> => {
          const { vulnerability, artifact } = match;
          const details = match.matchDetails[0];

          // slugs
          const vuln_slug = vulnerability.id + ':' + vulnerability.namespace;
          const pkg_slug = vuln_slug + ':' + match.artifact.name;

          const versionConstraint = parseVersionConstraint(match.matchDetails[0].found.versionConstraint);

          const version_slug = pkg_slug + ':' + (versionConstraint ? versionConstraint : '');

          const slugs = {
            vuln_slug,
            pkg_slug,
            version_slug,
          };

          const ids = await hasura.GetPackageAndVulnFromSlugs({
            vuln_slug,
            pkg_slug,
            version_slug,
          });

          const vulnerability_id = ids.vulnerabilities.length === 1 ? ids.vulnerabilities[0].id : undefined;
          const vulnerability_package_id =
            ids.vulnerability_packages.length === 1 ? ids.vulnerability_packages[0].id : undefined;
          const package_version_id = ids.package_versions.length === 1 ? ids.package_versions[0].id : undefined;

          if ([vulnerability_id, vulnerability_package_id, package_version_id].some((id) => !id)) {
            console.error('unable to get all required ids', {
              slugs,
              ids,
            });
            return null;
          }

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
            fix_versions: vulnerability.fix?.versions ? formatPsqlStringArray(vulnerability.fix?.versions) : null,
            build_id: buildId,
            vulnerability_id,
            vulnerability_package_id,
            package_version_id,
          };
        })
      )
    ).filter((e) => e !== null) as Findings_Insert_Input[],
  };
}
