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
package queue

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
	"gocloud.dev/pubsub"
)

type Params struct {
	fx.In
	Sub      *pubsub.Subscription
	handlers HandlerLookup
}

type Runner struct {
	Params
}

func NewQueueRunner(p Params) *Runner {
	return &Runner{
		Params: p,
	}
}

func (s *Runner) Run(ctx context.Context) error {
	for {
		msg, err := s.Sub.Receive(ctx)
		if err != nil {
			log.Error().
				Err(err).
				Msg("failed to receive message")
			return err
		}

		err = s.dispatchMessage(ctx, msg)
		if err != nil {
			log.Error().
				Err(err).
				Msg("failed to dispatch message")
			return err
		}
	}
}

func (s *Runner) dispatchMessage(ctx context.Context, msg *pubsub.Message) error {
	var queueMessage Message
	err := json.Unmarshal(msg.Body, &queueMessage)
	if err != nil {
		log.Error().Err(err).Msg("failed to parse message from queue")
		return err
	}

	handler, ok := s.handlers[queueMessage.MessageType]
	if !ok {
		log.Error().
			Str("message type", queueMessage.MessageType).
			Msg("failed to locate handler for type")
		return errors.New("failed to locate handler for type")
	}

	for _, record := range queueMessage.Records {
		err = handler.HandleRecord(ctx, record)
		if err != nil {
			log.Error().
				Str("message type", queueMessage.MessageType).
				Interface("record", record).
				Msg("failed to handle record for message type")
			return errors.New("failed to handle record for queue message")
		}
	}
	return nil
}
