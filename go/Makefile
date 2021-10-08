CMD_DIR = ./cmd
OUTPUT_DIR ?= "build"
VERSION ?= v0.0.0
tag ?= dev
build_flags ?=

all:
	mkdir -p build
	for f in $(shell ls cmd); do \
		echo $${f} ;\
		cd $(shell pwd)/cmd/$${f} ;\
		CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo ;\
		mv $${f} ${OUTPUT_DIR} ;\
	done

cli-release:
	goreleaser build --rm-dist

docker-release-tokenizerbackend:
	DOCKER_BUILDKIT=1 docker build --build-arg BUILD_TAG=lambda --build-arg VERSION=${version} -t lunasec/tokenizer-backend:${version} -f docker/Dockerfile.tokenizerbackend .

docker-release-analyticscollector:
	DOCKER_BUILDKIT=1 docker build --build-arg BUILD_TAG=lambda --build-arg VERSION=${version} -t lunasec/analytics-collector:${version} -f docker/Dockerfile.analyticscollector .

docker-release: docker-release-tokenizerbackend docker-release-analyticscollector

cli-publish:
	goreleaser release --rm-dist

docker-publish:
	docker push lunasec/tokenizer-backend:${version}

release: docker-release cli-release
	echo "completed building releases for ${version}"

publish: docker-publish cli-publish
	echo "pushed releaser for ${version}"

release-clean:
	git tag -d ${version}
	git push --delete origin ${version}

%:
	CGO_ENABLED=0 GOOS=linux go build -tags ${tag} -ldflags="-X \"github.com/lunasec-io/lunasec-monorepo/constants.Version=${VERSION}\"" ${build_flags} -a -installsuffix cgo -o ${OUTPUT_DIR}/$@_${tag} $(shell pwd)/cmd/$@

clean:
	rm -rf build
	find cmd -type f ! -name '*.go' -delete
