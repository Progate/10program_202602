// IPOカードに基づいた割り勘計算機
// 実行例: node warikan.js 1000 3

// Input: コマンドライン引数を受け取る
const totalAmount = Number(process.argv[2]); // 合計金額（税抜）
const people = Number(process.argv[3]);      // 人数

// 入力チェック（数値でない場合や、0以下の人数を防ぐ）
if (isNaN(totalAmount) || isNaN(people) || people <= 0) {
  console.log("エラー: 正しい数値を入力してください。");
  console.log("使い方: node warikan.js <合計金額> <人数>");
  process.exit(1);
}

// Process: 消費税計算と割り算
const totalAmountWithTax = Math.floor(totalAmount * 1.1); // 税込合計（切り捨て）
const perPerson = Math.floor(totalAmountWithTax / people); // 1人あたり（切り捨て）
const remainder = totalAmountWithTax % people;             // 端数

// Output: 結果の表示
console.log(`税込合計 ${totalAmountWithTax} 円、1人あたり ${perPerson} 円です（端数：${remainder} 円）`);