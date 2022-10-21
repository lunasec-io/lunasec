package metadata

type Registry interface {
	PackageStream() (<-chan string, error)
}

type NpmRegistry interface {
	Registry
	GetPackageMetadata(name string) (*PackageMetadata, error)
}
