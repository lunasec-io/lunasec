#!/bin/bash

head -c 1G < /dev/urandom > large-random-file.bin
zip -q large.jar large-random-file.bin apache-tomcat-8.5.73
