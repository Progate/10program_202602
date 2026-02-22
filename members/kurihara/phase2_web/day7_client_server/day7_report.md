*** 実験1 ***

##　方法
メッセージ"This is a test."を送信した．

## 結果
    F12 Console に表示されたログ: 
[CLIENT] 送信前データ: {message: 'This is a test.'}
(index):67 [CLIENT] 送信後レスポンス: {success: true}    

    ターミナルに表示されたログ: 
[SERVER] 受信データ: { message: 'This is a test.', receivedAt: '2026-02-21T11:42:27.902Z' }

    考察(なぜログが2か所に表示されるか): 
cliant 側のindex.htmlについて，
const payload = { message };
console.log('[CLIENT] 送信前データ:', payload);

server 側のserver.jsについて，
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
...
app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  const item = {
    message,
    receivedAt: new Date().toISOString(),
  };
  ...
}
)

  messages.push(item);
  console.log('[SERVER] 受信データ:', item);

の部分から，cliantがブラウザからメッセージを送ると，ブラウザのコンソールにNode.jsのExpressに送信前データが，serverのExpressがメッセージを受け取ると，サーバー側のコンソールに受信データがconsole.logによって表示されるためだと考えられる．


*** 実験2 ***

##　方法
1. メッセージ"hop", "step", "jumping"を送信した．
2. ターミナルでデータが3件保存されていることを確認した．
3. ターミナルで **Ctrl+C** を押してサーバーを停止させた．
4. `node server.js` によってサーバーを再起動させた．
5. ターミナルを確認した．

## 結果
  予想:
サーバーを再起動すると，server.jsを読み込み直すため，javaScriptのリストに保存してあったデータは消える． 

  結果:
サーバーに以前のデータはなく，データを保存するためのリストは空のリストになっていた．

  分かったこと: 
サーバーを再起動させると，server.jsを読み込み直すため，以前リストに保存してあったデータは消える．これは，Day6で，ファイルを読み込み直してデータが消えたという点で共通している．