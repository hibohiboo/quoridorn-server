#!/bin/bash

# dockerのディレクトリに移動
cd /vagrant/virtual-environment/provision/docker

# 最初に一回ビルド
docker-compose run node-build npm run build

# バックグラウンドで起動
docker-compose up -d
