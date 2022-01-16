/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { exec } from 'child_process';
import { promisify } from 'util';

import { db, pgp } from '../database/db';
import { Convert, Match as GrypeMatch, GrypeScanReport } from '../types/grypeScanReport';
import { Finding, Report } from '../types/scan';

const promisifiedExec = promisify(exec);

export class Scan {
  static async uploadScan(sbomPath: string, projectId: string) {
    const rawGrypeReport = await this.runGrypeScan(sbomPath);
    const report = this.parseScan(rawGrypeReport, projectId);
    await this.storeReport(report);
    console.log('donezo');
  }
  static async runGrypeScan(sbomPath: string): Promise<GrypeScanReport> {
    const { stdout } = await promisifiedExec(`grype ${sbomPath} -o json --quiet\n`);
    return Convert.toScanReport(stdout);
  }

  static parseScan(scan: GrypeScanReport, projectId: string): Report {
    return {
      findings: this.parseMatches(scan.matches),
      source_type: scan.source.type,
      target: scan.source.target,
      db_date: scan.descriptor.db.built,
      grype_version: scan.descriptor.version,
      distro_name: scan.distro.name,
      distro_version: scan.distro.version,
      project_id: projectId,
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
        virtual_path: artifact.metadata ? artifact.metadata.VirtualPath : null,
        matcher: details.matcher,
        meta: {
          vuln_slug,
          pkg_slug,
          version_slug,
        },
      };
    });
  }
  // todo: rewrite this with sequelize, the ORM is your friend

  static async storeReport(report: Report) {
    const queryBeginning = pgp.as.format(
      `
          BEGIN;
          WITH this_report AS (
            INSERT INTO public.reports(
                source_type, 
                target, 
                db_date,
                grype_version, 
                distro_name, 
                distro_version, 
                project_id)
            VALUES(
                 $<source_type>,
                 $<target>,
                 $<db_date>,
                 $<grype_version>,
                 $<distro_name>,
                 $<distro_version>,
                 $<project_id>
            ) RETURNING id
          )
          INSERT INTO findings(
            vulnerability_id,
            vulnerability_package_id,
            package_version_id,
            report_id,
            package_name,
            version,
            version_matcher,
            type,
            locations,
            language,
            purl,
            virtual_path,
            matcher
          ) VALUES 
        `,
      report
    );

    const findingValueArray = report.findings.map(this.buildFindingInsertQuery);
    const findingValues = findingValueArray.join(',');
    const queryEnd = '; COMMIT;';
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
            ( SELECT id FROM this_report ),
            $<package_name>,
            $<version>,
            $<version_matcher>,
            $<type>,
            $<locations>,
            $<language>,
            $<purl>,
            $<virtual_path>,
            $<matcher>
            
          )
        `,
      finding
    );
  }
}
