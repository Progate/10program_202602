"use strict";

const readline = require("readline");

// ====== In-memory storage (DBなし / ファイル保存なし) ======
/**
 * tasks: { name: string, done: boolean }[]
 */
const tasks = [];

// ====== Helpers ======
function findTaskByName(name) {
  return tasks.find(t => t.name === name);
}

function addTask(name) {
  if (findTaskByName(name)) {
    console.log("同名のタスクがあります。タスク名を変更してください。");
    return;
  }
  tasks.push({ name, done: false });
  console.log("タスクが追加されました");
}

function showTasks() {
  if (tasks.length === 0) {
    console.log("(タスクはありません)");
    return;
  }

  for (const t of tasks) {
    if (t.done) {
      console.log(`*${t.name}`);
    } else {
      console.log(t.name);
    }
  }
}

function listTasks(type) {
  let filtered;

  if (type === "todo") {
    filtered = tasks.filter(t => !t.done);
  } else if (type === "done") {
    filtered = tasks.filter(t => t.done);
  } else {
    console.log("list は 'todo' または 'done' を指定してください。");
    return;
  }

  if (filtered.length === 0) {
    console.log("(該当するタスクはありません)");
    return;
  }

  for (const t of filtered) {
    if (t.done) {
      console.log(`*${t.name}`);
    } else {
      console.log(t.name);
    }
  }
}

function doneTask(name) {
  const task = findTaskByName(name);
  if (!task) {
    console.log("リストの中にそのようなタスクはありません。");
    return;
  }
  task.done = true;
  console.log("正常に処理されました。");
}

function printHelp() {
  console.log("使い方:");
  console.log("タスクを追加:  add (タスクの名称)");
  console.log("リストの表示:  show");
  console.log("未完了のタスクのみ表示:  list todo");
  console.log("完了したタスクのみ表示:  list done");
  console.log("タスクの完了:  done (タスクの名称)");
  console.log("終了:  exit");
}

// ====== CLI loop ======
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

printHelp();
rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();

  if (input === "") {
    rl.prompt();
    return;
  }

  if (input === "exit" || input === "quit") {
    rl.close();
    return;
  }

  if (input === "help") {
    printHelp();
    rl.prompt();
    return;
  }

  const [cmd, ...rest] = input.split(" ");
  const arg = rest.join(" ").trim();

  if (cmd === "add") {
    if (!arg) {
      console.log("タスク名を入力してください。例: add レポートを書く");
    } else {
      addTask(arg);
    }
  } else if (cmd === "show") {
    showTasks();
  } else if (cmd === "list") {
    if (!arg) {
      console.log("list には 'todo' または 'done' を指定してください。");
    } else {
      listTasks(arg);
    }
  } else if (cmd === "done") {
    if (!arg) {
      console.log("タスク名を入力してください。例: done レポートを書く");
    } else {
      doneTask(arg);
    }
  } else {
    console.log("不明なコマンドです。help を参照してください。");
  }

  rl.prompt();
});

rl.on("close", () => {
  console.log("終了します。");
  process.exit(0);
});