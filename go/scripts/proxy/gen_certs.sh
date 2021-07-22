#!/bin/sh
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout proxy.key -out proxy.pem -config req.cnf -sha256
