package visualizer

import (
	"encoding/json"
	"fmt"
	"os"
	"path"
	"strconv"
	"strings"

	"github.com/Masterminds/semver/v3"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/metadata"
)

type Dep struct {
	PackageName         string
	PackageVersion      string
	PackageVersionQuery string
}

type Position struct {
	X int `json:"x"`
	Y int `json:"y"`
}

type NodeData struct {
	Label   string `json:"label"`
	Version string `json:"version"`
}

type PackageNode struct {
	ID       string   `json:"id"`
	Data     NodeData `json:"data"`
	Group    int      `json:"group"`
	Position Position `json:"position"`
}

type PackageEdge struct {
	ID           string `json:"id"`
	Source       string `json:"source"`
	Target       string `json:"target"`
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

type PackageResolution struct {
	Version *semver.Version
	ID      string
}

func VisualizePackage(registry metadata.NpmRegistry, outDir, packageName, packageVersion string) {
	var (
		depsToCollect    []*GraphDep
		packageNodes     []PackageNode
		packageEdges     []PackageEdge
		resolvedPackages = make(map[string][]PackageResolution)
		metaLookup       = make(map[string]*metadata.PackageMetadata)
	)

	depsToCollect = append(depsToCollect, &GraphDep{
		Source: 0,
		Target: Dep{
			PackageName:         packageName,
			PackageVersionQuery: packageVersion,
		},
	})

	for {
		if len(depsToCollect) == 0 {
			break
		}

		dep := depsToCollect[0]
		depsToCollect = depsToCollect[1:]

		fmt.Printf("%s%s - %s\n", strings.Repeat("\t", dep.Depth), dep.Target.PackageName, dep.Target.PackageVersionQuery)

		logger := log.With().
			Str("package", dep.Target.PackageName).
			Logger()

		var (
			meta *metadata.PackageMetadata
			ok   bool
			err  error
		)
		if meta, ok = metaLookup[dep.Target.PackageName]; !ok {
			// Get the package metadata, which contains the list of releases
			meta, err = registry.GetPackageMetadata(dep.Target.PackageName)
			if err != nil {
				logger.Error().
					Err(err).
					Msg("failed to get package metadata")
				continue
			}
			metaLookup[dep.Target.PackageName] = meta
		}

		versionQuery := dep.Target.PackageVersionQuery

		// Check if the version query is a semver range
		versionRange, err := semver.NewConstraint(versionQuery)
		if err != nil {
			// If the version query is "latest", we can just use the latest version
			if versionQuery == "latest" && len(meta.Releases) > 0 {
				versionQuery = meta.Releases[len(meta.Releases)-1].Version
			} else {
				logger.Warn().
					Err(err).
					Str("version range", versionQuery).
					Msg("failed to parse semver range")
			}

			nodeId := len(packageNodes)
			packageNodes = append(packageNodes, PackageNode{
				ID: strconv.Itoa(nodeId),
				Data: NodeData{
					Label:   dep.Target.PackageName + "@" + versionQuery,
					Version: versionQuery,
				},
				Group: 0,
			})

			edgeId := len(packageEdges)
			packageEdges = append(packageEdges, PackageEdge{
				ID:           strconv.Itoa(edgeId),
				Source:       strconv.Itoa(dep.Source),
				Target:       strconv.Itoa(len(packageNodes) - 1),
				VersionQuery: dep.Target.PackageVersionQuery,
			})
			continue
		}

		// Check if we've already resolved this package
		var resolved bool
		if resolutions, ok := resolvedPackages[dep.Target.PackageName]; ok {
			for _, resolution := range resolutions {
				if ok, _ := versionRange.Validate(resolution.Version); !ok {
					continue
				}

				edgeId := len(packageEdges)
				packageEdges = append(packageEdges, PackageEdge{
					ID:           strconv.Itoa(edgeId),
					Source:       strconv.Itoa(dep.Source),
					Target:       resolution.ID,
					VersionQuery: dep.Target.PackageVersionQuery,
				})
				resolved = true
				break
			}
		}

		if resolved {
			continue
		}

		var (
			matchedRelease  *metadata.Release
			packageReleases []string
		)

		for _, release := range meta.Releases {
			packageReleases = append(packageReleases, release.Version)

			versionSemver, err := semver.NewVersion(release.Version)
			if err != nil {
				logger.Error().
					Err(err).
					Str("dep", dep.Target.PackageName).
					Str("version", release.Version).
					Msg("failed to parse semver")
				continue
			}

			if ok, _ := versionRange.Validate(versionSemver); !ok {
				continue
			}

			dep.Target.PackageVersion = release.Version

			matchedRelease = &release

			// Add the resolved package to the list of resolved packages, so we don't have to resolve it again
			resolvedPackages[dep.Target.PackageName] = append(resolvedPackages[dep.Target.PackageName], PackageResolution{
				ID:      strconv.Itoa(dep.Source),
				Version: versionSemver,
			})
			break
		}

		if matchedRelease == nil {
			logger.Warn().
				Strs("package releases", packageReleases).
				Msg("no matching release found")
			continue
		}

		for _, discoveredDep := range matchedRelease.Dependencies {
			if discoveredDep.IsDev {
				continue
			}

			targetNodeId := len(packageNodes)
			packageNodes = append(packageNodes, PackageNode{
				ID: strconv.Itoa(targetNodeId),
				Data: NodeData{
					Label:   discoveredDep.Name + "@" + discoveredDep.Version,
					Version: discoveredDep.Version,
				},
				Group: 0,
			})

			edgeId := len(packageEdges)
			packageEdges = append(packageEdges, PackageEdge{
				ID:           strconv.Itoa(edgeId),
				Source:       strconv.Itoa(dep.Source),
				Target:       strconv.Itoa(targetNodeId),
				VersionQuery: discoveredDep.Version,
			})

			depsToCollect = append(depsToCollect, &GraphDep{
				Depth:  dep.Depth + 1,
				Source: targetNodeId,
				Target: Dep{
					PackageName:         discoveredDep.Name,
					PackageVersionQuery: discoveredDep.Version,
				},
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

	filename := fmt.Sprintf("%s-%s.json", packageName, packageVersion)
	err = os.WriteFile(path.Join(outDir, filename), graphData, 0755)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to write file")
		return
	}
}
