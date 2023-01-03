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
package queuefx

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sqs"
	"github.com/rs/zerolog/log"
	"go.uber.org/fx"
	"gocloud.dev/pubsub"
	_ "gocloud.dev/pubsub/awssnssqs"
	"net/url"
	"runtime/debug"
)

type Params struct {
	fx.In

	Config
	AwsSession *session.Session
	Handlers   HandlerLookup
}

type Subscriber struct {
	p   Params
	Sub *pubsub.Subscription
}

func getSqsSubscriptionUrl(awsSession *session.Session, queueName string) (string, error) {
	svc := sqs.New(awsSession)

	log.Info().
		Str("queue name", queueName).
		Msg("getting queue url from queue name")

	output, err := svc.GetQueueUrl(&sqs.GetQueueUrlInput{
		QueueName: aws.String(queueName),
	})
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to get SQS queue url")
		return "", err
	}

	queueUrl, err := url.Parse(*output.QueueUrl)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed to parse SQS queue url")
		return "", err
	}

	queueUrl.Scheme = "awssqs"
	return queueUrl.String(), nil
}

func NewQueueSubscriber(p Params, lc fx.Lifecycle) (*Subscriber, error) {
	queueUrl, err := getSqsSubscriptionUrl(p.AwsSession, p.Config.Name)
	if err != nil {
		return nil, err
	}

	ctx := context.Background()
	sub, err := pubsub.OpenSubscription(ctx, queueUrl)
	if err != nil {
		return nil, err
	}

	log.Info().
		Str("queue url", queueUrl).
		Msg("listening for messages on queue")

	lc.Append(fx.Hook{OnStop: func(ctx context.Context) error {
		return sub.Shutdown(ctx)
	}})

	return &Subscriber{
		p:   p,
		Sub: sub,
	}, nil
}

func (s *Subscriber) Run(ctx context.Context) error {
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
			msg.Nack()
			log.Error().
				Err(err).
				Msg("failed to dispatch message")
			continue
		}
		msg.Ack()
	}
}

func (s *Subscriber) dispatchMessage(ctx context.Context, msg *pubsub.Message) error {
	defer func() {
		if err := recover(); err != nil {
			log.Error().
				Interface("error", err).
				Str("stack", string(debug.Stack())).
				Msg("recovered error from dispatched message")
		}
	}()

	var queueMessage Message
	err := json.Unmarshal(msg.Body, &queueMessage)
	if err != nil {
		log.Error().Err(err).Msg("failed to parse message from queue")
		return err
	}

	log.Info().
		Str("type", queueMessage.MessageType).
		Msg("received message from queue")

	handler, ok := s.p.Handlers[queueMessage.MessageType]
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
