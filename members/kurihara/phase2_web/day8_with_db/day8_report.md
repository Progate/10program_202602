# Day8_report

## 実験1

### 方法
Cliant側でメッセージを送信して，ブラウザF12 console, VS Code ターミナル，Prisma Studioでデータを確認した．なお，一度Prisma Studioを開くのを忘れてメッセージを送ったため，やり直した．

### 結果
- ブラウザF12 console: 
(index):61 [CLIENT] 送信前データ: {name: 'Lisp Alien', content: 'Hello, world!'}
(index):73 [CLIENT] 送信後レスポンス: {success: true, message: {…}}

- VS Code ターミナル: 
[SERVER] 保存しました: {
  id: 2,
  name: 'Lisp Alien',
  content: 'Hello, world!',
  createdAt: 2026-02-23T01:41:37.088Z
}

- Prisma Studio: 
| id # | name A | content A |
| ------ | ------ | ------ |
| 2 | Lisp Alien | Hello, world!|


## 実験2

### 方法
メッセージを追加で3件送信し，Prisma Studio で3件のレコードを確認した．その後，ターミナルで Ctrl + C でサーバーを停止し，node server.js によってサーバーを再起動した．そして，Prisma StudioでDBの中身を確認した．

### 予想
サーバーを再起動すると，Day6, Day7同様，ブラウザF12 consoleとサーバーからは送信したデータは消えるが，DBであるPrisma Studioにはデータが残る

### 結果
Prisma Studioのみに送信したデータが残っていた．

### 考察
送ったメッセージのデータはdev.dbに書き込まれ，それをPrisma Studioで表示していると考えられる．実際，メッセージを送信し，データが記録されているのを確認後，dev.dbを消去し， npx prisma migrate dev --name init によって新しくdev.dbを作り，Prisma Studioでデータを見ると，データがすべて消えたからである．