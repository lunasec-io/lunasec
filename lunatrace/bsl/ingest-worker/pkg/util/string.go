// Copyright by LunaSec (owned by Refinery Labs, Inc)
//
// Licensed under the Business Source License v1.1
// (the "License"); you may not use this file except in compliance with the
// License. You may obtain a copy of the License at
//
// https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
//
// See the License for the specific language governing permissions and
// limitations under the License.
package util

type NullEscapeState int

const (
	Searching NullEscapeState = iota
	FirstSlash
	UnicodeEscape
	FirstZero
	SecondZero
	ThirdZero
)

func SanitizeNullEscapes(unsanitized []byte) []byte {
	sanitized := make([]byte, len(unsanitized))
	idx := 0
	replaceStr := "[NULL]"

	state := Searching
	discoveredStr := ""
	for _, b := range unsanitized {
		// `\u0000`: are we searching and do we see the `\`?
		if state == Searching && b == '\\' {
			state = FirstSlash
			discoveredStr = "\\"
			continue
		}
		// `\u0000`: have we seen the first slash and have seen the `u`?
		if state == FirstSlash && b == 'u' {
			state = UnicodeEscape
			discoveredStr += "u"
			continue
		}
		// `\u0000`: have we seen the `\u000` and have found the fourth `0`?
		if state == ThirdZero && b == '0' {
			// we are replacing `\u0000` which is 6 bytes, [NULL] is also 6 bytes
			copy(sanitized[idx:], replaceStr)
			idx += len(replaceStr)
			discoveredStr = ""
			state = Searching
			continue
		}
		// `\u0000`: have we seen at least `\u` and found a `0`?
		if state >= UnicodeEscape && b == '0' {
			state += 1
			discoveredStr += "0"
			continue
		}

		if discoveredStr != "" {
			sanitizedStr := discoveredStr + string(b)
			copy(sanitized[idx:], sanitizedStr)
			idx += len(sanitizedStr)
			discoveredStr = ""
		} else {
			sanitized[idx] = b
			idx += 1
		}
		state = Searching
	}
	return sanitized
}
