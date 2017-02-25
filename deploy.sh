#!/bin/bash

set -e

HOST=yuca.yunity.org

BRANCH=$CIRCLE_BRANCH

if [ "x$BRANCH" = "x" ]; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
fi

echo "deploying blog branch [$BRANCH] to [$HOST]"

rsync -avz --delete _site/ deploy@$HOST:foodsaving-blog/$BRANCH/
