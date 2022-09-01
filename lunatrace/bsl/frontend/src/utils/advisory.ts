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
import semver from 'semver';

export function formatAdvisoryUrlForSource(source: string, sourceId: string) {
  if (source === 'ghsa') {
    return `https://github.com/advisories/${sourceId}`;
  }
  if (source === 'nvd') {
    return `https://nvd.nist.gov/vuln/detail/${sourceId}`;
  }
  return null;
}

const PackageManagers = ['npm', 'packagist', 'crates_io', 'go', 'hex', 'maven', 'nuget', 'pypi', 'rubygems'] as const;
type PackageManagerType = typeof PackageManagers[number];

const packageManagerUrlFormat: Record<PackageManagerType, (name: string) => string> = {
  npm: (name) => `https://npmjs.com/package/${name}`,
  packagist: (name) => `https://packagist.org/packages/${name}`,
  crates_io: (name) => `https://crates.io/crates/${name}`,
  go: (name) => `https://pkg.go.dev/${name}`,
  hex: (name) => `https://hex.pm/packages/${name}`,
  maven: (name) => `https://mvnrepository.com/artifact/${name.replace(':', '/')}`,
  nuget: (name) => `https://www.nuget.org/packages/${name}`,
  pypi: (name) => `https://pypi.org/project/${name}`,
  rubygems: (name) => `https://rubygems.org/gems/${name}`,
};

export function formatPackageManagerUrlForPackage(packageManager: string, packageName: string) {
  if (PackageManagers.filter((pm) => pm === packageManager).length === 0) {
    return null;
  }
  return packageManagerUrlFormat[packageManager as PackageManagerType](packageName);
}

export function getAffectedVersionConstraint(affected: {
  affected_range_events: Array<{
    event: string;
    version: string;
  }>;
  affected_versions: Array<{
    version: string;
  }>;
}): string {
  const affectedVersions = affected.affected_versions.map((version) => `= ${version.version}`);
  const sortedAffectedVersionEvents = affected.affected_range_events
    .filter((event) => semver.clean(event.version))
    .sort((a, b) => (semver.gt(a.version, b.version) ? 1 : -1));

  const affectedVersionRanges: string[] = [];

  for (let i = 0; i < sortedAffectedVersionEvents.length; i++) {
    const startEvent = sortedAffectedVersionEvents[i];
    if (startEvent.event === 'fixed') {
      // if we have run into a 'fixed' event, then we say that everything before this event
      // is vulnerable.
      affectedVersionRanges.push(`< ${startEvent.version}`);
    }

    // keep scanning the versions until we are at an introduced event
    if (startEvent.event !== 'introduced') {
      continue;
    }

    let versionRange = `>= ${startEvent.version}`;
    for (let j = i; j < sortedAffectedVersionEvents.length; j++) {
      const endEvent = sortedAffectedVersionEvents[j];

      // keep looking for a corresponding 'fix' event
      if (endEvent.event !== 'fixed') {
        continue;
      }
      versionRange += `, < ${endEvent.version}`;

      // we have found the corresponding fix event for the introduced event, skip to this index on the next
      // search for a version range.
      i = j;
      break;
    }
    affectedVersionRanges.push(versionRange);
  }
  return [...affectedVersions, ...affectedVersionRanges].join(' || ');
}

export function getFixedVersions(affected: {
  affected_range_events: Array<{
    event: string;
    version: string;
  }>;
}) {
  return affected.affected_range_events
    .filter((event) => event.event === 'fixed')
    .filter((event) => semver.clean(event.version))
    .sort((a, b) => (semver.gt(a.version, b.version) ? 1 : -1))
    .map((event) => event.version)
    .join(', ');
}
