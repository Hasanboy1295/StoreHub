#!/bin/bash

# PRODUCTION
git reset --hard
git checkout master
git pull origin master

npm i yarn -g
yarn global add serve
yarn
yarn run build
pm2 start "yarn run start:prod" --name=StoreHub






#!/bin/bash

# export NVM_DIR="$HOME/.nvm"
# source "$NVM_DIR/nvm.sh"
# nvm use 20

# # PRODUCTION
# git reset --hard
# git checkout master
# git pull origin master

# npm i yarn -g
# yarn global add serve
# yarn install
# yarn run build

# pm2 delete StoreHub
# pm2 start "serve -s build -l 4003" --name=StoreHub
# pm2 save