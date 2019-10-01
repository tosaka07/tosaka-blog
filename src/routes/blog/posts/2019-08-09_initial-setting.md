---
title: Macの初期設定メモ
date: 2019-08-09T09:44:04.563Z
tags:
  - Mac
---
新しいMacが手に入ったとき、だいたい何してるかメモっておく。
<!-- more -->

（Ansible組んだら早いってわかってます）

## Mac設定
* CapsLock → Control
* 最新の利用状況に基づいて -> false

### スクショ

```shell
$ mkdir ~/Pictures/ss
$ defaults write com.apple.screencapture type png
$ defaults write com.apple.screencapture location ~/Pictures/ss
$ defaults write com.apple.screencapture name SS
$ killall SystemAllServer
```

## Homebrew

```
adns
lame
pcre2
alacritty
libassuan
peco
ansible
libevent
pinentry
autoconf
libffi
pinentry-mac
bash
libgcrypt
pkg-config
bash-completion
libgpg-error
pngquant
carthage
libksba
python
cmake
libpng
rbenv
colordiff
libressl
readline
ctls
libtasn1
reattach-to-user-namespace
ffmpeg
libtermkey
ruby-build
fish
libtiff
sourcery
fontconfig
libunistring
sphinx-doc
freetype
libusb
sqlite
gdbm
libuv
swiftformat
gettext
libvterm
swiftgen
ghq
libyaml
swiftlint
git
little-cms2
telnet
gmp
luajit
tmux
gnupg
msgpack
tree
gnutls
neovim
unibilium
icu4c
nettle
vapor
jemalloc
node
x264
jenv
npth
xvid
jpeg
oniguruma
xz
jq
openssl
youtube-dl
kitura
p11-kit
```
## env

* rbenv
* nvm

## SSH
ssh keyをコピって移動

## dotfiles
githubからコピってくる

* colordiff
* git-prompt
* bash-completion

## アプリケーション
* Google Chrome
* Google IME
	* ことえり削除
* Bear
* Slack
* Discord
* 1password
* LICEcap
* AppCleaner
* The Unarchiver
* Adobe CC
* IINA

## 開発ツール
* Xcode
* VSCode
	* sync
* iTerm2
	* General
		* `Confirm closing multiple session: true` 
		* `Add Bonjour hosts to Profiles: false`
		* `Native Full Screen Windows: false`
	* Appearance
		* `Auto-hide menu bar in non-native fullscreen: false`
	* Text
		* Cursor: Vertical bar
		* Blinking cursor
		* Font: Fura code 14pt
	* Window
		* Style: Full Screen
		* Screen: Screen with Cursor
		* Space: All Space
	* Terminal
		* Unlimited scrollback: true
	* Hotkey: Control + Enter
* Alacritty
* Insomnia
* Dash
