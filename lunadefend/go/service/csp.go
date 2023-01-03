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
package service

// adapted from: https://raw.githubusercontent.com/srikrsna/security-headers/master/csp.go

import (
	"bytes"
	"context"
	crand "crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"strings"
	"sync"
)

type key int

type CSPPolicy map[string][]string

const nonceKey key = iota

const (
	cspHeader           = "Content-Security-Policy"
	cspReportOnlyHeader = "Content-Security-Policy-Report-Only"
)

// NonceToken is the string token that gets replaced by the middleware with a dynamic nonce directive
const NonceToken = "{{nonce}}"

var nonceReplacer = strings.NewReplacer(
	NonceToken, "nonce-%[1]s",
)

// CSP is used to configure the Content Security Policy Middleware. For more about csp please refer the mozilla docs.
type cspMiddleware struct {
	// Value is the CSP header value.Eg: script-src {{nonce}} 'strict-dynamic'; object-src 'none';
	// If the Value contains '{{nonce}}', it will be replaced by a dynamic nonce {{nonce}} -> 'nonce-jagflah+==' every request.
	//
	// Generated nonce can be obtained using the `Nonce(context.Context)` function.
	policyTemplate string

	// ByteSize is the size of the nonce being generated in bytes. If passed <= '0' it will chnage to 16.
	// Default is 16.
	byteSize int64

	// ReportOnly will send report only header (Content-Security-Policy-Report-Only) instead of the regular header (Content-Security-Policy-Report-Only).
	// Enabling this option will result in browsers only reporting violation. Report-URI must be set along with this. Default is false.
	// Note: Package will not check for report-uri
	reportOnly bool

	headerKey  string
	bufferPool sync.Pool
}

type CSPMiddlware interface {
	Middleware() func(http.HandlerFunc) http.HandlerFunc
}

func NewCSPMiddleware(csp CSPPolicy, byteSize int, reportOnly bool) CSPMiddlware {
	var (
		headerKey string
	)

	formattedCSP := formatCSPDirectives(csp)
	policyTemplate := nonceReplacer.Replace(formattedCSP)

	if byteSize <= 0 {
		byteSize = 16
	}

	if reportOnly {
		headerKey = cspReportOnlyHeader
	} else {
		headerKey = cspHeader
	}

	bufferPool := sync.Pool{
		New: func() interface{} {
			return new(bytes.Buffer)
		},
	}
	return &cspMiddleware{
		policyTemplate: policyTemplate,
		byteSize:       int64(byteSize),
		headerKey:      headerKey,
		bufferPool:     bufferPool,
	}
}

// Middleware return a fuction that adds the configured csp headers, stores the nonce in th request context if configures, and passes the request to the next handler
func (c *cspMiddleware) Middleware() func(http.HandlerFunc) http.HandlerFunc {
	return func(next http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {

			buff := c.bufferPool.Get().(*bytes.Buffer)

			buff.Reset()
			CryptoRandNonce(buff, c.byteSize)

			nonce := buff.Bytes()

			cspPolicy := fmt.Sprintf(c.policyTemplate, nonce)
			w.Header().Add(c.headerKey, cspPolicy)

			ctx := WithNonce(r.Context(), string(nonce))
			r = r.WithContext(ctx)

			c.bufferPool.Put(buff)

			next.ServeHTTP(w, r)
			return
		}
	}
}

// CryptoRandNonce writes the cryptographically generated random nonce of length 'n' to the provided Writer.
// Typical usecase would be to use this method to create own handlers/middlewares for packages that don't support net/http.
// Note: To get the nonce associated with the present request use `Nonce(context.Context)` method.
func CryptoRandNonce(w io.Writer, n int64) {
	b := make([]byte, n)
	if _, err := io.ReadFull(crand.Reader, b); err != nil {
		panic("secure: " + err.Error())
	}

	enc := base64.NewEncoder(base64.RawStdEncoding, w)
	_, err := enc.Write(b)
	if err != nil {
		panic(err)
	}

	err = enc.Close()
	if err != nil {
		panic(err)
	}
}

// Nonce returns the nonce value present in the context. If no nonce is present it returns an empty string.
func Nonce(c context.Context) string {
	if val, ok := c.Value(nonceKey).(string); ok {
		return val
	}

	return ""
}

// WithNonce is convenience method that can be
func WithNonce(ctx context.Context, n string) context.Context {
	return context.WithValue(ctx, nonceKey, n)
}

func formatCSPDirectives(directives CSPPolicy) string {
	const (
		withQuotes    = "'%s'"
		withoutQuotes = "%s"
	)
	var (
		newDirectives []string
		quoteFormat   string
	)

	for directive, vals := range directives {
		switch directive {
		case "frame-ancestors":
			fallthrough
		case "connect-src":
			fallthrough
		case "report-uri":
			quoteFormat = withoutQuotes
		default:
			quoteFormat = withQuotes
		}

		dirVals := []string{
			directive,
		}

		for _, val := range vals {
			dirVals = append(dirVals, fmt.Sprintf(quoteFormat, val))
		}
		newDirectives = append(newDirectives, strings.Join(dirVals, " "))
	}
	return strings.Join(newDirectives, ";")
}
