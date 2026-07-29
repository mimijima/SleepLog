const app = document.querySelector("#app");

const state = {
  view: "login",
  sentCode: false,
  selectedDay: null,
  editingId: null,
  selectedMonth: new Date(),
  records: [
    { id: 1, sleep: "2026-07-27T23:40", wake: "2026-07-28T06:20" },
    { id: 2, sleep: "2026-07-28T13:00", wake: "2026-07-28T13:35" },
    { id: 3, sleep: "2026-07-28T23:55", wake: "2026-07-29T05:45" },
    { id: 4, sleep: "2026-07-29T22:50", wake: "2026-07-30T04:20" },
  ],
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function dateKey(value) {
  const date = new Date(value);
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
}

function localDateTime(date) {
  return dateKey(date) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes());
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "numeric", day: "numeric" }).format(new Date(value));
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false,
  }).format(new Date(value));
}

function duration(record) {
  const minutes = Math.max(0, (new Date(record.wake) - new Date(record.sleep)) / 60000);
  return Math.floor(minutes / 60) + "時間" + Math.round(minutes % 60) + "分";
}

function recordsForDay(day) {
  return state.records.filter((record) => dateKey(record.wake) === day);
}

function header(title, menu) {
  return '<header class="page-head"><h1>' + title + '</h1>' +
    (menu ? '<button class="button" data-action="open-menu">右上メニューボタン</button>' : "") +
    '</header>';
}

function tabs(active) {
  return '<nav class="tab-bar" aria-label="主な画面">' +
    '<button data-action="record-tab"' + (active === "record" ? ' aria-current="page"' : "") + '>記録タブ</button>' +
    '<button data-action="graph-tab"' + (active === "graph" ? ' aria-current="page"' : "") + '>グラフタブ</button>' +
    '</nav>';
}

function overlay(content) {
  return '<section class="overlay" role="dialog" aria-modal="true"><div class="overlay-card">' + content + "</div></section>";
}

function renderLogin() {
  const disabled = state.sentCode ? "" : " disabled";
  app.innerHTML = '<section class="screen">' +
    header("SleepLog｜ログイン画面", false) +
    '<div class="content content--center"><section class="card">' +
    '<p class="wire-note">低解像度の操作確認用モックアップです。実際の認証は行いません。</p>' +
    '<h2>ログイン</h2>' +
    '<div class="field"><label for="email">メールアドレス入力欄</label><input id="email" type="email" value="you@example.com"></div>' +
    '<button class="button button--primary" data-action="send-code">コード送信ボタン</button>' +
    '<p class="message" id="send-message">' + (state.sentCode ? "入力したメールアドレスへコードを送信しました。" : "") + "</p>" +
    '<div class="field"><label for="code">コード入力欄</label><input id="code" inputmode="numeric" placeholder="6桁のコード"' + disabled + "></div>" +
    '<div class="button-row"><button class="button" data-action="resend-code"' + disabled + '>コード再送ボタン</button>' +
    '<button class="button button--primary" data-action="login"' + disabled + '>ログインボタン</button></div>' +
    '<p class="message message--error" id="login-error"></p>' +
    '<button class="link" data-action="privacy">プライバシーポリシーリンク</button>' +
    "</section></div></section>";
}

function renderRecord() {
  app.innerHTML = '<section class="screen">' + header("SleepLog｜記録画面（開始前）", true) +
    '<div class="record-main"><div><p>就寝前は、必要な操作だけを表示する想定です。</p>' +
    '<button class="button button--primary button--large" data-action="sleep">就寝ボタン</button>' +
    '<p><button class="link" data-action="add">追加ボタン</button></p></div></div>' +
    tabs("record") + "</section>";
}

function renderSleeping() {
  app.innerHTML = '<section class="screen sleeping"><div class="sleeping-center"><h1>睡眠中</h1>' +
    "<p>起床まで、情報や操作を最小限にする状態です。</p><small>就寝日時を記録済み</small></div>" +
    '<section class="roller" aria-label="起床操作部"><button data-action="wake">起床操作部<br><small>上へ引き上げる（モックでは押下）</small></button></section></section>';
}

function renderWake() {
  app.innerHTML = '<section class="screen wake">' + header("SleepLog｜記録画面（起床直後）", false) +
    '<div class="record-main"><div><h2>起床日時を記録しました</h2><p>数秒後に開始前の状態へ戻ります。</p></div></div></section>';
  window.setTimeout(() => {
    if (state.view === "wake") {
      state.view = "record";
      render();
    }
  }, 1800);
}

