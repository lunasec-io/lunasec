CMD_DIR = ./cmd
OUTPUT_DIR ?= "build"
tag ?= dev
DEBUG_FLAGS ?=

all:
	mkdir -p build
	for f in $(shell ls cmd); do \
		echo $${f} ;\
		cd $(shell pwd)/cmd/$${f} ;\
		CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo ;\
		mv $${f} ${OUTPUT_DIR} ;\
	done

# -----------  BEGIN RELEASE COMMANDS - These commands are called in CI
# builds release artifacts, doesnt push them
cli-release:
	goreleaser build --rm-dist

# builds release artifacts, doesnt push them
docker-release:
	DOCKER_BUILDKIT=1 docker build --build-arg BUILD_TAG=lambda -t lunasec/tokenizer-backend:${version} -f docker/Dockerfile.tokenizerbackend .
	DOCKER_BUILDKIT=1 docker build --build-arg BUILD_TAG=dev -t lunasec/tokenizer-backend-dev:${version} -f docker/Dockerfile.tokenizerbackend .


cli-publish:
	goreleaser release --rm-dist

docker-publish:
	docker push lunasec/tokenizer-backend:${version}
	docker push lunasec/tokenizer-backend-dev:${version}

release: docker-release cli-release
	echo "completed building releases for ${version}"

publish: docker-publish cli-publish
	echo "pushed releaser for ${version}"

release-clean:
	git tag -d ${version}
	git push --delete origin ${version}

# ------------ END RELEASE COMMANDS ------------

# This wildcard catches the commands where we want to directly build go binaries. For example `make tokenizerbackend`
%:
	CGO_ENABLED=0 GOOS=linux go build -tags ${tag} ${DEBUG_FLAGS} -a -installsuffix cgo -o ${OUTPUT_DIR}/$@_${tag} $(shell pwd)/cmd/$@

clean:
	rm -rf build
	find cmd -type f ! -name '*.go' -delete
