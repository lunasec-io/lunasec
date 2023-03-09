package ingester

import (
	"context"
)

// empty implementation for now, in follow up PR
func (h *NPMPackageIngester) IngestPackageReference(ctx context.Context, packageName string) error {
	return nil
}
