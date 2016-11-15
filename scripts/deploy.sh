#!/bin/bash

# Exit with nonzero exit code if anything fails
set -e

# Deploy built site to this branch
TARGET_BRANCH="master"
# Sync the contents of this directory where the site should have been built
SOURCE_DIR="dist"

# When running on Travis we need to use SSH to deploy to GitHub
#
# The following converts the repo URL to an SSH location,
# decrypts the SSH key and sets up the Git config with
# the correct user name and email (globally as this is a
# temporary travis environment)
#
# Set the following environment variables in the travis configuration (.travis.yml)
#
#   ENCRYPTION_LABEL - The label assigned when encrypting the SSH key using travis encrypt-file
#   GIT_NAME         - The Git user name
#   GIT_EMAIL        - The Git user email
#
echo ENCRYPTION_LABEL: $ENCRYPTION_LABEL
echo GIT_NAME: $GIT_NAME
echo GIT_EMAIL: $GIT_EMAIL
echo GIT_REPO: $GIT_REPO

ENCRYPTED_KEY_VAR=encrypted_${ENCRYPTION_LABEL}_key
ENCRYPTED_IV_VAR=encrypted_${ENCRYPTION_LABEL}_iv
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
REPO="git@github.com:${GIT_REPO}.git"

# The `deploy_key.enc` file should have been added to the repo and should
# have been created from the deploy private key using `travis encrypt-file`
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d

chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key
git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"

REPO_NAME=$(basename $REPO)
TARGET_DIR=$(mktemp -d /tmp/$REPO_NAME.XXXX)
REV=$(git describe --always --contains --tags)
git clone --branch ${TARGET_BRANCH} ${REPO} ${TARGET_DIR}
rsync -rt --delete --exclude=".git" $SOURCE_DIR/ $TARGET_DIR/
cd $TARGET_DIR
git add -A .
git commit --allow-empty -m "Built from $REV"
git push $REPO $TARGET_BRANCH