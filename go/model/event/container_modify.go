package event

import (
	"github.com/refinery-labs/loq/constants"
	"github.com/refinery-labs/loq/model"
)

type ImageFile struct {
	Bucket string `json:"bucket"`
	Key    string `json:"key"`
}

type ContainerModifyEvent struct {
	Registry     string                 `json:"registry"`
	BaseImage    string                 `json:"base_image"`
	NewImageName string                 `json:"new_image_name"`
	ImageFiles   ImageFile              `json:"image_files"`
	Runtime      string                 `json:"runtime"`
	Functions    []model.FunctionConfig `json:"functions"`
}

func (c ContainerModifyEvent) ShouldModifyEntrypoint() bool {
	return c.Runtime == string(constants.Docker)
}

type ContainerModifyResponse struct {
	Tag          string `json:"tag"`
	DeploymentID string `json:"deployment_id"`
}
