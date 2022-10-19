package metadata

import "context"

type Registry interface {
	PackageStream(ctx context.Context) (<-chan string, error)
}

type NpmRegistry interface {
	Registry
	GetPackageMetadata(ctx context.Context, name string) (*PackageMetadata, error)
}
