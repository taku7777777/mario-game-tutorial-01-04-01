// キーボードの入力状態を記録する配列の定義
var input_key_buffer = new Array();

// キーボードの入力イベントをトリガーに配列のフラグ値を更新させる
window.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
  console.log("key down : " + e.keyCode);
  input_key_buffer[e.keyCode] = true;
}

window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
  console.log("key up : " + e.keyCode);
  input_key_buffer[e.keyCode] = false;
}

// canvas要素の取得
const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");

// 画像を表示するの座標の定義 & 初期化
var x = 0;
var y = 300;

// 上下方向の速度
var vy = 0;
// ジャンプしたか否かのフラグ値
var isJump = false;

// ロード時に画面描画の処理が実行されるようにする
window.addEventListener("load", update);

// 画面を更新する関数を定義 (繰り返しここの処理が実行される)
function update() {
  // 画面全体をクリア
  ctx.clearRect(0, 0, 9999, 9999);

  // 入力値の確認と反映
  if (input_key_buffer[37]) {
    // 左が押されていればx座標を1減らす
    x = x - 2;
  }
  if (input_key_buffer[38]) {
    // 上が押されていれば、上向きの初期速度を与え、ジャンプ中のフラグを立てる
    vy = -7;
    isJump = true;
  }
  if (input_key_buffer[39]) {
    // 右が押されていればx座標を1増やす
    x = x + 2;
  }

  // ジャンプ中である場合のみ落下するように調整する
  if (isJump) {
    // 上下方向は速度分をたす
    y = y + vy;

    // 落下速度はだんだん大きくなる
    vy = vy + 0.5;
  }

  // 主人公の画像を表示
  var image = new Image();
  image.src = "../images/character-01/base.png";
  ctx.drawImage(image, x, y, 32, 32);

  // 再描画
  window.requestAnimationFrame(update);
}
