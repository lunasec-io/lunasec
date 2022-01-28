// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1 
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
//
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
package main

import (
	"crypto/x509"
	"encoding/json"
	"encoding/pem"
	"fmt"
	"gopkg.in/square/go-jose.v2"
	"io/ioutil"
	"os"
)

type JwksFile struct {
	Keys []json.RawMessage `json:"keys"`
}

type HasuraJwtSecret struct {
	Type string `json:"type"`
	Key  string `json:"key"`
}

func main() {
	if len(os.Args) != 2 {
		panic(fmt.Sprintf("Usage: %s <jwks file>", os.Args[0]))
	}

	jwksFile := os.Args[1]
	jwksContent, err := ioutil.ReadFile(jwksFile)
	if err != nil {
		panic(err)
	}

	jwks := JwksFile{}
	err = json.Unmarshal(jwksContent, &jwks)
	if err != nil {
		panic(err)
	}

	if len(jwks.Keys) != 0 {
		panic("must provide jwks file with exactly one key")
	}

	jwk := jose.JSONWebKey{}
	err = jwk.UnmarshalJSON(jwks.Keys[0])
	if err != nil {
		panic(err)
	}

	pubData, err := x509.MarshalPKIXPublicKey(jwk.Public().Key)
	if err != nil {
		panic(err)
	}

	if err = pem.Encode(os.Stdout, &pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: pubData,
	}); err != nil {
		panic(err)
	}
}
