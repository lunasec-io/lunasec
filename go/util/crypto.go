package util

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/binary"
	"encoding/hex"
	"fmt"
	"github.com/refinery-labs/loq/constants"
	"math/rand"

	"github.com/google/uuid"
	"github.com/refinery-labs/loq/model"
	"golang.org/x/crypto/sha3"
)

const keySize = 32

var randRead = rand.Read
var hexDecodeString = hex.DecodeString
var aesNewCipher = aes.NewCipher

// Encrypt encrypts a string given a key
func Encrypt(key string, plaintext []byte) (result []byte, err error) {
	c, err := getCipher(key)

	if err != nil {
		return result, err
	}

	//Create a nonce. Nonce should be from GCM
	nonce := make([]byte, c.NonceSize())

	if _, err = randRead(nonce); err != nil {
		panic(fmt.Errorf("Unable to generate random numbers: %v", err))
	}

	return c.Seal(nonce, nonce, plaintext, nil), nil
}

// Decrypt decrypts a string given a key
func Decrypt(key string, encrypted []byte) (plaintext []byte, err error) {
	c, err := getCipher(key)

	if err != nil {
		return plaintext, err
	}

	nonceSize := c.NonceSize()
	nonce, ciphertext := encrypted[:nonceSize], encrypted[nonceSize:]

	return c.Open(nil, nonce, ciphertext, nil)
}

// Keygen generates an encryption key
func Keygen() []byte {
	bytes := make([]byte, keySize)

	// There are bigger problems if random numbers can't be generated.
	if _, err := randRead(bytes); err != nil {
		panic(err.Error())
	}

	return bytes
}

// GenToken generates a token
func GenToken() model.Token {
	return constants.TokenPrefix + model.Token(uuid.NewString())
}

// GetRandomStringOfLength ...
func GetRandomStringOfLength(length int, random *rand.Rand) string {
	bytes := make([]byte, length)
	// There are bigger problems if random numbers can't be generated.
	if _, err := random.Read(bytes); err != nil {
		panic(err.Error())
	}

	return hex.EncodeToString(bytes)
}

// GenerateSaltsAndKey ...
func GenerateSaltsAndKey(token model.Token, secret string) model.SaltsAndKey {
	tokenStr := string(token) + secret
	hashable := sha3.Sum512([]byte(tokenStr))
	seed := append([]byte(tokenStr), hashable[:]...)
	seedInt := binary.BigEndian.Uint64(seed)
	random := rand.New(rand.NewSource(int64(seedInt)))

	return model.SaltsAndKey{
		Sp: GetRandomStringOfLength(keySize, random),
		Sk: GetRandomStringOfLength(keySize, random),
		Kt: GetRandomStringOfLength(keySize, random),
	}
}

// GetCompositeHash ...
func GetCompositeHash(strings ...interface{}) string {
	composite := fmt.Sprint(strings...)
	hashBytes := sha3.Sum256([]byte(composite))

	return hex.EncodeToString(hashBytes[:])
}

// Sha512Sum ...
func Sha512Sum(input string) string {
	hashBytes := sha3.Sum512([]byte(input))

	return hex.EncodeToString(hashBytes[:])
}

func getCipher(keyStr string) (cipher.AEAD, error) {
	key, err := hexDecodeString(keyStr)

	if err != nil {
		return nil, err
	}

	block, err := aesNewCipher(key)

	if err != nil {
		return nil, err
	}

	return cipher.NewGCM(block)
}
