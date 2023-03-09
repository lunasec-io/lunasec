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
//
package ml

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/PullRequestInc/go-gpt3"
	"github.com/cenkalti/backoff/v4"
	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/rs/zerolog/log"
	"github.com/samber/lo"

	tokenizer "github.com/samber/go-gpt-3-encoder"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/util"
)

const (
	maxEmbeddingSize = 1024 * 20

	VulnerabilityReferencePrompt = `
    You are a very enthusiastic LunaSec security engineer who loves
    to help people! Given the following vulnerability references,
    answer the question using only that information,
    outputted in markdown format. If you are unsure and the answer
    is not explicitly written in the documentation, say
    "Sorry, I don't know how to help with that."`

	contentQuestionFormat = `
    Context sections:
    %s

    Question: """
	%s
    """

    Answer as markdown (including related vulnerability reference urls if available):`
)

func (p *service) AnswerQuestionFromContent(prompt, question string, content []string) (string, error) {
	var (
		contextText         string
		tokenCount          int
		maxCompletionTokens = 512
		maxModelTokens      = 4000
	)

	if len(content) == 0 {
		return "", errors.New("no content provided")
	}

	encoder, err := tokenizer.NewEncoder()
	if err != nil {
		return "", err
	}

	normalizedPrompt := util.StandardizeSpaces(prompt)
	encodedPromptData, err := encoder.Encode(normalizedPrompt + contentQuestionFormat)
	if err != nil {
		return "", err
	}

	maxTokens := maxModelTokens - maxCompletionTokens - len(encodedPromptData)

	for _, c := range content {
		encoded, err := encoder.Encode(c)
		if err != nil {
			log.Error().
				Err(err).
				Str("content", c).
				Msg("failed to encode content")
			return "", err
		}

		tokenCount += len(encoded)
		if tokenCount > maxTokens {
			break
		}
		contextText += c
	}

	if contextText == "" {
		return "", errors.New("no context text")
	}

	promptText := normalizedPrompt + fmt.Sprintf(contentQuestionFormat, contextText, question)

	compResp, err := p.deps.OpenAIClient.CompletionWithEngine(context.Background(), "text-davinci-003", gpt3.CompletionRequest{
		Prompt:      []string{promptText},
		MaxTokens:   util.Ptr(maxCompletionTokens),
		Temperature: util.Ptr(float32(0)),
	})
	if err != nil {
		return "", err
	}
	return compResp.Choices[0].Text, nil
}

func (p *service) SearchForReferences(vulnID, search, question string) (string, error) {
	req := gpt3.EmbeddingsRequest{
		Input: []string{search},
		Model: gpt3.TextEmbeddingAda002,
	}
	resp, err := p.deps.OpenAIClient.Embeddings(context.Background(), req)
	if err != nil {
		return "", err
	}

	embStrs := lo.Map(resp.Data[0].Embedding, func(v float64, i int) string {
		return strconv.FormatFloat(v, 'f', -1, 64)
	})
	embStr := "[" + strings.Join(embStrs, ",") + "]"

	type MatchReferenceEmbedding struct {
		ID         uuid.UUID
		URL        string
		Content    string
		Similarity float64
	}

	var (
		rows       *sql.Rows
		limit      = 10
		similarity = 0.78
	)

	rows, err = p.deps.DB.Query("SELECT * FROM vulnerability.match_reference_embedding_for_vulnerability($1, $2, $3, $4)", embStr, vulnID, similarity, limit)
	if err != nil {
		return "", errors.Wrap(err, "failed to query for reference embeddings")
	}
	defer rows.Close()

	var content []string
	for rows.Next() {
		var res MatchReferenceEmbedding

		err = rows.Scan(&res.ID, &res.URL, &res.Content, &res.Similarity)
		if err != nil {
			return "", err
		}
		log.Info().
			Float64("similarity", res.Similarity).
			Str("url", res.URL).
			Msg("reference")

		contentText := fmt.Sprintf("url: %s\ncontent: %s\n---\n", res.URL, strings.TrimSpace(res.Content))
		content = append(content, contentText)
	}

	if question == "" {
		question = search
	}

	return p.AnswerQuestionFromContent(VulnerabilityReferencePrompt, question, content)
}

func (p *service) GenerateEmbeddingForRef(
	ref *ReferenceContent,
	refEmbeddingExists RefEmbeddingExistsFunc,
	insertRefEmbedding InsertRefEmbeddingFunc,
) error {
	expBackoff := backoff.NewExponentialBackOff()
	err := backoff.Retry(func() error {
		return p.doGenerateEmbeddingForRef(ref, refEmbeddingExists, insertRefEmbedding)
	}, expBackoff)
	if err != nil {
		log.Error().
			Err(err).
			Str("url", ref.URL).
			Msg("failed to generate embedding for reference after backoff")
		return err
	}
	return nil
}

func (p *service) doGenerateEmbeddingForRef(
	ref *ReferenceContent,
	refEmbeddingExists RefEmbeddingExistsFunc,
	insertRefEmbedding InsertRefEmbeddingFunc,
) error {
	if ref.LastSuccessfulFetch == nil {
		log.Warn().
			Str("url", ref.URL).
			Msg("Content has not been successfully fetched")
		return nil
	}

	if len(ref.NormalizedContent) > maxEmbeddingSize {
		log.Warn().
			Str("url", ref.URL).
			Msg("content too large, truncating")
		ref.NormalizedContent = ref.NormalizedContent[:maxEmbeddingSize]
	}

	// Build the Content to embed by combining the vulnerability ID, Title, and Content
	content := ref.NormalizedContent

	// Split ref normalized Content into words, group in chunks of 1024 words
	words := strings.Split(content, " ")
	var chunks [][]string
	for i := 0; i < len(words); i += 1024 {
		end := i + 1024
		if end > len(words) {
			end = len(words)
		}
		chunks = append(chunks, words[i:end])
	}

	for _, chunk := range chunks {
		formattedChunk := strings.Join(chunk, " ")

		// calculate the hash of the chunk
		hash := sha256.Sum256([]byte(formattedChunk))
		hashStr := hex.EncodeToString(hash[:])

		if refEmb, ok := refEmbeddingExists(hashStr); ok {
			// skip this chunk, we already have an embedding for it
			log.Info().Str("url", ref.URL).Msg("skipping chunk, already have embedding")

			var embedding []float64
			err := json.Unmarshal([]byte(refEmb), &embedding)
			if err != nil {
				log.Error().Err(err).Msg("failed to unmarshal embedding")
				return err
			}
			continue
		}

		req := gpt3.EmbeddingsRequest{
			Input: []string{formattedChunk},
			Model: gpt3.TextEmbeddingAda002,
		}

		res, err := p.deps.OpenAIClient.Embeddings(context.Background(), req)
		if err != nil {
			log.Error().
				Err(err).
				Str("url", ref.URL).
				Msg("failed to generate embedding")
			return err
		}

		// TODO (cthompson) will there be more than just one value in Data? currently we are only sending one chunk at a time.
		embedding := res.Data[0].Embedding
		embeddingData, err := json.Marshal(embedding)
		if err != nil {
			log.Error().
				Err(err).
				Str("url", ref.URL).
				Msg("failed to marshal embedding data")
			return err
		}

		err = insertRefEmbedding(ref.ID, hashStr, formattedChunk, string(embeddingData))
		if err != nil {
			log.Error().
				Err(err).
				Str("url", ref.URL).
				Msg("failed to insert reference embedding")
			return err
		}
	}
	return nil
}
