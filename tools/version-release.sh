#!/bin/bash

if [ -z ${RELEASE_TYPE+x} ]; then
  echo "RELEASE_TYPE is unset";
else
  echo "$RELEASE_TYPE";
  yarn run lerna version -y $RELEASE_TYPE --no-push --force-publish --sign-git-commit;
fi

