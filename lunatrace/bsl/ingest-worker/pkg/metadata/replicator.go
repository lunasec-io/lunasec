package metadata

import "context"

type Replicator interface {
	Replicate(ctx context.Context, offset int) error
}
