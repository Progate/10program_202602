#!/usr/bin/env node
"use strict";

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 正の整数（1,2,3,...）チェック：合計金額・人数用
function isPositiveIntegerString(s) {
  const t = s.trim();
  if (t === "") return false;
  const n = Number(t);
  return Number.isInteger(n) && n > 0;
}

// 0以上の数チェック（小数OK）：税率用
function isNonNegativeNumberString(s) {
  const t = s.trim();
  if (t === "") return false;
  const n = Number(t);
  return Number.isFinite(n) && n >= 0;
}

function invalidNumberMessage() {
  console.log("有効な数字を入力してください。");
}

// 合計金額
rl.question("合計金額を入力してください: ", (total) => {
  if (total.trim() === "") {
    console.log("合計金額を入力してください。");
    rl.close();
    return;
  }
  if (!isPositiveIntegerString(total)) {
    invalidNumberMessage();
    rl.close();
    return;
  }

  // 人数
  rl.question("人数を入力してください: ", (people) => {
    if (people.trim() === "") {
      console.log("人数を入力してください。");
      rl.close();
      return;
    }
    if (!isPositiveIntegerString(people)) {
      invalidNumberMessage();
      rl.close();
      return;
    }

    // 税率
    rl.question("税率(%)を入力してください: ", (taxRate) => {
      if (taxRate.trim() === "") {
        console.log("税率を入力してください。");
        rl.close();
        return;
      }
      if (!isNonNegativeNumberString(taxRate)) {
        invalidNumberMessage();
        rl.close();
        return;
      }

      const perPerson = Number(total) / Number(people);
      const taxedPerPerson = perPerson * (1 + Number(taxRate) / 100);

      console.log(`1人あたりの金額は${taxedPerPerson}円です。`);
      rl.close();
    });
  });
});