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
package queuefx

import (
	"context"

	"go.uber.org/fx"
	"gocloud.dev/pubsub"
)

func _() {

}

/*
for each subscription in config
create a subscription
annotate it with the name

*/

type SubscriptionConfig struct {
	Enabled bool   `yaml:"enabled"`
	URL     string `yaml:"url"`
}

func NewSubscription(cfg SubscriptionConfig, lc fx.Lifecycle) (*pubsub.Subscription, error) {
	ctx := context.Background()
	subs, err := pubsub.OpenSubscription(ctx, cfg.URL)
	if err != nil {
		return nil, err
	}

	lc.Append(fx.Hook{OnStop: func(ctx context.Context) error {
		return subs.Shutdown(ctx)
	}})

	return subs, nil
}
