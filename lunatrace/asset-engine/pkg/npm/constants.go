// Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
package npm

import "path"

const (
	/**
	 * npm registry
	 *
	 * @see {@link https://registry.npmjs.org}
	 */
	NpmRegistry = "https://registry.npmjs.org"

	/**
	 * npm registry mirror by Cloudflare
	 *
	 * @remarks
	 * This registry has CORS enabled and can be used to retrieve
	 * package manifests and packuments in the browser.
	 *
	 * @see {@link https://npmjs.cf}
	 * @see {@link https://registry.npmjs.cf}
	 */
	CloudflareRegistry = "https://registry.npmjs.cf"

	/**
	 * npm registry mirror by Yarn
	 *
	 * @see {@link https://registry.yarnpkg.com}
	 */
	YarnRegistry = "https://registry.yarnpkg.com"

	/**
	 * Downloads API for the npm registry
	 *
	 * @see {@link https://api.npmjs.org}
	 */
	NpmRegistryDownloadsAPI = "https://api.npmjs.org"
)

/**
 * Mirrors of the npm registry.
 *
 * @see {@link cloudflareRegistry}
 * @see {@link yarnRegistry}
 */
var NpmRegistryMirrors = []string{
	CloudflareRegistry,
	YarnRegistry,
}

const (
	archiveDir = "../archive"

	packageMetadataFilename = "package_metadata.json"

	fsPerm = 0755
)

var (
	npmArchiveDir = path.Join(archiveDir, "npm")
	npmPackageDir = path.Join(npmArchiveDir, "packages")
)
