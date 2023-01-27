package visualizer

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/Masterminds/semver/v3"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
	"github.com/samber/lo"
)

var releaseVersionsForPackage = `
SELECT r.version FROM package.release r
JOIN package.package p ON r.package_id=p.id
WHERE p.name=$1
`

var releaseDependenciesForRelease = `
SELECT rd.dependency_package_id, rd.package_version_query FROM package.release r
JOIN package.release_dependency rd ON r.id=rd.release_id
WHERE r.id=$1
`

type Dep struct {
	PackageName         string
	PackageVersion      string
	PackageVersionQuery string
}

type GetDepsForPackageResponse struct {
	Deps []Dep `json:"deps"`
}

type GetReleasesForPackageResponse struct {
	Releases []string `json:"releases"`
}

func getReleaseVersionsForPackage(packageName string) (versions []string, err error) {
	req, err := http.Get(fmt.Sprintf("http://localhost:8081/package/releases?package=%s", url.QueryEscape(packageName)))
	if err != nil {
		return
	}

	body, err := io.ReadAll(req.Body)
	if err != nil {
		return
	}

	var resp GetReleasesForPackageResponse
	err = json.Unmarshal(body, &resp)
	if err != nil {
		return
	}

	versions = resp.Releases
	return
}

func getDepsForPackage(packageName, packageVersion string) (deps []Dep, err error) {
	req, err := http.Get(fmt.Sprintf("http://localhost:8081/package/dependencies?package=%s&version=%s", url.QueryEscape(packageName), url.QueryEscape(packageVersion)))
	if err != nil {
		return
	}

	body, err := io.ReadAll(req.Body)
	if err != nil {
		return
	}

	var resp GetDepsForPackageResponse
	err = json.Unmarshal(body, &resp)
	if err != nil {
		return
	}

	deps = resp.Deps
	return
}

type PackageNode struct {
	Name  string `json:"name"`
	Group int    `json:"group"`
}

type PackageEdge struct {
	Source       int    `json:"source"`
	Target       int    `json:"target"`
	VersionQuery string `json:"value"`
}

type GraphDep struct {
	Depth  int
	Source int
	Target Dep
}

type Graph struct {
	Nodes []PackageNode `json:"nodes"`
	Edges []PackageEdge `json:"edges"`
}

func VisualizePackage(packageName, packageVersion string) {
	var (
		depsToCollect         []GraphDep
		packageNodes          []PackageNode
		packageEdges          []PackageEdge
		depNodeIdLookup       = map[string]int{}
		packageReleasesLookup = map[string][]string{}
	)

	depNodeIdLookupKey := func(dep Dep) string {
		return dep.PackageName + dep.PackageVersionQuery
	}

	depsToCollect = append(depsToCollect, GraphDep{
		Source: 0,
		Target: Dep{
			PackageName:    packageName,
			PackageVersion: packageVersion,
		},
	})

	ignoredPackages := []string{
		"@babel", "@jest", "webpack", "lint",
	}

	for {
		if len(depsToCollect) == 0 {
			break
		}

		dep := depsToCollect[0]
		depsToCollect = depsToCollect[1:]

		fmt.Printf("%s%s - %s\n", strings.Repeat("\t", dep.Depth), dep.Target.PackageName, dep.Target.PackageVersion)

		depID := dep.Source
		if _, ok := depNodeIdLookup[depNodeIdLookupKey(dep.Target)]; ok {
			continue
		}
		depNodeIdLookup[depNodeIdLookupKey(dep.Target)] = depID

		logger := log.With().
			Str("package", dep.Target.PackageName).
			Logger()

		discoveredDeps, err := getDepsForPackage(dep.Target.PackageName, dep.Target.PackageVersion)
		if err != nil {
			logger.Error().
				Err(err).
				Msg("failed to get deps for package")
			continue
		}

		println(len(discoveredDeps))

		for _, discoveredDep := range discoveredDeps {
			var (
				versions []string
				ok       bool
			)

			if lo.ContainsBy(ignoredPackages, func(p string) bool {
				return strings.HasPrefix(discoveredDep.PackageName, p)
			}) {
				continue
			}

			if existingNodeId, ok := depNodeIdLookup[depNodeIdLookupKey(discoveredDep)]; ok {
				packageEdges = append(packageEdges, PackageEdge{
					Source:       depID,
					Target:       existingNodeId,
					VersionQuery: discoveredDep.PackageVersionQuery,
				})
				continue
			}

			depPackageName := discoveredDep.PackageName

			if versions, ok = packageReleasesLookup[depPackageName]; !ok {
				versions, err = getReleaseVersionsForPackage(depPackageName)
				if err != nil {
					logger.Error().
						Err(err).
						Str("dep", depPackageName).
						Msg("failed to get versions for package")
					continue
				}
				packageReleasesLookup[depPackageName] = versions
			}

			versionQuery := discoveredDep.PackageVersionQuery

			versionRange, err := semver.NewConstraint(versionQuery)
			if err != nil {
				logger.Warn().
					Err(err).
					Str("version range", versionQuery).
					Msg("failed to parse semver range")

				if versionQuery == "latest" && len(versions) > 0 {
					versionQuery = versions[0]
				}

				packageNodes = append(packageNodes, PackageNode{
					Name:  versionQuery,
					Group: 0,
				})

				packageEdges = append(packageEdges, PackageEdge{
					Source:       depID,
					Target:       len(packageNodes) - 1,
					VersionQuery: discoveredDep.PackageVersionQuery,
				})
				continue
			}

			var matchingVersion string

			for _, version := range versions {
				versionSemver, err := semver.NewVersion(version)
				if err != nil {
					logger.Error().
						Err(err).
						Str("dep", depPackageName).
						Str("version", version).
						Msg("failed to parse semver")
					continue
				}
				if ok, _ := versionRange.Validate(versionSemver); ok {
					matchingVersion = version
					break
				}
			}

			discoveredDep.PackageVersion = matchingVersion

			packageNodes = append(packageNodes, PackageNode{
				Name:  depPackageName,
				Group: 0,
			})
			targetNodeId := len(packageNodes) - 1

			packageEdges = append(packageEdges, PackageEdge{
				Source:       depID,
				Target:       targetNodeId,
				VersionQuery: discoveredDep.PackageVersionQuery,
			})

			depsToCollect = append(depsToCollect, GraphDep{
				Depth:  dep.Depth + 1,
				Source: targetNodeId,
				Target: discoveredDep,
			})
		}
	}

	graph := Graph{
		Nodes: packageNodes,
		Edges: packageEdges,
	}

	graphData, err := json.Marshal(graph)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to marshal graph")
		return
	}

	err = os.WriteFile(fmt.Sprintf("%s-%s.json", packageName, packageVersion), graphData, 0755)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to write file")
		return
	}
}
