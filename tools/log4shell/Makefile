BINARY_NAME=log4shell

payload:
	cd payloads/hotpatch-payload/ && \
	mvn package && \
	cd - && \
	cp payloads/hotpatch-payload/target/classes/Log4ShellHotpatch.class Log4ShellHotpatch.class

cli:
	go build -o ${BINARY_NAME} .

build: payload cli
	echo "built ${BINARY_NAME}"

clean:
	go clean
