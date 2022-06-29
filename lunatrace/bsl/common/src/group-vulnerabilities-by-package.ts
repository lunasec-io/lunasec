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
import { Finding, severityOrder, VulnerablePackage } from './types';

function sortBySeverity(a: Finding, b: Finding): number {
  return severityOrder.indexOf(b.severity) - severityOrder.indexOf(a.severity);
}

export function groupByPackage<F extends Finding>(project_id: string, findings: F[]): VulnerablePackage<F>[] {
  // a place to group vulnerabilities by package
  const pkgs: Record<string, VulnerablePackage<F>> = {};
  // sort by severity
  const sFindings = [...findings].sort(sortBySeverity);
  sFindings.forEach((f) => {
    const preExisting = pkgs[f.purl];
    if (!preExisting) {
      return (pkgs[f.purl] = createNewVulnPackage(project_id, f));
    }
    // There is a preExisting one so merge them
    mergeExistingFindingIntoPackage(preExisting, f);
  });
  return Object.values(pkgs);
}

function createNewVulnPackage<F extends Finding>(project_id: string, finding: F): VulnerablePackage<F> {
  // TODO (cthompson) getCvssVectorFromSeverities should be moved into common
  // const severity = getCvssVectorFromSeverities(finding.vulnerability.severities);
  return {
    created_at: finding.created_at, // might be better to sort and show the first date
    purl: finding.purl,
    locations: finding.locations,
    severity: finding.severity,
    version: finding.version,
    language: finding.language,
    type: finding.type,
    guides: finding.vulnerability.guide_vulnerabilities?.map((tv) => tv.guide) || [],
    package_name: finding.package_name,
    cvss_score: finding.vulnerability.cvss_score || 0,
    fix_state: finding.fix_state || null,
    fix_versions: finding.fix_versions || [],
    findings: [finding],
    project_id,
  };
}

function mergeExistingFindingIntoPackage<F extends Finding>(vulnPackage: VulnerablePackage<F>, finding: F): void {
  // add the finding to the finding list if its not a dupe
  // const existingSlugs = vulnPackage.findings.map((f) => f.vulnerability.slug);
  // const newSlug = finding.vulnerability.slug;
  // if (!existingSlugs.includes(newSlug)) {
  //   vulnPackage.findings.push(finding);
  // }
  // add any new locations
  finding.locations.forEach((l) => {
    if (!vulnPackage.locations.includes(l)) {
      vulnPackage.locations = [...vulnPackage.locations, l];
    }
  });
  // set the highest CVSS score to the package score
  // try {
  //   if (
  //     finding.vulnerability.namespace === 'nvd' &&
  //     Number(finding.vulnerability.cvss_score) > Number(vulnPackage.cvss_score)
  //   ) {
  //     vulnPackage.cvss_score = finding.vulnerability.cvss_score || null;
  //   }
  // } catch {
  //   console.error('failed converting cvss to number');
  // }
  // Add any fix versions/state
  if (finding.fix_state === 'fixed') {
    vulnPackage.fix_state = finding.fix_state;
    const newFixedVersions = finding.fix_versions;
    if (newFixedVersions) {
      newFixedVersions.forEach((v) => {
        if (!vulnPackage.fix_versions.includes(v)) {
          vulnPackage.fix_versions = [...vulnPackage.fix_versions, v];
        }
      });
    }
  }
  // merge guides
  if (finding.vulnerability.guide_vulnerabilities) {
    finding.vulnerability.guide_vulnerabilities.forEach(({ guide }) => {
      const alreadyAdded = vulnPackage.guides.some((preExistingGuide) => preExistingGuide.id === guide.id);
      if (!alreadyAdded) {
        vulnPackage.guides.push(guide);
      }
    });
  }
}

interface FindingForCounting {
  severity: string;
  purl: string;
}

export function countCriticalVulnerabilities(findings: FindingForCounting[]): number {
  const criticalPackagePurls = new Set<string>();
  findings.forEach((finding) => {
    if (finding.severity === 'Critical' && finding.purl) {
      criticalPackagePurls.add(finding.purl);
    }
  });
  return criticalPackagePurls.size;
}
