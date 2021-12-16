BINARY_NAME=log4shell
LIBRARY_HASHES=log4j-library-hashes.json

payload:
	cd payloads/hotpatch-payload/ && \
	mvn package && \
	cd - && \
	cp payloads/hotpatch-payload/target/classes/Log4ShellHotpatch.class Log4ShellHotpatch.class

cli:
	touch ${LIBRARY_HASHES}
	go build -o ${BINARY_NAME} .

library-hashes: cli
	./log4shell analyze --output ${LIBRARY_HASHES} test/vulnerable-log4j2-versions/apache test/vulnerable-log4j2-versions/target/dependency

build: payload cli
	echo "built ${BINARY_NAME}"

clean:
	go clean
