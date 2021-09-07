CMD_DIR = ./cmd
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

cli-release:
	goreleaser build

docker-release:
	DOCKER_BUILDKIT=1 docker build -t lunasec/tokenizer-backend:${version} -f docker/Dockerfile.tokenizerbackend .

cli-publish:
	goreleaser release

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
	CGO_ENABLED=0 GOOS=linux go build -tags ${tag} ${DEBUG_FLAGS} -a -installsuffix cgo -o ${OUTPUT_DIR}/$@_${tag} $(shell pwd)/cmd/$@

clean:
	rm -rf build
	find cmd -type f ! -name '*.go' -delete
