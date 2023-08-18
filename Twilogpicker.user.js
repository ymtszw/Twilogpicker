// ==UserScript==
// @name         Twilogpicker
// @namespace    https://ymtszw.cc
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @version      0.1.1
// @description  Pick Twilogs from Tweetdeck and store.
// @author       Gada / ymtszw
// @copyright    2023, Gada / ymtszw (https://ymtszw.cc)
// @downloadURL  https://raw.githubusercontent.com/ymtszw/Twilogpicker/main/Twilogpicker.user.js
// @updateURL    https://raw.githubusercontent.com/ymtszw/Twilogpicker/main/Twilogpicker.user.js

// @noframes     true
// @run-at       document-idle
// @match        https://tweetdeck.twitter.com
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// ==/UserScript==

// Note: Top-level awaitを使用するため、このスクリプトはIIFEでラップされていない。
// Top-level awaitに対応したブラウザでないと動作しない。

//
// メイン処理
//

//
// 起動処理部分
//

// Tampermonkey UIでストレージタブを出現させるため、固定値をセットする。
GM_setValue("STORAGE_INITIALIZED", true);

/**
 * これまでにスクレイピングしたTwilogに関する情報を保持するためのlocalStorageキー
 * @type {string}
 */
const LOCAL_STORAGE_KEY = "___my_twilogs___";

log("スクリプト読み込み成功");

const highlighter = document.createElement("style");
highlighter.textContent = `
.twilogpicker-timeline {
  border: 4px solid white;
  transition: all 0.5s ease-in-out;
}
`;
document.head.appendChild(highlighter);

//
// 繰り返し部分
//
function main() {
  log("繰り返し", new Date().toLocaleString());

  const selectorForMyTwilogs =
    'section[role="region"]:has(nav[role="navigation"] a[href="https://twitter.com/gada_twt"][aria-selected="true"]) *:has(> [data-testid="cellInnerDiv"])';
  const timeline = document.querySelector(selectorForMyTwilogs);

  if (!timeline) {
    log("タイムライン非表示中");
    return;
  }

  timeline.classList.add("twilogpicker-timeline");
  timeline.insertBefore();
}

window.setInterval(main, 30_000);

//
// メイン処理ここまで。以下ヘルパー
//

function log() {
  console.log("[👹TLP]", ...arguments);
}

/**
 * `await sleep(1000);`のように使用することで、指定したミリ秒だけ手続き的に待機できる。
 * @param {number} t
 */
function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t, "OK");
  });
}
