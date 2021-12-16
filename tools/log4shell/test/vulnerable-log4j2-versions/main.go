// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
package main

import (
	"encoding/xml"
	"fmt"
	"github.com/gocolly/colly/v2"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

var (
	versions = []string{"2.16.0","2.15.0","2.14.1","2.14.0","2.13.3","2.13.2","2.13.1","2.13.0","2.12.2","2.12.1","2.12.0","2.11.2","2.11.1","2.11.0","2.10.0","2.9.1","2.9.0","2.8.2","2.8.1","2.8","2.7","2.6.2","2.6.1","2.6","2.5","2.4.1","2.4","2.3","2.2","2.1","2.0.2","2.0.1","2.0","2.0-rc2","2.0-rc1"}
)

type ArtifactId struct {
	XMLName xml.Name `xml:"artifactId"`
	Value   string   `xml:",innerxml"`
}

type GroupId struct {
	XMLName xml.Name `xml:"groupId"`
	Value   string   `xml:",innerxml"`
}

type ModelVersion struct {
	XMLName xml.Name `xml:"modelVersion"`
	Value   string   `xml:",innerxml"`
}

type Version struct {
	XMLName xml.Name `xml:"version"`
	Value   string   `xml:",innerxml"`
}

type Scope struct {
	XMLName xml.Name `xml:"scope"`
	Value   string   `xml:",innerxml"`
}

type Id struct {
	XMLName xml.Name `xml:"id"`
	Value   string   `xml:",innerxml"`
}

type Dependency struct {
	XMLName xml.Name `xml:"dependency"`
	GroupId GroupId
	ArtifactId ArtifactId
	Version Version
	Scope Scope
}

type Dependencies struct {
	XMLName    xml.Name `xml:"dependencies"`
	Dependency []Dependency
}

type Profile struct {
	XMLName xml.Name `xml:"profile"`
	Id Id
	Dependencies []Dependencies
}

type Profiles struct {
	XMLName xml.Name `xml:"profiles"`
	Profile []Profile
}

type Project struct {
	XMLName xml.Name `xml:"project"`
	Xmlns           string `xml:"xmlns,attr"`
	XmlnsXsi           string `xml:"xmlns:xsi,attr"`
	XsiSchemaLocation           string `xml:"xsi:schemaLocation,attr"`
	Version Version
	ModelVersion ModelVersion
	GroupId GroupId
	ArtifactId ArtifactId
	Profiles []Profiles
}

func getLog4jFromMaven() {
	var profiles []Profile

	for _, version := range versions {
		dependency := []Dependency{
			{
				GroupId: GroupId{
					Value: "org.apache.logging.log4j",
				},
				ArtifactId: ArtifactId{
					Value: "log4j-core",
				},
				Version: Version{
					Value: version,
				},
				Scope: Scope{
					Value: "compile",
				},
			},
		}
		profile := Profile{
			Id: Id{
				Value: version,
			},
			Dependencies: []Dependencies{
				{
					Dependency: dependency,
				},
			},
		}
		profiles = append(profiles, profile)
	}

	project := &Project{
		Xmlns: "http://maven.apache.org/POM/4.0.0",
		XmlnsXsi: "http://www.w3.org/2001/XMLSchema-instance",
		XsiSchemaLocation: "http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd",
		Version: Version{
			Value: "1.0",
		},
		ModelVersion: ModelVersion{
			Value: "4.0.0",
		},
		ArtifactId: ArtifactId{
			Value: "test",
		},
		GroupId: GroupId{
			Value: "io.lunasec",
		},
		Profiles: []Profiles{
			{
				Profile: profiles,
			},
		},
	}

	out, err := xml.MarshalIndent(project, "", "  ")
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile("pom.xml", out, 0644)
	if err != nil {
		panic(err)
	}

	for _, version := range versions {
		fmt.Printf("Downloading log4j2 version %s...", version)
		cmd := exec.Command("mvn", "dependency:copy-dependencies", "-P", version)
		out, err := cmd.CombinedOutput()
		if err != nil {
			panic(err)
		}
		fmt.Println(string(out))
	}
}

func downloadFile(downloadUrl string) string {
    // Build fileName from fullPath
    fileURL, err := url.Parse(downloadUrl)
    if err != nil {
        log.Fatal(err)
    }
    path := fileURL.Path
    segments := strings.Split(path, "/")
    fileName := segments[len(segments)-1]

    filePath := filepath.Join("apache-download", fileName)

    // Create blank file
    file, err := os.Create(filePath)
    if err != nil {
        log.Fatal(err)
    }
    client := http.Client{
        CheckRedirect: func(r *http.Request, via []*http.Request) error {
            r.URL.Opaque = r.URL.Path
            return nil
        },
    }
    // Put content on file
    resp, err := client.Get(downloadUrl)
    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()

    size, err := io.Copy(file, resp.Body)

    defer file.Close()

    fmt.Printf("Downloaded a file %s with size %d", fileName, size)
    return filePath
}

func getLog4jFromApache() {
	os.Mkdir("apache", 0700)
	os.Mkdir("apache-download", 0700)

	c := colly.NewCollector(
		colly.MaxDepth(3),
		colly.Async(),
	)

	// Find and visit all links
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		href := e.Attr("href")
		if strings.HasPrefix(href, "2") || strings.HasPrefix(href, "1") {
			err := e.Request.Visit(href)
			if err != nil {
				fmt.Println(err)
			}
		}
		if strings.Contains(href, "log4j") && strings.HasSuffix(href, ".tar.gz") && !strings.Contains(href, "src") {
			downloadUrl := fmt.Sprintf("%s%s", e.Request.URL.String(), href)
			fmt.Println("Downloading", downloadUrl)
			downloadedFile := downloadFile(downloadUrl)

			cmd := exec.Command("tar", "zxf", downloadedFile, "-C", "apache")
			err := cmd.Run()
			if err != nil {
				fmt.Println(err)
			}
		}
	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	err := c.Visit("https://archive.apache.org/dist/logging/log4j/")
	if err != nil {
		panic(err)
	}

	c.Wait()

	cmd := exec.Command("rm", "-rf", "apache-download")
	err = cmd.Run()
	if err != nil {
		fmt.Println(err)
	}
}

func main() {
	getLog4jFromApache()
	getLog4jFromMaven()
}
