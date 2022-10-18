package metadata

import "context"

type Replicator interface {
	GetLastReplicatedOffset() (int, error)
	ReplicateSince(ctx context.Context, offset int) error
	InitialReplication(ctx context.Context) error
}
