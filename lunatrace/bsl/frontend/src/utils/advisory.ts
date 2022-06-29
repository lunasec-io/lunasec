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
