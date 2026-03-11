# Day9_report

## 実験1

### 方法
1. Day8で一度dev.dbを消してデータを消去したため，day9の準備をした後，3件のメッセージを送信した．
2. 一度serverを停止させ，再起動し，1で送信したメッセージが画面に表示されていることを確認した．
3. ブラウザF12 consoleとターミナルのログを確認した．
4. 新しいメッセージを送信し，一覧に追加されることを確認した．

### 結果
- 画面に表示されたメッセージ(日付が2026/2/23のメッセージは方法1で送信したメッセージ．): 
Tom
new message
2026/2/24 14:03:05
Me
So data submitted previously is vanished!
2026/2/23 12:39:20
Test test
i deleted DB used at day8
2026/2/23 12:37:27
Lisp-Alien
i ate a pudding
2026/2/23 12:36:37

- F12 console に表示されたログ: 
[CLIENT] メッセージ一覧を取得します
[CLIENT] メッセージ一覧を取得しました:
Array(3)
0
: 
{id: 3, name: 'Me', content: 'So data submitted previously is vanished!', createdAt: '2026-02-23T03:39:20.368Z'}
1
: 
{id: 2, name: 'Test test', content: 'i deleted DB used at day8', createdAt: '2026-02-23T03:37:27.888Z'}
2
: 
{id: 1, name: 'Lisp-Alien', content: 'i ate a pudding', createdAt: '2026-02-23T03:36:37.150Z'}
length
: 
3
[[Prototype]]
: 
Array(0)
(index):126 [CLIENT] 送信前データ: {name: 'Tom', content: 'new message'}
(index):138 [CLIENT] 送信後レスポンス: {success: true, message: {…}}
(index):95 [CLIENT] メッセージ一覧を取得します
(index):100 [CLIENT] メッセージ一覧を取得しました: 
(4) [{…}, {…}, {…}, {…}]
0
: 
{id: 4, name: 'Tom', content: 'new message', createdAt: '2026-02-24T05:03:05.359Z'}
1
: 
{id: 3, name: 'Me', content: 'So data submitted previously is vanished!', createdAt: '2026-02-23T03:39:20.368Z'}
2
: 
{id: 2, name: 'Test test', content: 'i deleted DB used at day8', createdAt: '2026-02-23T03:37:27.888Z'}
3
: 
{id: 1, name: 'Lisp-Alien', content: 'i ate a pudding', createdAt: '2026-02-23T03:36:37.150Z'}
length
: 
4
[[Prototype]]
: 
Array(0)

- ターミナルに表示されたログ: 
[SERVER] メッセージを取得しました: 3件
[SERVER] 保存しました: {
  id: 4,
  name: 'Tom',
  content: 'new message',
  createdAt: 2026-02-24T05:03:05.359Z
}
[SERVER] メッセージを取得しました: 4件


## 実験2

### 方法
1. サーバーを停止した．
2. サーバーを再起動した．
3. ブラウザで `http://localhost:3000` を開いた．
4. 以前のメッセージが表示されるか確認した．

### 予想
サーバーを停止させても，データベースにはデータが残っているので以前のメッセージは表示される．

### 結果
ブラウザの画面には，以前に送ったメッセージが一覧に表示された．

### 分かったこと
Read の流れは，まずクライアントがブラウザでページを読み込むと，ブラウザはfetchを使ってEpressサーバーへ，サーバーはprismaを使ってデータベースへ，データの取得を要求する．データベースが要求を受けると，dev.dbからデータを読み出し，データをprismaに送り，Expressサーバーにデータが渡される．ブラウザはfetchを使ってサーバーからres.jsonにまとめられたデータを受け取る．
Create の流れは，クライアントがブラウザでメッセージを送ると，ブラウザはfetchを使って，Expressサーバーへ，サーバーはPrismaを介してデータベースへ，データを送信する．データベースがデータを受け取ると，dev.dbにデータが保存される．保存が成功すると，データベースがPrismaを介してExpressサーバーへ返答を送り，ブラウザはfetchを使ってサーバーから返答を受け取る．
Read はclient -> server -> DBという経路で要求をし，DB -> server -> clientという経路でデータを送ったのに対し，Createはclient -> server -> DBという経路でデータを送り，DB -> server -> clientという経路で返答したので，両者ではデータの流れの方向が異なっている．