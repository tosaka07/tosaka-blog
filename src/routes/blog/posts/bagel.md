---
title: ネットワークデバッグライブラリ、Bagelを試してみる
date: 2019-01-28T09:44:04.563Z
---

GitHubのトレンド見てたら、Bagelというライブラリを見つけた。

iOSの通信デバッグ中に、リクエストレスポンスをMacアプリでUIでキレイに表示できるよってやつらしい。

<!-- more -->

![](images/blogs/bagel.png)

GitHubのトレンド見てたら、Bagelというライブラリを見つけた。

iOSの通信デバッグ中に、リクエストレスポンスをMacアプリでUIでキレイに表示できるよってやつらしい。

https://github.com/yagiz/Bagel

面白そうだから入れてみることにする。

## iOSの準備

**1. Cartfileに以下を追加**

```
github "yagiz/Bagel"
```

**2. インストール**

```shell
$ carthage install
```

**3. Xcode設定**

`Linked Frameworks and Libraries` と `Build Phases(Carthage)` に２つを追加。

* Bagel.framework
* CocoaAsyncSocket.framework 

**4. コード設定**

`AppDelegate.swift` とかに追加。

```swift
Bagel.start()
```

最初は色々設定することもできるっぽい。

```swift
let bagelConfig = BagelConfiguration()

bagelConfig.project.projectName = "Custom Project Name"
bagelConfig.device.deviceName = "Custom Device Name"
bagelConfig.device.deviceDescription = "Custom Device Description"

Bagel.start(bagelConfig)
```

けど、無限ループ走って落ちた。とりあえず最小でやりたいから省くことに。

## Macアプリの準備

Macアプリから通信履歴をみるから、インストールするだけかと思ったら

* Clone the repo.
* Install pods.
* Build and archive the project.


 **自分でビルドしてね✨** らしい。

クローンして cocoapodsインストール。プロジェクトを開く。

```shell
$ git clone git@github.com:yagiz/Bagel.git
$ cd /path-to-repo/
$ cd mac
$ pod install
$ open Bagel.xcworkspace/
```

そして、ビルド実行しようとしたら失敗した。

`EXPANDED_CODE_SIGN_IDENTITY: unbound variable`

調べて見ると、 [cocoapodsのissue](https://github.com/CocoaPods/CocoaPods/issues/7708)にあった。**1.5.x系のバグらしいから、1.6.0いれてみろ** とのこと。

```shell
sudo gem install cocoapods --pre
```

もう一度 `pod install` して、ビルドし直したら動きました。

## 使ってみた

![Babel Screen Shot 1](images/blogs/bagel_1.png "通信取得したときの様子:Body")

![Babel Screen Shot 2](images/blogs/bagel_2.png "通信取得したときの様子:Headers")

上にリクエスト一覧がみれて、下カラムに `Header` と `Body` が見れる。
画像は黒テーマになっているが、MacOSのテーマをダークにしているとこうなり、ライトだと明るいみたい目になる。

## まとめ

macアプリをクローンするのがとても面倒で、チーム開発で入れるにはみんながビルドしなきゃいけないし、開発時にこれを本当に使うのかも怪しい。確かに便利で見やすいけど、XCodeのコンソールに出すので充分な気がする。

OSSだし、自分で配布しても良いが・・・。もっとネットワークデバッギングが楽にならないかな。