function graphRows() {
  const rows = [];
  const today = new Date(state.selectedMonth);
  for (let offset = 9; offset >= 0; offset -= 1) {
    const day = new Date(today);
    day.setDate(today.getDate() - offset);
    const key = dateKey(day);
    const hasRecord = recordsForDay(key).length > 0;
    rows.push('<div class="graph-row"><div class="graph-row-label">' + (day.getMonth() + 1) + "/" + day.getDate() +
      '</div><button class="graph-row-control' + (hasRecord ? "" : " empty-row") +
      '" data-action="open-list" data-day="' + key + '" aria-label="' + key + 'の睡眠一覧">' +
      (hasRecord ? '<span class="sleep-bar" style="left:27%;width:30%"></span>' : "") + "</button></div>");
  }
  return rows.join("");
}

function renderGraph() {
  const month = state.selectedMonth.getFullYear() + "年" + (state.selectedMonth.getMonth() + 1) + "月";
  app.innerHTML = '<section class="screen">' + header("SleepLog｜グラフ画面", true) +
    '<div class="content"><p class="wire-note">表示量・目盛り・色・初期位置は、画面デザイン確認時に決める項目です。</p>' +
    '<div class="graph-tools"><div class="month-control"><span class="month-display">年月表示：' + month +
    '</span><button class="button" data-action="select-date">年月選択操作部</button></div>' +
    '<button class="button" data-action="reset-graph">初期表示へ戻るボタン</button></div>' +
    '<p class="graph-key"><span class="key-swatch"></span>起きている時間　<span class="key-swatch key-swatch--sleep"></span>睡眠</p>' +
    '<section class="graph" aria-label="1日ごとの横棒グラフ">' + graphRows() + "</section></div>" + tabs("graph") + "</section>";
}

function renderMenu() {
  return overlay('<h2>右上メニュー</h2><div class="button-row">' +
    '<button class="button" data-action="close-overlay">閉じるボタン</button>' +
    '<button class="link" data-action="privacy">プライバシーポリシーリンク</button>' +
    '<button class="link" data-action="logout-confirm">ログアウトリンク</button></div>');
}

function renderPrivacy() {
  app.innerHTML = '<section class="screen">' + header("SleepLog｜プライバシーポリシー", false) +
    '<div class="content"><h2>プライバシーポリシー（仮）</h2>' +
    '<p class="privacy-text">必要な個人情報はできるだけ少なくする方針です。実際に収集する情報、保存場所、保持期間などは技術選定後に確定します。</p>' +
    '<button class="button" data-action="back">前画面へ戻るボタン</button></div></section>';
}

function renderDatePicker() {
  return overlay('<h2>日付選択画面</h2><div class="field"><label for="jump-date">日付選択操作部</label>' +
    '<input id="jump-date" type="date" value="' + dateKey(new Date()) + '"></div><div class="button-row">' +
    '<button class="button button--primary" data-action="jump-date">日付を選択</button>' +
    '<button class="button" data-action="close-overlay">キャンセルボタン</button></div>');
}

function renderSleepList(day) {
  const records = recordsForDay(day);
  const items = records.map((record) =>
    '<li><div><time>就寝日時：' + formatDateTime(record.sleep) + "</time><time>起床日時：" + formatDateTime(record.wake) +
    "</time><strong>" + duration(record) + '</strong></div><div class="button-row">' +
    '<button class="button" data-action="edit" data-id="' + record.id + '">編集ボタン</button>' +
    '<button class="button button--danger" data-action="delete" data-id="' + record.id + '">削除ボタン</button></div></li>'
  ).join("");
  return overlay('<h2>睡眠一覧</h2><p class="list-meta">表示期間：' + formatDate(day) +
    'に起床した睡眠</p><ul class="sleep-list">' + items +
    '<li><button class="add-row" data-action="add" data-day="' + day + '">新規追加ボタン</button></li></ul>' +
    '<div class="button-row"><button class="button" data-action="close-overlay">閉じるボタン</button></div>');
}

function inputOverlay(record) {
  const isEdit = Boolean(record);
  const defaultDay = state.selectedDay || dateKey(new Date());
  const sleep = record ? record.sleep : defaultDay + "T23:00";
  const wake = record ? record.wake : defaultDay + "T07:00";
  return overlay("<h2>" + (isEdit ? "編集" : "追加") + "・編集入力</h2>" +
    '<div class="field"><label for="sleep-time">就寝日時入力欄</label><input id="sleep-time" type="datetime-local" value="' + sleep + '"></div>' +
    '<div class="field"><label for="wake-time">起床日時入力欄</label><input id="wake-time" type="datetime-local" value="' + wake + '"></div>' +
    '<p class="message message--error" id="input-error"></p><div class="button-row">' +
    '<button class="button button--primary" data-action="save-input">' + (isEdit ? "編集保存ボタン" : "追加保存ボタン") + '</button>' +
    '<button class="button" data-action="close-overlay">キャンセルボタン</button></div>');
}

