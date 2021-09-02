CMD_DIR = ./cmd
BUILD_TAG ?= dev
OUTPUT_DIR ?= "build"
DEBUG_FLAGS ?=
DOCKER_VERSION_TAG ?=

all:
	mkdir -p build
	for f in $(shell ls cmd); do \
		echo $${f} ;\
		cd $(shell pwd)/cmd/$${f} ;\
		CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo ;\
		mv $${f} ${OUTPUT_DIR} ;\
	done

docker-release:
	DOCKER_BUILDKIT=1 docker build -t lunasec/tokenizer-backend:${DOCKER_VERSION_TAG} -f docker/Dockerfile.tokenizerbackend .

docker-publish:
	docker push lunasec/tokenizer-backend:${DOCKER_VERSION_TAG}

release:
	git tag $version
	git push origin $version
	goreleaser release --rm-dist

%:
	CGO_ENABLED=0 GOOS=linux go build -tags ${BUILD_TAG} ${DEBUG_FLAGS} -a -installsuffix cgo -o ${OUTPUT_DIR}/$@_${BUILD_TAG} $(shell pwd)/cmd/$@

clean:
	rm -rf build
	find cmd -type f ! -name '*.go' -delete
