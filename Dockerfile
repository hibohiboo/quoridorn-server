FROM node:12-alpine

# コンテナ上の作業ディレクトリ作成
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

# https://qiita.com/hoto17296/items/f3fe9cd9eac9e8ba2492
# apk の --virtual NAME オプションを指定しておくことで、ビルドのためだけに入れたパッケージをビルド後にまとめて削除する。
RUN apk add --no-cache --virtual .gyp python make g++ \
  && apk --no-cache add avahi-dev \
  && npm install \
  && apk del .gyp