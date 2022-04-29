
LOG4SHELL_BINARY_NAME=log4shell
LUNATRACE_BINARY_NAME=lunatrace
LUNATRACE_AGENT_BINARY_NAME=lunatrace-agent
LIBRARY_HASHES=cmd/log4shell/log4j-library-hashes.json
version ?= v0.0.0

payload:
	cd ../patches/log4shell-livepatch/ && \
	mvn package && \
	cd - && \
	cp ../patches/log4shell-livepatch/target/classes/Log4ShellHotpatch.class cmd/log4shell/Log4ShellHotpatch.class

bindir:
	mkdir -p bin/

log4shell: bindir
	touch ${LIBRARY_HASHES}
	CGO_ENABLED=0 GOOS=linux go build -o bin/${LOG4SHELL_BINARY_NAME} ./cmd/log4shell

lunatrace: bindir
	CGO_ENABLED=0 GOOS=darwin go build -o ./bin/${LUNATRACE_BINARY_NAME} ./cmd/lunatrace

lunatrace-docker:
	sudo docker build -f build/package/lunatrace.dockerfile . -t lunasec/lunatrace-cli:${version}

lunatrace-agent: bindir
	CGO_ENABLED=0 GOOS=linux go build -o bin/${LUNATRACE_AGENT_BINARY_NAME} ./cmd/lunatraceagent

library-hashes: log4shell
	./bin/log4shell analyze --output ${LIBRARY_HASHES} test/log4shell/vulnerable-log4j2-versions/apache test/log4shell/vulnerable-log4j2-versions/target/dependency

build-log4shell: payload log4shell
	echo "built ${LOG4SHELL_BINARY_NAME}"

build-lunatrace: lunatrace
	echo "built ${LUNATRACE_BINARY_NAME}"

clean:
	go clean

setup-tests:
	cd test/log4shell/vulnerable-log4j2-versions && go run main.go
