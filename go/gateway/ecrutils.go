package gateway

import (
	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/google/go-containerregistry/pkg/crane"
	"log"
)

func LoadPublicCraneOptions(ecrGateway AwsECRGateway) (options crane.Option, err error) {
	cfg, err := ecrGateway.GetPublicCredentials()
	if err != nil {
		log.Println(err)
		return
	}

	authenticator := authn.FromConfig(cfg)

	options = crane.WithAuth(authenticator)
	return
}

func LoadCraneOptions(ecrGateway AwsECRGateway) (options crane.Option, err error) {
	cfg, err := ecrGateway.GetCredentials()
	if err != nil {
		log.Println(err)
		return
	}

	authenticator := authn.FromConfig(cfg)

	options = crane.WithAuth(authenticator)
	return
}
