package service

import (
	"go.uber.org/config"
	"log"
)

type SessionVerifier interface {

}

type sessionVerifierConfig struct {
	PublicKey string `yaml:"public_key"`
}

type sessionVerifier struct {
	sessionVerifierConfig
}

func NewSessionVerifier(provider config.Provider) (verifier SessionVerifier, err error) {
	var (
		verifierConfig sessionVerifierConfig
	)

	err = provider.Get("session_verifier").Populate(&verifierConfig)
	if err != nil {
		log.Println(err)
		return
	}

	verifier = &sessionVerifier{
		sessionVerifierConfig: verifierConfig,
	}
	return
}

func (s *sessionVerifier) Verify(token string) (err error) {

}
