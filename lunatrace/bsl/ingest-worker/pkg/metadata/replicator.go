package metadata

import "context"

type Replicator interface {
	ReplicateSince(ctx context.Context, offset int) error
	InitialReplication(ctx context.Context) error
}
