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
import { Findings_Insert_Input } from '../../hasura-api/generated';

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

// TODO: (freeqaz) Merge this with this other duplicated function into a "common" package shared by the front-end + backend
export function groupByPackage(project_id: string, findings: Finding[]): VulnerablePackage[] {
  // a place to group vulnerabilities by package
  const pkgs: Record<string, VulnerablePackage> = {};
  // sort by severity
  const sFindings = [...findings].sort((a, b) => severityOrder.indexOf(b.severity) - severityOrder.indexOf(a.severity));
  sFindings.forEach((finding) => {
    const f = finding;

    const purl = f.purl ? f.purl : 'Unknown';

    const locations = f.locations && Array.isArray(f.locations) ? (f.locations as string[]) : [];

    const preExisting = pkgs[purl];
    if (!preExisting) {
      pkgs[purl] = {
        created_at: f.created_at && typeof f.created_at === 'string' ? f.created_at : '', // might be better to sort and show the first date
        purl: purl,
        locations: locations,
        severity:
          f.severity &&
          typeof f.severity === 'string' &&
          severityOrder.indexOf(f.severity as typeof severityOrder[number]) > -1
            ? (f.severity as typeof severityOrder[number])
            : 'Unknown',
        version: f.version ? f.version : '',
        language: f.language ? f.language : '',
        type: f.type ? f.type : '',
        package_name: f.package_name ? f.package_name : '',
        package_versions:
          f.package_version && f.package_version.data.version_format
            ? [f.package_version.data.version_format]
            : undefined,
        fix_state: f.fix_state && typeof f.fix_state === 'string' ? f.fix_state : null,
        fix_versions: f.fix_versions && Array.isArray(f.fix_versions) ? (f.fix_versions as string[]) : [],
        findings: [f],
        project_id,
      };
      return;
    }

    // Pick the highest severity and show that
    preExisting.severity = getHighestSeverity(preExisting, finding);

    // just add the new vuln to the existing pkg, unless it's a dupe from another location
    if (preExisting.findings.filter((pf) => pf.vulnerability?.data.slug === f.vulnerability?.data.slug).length === 0) {
      pkgs[purl].findings.push(f);
    }

    // add any new locations
    locations.forEach((l) => {
      if (!preExisting.locations.includes(l)) {
        preExisting.locations = [...preExisting.locations, l];
      }
    });

    // Add any fix versions/state
    if (f.fix_state === 'fixed') {
      preExisting.fix_state = f.fix_state && typeof f.fix_state === 'string' ? f.fix_state : null;
      const newFixedVersions = f.fix_versions as string[] | undefined;
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
