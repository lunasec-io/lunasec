CMD_DIR = ./cmd
BUILD_TAG ?= dev

all:
	mkdir -p build
	for f in $(shell ls cmd); do \
		echo $${f} ;\
		cd $(shell pwd)/cmd/$${f} ;\
		CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo ;\
		mv $${f} ../../build ;\
	done

%:
	mkdir -p build; cd cmd/$@; CGO_ENABLED=0 GOOS=linux go build -tags ${BUILD_TAG} -a -installsuffix cgo .; mv $@ ../../build/$@_${BUILD_TAG}
clean:
	rm -rf build
	find cmd -type f ! -name '*.go' -delete
