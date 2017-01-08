#!/bin/bash
MASTER_BRANCH=master
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

git checkout ${MASTER_BRANCH}
npm run build # generate ./docs

git checkout gh-pages
git checkout ${MASTER_BRANCH} docs
mv docs/* .
rm -rf docs

git add -A .
git commit -m "Rebuilds gh-pages for `git log ${MASTER_BRANCH} -1 | head -1`"
git push origin gh-pages

# Return to master
git checkout $GIT_BRANCH

