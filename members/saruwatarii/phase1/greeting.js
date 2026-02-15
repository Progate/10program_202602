const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('名前を入力してください: ', (name) => {
  if (!name.trim()) {
    console.error('エラー: 名前が入力されていません');
    rl.close();
    return;
  }

  // Process: 名前や時間帯に応じて挨拶を変える
  const hour = new Date().getHours();
  let greeting;

  if (name === '田中') {
    greeting = 'いつもお世話になっております！';
  } else if (hour >= 5 && hour < 12) {
    greeting = 'おはよう';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'こんにちは';
  } else {
    greeting = 'こんばんは';
  }

  const result = `${name}、${greeting}`;

  // Output: 名前、挨拶
  console.log(result);
  rl.close();
});