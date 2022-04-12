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
import { Findings_Insert_Input } from '../../hasura/generated';
import { parsePsqlStringArray } from '../../utils/json-utils';
import {log} from "../../utils/log";

export type Finding = Findings_Insert_Input;

export const severityOrder = ['Unknown', 'Negligible', 'Low', 'Medium', 'High', 'Critical'] as const;

export interface VulnerablePackage {
  created_at: string;
  purl: string;
  locations: string[];
  severity: typeof severityOrder[number];
  version: string;
  language: string;
  type: string;
  package_name: string;
  package_versions?: string[];
  fix_state: string | null;
  fix_versions: string[];
  findings: Finding[];
  project_id: string;
}

function getHighestSeverity(a: Finding, b: Finding): typeof severityOrder[number] {
  const aSeverityIndex = severityOrder.indexOf(a.severity);
  const bSeverityIndex = severityOrder.indexOf(b.severity);

  if (aSeverityIndex > bSeverityIndex) {
    return severityOrder[aSeverityIndex];
  }

  if (aSeverityIndex < bSeverityIndex) {
    return severityOrder[bSeverityIndex];
  }

  return severityOrder[aSeverityIndex] || severityOrder[bSeverityIndex];
}

function createGroupedFindingObject(
  project_id: string,
  purl: string,
  locations: string[] | null,
  severity: typeof severityOrder[number],
  finding: Finding
) {
  const f = finding;

  return {
    created_at: f.created_at && typeof f.created_at === 'string' ? f.created_at : '', // might be better to sort and show the first date
    purl: purl,
    locations: locations || [],
    severity: severity,
    version: f.version ? f.version : '',
    language: f.language ? f.language : '',
    type: f.type ? f.type : '',
    package_name: f.package_name ? f.package_name : '',
    package_versions: f.version ? [f.version] : [],
    fix_state: f.fix_state && typeof f.fix_state === 'string' ? f.fix_state : null,
    fix_versions: f.fix_versions && Array.isArray(f.fix_versions) ? (f.fix_versions as string[]) : [],
    findings: [f],
    project_id,
  };
}

// TODO: (freeqaz) Merge this with this other duplicated function into a "common" package shared by the front-end + backend
export function groupByPackage(project_id: string, findings: Finding[]): VulnerablePackage[] {
  // a place to group vulnerabilities by package
  const pkgs: Record<string, VulnerablePackage> = {};
  // sort by severity
  const sFindings = [...findings].sort((a, b) => severityOrder.indexOf(b.severity) - severityOrder.indexOf(a.severity));
  sFindings.forEach((finding) => {
    const f = finding;

    const purl = f.purl;

    if (purl === undefined || purl === null || purl === '') {
      log.error('[groupByPackage] Unable to find purl for package:', f);
      return;
    }

    if (
      !f.severity ||
      typeof f.severity !== 'string' ||
      !severityOrder.includes(f.severity as typeof severityOrder[number])
    ) {
      f.severity = 'Unknown';
    }

    const severity = f.severity as typeof severityOrder[number];

    const locations = f.locations && typeof f.locations === 'string' ? parsePsqlStringArray(f.locations) : null;

    const preExisting = pkgs[purl];
    if (!preExisting) {
      pkgs[purl] = createGroupedFindingObject(project_id, purl, locations, severity, f);
      return;
    }

    // Pick the highest severity and show that
    preExisting.severity = getHighestSeverity(preExisting, finding);

    const packageVersions = preExisting.package_versions;

    if (packageVersions && finding.version && !packageVersions.includes(finding.version)) {
      packageVersions.push(finding.version);
    }

    // just add the new vuln to the existing pkg, unless it's a dupe from another location
    if (preExisting.findings.filter((pf) => pf.vulnerability?.data.slug === f.vulnerability?.data.slug).length === 0) {
      pkgs[purl].findings.push(f);
    }

    // add any new locations
    locations &&
      locations.forEach((l) => {
        if (!preExisting.locations.includes(l)) {
          preExisting.locations = [...preExisting.locations, l];
        }
      });

    // Add any fix versions/state
    if (f.fix_state === 'fixed') {
      preExisting.fix_state = f.fix_state && typeof f.fix_state === 'string' ? f.fix_state : null;

      const newFixedVersions = parsePsqlStringArray(f.fix_versions);
      if (newFixedVersions) {
        newFixedVersions.forEach((v) => {
          if (!preExisting.fix_versions.includes(v)) {
            preExisting.fix_versions = [...preExisting.fix_versions, v];
          }
        });
      }
    }

    return;
  });
  return Object.values(pkgs);
}
