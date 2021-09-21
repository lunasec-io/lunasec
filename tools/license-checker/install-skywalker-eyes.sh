#!/bin/bash

echo "Fetching Apache Skywalking Eye release..."
wget https://apache.osuosl.org/skywalking/eyes/0.1.0/skywalking-license-eye-0.1.0-bin.tgz

echo "Verifying signature matches..."
sha512sum -c skywalking-license-eye-0.1.0-bin.tgz.sha512

echo "Extracting archive..."
tar -xvf skywalking-license-eye-0.1.0-bin.tgz

echo "Success!"

