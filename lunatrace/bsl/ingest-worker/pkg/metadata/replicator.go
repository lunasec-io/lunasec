package metadata

import "context"

type Replicator interface {
	Replicate(ctx context.Context) error
}
