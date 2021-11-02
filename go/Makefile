CMD_DIR = ./cmd
OUTPUT_DIR ?= "build"
version ?= v0.0.0
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

docker-release-tokenizerbackend:
	DOCKER_BUILDKIT=1 docker build --build-arg BUILD_TAG=lambda --build-arg VERSION=${version} -t lunasec/tokenizer-backend:${version} -f docker/tokenizerbackend.dockerfile .

docker-demo-tokenizerbackend:
	DOCKER_BUILDKIT=1 docker build --build-arg BUILD_TAG=dev --build-arg VERSION=${version} -t lunasec/tokenizer-backend-demo:${version} -f docker/tokenizerbackend.dockerfile .

docker-release-analyticscollector:
	DOCKER_BUILDKIT=1 docker build --build-arg BUILD_TAG=lambda --build-arg VERSION=${version} -t lunasec/analytics-collector:${version} -f docker/analyticscollector.dockerfile .

docker-release: docker-release-tokenizerbackend docker-demo-tokenizerbackend docker-release-analyticscollector
	echo "created docker releases for version ${version}"

docker-publish:
	docker push lunasec/tokenizer-backend:${version}
	docker push lunasec/tokenizer-backend-demo:${version}
	docker push lunasec/analytics-collector:${version}

release: docker-release
	echo "completed building releases for ${version}"

publish: docker-publish
	echo "pushed releaser for ${version}"

release-clean:
	git tag -d ${version}
	git push --delete origin ${version}

%:
	CGO_ENABLED=0 GOOS=linux go build -tags ${tag} -ldflags="-X \"github.com/lunasec-io/lunasec-monorepo/constants.Version=${version}\"" ${build_flags} -a -installsuffix cgo -o ${OUTPUT_DIR}/$@_${tag} $(shell pwd)/cmd/$@

clean:
	rm -rf build
	find cmd -type f ! -name '*.go' -delete
