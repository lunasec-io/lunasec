#!/bin/bash

# Clean up the folder before checkout
rm -rf hashes

echo "Fetching known bad log4j dependency hashes from GitHub..."
git clone https://github.com/mubix/CVE-2021-44228-Log4Shell-Hashes hashes
