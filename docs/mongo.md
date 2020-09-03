## mongodb の作成

https://www.mongodb.com/cloud/atlas/mongodb-google-cloud

- メールアドレス・名前・苗字・パスワードを入力
- 規約に同意にチェック
- 「Get Started Free」をクリック

![](img/2020-07-19-14-09-00.png)
![](img/2020-07-19-14-11-17.png)
![](img/2020-07-19-14-11-34.png)
![](img/2020-07-19-14-20-54.png)

- 無料プランを作成

![](img/2020-07-19-14-21-29.png)

- Google Clound Platform を選択
- TOkyo リージョンを選択
- Create Cluster をクリック
  ![](img/2020-07-19-14-29-48.png)

- 作成されたクラスタを確認。
  ![](img/2020-07-19-14-32-07.png)

## ホワイトリスト登録・ユーザ登録

- Create a New Cluster をクリック
  ![](img/2020-07-19-14-35-34.png)

- Connect をクリック
  ![](img/2020-07-19-14-36-41.png)
  ![](img/2020-07-19-14-37-22.png)
- WhiteList に IP を登録
- MongoDB のユーザを作成
  ![](img/2020-07-19-14-37-57.png)
  ![](img/2020-07-19-14-43-16.png)

## データベース作成

![](img/2020-07-19-16-19-36.png)

## windows での接続確認方法

- 接続方法の確認
  ![](img/2020-07-19-14-43-48.png)
  ![](img/2020-07-19-14-56-25.png)

powershell の管理者モードで、mongo のシェルをインストール

```ps
choco install mongodb -y
```

パスを通す。
`C:\Program Files\MongoDB\Server\4.2\bin`に mongo はインストールされている。
環境変数の Path にここのフォルダへのパスを追加する。
最新のバージョンによって違うかもしれないので、インストールされるバージョンはよく見ておくこと。

- 接続のテスト

```ps
mongo "mongodb+srv://<hoge>.gcp.mongodb.net/<dbname>" --username <fuga>
```

## 参考

[MongoDB Atlas で無料で簡単にクラスタ化する](https://qiita.com/ka_nabell_dev/items/0e91ae7646ddc78e514f)
[deploy free tier cluster](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/)
[MongoDB 基礎：DB 接続の書き方](https://qiita.com/chenglin/items/ecf6f67e8f80c4750204)
