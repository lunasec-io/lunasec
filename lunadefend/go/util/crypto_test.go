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
	"encoding/hex"
	"errors"
	"math/rand"
	"testing"
	"time"

	"github.com/lunasec-io/lunasec/lunadefend/go/types"
	"github.com/prashantv/gostub"
	"github.com/stretchr/testify/assert"
)

func TestKeygen(t *testing.T) {
	for i := 0; i < 10; i++ {
		key := Keygen()

		// Key size is halfed due to hex encoding
		assert.Equal(t, keySize, len(key))
	}
}

func TestGenToken(t *testing.T) {
	token := GenToken()

	assert.Len(t, token, 44)
}

func TestKeygenRandReadFails(t *testing.T) {
	err := errors.New("Test error")
	stubs := gostub.StubFunc(&randRead, nil, err)
	defer stubs.Reset()

	assert.PanicsWithValue(t, err.Error(), func() { Keygen() })
}

func TestGetRandomStringofLength(t *testing.T) {
	rand := rand.New(rand.NewSource(time.Now().Unix()))

	for i := 0; i < 10; i++ {
		size := i * 2
		assert.Equal(t, size, len(GetRandomStringOfLength(size, rand))/2)
	}
}

func TestGenerateSaltsAndKey(t *testing.T) {
	token := types.Token("f3bf249e-c526-430a-941c-7119d7caf105")
	secret := "this is a secret"
	sp := "e80b87268f1b8e06933a4a68ff3d53fb684bf41f7a3943764e0e489621a5ce9f"
	sk := "35750752275a9d8a29cba945937bcd08a138fe892f42d7be1dfc9289f6e04fe8"
	kt := "79255d7e6cf8a6b560bcbeffd63488b223cd0ad68067bf96ffd75d86acc4daa3"
	snk := GenerateSaltsAndKey(token, secret)

	assert.Equal(t, sp, snk.Sp)
	assert.Equal(t, sk, snk.Sk)
	assert.Equal(t, kt, snk.Kt)
}

func TestGetCompositeHash(t *testing.T) {
	expected := "eef431520c0f93456d05330deba77b42359724549e304b80ac12f5f56865fbef"
	actual := GetCompositeHash("string1", "string2", "string3", "string4")

	assert.Equal(t, expected, actual)
}

func TestGetCipher(t *testing.T) {
	key := hex.EncodeToString(Keygen())
	cipher, err := getCipher(key)

	assert.NoError(t, err)
	assert.NotNil(t, cipher)
}

func TestGetCipherHexDecodeFails(t *testing.T) {
	expectedErr := errors.New("Test error")
	stubs := gostub.StubFunc(&hexDecodeString, nil, expectedErr)

	defer stubs.Reset()

	key := hex.EncodeToString(Keygen())
	cipher, err := getCipher(key)

	assert.Nil(t, cipher)
	assert.Equal(t, expectedErr, err)
}

func TestGetCipherGetCipherFails(t *testing.T) {
	expectedErr := errors.New("Test error")
	stubs := gostub.StubFunc(&aesNewCipher, nil, expectedErr)

	defer stubs.Reset()

	key := hex.EncodeToString(Keygen())
	cipher, err := getCipher(key)

	assert.Nil(t, cipher)
	assert.Equal(t, expectedErr, err)
}

func TestEncryptDecrypt(t *testing.T) {
	key := hex.EncodeToString(Keygen())
	expectedPlaintext := make([]byte, 5*1000000) // 5 mb

	if _, err := rand.Read(expectedPlaintext); err != nil {
		panic(err.Error())
	}

	ciphertext, err := Encrypt(key, expectedPlaintext)

	assert.NoError(t, err)
	assert.NotNil(t, ciphertext)

	plaintext, err := Decrypt(key, ciphertext)

	assert.NoError(t, err)
	assert.Equal(t, expectedPlaintext, plaintext)
}

func TestEncryptGetCipherFails(t *testing.T) {
	expectedErr := errors.New("Test error")
	key := hex.EncodeToString(Keygen())
	stubs := gostub.StubFunc(&aesNewCipher, nil, expectedErr)

	defer stubs.Reset()

	result, err := Encrypt(key, nil)

	assert.Nil(t, result)
	assert.EqualError(t, expectedErr, err.Error())
}

func TestEncryptRandReadFails(t *testing.T) {
	err := errors.New("Test error")
	key := hex.EncodeToString(Keygen())
	stubs := gostub.StubFunc(&randRead, nil, err)
	fn := func() { Encrypt(key, nil) }

	defer stubs.Reset()

	assert.Panicsf(t, fn, "Unable to generate random numbers: %v", err.Error())
}

func TestDecryptGetCipherFails(t *testing.T) {
	expectedErr := errors.New("Test error")
	key := hex.EncodeToString(Keygen())
	stubs := gostub.StubFunc(&aesNewCipher, nil, expectedErr)

	defer stubs.Reset()

	result, err := Decrypt(key, nil)

	assert.Nil(t, result)
	assert.EqualError(t, expectedErr, err.Error())
}

func TestSha512Sum(t *testing.T) {
	scenarios := map[string]string{
		"test1": "d2d8cc4f369b340130bd2b29b8b54e918b7c260c3279176da9ccaa37c96eb71735fc97568e892dc6220bf4ae0d748edb46bd75622751556393be3f482e6f794e",
		"test2": "e35970edaa1e0d8af7d948491b2da0450a49fd9cc1e83c5db4c6f175f9550cf341f642f6be8cfb0bfa476e4258e5088c5ad549087bf02811132ac2fa22b734c6",
		"test3": "05697d8f12c7ffdb85064a7f9ddacfc7fc0e5d32642dcd25c3a613917d00607c7bed242deea2e44a256b7e4c189557395c1a9ea1ce5c6b2b0f5285b514fb3cb2",
		"test4": "9e210b354332cefcd8c603ffc9e3c36f272a2dcdd697141867832842b9a70b2022b0611cc425085adaf0e14a84112ca47ba7b75e56756688da684f7a163d9706",
		"test5": "984f9e5531da22fbf5eef2374187be60e53508f3e158118b46b657104965870ac67571d269b8198af5bf527e6e0f50c21b915fb60977b81f429adcad81f13ab6",
	}

	for input, expected := range scenarios {
		assert.Equal(t, expected, Sha512Sum(input))
	}
}
