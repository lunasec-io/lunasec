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
  Package_Versions_Constraint,
  Scans_Insert_Input,
  Vulnerabilities_Constraint,
  Vulnerability_Packages_Constraint,
} from '../hasura-api/generated';
import { Convert, GrypeScanReport, Match } from '../types/grype-scan-report';

export async function parseAndUploadScan(sbomStream: Readable, buildId: string): Promise<Scans_Insert_Input> {
  const rawGrypeReport = await runGrypeScan(sbomStream);
  const typedRawGrypeReport = Convert.toScanReport(rawGrypeReport);
  const scan = parseScan(typedRawGrypeReport, buildId);
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

function parseScan(scan: GrypeScanReport, buildId: string): Scans_Insert_Input {
  return {
    findings: parseMatches(scan.matches),
    source_type: scan.source.type,
    target: scan.source.target,
    db_date: scan.descriptor.db.built,
    grype_version: scan.descriptor.version,
    distro_name: scan.distro.name,
    distro_version: scan.distro.version,
    build_id: buildId,
  };
}

function parseMatches(matches: Match[]): Findings_Arr_Rel_Insert_Input {
  return {
    on_conflict: {
      constraint: Findings_Constraint.FindingsDedupeSlugBuildIdKey,
      update_columns: [
        Findings_Update_Column.Version,
        Findings_Update_Column.VirtualPath,
        Findings_Update_Column.Severity,
      ],
    },
    data: matches.map((match): Findings_Insert_Input => {
      const { vulnerability, artifact } = match;
      const details = match.matchDetails[0];
      // slugs
      const vuln_slug = vulnerability.id + ':' + vulnerability.namespace;
      const pkg_slug = vuln_slug + ':' + match.artifact.name;
      const version_slug = pkg_slug + ':' + match.matchDetails[0].found.versionConstraint;

      const locations = artifact.locations.map((l) => l.path);
      return {
        package_name: artifact.name,
        version: artifact.version,
        version_matcher: details.found.versionConstraint,
        type: artifact.type,
        locations: locations,
        language: artifact.language,
        purl: artifact.purl,
        severity: vulnerability.severity,
        virtual_path: artifact.metadata ? artifact.metadata.VirtualPath : null,
        matcher: details.matcher,
        dedupe_slug: pkg_slug + locations.sort().join(':'),
        fix_state: vulnerability.fix?.state || null,
        fix_versions: vulnerability.fix?.versions || null,
        vulnerability: {
          data: {
            slug: version_slug,
          },
          on_conflict: {
            constraint: Vulnerabilities_Constraint.VulnerabilitiesSlugKey,
          },
        },
        vulnerability_package: {
          data: {
            slug: pkg_slug,
          },
          on_conflict: {
            constraint: Vulnerability_Packages_Constraint.VulnerabilityPackagesSlugKey,
          },
        },
        package_version: {
          data: {
            slug: version_slug,
          },
          on_conflict: {
            constraint: Package_Versions_Constraint.PackageVersionsSlugKey,
          },
        },
      };
    }),
  };
}
