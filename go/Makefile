CMD_DIR = ./cmd
BUILD_TAG ?= dev
OUTPUT_DIR ?= "../../build"

all:
	mkdir -p build
	for f in $(shell ls cmd); do \
		echo $${f} ;\
		cd $(shell pwd)/cmd/$${f} ;\
		CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo ;\
		mv $${f} ${OUTPUT_DIR} ;\
	done

%:
	CGO_ENABLED=0 GOOS=linux go build -tags ${BUILD_TAG} -a -installsuffix cgo -o ${OUTPUT_DIR}/$@_${BUILD_TAG} $(shell pwd)/cmd/$@

clean:
	rm -rf build
	find cmd -type f ! -name '*.go' -delete
