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
export interface FindingToIgnore {
  locations: string[];
  vulnerability: {
    ignored_vulnerabilities: Array<{
      locations: string[];
    }>;
  };
}

export function findingIsNotIgnored<F extends FindingToIgnore>(finding: F): boolean {
  // Get the ignored_vulnerability that is linked to this finding, if any.  There are a maximum of one because of the unique constraint
  const ignoreRule = finding.vulnerability.ignored_vulnerabilities[0];
  // if there are none just keep it
  if (!ignoreRule) {
    return true;
  }

  // Check if any of the rules match all of the locations in our list
  return !finding.locations.every((location) => {
    return ignoreRule.locations.includes(location);
  });
}

export function filterFindingsByIgnored<F extends FindingToIgnore>(findings: F[]): F[] {
  return findings.filter(findingIsNotIgnored);
}
