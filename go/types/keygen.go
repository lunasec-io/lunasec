package types

// SaltsAndKey is the return value for GenerateSaltsAndKey
type SaltsAndKey struct {
	// Plaintext's salt
	Sp string
	// Encryption key's salt
	Sk string
	// Encryption key's encryption key
	Kt string
}
