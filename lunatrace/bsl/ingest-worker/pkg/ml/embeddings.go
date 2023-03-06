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
	"time"

	"github.com/PullRequestInc/go-gpt3"
	"github.com/cenkalti/backoff/v4"
	"github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/rs/zerolog/log"
	"github.com/samber/lo"

	tokenizer "github.com/samber/go-gpt-3-encoder"

	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/pineconefx"
	"github.com/lunasec-io/lunasec/lunatrace/bsl/ingest-worker/pkg/util"
	pacmodel "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/model"
	pactable "github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/package/table"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/vulnerability/model"
	"github.com/lunasec-io/lunasec/lunatrace/gogen/sqlgen/lunatrace/vulnerability/table"
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

// used for inserting with pinecone
func newVulnRefVector(hashStr string, embedding []float64, refURL, vulnerabilityID string) *pineconefx.Vector {
	metadata := map[string]string{
		"source":           refURL,
		"vulnerability_id": vulnerabilityID,
	}
	return &pineconefx.Vector{
		ID: hashStr,

		Values: lo.Map(embedding, func(t float64, i int) float32 {
			return float32(t)
		}),
		Metadata: metadata,
	}
}

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

	if vulnID != "" {
		similarity = 0.78
		rows, err = p.deps.DB.Query("SELECT * FROM vulnerability.match_reference_embedding_for_vulnerability($1, $2, $3, $4)", embStr, vulnID, similarity, limit)
	} else {
		rows, err = p.deps.DB.Query("SELECT * FROM vulnerability.match_reference_embedding($1, $2, $3)", embStr, similarity, limit)
	}

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

type referenceContent struct {
	ID                  uuid.UUID
	URL                 string
	Content             string
	NormalizedContent   string
	ContentType         string
	LastSuccessfulFetch *time.Time
}

type refEmbeddingExistsFunc func(contentHash string) (string, bool)
type insertRefEmbeddingFunc func(id uuid.UUID, contentHash, content, embedding string) error

func (p *service) generateEmbeddingForRef(
	ref *referenceContent,
	refEmbeddingExists refEmbeddingExistsFunc,
	insertRefEmbedding insertRefEmbeddingFunc,
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
	ref *referenceContent,
	refEmbeddingExists refEmbeddingExistsFunc,
	insertRefEmbedding insertRefEmbeddingFunc,
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

func (p *service) GenerateEmbeddingsForPackageRefs() error {
	rc := pactable.ReferenceContent

	getReferenceContentStmt := rc.SELECT(rc.AllColumns)

	rows, err := getReferenceContentStmt.Rows(context.Background(), p.deps.DB)
	if err != nil {
		log.Error().Err(err).Msg("failed to get reference content")
		return err
	}

	for rows.Next() {
		var ref pacmodel.ReferenceContent
		err = rows.Scan(&ref)
		if err != nil {
			log.Error().Err(err).Msg("failed to scan reference content")
			return err
		}

		log.Info().Str("url", ref.URL).Msg("generating embedding for reference content")

		normalizedRef := referenceContent{
			ID:                  ref.ID,
			URL:                 ref.URL,
			Content:             ref.Content,
			NormalizedContent:   ref.NormalizedContent,
			ContentType:         ref.ContentType,
			LastSuccessfulFetch: ref.LastSuccessfulFetch,
		}

		var re = pactable.ContentEmbedding
		insertRefEmbedding := func(id uuid.UUID, contentHash, content, embedding string) error {
			newRefEmb := pacmodel.ContentEmbedding{
				ReferenceContentID: id,
				ContentHash:        contentHash,
				Content:            contentHash,
				Embedding:          embedding,
			}

			insertStmt := re.INSERT(
				re.ReferenceContentID, re.ContentHash, re.Content, re.Embedding,
			).MODEL(newRefEmb)

			_, err = insertStmt.Exec(p.deps.DB)
			return err
		}

		refEmbeddingExists := func(contentHash string) (string, bool) {
			getExistingRefEmb := re.SELECT(
				re.Embedding,
			).WHERE(re.ContentHash.EQ(postgres.String(contentHash)))

			var refEmb pacmodel.ContentEmbedding
			err := getExistingRefEmb.Query(p.deps.DB, &refEmb)
			return refEmb.Embedding, err == nil
		}

		err = p.generateEmbeddingForRef(&normalizedRef, refEmbeddingExists, insertRefEmbedding)
		if err != nil {
			log.Error().
				Err(err).
				Str("url", ref.URL).
				Msg("failed to generate embedding for reference")
			return err
		}
	}
	return nil
}

func (p *service) GenerateEmbeddingsForVulnRefs(vulnID string, insertWithPinecone bool) error {
	rc := table.ReferenceContent
	r := table.Reference
	v := table.Vulnerability

	getReferenceContentStmt := rc.SELECT(rc.AllColumns, r.AllColumns, v.ID).
		FROM(
			rc.LEFT_JOIN(r, r.ID.EQ(rc.ReferenceID)).
				LEFT_JOIN(v, v.ID.EQ(r.VulnerabilityID)),
		)
	if vulnID != "" {
		getReferenceContentStmt = getReferenceContentStmt.
			WHERE(v.SourceID.EQ(postgres.String(vulnID)))
	}

	rows, err := getReferenceContentStmt.Rows(context.Background(), p.deps.DB)
	if err != nil {
		log.Error().Err(err).Msg("failed to get reference content")
		return err
	}

	for rows.Next() {
		var ref struct {
			model.Reference
			model.ReferenceContent
			model.Vulnerability
		}

		err = rows.Scan(&ref)
		if err != nil {
			log.Error().Err(err).Msg("failed to scan reference content")
			return err
		}

		// TODO (cthompson) this is a hack to get the vuln id and title into the reference content
		ref.NormalizedContent = fmt.Sprintf("%s %s %s", ref.Vulnerability.SourceID, ref.Title, ref.NormalizedContent)

		normalizedRef := referenceContent{
			ID:                  ref.ReferenceContent.ID,
			URL:                 ref.URL,
			Content:             ref.Content,
			NormalizedContent:   ref.NormalizedContent,
			ContentType:         ref.ContentType,
			LastSuccessfulFetch: ref.LastSuccessfulFetch,
		}

		var re = table.ReferenceEmbedding
		insertRefEmbedding := func(id uuid.UUID, contentHash, content, embedding string) error {
			newRefEmb := model.ReferenceEmbedding{
				ReferenceContentID: id,
				ContentHash:        contentHash,
				Content:            contentHash,
				Embedding:          embedding,
			}

			insertStmt := re.INSERT(
				re.ReferenceContentID, re.ContentHash, re.Content, re.Embedding,
			).MODEL(newRefEmb)

			_, err = insertStmt.Exec(p.deps.DB)
			return err
		}

		refEmbeddingExists := func(contentHash string) (string, bool) {
			getExistingRefEmb := re.SELECT(
				re.Embedding,
			).WHERE(re.ContentHash.EQ(postgres.String(contentHash)))

			var refEmb model.ReferenceEmbedding
			err := getExistingRefEmb.Query(p.deps.DB, &refEmb)
			return refEmb.Embedding, err == nil
		}

		err = p.generateEmbeddingForRef(&normalizedRef, refEmbeddingExists, insertRefEmbedding)
		if err != nil {
			log.Error().
				Err(err).
				Str("url", ref.URL).
				Msg("failed to generate embedding for reference")
			return err
		}
	}
	return nil
}
