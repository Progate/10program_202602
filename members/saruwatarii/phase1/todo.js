const readline = require('readline');

// 入力と出力を扱うインターフェースを作成
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// タスクを保存する配列（メモリ上）
// プログラムを終了すると、この中身は消えます（揮発性）
const tasks = [];

console.log('--- ToDoリストアプリ ---');
console.log('コマンド: add <タスク名>, list, done <タスク名>, search <キーワード>, exit');

// ユーザーの入力を待機するループ
rl.on('line', (line) => {
  const args = line.trim().split(' ');
  const command = args[0];
  const content = args.slice(1).join(' ');

  // IPOカードに基づいた処理
  if (command === 'add') {
    if (content) {
      tasks.push(content);
      console.log('タスクを追加しました');
    } else {
      console.log('エラー: タスク名を入力してください');
    }
  } else if (command === 'list') {
    if (tasks.length === 0) {
      console.log('タスクはありません');
    } else {
      console.log('--- タスク一覧 ---');
      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
      });
    }
  } else if (command === 'done') {
    // 部分一致で検索（入力が空でない場合のみ）
    const index = content ? tasks.findIndex(task => task.includes(content)) : -1;
    if (index !== -1) {
      const removedTask = tasks.splice(index, 1);
      console.log(`${removedTask}を完了しました`);
    } else {
      console.log('エラー: そのタスクは見つかりませんでした');
    }
  } else if (command === 'search') {
    if (!content) {
      console.log('エラー: 検索キーワードを入力してください');
    } else {
      const results = tasks.filter(task => task.includes(content));
      if (results.length === 0) {
        console.log('該当するタスクはありません');
      } else {
        console.log('--- 検索結果 ---');
        results.forEach(task => console.log(task));
      }
    }
  } else if (command === 'exit') {
    console.log('アプリを終了します');
    rl.close();
  } else {
    console.log('無効なコマンドです (使えるコマンド: add, list, done, search, exit)');
  }
});