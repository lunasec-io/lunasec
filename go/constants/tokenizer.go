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
//
package constants

const (
	TokenPrefix = "lunasec-"
)

// Tokenizer Set Metric Names
const (
	TokenizerSetStart = "tokenizer_set_start"
	TokenizerSetErrorEncrypt = "tokenizer_set_error_encrypt"
	TokenizerSetErrorKVStore = "tokenizer_set_error_kv_store"
	TokenizerSetErrorPresignedUrl = "tokenizer_set_error_presigned_url"
	TokenizerSetSuccess = "tokenizer_set_success"
)

// Tokenizer Get Metric Names
const (
	TokenizerGetStart = "tokenizer_get_start"
	TokenizerGetErrorKVGet = "tokenizer_get_error_kv_get"
	TokenizerGetErrorNoEncryptionKey = "tokenizer_get_error_no_encryption_key"
	TokenizerGetErrorDecodeEncryptionKey = "tokenizer_get_error_decode_encryption_key"
	TokenizerGetErrorDecryptEncryptionKey = "tokenizer_get_error_decrypt_encryption_key"
	TokenizerGetErrorPresignedUrl = "tokenizer_get_error_presigned_url"
	TokenizerGetSuccess = "tokenizer_get_success"
)
