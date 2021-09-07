#!/bin/sh
VERSION=$(node -p "require(\"./package.json\").version")
git tag "$VERSION"
git push origin "$VERSION"

lerna version prerelease
