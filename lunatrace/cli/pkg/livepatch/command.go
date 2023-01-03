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
package livepatch

import (
	"embed"
	"fmt"

	"github.com/rs/zerolog/log"
	"github.com/urfave/cli/v2"

	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/command"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/constants"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/httputil"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/patch"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/types"
	"github.com/lunasec-io/lunasec/lunatrace/cli/pkg/util"
)

func LivePatchCommand(c *cli.Context, globalBoolFlags *types.LunaTraceGlobalFlags, hotpatchFiles embed.FS) error {
	command.EnableGlobalFlags(globalBoolFlags)

	payloadUrl := c.String("payload-url")
	ldapHost := c.String("ldap-host")
	ldapPort := c.Int("ldap-port")

	log.Info().Msg("LunaSec Log4Shell LivePatcher starting")
	readMe := util.Colorize(constants.ColorRed, "Read our blog post about this tool and its risks")
	blogLink := util.Colorize(constants.ColorBlue, "https://www.lunasec.io/docs/blog/log4shell-live-patch/")
	log.Info().Msg(fmt.Sprintf("%s: %s", readMe, blogLink))

	if payloadUrl == "" {
		log.Info().
			Str("defaultPayloadUrl", constants.DefaultPayloadUrl).
			Msg("Payload URL (the LDAP Payload Target) not provided. Using localhost")
		payloadUrl = constants.DefaultPayloadUrl
	}

	if ldapPort == 0 {
		ldapPort = constants.DefaultLDAPServerPort
	}

	payloadServerHost, payloadServerPort, err := httputil.ParseHostAndPortFromUrlString(payloadUrl)
	if err != nil {
		log.Error().
			Err(err).
			Str("payloadUrl", payloadUrl).
			Msg("Unable to parse provided payload server Name.")
		return err
	}

	if ldapHost == "" {
		ldapHost = payloadServerHost
	}

	payload := fmt.Sprintf("${jndi:ldap://%s:%d/a}", ldapHost, ldapPort)

	hotpatchServer := NewHotpatchLDAPServer(
		ldapPort,
		payloadUrl,
	)
	hotpatchPayloadServer := patch.NewHotpatchPayloadServer(
		payloadUrl,
		payloadServerPort,
		hotpatchFiles,
		payload,
	)

	log.Info().
		Msg("Starting Log4Shell live patch LDAP and payload servers")
	log.Info().
		Msgf("Once both servers have started, use payload string: '%s' to hotpatch your servers.", payload)

	hotpatchServer.Start()
	hotpatchPayloadServer.Start()

	util.WaitForProcessExit(func() {
		hotpatchServer.Stop()
	})

	return nil
}
