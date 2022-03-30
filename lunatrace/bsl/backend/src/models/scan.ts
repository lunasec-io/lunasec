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

import { db, pgp } from '../database/db';
import { Convert, Match as GrypeMatch, GrypeScanReport } from '../types/grype-scan-report';
import { Finding, Report } from '../types/scan';

export class Scan {
  static async uploadScan(sbomStream: Readable, buildId: string): Promise<Report> {
    const rawGrypeReport = await this.runGrypeScan(sbomStream);
    const typedRawGrypeReport = Convert.toScanReport(rawGrypeReport);
    const report = this.parseScan(typedRawGrypeReport, buildId);
    await this.storeReport(report);
    return report;
  }

  static async runGrypeScan(sbomStream: Readable): Promise<string> {
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

  static parseScan(scan: GrypeScanReport, buildId: string): Report {
    return {
      findings: this.parseMatches(scan.matches),
      source_type: scan.source.type,
      target: scan.source.target,
      db_date: scan.descriptor.db.built,
      grype_version: scan.descriptor.version,
      distro_name: scan.distro.name,
      distro_version: scan.distro.version,
      build_id: buildId,
    };
  }

  static parseMatches(matches: GrypeMatch[]): Finding[] {
    return matches.map((match): Finding => {
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
        meta: {
          vuln_slug,
          pkg_slug,
          version_slug,
        },
      };
    });
  }

  static async storeReport(report: Report) {
    const queryBeginning = pgp.as.format(
      `
          BEGIN;
          WITH this_scan AS (
            INSERT INTO public.scans(
                source_type, 
                target, 
                db_date,
                grype_version, 
                distro_name, 
                distro_version, 
                build_id
                )
            VALUES(
                 $<source_type>,
                 $<target>,
                 $<db_date>,
                 $<grype_version>,
                 $<distro_name>,
                 $<distro_version>,
                 $<build_id>
            ) RETURNING id, build_id
          )
          INSERT INTO findings(
            vulnerability_id,
            vulnerability_package_id,
            package_version_id,
            scan_id,
            build_id,
            package_name,
            version,
            version_matcher,
            type,
            locations,
            language,
            purl,
            virtual_path,
            matcher,
            dedupe_slug,
            severity,
            fix_state,
            fix_versions
          ) VALUES 
        `,
      report
    );

    const findingValueArray = report.findings.map(this.buildFindingInsertQuery);
    const findingValues = findingValueArray.join(',');
    const queryEnd = `    ON CONFLICT (dedupe_slug, build_id) DO UPDATE
                            SET
                                version = EXCLUDED.version,
                                virtual_path = EXCLUDED.virtual_path,
                                severity = EXCLUDED.severity
                      ; COMMIT;`;
    const query = queryBeginning + findingValues + queryEnd;
    await db.none(query);
  }

  private static buildFindingInsertQuery(finding: Finding) {
    return pgp.as.format(
      `
            (
            ( SELECT id FROM public.vulnerabilities WHERE slug = $<meta.vuln_slug> ),
            ( SELECT id FROM public.vulnerability_packages WHERE slug = $<meta.pkg_slug>),
            ( SELECT id FROM public.package_versions WHERE slug = $<meta.version_slug>),
            ( SELECT id FROM this_scan ),
            ( SELECT build_id FROM this_scan ),
            $<package_name>,
            $<version>,
            $<version_matcher>,
            $<type>,
            $<locations>,
            $<language>,
            $<purl>,
            $<virtual_path>,
            $<matcher>,
            $<dedupe_slug>,
            $<severity>,
            $<fix_state>,
            $<fix_versions>
          )
        `,
      finding
    );
  }
}
