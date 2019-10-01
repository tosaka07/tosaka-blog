---
title: FastlaneからApp Distributionでアプリを配布する
date: 2019-10-01T22:00:00.000Z
tags:
  - iOS
  - Swift
  - Bitrise
  - Fastlane
---

Bitriseでビルドして、Fastlaneを用いてApp Distributionへアプリを配布する備忘録を残す。

<!-- more -->

**App Distribution** でアプリを配布する備忘録を残す。

CIは `Bitrise` を使い、自動化ツールは Fastlane を使う。

## 1. 前準備

ひとまず Bitrise でビルドできる状態までにする。

## 2. Fastlane

**App Distribution** バイナリを送るには、 firebase-tools を使う必要があるが、 Fastlane でも送れるようにプラグインを作ってくれているため今回はそちらでやる。 
（でも結局 firebase-cli を叩けるように fastlane の Action に実行PATHを渡す必要がある。） 


```
fastlane add_plugin firebase_app_distribution
```

↑を叩くと諸々ファイル生成してくれる。


**fastlane/Pluginfile**
```
gem 'fastlane-plugin-firebase_app_distribution'
```

**Gemfile**
```
source "https://rubygems.org"

gem 'fastlane', "2.131.0"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
```

**Gemfile.lock**
```
GEM
  remote: https://rubygems.org/
  specs:
    ... # 以下略

PLATFORMS
  ruby

DEPENDENCIES
  fastlane
  fastlane-plugin-firebase_app_distribution

BUNDLED WITH
   1.17.2
```

Bitriseの fastlane Step は、 Gemfile.lock を見て自動でインストールしてくれる。


**Fastfile**
```
lane :distribute_to_firebase do
  firebase_app_distribution
end
```

**fastlane/.env.development**
```
FIREBASEAPPDISTRO_IPA_PATH="$BITRISE_IPA_PATH"
FIREBASEAPPDISTRO_APP="" # <- Firebase コンソールから確認
FIREBASEAPPDISTRO_GROUPS="internal"  # <- Firebase コンソール作って
FIREBASEAPPDISTRO_RELEASE_NOTES=""
FIREBASEAPPDISTRO_FIREBASE_CLI_PATH="/usr/local/bin/firebase"
```

自分のやり方では、Fastfile には `firebase_app_distribution` しか書いておらず、 必要なパラメータは .env もしくは Bitrise の Secret に書いとく。
パラメーターで定義するか、送るグループだったり リリースノート書き方は 開発チームで協議して決めてください。

`fastlane action firebase_app_distribution` ってすると、 必要な パラメータだったり環境変数のキーを出してくれるから参考に。

## 3. Bitrise

![](images/blogs/2019-10-01_app-distribution_workflow.png)

Cocoapods だったり Carthage は省く。

1. ビルド
1. firebase-tools インストール
1. App Distribtuion へ送信


### 1. ビルド

ビルドする。

### 2. firebase-tools インストール

![](images/blogs/2019-10-01_app-distribution_step_npm.png)

`install -g firebase-tools` と書いたが、Bitriseはビルド環境がクリーンで実行されるから雑にやってる。バージョン情報を固定にする理由で、本当は package.json を定義するのがよい。

### 3. App Distribtuion へ送信

![](images/blogs/2019-10-01_app-distribution_step_fastlane.png)

```
distribute_to_firebase --env development
```

`--env development` で、 .env.development が読み込まれた状態で実行される。

### 4. Firebase Tools

https://firebase.google.com/docs/app-distribution/ios/distribute-fastlane

> Note: If you're using fastlane in a CI environment, you can also sign in with a service account or by using login:ci.

fastlane-tools は ユーザとしてログインされた状態でないと出来ず、CI上では ログインしたトークンを用いて操作する必要がある。

一回手元なりで、 `firebase login:ci` で 特定プロジェクトにアクセスできるアカウントでログインして、 ターミナル上にあるトークンを用いる。

Bitrise上では Secret に、 `FIREBASE_TOKEN` を追加したらそれでログインできる。忘れずに。

## 4. レッツビルド

ビルドしてみよう。以上。