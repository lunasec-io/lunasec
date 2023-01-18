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

import (
	"fmt"
	"github.com/anchore/go-logger"
	"github.com/rs/zerolog/log"
)

type ZerologLogger struct{}

func (l *ZerologLogger) Tracef(format string, args ...interface{}) {
	log.Debug().Msg(fmt.Sprintf(format, args))
}

func (l *ZerologLogger) Trace(args ...interface{}) {
	log.Debug().Msg(fmt.Sprintf("%v", args))
}

func (l *ZerologLogger) WithFields(fields ...interface{}) logger.MessageLogger {
	c := log.With()
	for _, field := range fields {
		c = c.Interface("key", field)
	}
	l2 := c.Logger()
	l2.Debug().Msg("nested")
	return l
}

func (l *ZerologLogger) Nested(fields ...interface{}) logger.Logger {
	c := log.With()
	for _, field := range fields {
		c = c.Interface("key", field)
	}
	l2 := c.Logger()
	l2.Debug().Msg("nested")
	return l
}

func (l *ZerologLogger) Errorf(format string, args ...interface{}) {
	log.Error().Msg(fmt.Sprintf(format, args))
}
func (l *ZerologLogger) Error(args ...interface{}) {
	log.Error().Msg(fmt.Sprintf("%v", args))
}
func (l *ZerologLogger) Warnf(format string, args ...interface{}) {
	log.Warn().Msg(fmt.Sprintf(format, args))
}
func (l *ZerologLogger) Warn(args ...interface{}) {
	log.Warn().Msg(fmt.Sprintf("%v", args))
}
func (l *ZerologLogger) Infof(format string, args ...interface{}) {
	log.Info().Msg(fmt.Sprintf(format, args))
}
func (l *ZerologLogger) Info(args ...interface{}) {
	log.Info().Msg(fmt.Sprintf("%v", args))
}
func (l *ZerologLogger) Debugf(format string, args ...interface{}) {
	log.Debug().Msg(fmt.Sprintf(format, args))
}
func (l *ZerologLogger) Debug(args ...interface{}) {
	log.Debug().Msg(fmt.Sprintf("%v", args))
}
