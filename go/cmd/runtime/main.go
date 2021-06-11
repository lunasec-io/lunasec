package main

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/refinery-labs/loq/model/event"
	tokenizer "github.com/refinery-labs/loq/pkg/tokenizer"
	"github.com/refinery-labs/loq/service/invoker"
	"github.com/refinery-labs/loq/util"
	"go.uber.org/zap"
)

func startHttpServer(wg *sync.WaitGroup) *http.Server {
	server := tokenizer.NewHttpServerSidecar()

	go func() {
		defer wg.Done() // let main know we are done cleaning up

		// always returns error. ErrServerClosed on graceful close
		if err := server.ListenAndServe(); err != http.ErrServerClosed {
			// unexpected error. port in use?
			log.Fatalf("ListenAndServe(): %v", err)
		}
	}()

	// returning reference so caller can call Shutdown()
	return server
}

func verifyContainerSecret(sentContainerSecret string) bool {
	containerSecret := os.Getenv("CONTAINER_SECRET")
	if containerSecret == "" {
		// container secret is not set, we treat this as a validated container secret
		return true
	}

	return sentContainerSecret == containerSecret
}

func HandleRequestApiGateway(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var (
		invokeEvent event.ExecuteFunctionRequest
		funcResp    event.ExecuteFunctionResponse
	)

	containerSecret := request.Headers["X-Container-Secret"]
	if !verifyContainerSecret(containerSecret) {
		err := errors.New("unauthorized")
		return util.ApiGatewayError(err)
	}

	err := json.Unmarshal([]byte(request.Body), &invokeEvent)
	if err != nil {
		return util.ApiGatewayError(err)
	}

	funcResp, err = HandleRequest(ctx, invokeEvent)
	if err != nil {
		return util.ApiGatewayError(err)
	}

	headers := map[string]string{}
	return util.MarshalApiGatewayResponse(http.StatusOK, headers, funcResp)
}

func HandleRequest(ctx context.Context, req event.ExecuteFunctionRequest) (event.ExecuteFunctionResponse, error) {
	var (
		logger   *zap.Logger
		result   *json.RawMessage
		backpack *json.RawMessage
		resp     event.ExecuteFunctionResponse
		err      error
	)

	logger, err = util.GetLogger()
	if err != nil {
		log.Println("unable to create zap logger", err)
		return resp, err
	}

	logger.Debug(
		"starting tokenizer sidecar",
	)

	httpServerExitDone := &sync.WaitGroup{}

	httpServerExitDone.Add(1)
	server := startHttpServer(httpServerExitDone)
	defer func() {
		err = server.Shutdown(ctx)
		if err != nil {
			log.Println("error while shutting down server", err)
			return
		}
		httpServerExitDone.Wait()
	}()

	logger.Debug(
		"starting lambda runtime",
		zap.String("functionName", req.FunctionName),
	)
	lambdaRuntime := invoker.NewLambdaRuntime(logger, req.FunctionName, req.BlockInput, req.Backpack)
	result, backpack, err = lambdaRuntime.Run()
	if err != nil {
		return resp, err
	}

	resp.Result = result
	resp.Backpack = backpack
	return resp, err
}

func main() {
	log.SetFlags(log.Lshortfile)

	log.Println("Starting runtime...")

	lambdaEnv := os.Getenv("LAMBDA_CALLER")
	switch lambdaEnv {
	case "API_GATEWAY":
		lambda.Start(HandleRequestApiGateway)
	default:
		lambda.Start(HandleRequest)
	}
}
