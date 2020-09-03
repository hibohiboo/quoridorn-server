storage.ymlに以下を追記。
値はvirtual-environment/provision/docker/docker-compose.ymlで指定しているもの。

```yaml
accessKey: 'access'

# アプリケーションサーバからs3系ストレージにアクセスするために使う、s3プロトコルの「SECRET_KEY」の値
secretKey: 'secretkey'
```
