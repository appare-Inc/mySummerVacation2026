// 各種変数の設定
let timeLeft = 180; // 3分 = 180秒
let timerId = null;
let isGreenClicked = false;
let isWhiteBtnClicked = false;
let isGameOver = false; // 二重処理を防ぐフラグ

// HTML要素の取得
const startScreen = document.getElementById('start-screen');
const mainScreen = document.getElementById('main-screen');
const resultScreen = document.getElementById('result-screen');
const timerDisplay = document.getElementById('timer');
const resultImage = document.getElementById('result-image');

// ① スタートボタンの処理
document.getElementById('start-btn').addEventListener('click', () => {
    // 画面切り替え
    startScreen.style.display = 'none';
    mainScreen.style.display = 'flex';
    
    // タイマー起動
    startTimer();
});

// ② タイマーの処理
function startTimer() {
    timerId = setInterval(() => {
        if (isGameOver) return;

        timeLeft--;
        
        // 分と秒を計算して 00:00 の形式にする
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;

        // 0秒になったら失敗
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000); // 1000ミリ秒（1秒）ごとに実行
}

// ③ 正誤判定の処理
// 不正解ボタン（赤、青）
document.querySelector('.red').addEventListener('click', () => endGame(false));
document.querySelector('.blue').addEventListener('click', () => endGame(false));

// 緑のボタン
document.querySelector('.green').addEventListener('click', () => {
    isGreenClicked = true;
    checkSuccess();
});

// 画像内の当たり判定（赤い円）
document.querySelector('.white-btn').addEventListener('click', (e) => {
    e.preventDefault(); // aタグのデフォルトのページ遷移を防ぐ
    isWhiteBtnClicked = true;
    checkSuccess();
});

// 正解条件を満たしているかチェックする関数
function checkSuccess() {
    if (isGreenClicked && isWhiteBtnClicked) {
        endGame(true);
    }
}

// ④ ゲーム終了時の処理（成功 or 失敗）
function endGame(isSuccess) {
    if (isGameOver) return;
    isGameOver = true;
    clearInterval(timerId); // タイマーを止める

    // 画面切り替え
    mainScreen.style.display = 'none';
    resultScreen.style.display = 'flex';

    // 結果に応じて画像を変更
    if (isSuccess) {
        resultImage.src = 'success.png';
    } else {
        resultImage.src = 'fail.png';
    }
}