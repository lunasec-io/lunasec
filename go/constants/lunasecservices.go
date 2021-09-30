package constants

//go:generate go-enum -f=$GOFILE --marshal --lower --names -t ./enumtemplates/yamlmarshal.tmpl

// LunaSecServices
// Stores a list of valid LunaSec services.
// This is a generated enum.
/*
ENUM(
tokenizer-backend,
secure-frame-frontend,
) */
type LunaSecServices int
