CMD_DIR = ./cmd
BUILD_TAG ?= dev
OUTPUT_DIR ?= "build"
DEBUG_FLAGS ?=

all:
	mkdir -p build
	for f in $(shell ls cmd); do \
		echo $${f} ;\
		cd $(shell pwd)/cmd/$${f} ;\
		CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo ;\
		mv $${f} ${OUTPUT_DIR} ;\
	done

lunasec-release:
	goreleaser release --rm-dist

docker-release:
	DOCKER_BUILDKIT=1 docker build -t lunasec/tokenizer-backend:${version} -f docker/Dockerfile.tokenizerbackend .
	docker push lunasec/tokenizer-backend:${version}

release-git-tag:
	git tag ${version}
	git push origin ${version}

release: release-git-tag lunasec-release docker-release
	echo "completed release for ${version}"

release-clean:
	git tag -d ${version}
	git push --delete origin ${version}

%:
	CGO_ENABLED=0 GOOS=linux go build -tags ${BUILD_TAG} ${DEBUG_FLAGS} -a -installsuffix cgo -o ${OUTPUT_DIR}/$@_${BUILD_TAG} $(shell pwd)/cmd/$@

clean:
	rm -rf build
	find cmd -type f ! -name '*.go' -delete