function deleteOverlay(id) {
  return overlay('<h2>削除確認</h2><p>この睡眠記録を削除しますか？</p><div class="button-row">' +
    '<button class="button button--danger" data-action="confirm-delete" data-id="' + id + '">削除確定ボタン</button>' +
    '<button class="button" data-action="close-overlay">キャンセルボタン</button></div>');
}

function render() {
  if (state.view === "login") renderLogin();
  if (state.view === "record") renderRecord();
  if (state.view === "sleeping") renderSleeping();
  if (state.view === "wake") renderWake();
  if (state.view === "graph") renderGraph();
}

function showOverlay(markup) {
  app.insertAdjacentHTML("beforeend", markup);
}

function closeOverlay() {
  const element = app.querySelector(".overlay");
  if (element) element.remove();
}

function refreshList() {
  closeOverlay();
  showOverlay(renderSleepList(state.selectedDay));
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  if (action === "send-code") { state.sentCode = true; render(); }
  if (action === "resend-code") { app.querySelector("#send-message").textContent = "コードを再送しました。"; }
  if (action === "login") { state.view = "record"; render(); }
  if (action === "record-tab") { state.view = "record"; render(); }
  if (action === "graph-tab") { state.view = "graph"; render(); }
  if (action === "sleep") { state.pendingSleep = localDateTime(new Date()); state.view = "sleeping"; render(); }
  if (action === "wake") {
    state.records.push({ id: Date.now(), sleep: state.pendingSleep, wake: localDateTime(new Date()) });
    state.pendingSleep = null; state.view = "wake"; render();
  }
  if (action === "open-menu") showOverlay(renderMenu());
  if (action === "close-overlay") closeOverlay();
  if (action === "privacy") {
    state.previous = state.view; closeOverlay(); state.view = "privacy"; renderPrivacy();
  }
  if (action === "back") { state.view = state.previous || "login"; render(); }
  if (action === "logout-confirm") {
    closeOverlay();
    showOverlay('<h2>ログアウト確認</h2><p>ログアウトしますか？</p><div class="button-row">' +
      '<button class="button button--primary" data-action="logout">ログアウト確定ボタン</button>' +
      '<button class="button" data-action="close-overlay">キャンセルボタン</button></div>');
  }
  if (action === "logout") { state.view = "login"; state.sentCode = false; render(); }
  if (action === "select-date") showOverlay(renderDatePicker());
  if (action === "jump-date") {
    const value = app.querySelector("#jump-date").value;
    if (value) state.selectedMonth = new Date(value + "T00:00");
    closeOverlay(); renderGraph();
  }
  if (action === "reset-graph") { state.selectedMonth = new Date(); renderGraph(); }
  if (action === "open-list") { state.selectedDay = target.dataset.day; showOverlay(renderSleepList(state.selectedDay)); }
  if (action === "add") { state.editingId = null; closeOverlay(); showOverlay(inputOverlay(null)); }
  if (action === "edit") {
    state.editingId = Number(target.dataset.id);
    const record = state.records.find((item) => item.id === state.editingId);
    closeOverlay(); showOverlay(inputOverlay(record));
  }
  if (action === "save-input") {
    const sleep = app.querySelector("#sleep-time").value;
    const wake = app.querySelector("#wake-time").value;
    if (!sleep || !wake || new Date(wake) <= new Date(sleep)) {
      app.querySelector("#input-error").textContent = "起床日時は就寝日時より後にしてください。";
      return;
    }
    if (state.editingId) {
      Object.assign(state.records.find((item) => item.id === state.editingId), { sleep, wake });
    } else {
      state.records.push({ id: Date.now(), sleep, wake });
      state.selectedDay = dateKey(wake);
    }
    state.editingId = null;
    if (state.view === "graph") refreshList(); else closeOverlay();
  }
  if (action === "delete") { closeOverlay(); showOverlay(deleteOverlay(Number(target.dataset.id))); }
  if (action === "confirm-delete") {
    state.records = state.records.filter((record) => record.id !== Number(target.dataset.id));
    refreshList();
  }
});

render();
