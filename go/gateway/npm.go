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
package gateway

import (
	"encoding/json"
	"fmt"
	"go.uber.org/config"
	"go.uber.org/zap"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"time"
)

type NpmGatewayConfig struct {
	RegistryURL string `yaml:"registry_url"`
	Authorization string `yaml:"authorization"`
}

type NpmGateway interface {
	DownloadPackage(name, version string) (packageTarFile *os.File, err error)
}

type npmGateway struct {
	NpmGatewayConfig
	logger *zap.Logger
	url *url.URL
	httpClient *http.Client
}

type NpmDistInfo struct {
	Tarball string `json:"tarball"`
}

type NpmVersionInfo struct {
	Dist NpmDistInfo `json:"dist"`
}

type NpmPackageInfo struct {
	Versions map[string]NpmVersionInfo `json:"versions"`
}

func (n *npmGateway) addAuthorizationToRequest(req *http.Request) {
	bearerAuth := fmt.Sprintf("Bearer %s", n.Authorization)
	req.Header.Add("Authorization", bearerAuth)
}

func (n *npmGateway) getPackageURL(packageName string) *url.URL {
	baseURL, _ := url.Parse(n.url.String())
	baseURL.Path = packageName
	return baseURL
}

func NewNpmGateway(logger *zap.Logger, provider config.Provider) NpmGateway {
	var (
		gatewayConfig NpmGatewayConfig
	)

	err := provider.Get("npm_gateway").Populate(&gatewayConfig)
	if err != nil {
		panic(err)
	}

	parsedUrl, err := url.Parse(gatewayConfig.RegistryURL)
	if err != nil {
		panic(err)
	}
	parsedUrl.Scheme = "https"

	httpClient := &http.Client{
		Timeout: time.Second * 10,
	}

	return &npmGateway{
		NpmGatewayConfig: gatewayConfig,
		logger: logger,
		url: parsedUrl,
		httpClient: httpClient,
	}
}

func (n *npmGateway) findPackageVersionTar(name, packageVersion string) (tarUrl string, err error) {
	n.logger.Debug(
		"downloading package from npm",
		zap.String("name", name),
		zap.String("packageVersion", packageVersion),
	)

	packageURL := n.getPackageURL(name)

	req, err := http.NewRequest("GET", packageURL.String(), nil)
	if err != nil {
		n.logger.Error("", zap.Error(err))
		return
	}
	n.addAuthorizationToRequest(req)

	// Get the data
	resp, err := n.httpClient.Do(req)
	if err != nil {
		n.logger.Error("", zap.Error(err))
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		n.logger.Error("", zap.Error(err))
		return
	}

	var npmPackgeInfo NpmPackageInfo
	err = json.Unmarshal(body, &npmPackgeInfo)
	if err != nil {
		n.logger.Error("", zap.Error(err))
		return
	}

	packageVersionInfo, ok := npmPackgeInfo.Versions[packageVersion]
	if !ok {
		err = fmt.Errorf("unable to location packageVersion %s for package %s", packageVersion, name)
		n.logger.Error("", zap.Error(err))
		return
	}
	tarUrl = packageVersionInfo.Dist.Tarball
	return
}

func (n *npmGateway) downloadPackageTar(packageTarURL string) (packageTarFile *os.File, err error) {
	req, err := http.NewRequest("GET", packageTarURL, nil)
	if err != nil {
		n.logger.Error("", zap.Error(err))
		return
	}
	n.addAuthorizationToRequest(req)

	// Get the data
	resp, err := n.httpClient.Do(req)
	if err != nil {
		n.logger.Error("", zap.Error(err))
		return
	}
	defer resp.Body.Close()

	packageTarFile, err = ioutil.TempFile(os.TempDir(), "*.tar")
	if err != nil {
		n.logger.Error("", zap.Error(err))
		return
	}

	// Write the body to file
	_, err = io.Copy(packageTarFile, resp.Body)
	return
}

func (n *npmGateway) DownloadPackage(name, version string) (packageTarFile *os.File, err error) {
	tarUrl, err := n.findPackageVersionTar(name, version)
	if err != nil {
		return
	}

	return n.downloadPackageTar(tarUrl)
}
