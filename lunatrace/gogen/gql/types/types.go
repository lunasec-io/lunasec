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
package types

type UUID string

type PackageManager string

const (
	NPM           = "npm"
	Packagist     = "packagist"
	CratesIo      = "crates_io"
	Go            = "go"
	Hex           = "hex"
	Maven         = "maven"
	NuGet         = "nuget"
	PyPi          = "pypi"
	RubyGems      = "rubygems"
	GithubActions = "github_actions"
	Pub           = "pub"
)

var PackageManagers = []PackageManager{
	NPM,
	Packagist,
	CratesIo,
	Go,
	Hex,
	Maven,
	NuGet,
	PyPi,
	RubyGems,
	GithubActions,
	Pub,
}

type LicenseSource string

const (
	Manual     LicenseSource = "manual"
	ScanRepo   LicenseSource = "scan_repo"
	ScanBinary LicenseSource = "scan_binary"
	ApiNpm     LicenseSource = "api_npm"
)

type AffectedRangeType string

const (
	Git       AffectedRangeType = "git"
	SemVer    AffectedRangeType = "semver"
	Ecosystem AffectedRangeType = "ecosystem"
)

var AffectedRangeTypes = []AffectedRangeType{
	Git, SemVer, Ecosystem,
}

type ReferenceType string

const (
	Advisory     ReferenceType = "advisory"
	Article      ReferenceType = "article"
	Fix          ReferenceType = "fix"
	GitReference ReferenceType = "git"
	Package      ReferenceType = "package"
	Report       ReferenceType = "report"
	Web          ReferenceType = "web"
)

var ReferenceTypes = []ReferenceType{
	Advisory, Article, Fix, GitReference, Package, Report, Web,
}
