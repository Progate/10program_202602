#!/usr/bin/env node
"use strict";

const readline = require("readline");

/**
 * 時間帯から挨拶を返す
 * 日本語版と英語版の両方に対応
 */
function getGreetingByTime(date = new Date(), isEnglish = false) {
  const h = date.getHours();

  if (h >= 4 && h <= 9) {
    return isEnglish ? "Good morning" : "おはようございます";
  } else if (h >= 10 && h <= 17) {
    return isEnglish ? "Hello" : "こんにちは";
  } else {
    return isEnglish ? "Good afternoon" : "こんばんは";
  }
}

/**
 * 名前がアルファベットのみか判定
 */
function isAlphabetOnly(name) {
  return /^[A-Za-z]+$/.test(name);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("お名前を入力してください: ", (answer) => {
  const name = (answer ?? "").trim();

  // 未入力チェック
  if (!name) {
    console.log("名前を入力してください。");
    rl.close();
    return;
  }

  const englishName = isAlphabetOnly(name);
  const greeting = getGreetingByTime(new Date(), englishName);

  // 出力の分岐
  if (englishName) {
    console.log(`${greeting}, ${name}!`);
  } else {
    console.log(`${name}さん、${greeting}`);
  }

  rl.close();
});