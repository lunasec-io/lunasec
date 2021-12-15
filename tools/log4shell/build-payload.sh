#!/bin/bash

cd payloads/hotpatch-payload/
mvn package
cd -
cp payloads/hotpatch-payload/target/classes/Log4ShellHotpatch.class Log4ShellHotpatch.class
