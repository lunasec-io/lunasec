// Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package util

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha1"
	"encoding/binary"
	"encoding/hex"
	"fmt"
	mathrand "math/rand"

	"github.com/google/uuid"
	"github.com/lunasec-io/lunasec/lunadefend/go/constants"
	"github.com/lunasec-io/lunasec/lunadefend/go/types"
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
func GenToken() types.Token {
	return constants.TokenPrefix + types.Token(uuid.NewString())
}

// GetRandomStringOfLength ...
func GetRandomStringOfLength(length int, random *mathrand.Rand) string {
	bytes := make([]byte, length)
	// There are bigger problems if random numbers can't be generated.
	if _, err := random.Read(bytes); err != nil {
		panic(err.Error())
	}

	return hex.EncodeToString(bytes)
}

// GenerateSaltsAndKey ...
func GenerateSaltsAndKey(token types.Token, secret string) types.SaltsAndKey {
	tokenStr := string(token) + secret
	hashable := sha3.Sum512([]byte(tokenStr))
	seed := append([]byte(tokenStr), hashable[:]...)
	seedInt := binary.BigEndian.Uint64(seed)
	random := mathrand.New(mathrand.NewSource(int64(seedInt)))

	return types.SaltsAndKey{
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

func CreateSessionHash(sessionID string) string {
	shaHash := sha1.New()
	shaHash.Write([]byte(sessionID))
	return hex.EncodeToString(shaHash.Sum(nil))
}
