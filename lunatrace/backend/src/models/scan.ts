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
    const upload = await this.storeReport(report);
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
    const queryParts = [
      pgp.as.format(
        `
          BEGIN; 
          WITH report AS (
            INSERT INTO reports(
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
          )`,
        report
      ),
    ];
    report.findings.forEach((finding) => {
      pgp.as.format(`
          ( WITH vuln AS (
            SELECT id FROM vulnerabilities WHERE slug = $<meta.vuln_slug> RETURNING id
          ), pkg AS (        
            SELECT id FROM vulnerability_packages WHERE slug = $<meta.pkg_slug> RETURNING id
          ), version AS (
            SELECT id FROM package_versions WHERE slug = $<meta.version_slug> RETURNING id
          )
          INSERT INTO findings(
            vulnerability_id,
            vulnerability_package_id,
            package_version_id,
            artifact_name,
            artifact_version,
            artifact_type,
            artifact_locations,
            artifact_language,
            artifact_licenses,
            artifact_cpes,
            artifact_package_url,
            artifact_metadata_virtual_path,
            artifact_metadata_pom_artifact_id,
            artifact_metadata_pom_group_id,
            artifact_metadata_manifest_name,
            matcher,
            searched_by_namespace
            searched_by_cpes
          ) VALUES (
            vuln.id,
            pkg.id,
            version.id,
            <arth
          )

`);
    });
  }
}
