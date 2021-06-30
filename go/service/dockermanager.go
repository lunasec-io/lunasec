package service

import (
	"github.com/google/go-containerregistry/pkg/crane"
	"github.com/google/go-containerregistry/pkg/logs"
	v1 "github.com/google/go-containerregistry/pkg/v1"
	"github.com/google/go-containerregistry/pkg/v1/empty"
)

type DockerManager interface {
	PullImage(imageURL string) (base v1.Image, err error)
	PushImage(img v1.Image, newTag string) (err error)
}

type dockerManager struct {
	options          []crane.Option
}

func NewDockerManager(
	options ...crane.Option,
) DockerManager {
	return &dockerManager{
		options:          options,
	}
}

func (d *dockerManager) PushImage(img v1.Image, newTag string) (err error) {
	return crane.Push(img, newTag, d.options...)
}

func (d *dockerManager) PullImage(imageURL string) (base v1.Image, err error) {
	if imageURL == "" {
		logs.Warn.Printf("base unspecified, using empty image")
		base = empty.Image
		return
	}

	base, err = crane.Pull(imageURL, d.options...)
	// If we succeeded, then return...
	if err == nil {
		return
	}
	// ...otherwise try again without auth
	return crane.Pull(imageURL)
}
