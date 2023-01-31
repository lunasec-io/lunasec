package npm

type PackageDownloadDay struct {
	Downloads int    `json:"downloads"`
	Day       string `json:"day"`
}

type PackageDownloadRange struct {
	Downloads []PackageDownloadDay `json:"downloads"`
	Package   string               `json:"package"`
	Start     string               `json:"start"`
	End       string               `json:"end"`
}

type BulkDownloadResponse map[string]PackageDownloadRange
