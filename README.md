# 使用技術

![Laravel](https://img.shields.io/badge/Laravel-10-brightgreen.svg)
![PHP](https://img.shields.io/badge/PHP-8-blue.svg)
![MariaDB](https://img.shields.io/badge/MariaDB-10.4-blue.svg)
![nginx](https://img.shields.io/badge/nginx-1.18-blue.svg)
![Docker](https://img.shields.io/badge/Docker-20.10-blue.svg)
![docker-compose](https://img.shields.io/badge/docker--compose-1.29-blue.svg)

# Laravel プロジェクトの作成方法

1. **repositorie の作成**  
   GitHub でリポジトリを作成します。

1. **クローンしたいディレクトリに作成・移動して clone する**  
   プロジェクトのコピーを自分のコンピュータにダウンロードします。

   ```
   git clone https://github.com/sho55/php83-nginx-mariadb.git
   ```

1. **自分のリポジトリをリモートに追加する**  
   そのまま git remote add origin すると error: remote origin already exists. と言われることがあります。これは clone 元のリポジトリの origin も自動的に設定されるためです  
   なので git remote set-url 自分のリポジトリの URL とすることで、その URL で origin を上書きすることができます

   ```
   git remote set-url origin <自分のリポジトリのURL>

   git remote -v
   origin  <自分のリポジトリのURL> (fetch)
   origin  <自分のリポジトリのURL> (push)
   ```

1. **push する**

   ```
   // 変更があれば
   git add .
   git commit -m "Merge unrelated histories"

   git push
   ```

   エラーが出るかも...

1. **docker compose で立ち上げる**  
   ダウンロードしたプロジェクトを使って、必要なプログラム（コンテナと呼ばれる）を自動的に起動します。

   ```
   cd <自分のリポジトリのルートディレクトリ>
   docker compose up -d
   ```

1. **php コンテナに入る**  
   起動したプログラムの中の一つ、PHP を使う部分にアクセスします。

   ```
   docker exec -it myapp-php bash
   ```

1. **laravel をインストール**  
   PHP を使って、Laravel というツールをセットアップ（インストール）します。

   ```
   composer create-project --prefer-dist laravel/laravel my-app
   ```

1. **php コンテナから出る**  
   Laravel のセットアップが終わったら、PHP の部分を終了します。

   ```
   exit
   ```

1. **docker-compose.yml を編集する**  
   設定ファイル（docker-compose.yml）を変更して、プロジェクトの設定を更新します。以下のように`volumes`セクションを編集してください。

   ```
     web:

       volumes:
       - - .:/var/www/
       + - ./my-app:/var/www/

     nginx:

       volumes:
       - - .:/var/www/
       + - ./my-app:/var/www/

   ```

1. **再度 docker compose で立ち上げる**  
   更新した設定で、もう一度プログラムを起動します。
   ```
   docker compose up -d
   ```
