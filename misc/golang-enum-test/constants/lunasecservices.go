package constants

import (
  "errors"
  "gopkg.in/yaml.v3"
)

//go:generate stringer -type=LunaSecServices -linecomment
type LunaSecServices int

const (
  TokenizerBackendServiceName LunaSecServices = iota // tokenizer-backend
  SecureFrameFrontEndServiceName                     // secure-frame-frontend
)

func (i LunaSecServices) MarshalYAML() ([]byte, error) {
  return []byte(i.String()), nil
}

func (i *LunaSecServices) UnmarshalYAML(value *yaml.Node) error {
  *i = LunaSecServicesFromText(value.Value)
  return nil
}

func LunaSecServicesFromText(text string) LunaSecServices {
  switch text {
  default:
    panic(errors.New("unknown value for LunaSecServices provided"))
  case "tokenizer-backend":
    return TokenizerBackendServiceName
  case "secure-frame-frontend":
    return SecureFrameFrontEndServiceName
  }
}
