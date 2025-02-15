// 要素読み込み
const inputAnswer = document.getElementById("answer");
if (inputAnswer === null) {
  console.error("回答フォームがページに存在しません。");
}
const questionTimer = document.getElementById("question-timer");
if (questionTimer === null) {
  console.error("タイマーがページに存在しません。");
}
const correctElem = document.getElementById("correct");
if (correctElem === null) {
  console.error("正解時に表示するコンテンツが存在しません。");
}
const uncorrectElem = document.getElementById("uncorrect");
if (uncorrectElem === null) {
  console.error("不正解時に表示するコンテンツが存在しません。");
}
const startModalElem = document.getElementById("start_modal");
if (startModalElem === null) {
  console.error("ゲームスタート用のウィンドウが存在しません。");
}
const startElem = startModalElem.querySelector("#start");
if (startElem === null) {
  console.error("ゲームスタート用のBoxが存在しません。");
}
const startCountElem = startModalElem.querySelector("#start-count");
if (startCountElem === null) {
  console.error("ゲームスタート時のカウント用のBoxが存在しません。");
}

const onClickOKButton = () => {
  if (inputAnswer == null) {
    console.error("回答フォームが存在しないので動作しません。");
    return;
  }
  quizManager.onClickJudge(inputAnswer.value);
};

const onClickDELButton = () => {
  if (inputAnswer == null) {
    console.error("回答フォームが存在しないので動作しません。");
    return;
  }
  delAnswer();
};

const delAnswer = () => {
  inputAnswer.value = "";
};

const gamestart = () => {
  quizManager.frameUpdateStart();
}

function countdown(seconds, element) {
  return new Promise((resolve) => {
      let count = seconds;
      element.textContent = count;

      let timer = setInterval(() => {
          count--;
          if(count > 0){
            element.textContent = count;
          }
          else if (count == 0) {
            element.textContent = "START";
          }
          else if (count <= -1){
            clearInterval(timer);
            element.style.display = "none";
            resolve()
          }
      }, 1000);
  });
}

const start = async () => {
  startElem.style.display = "none";
  startCountElem.style.display = "flex";
  await countdown(3, startCountElem)
  startModalElem.style.display = "none";
  quizManager.updateContents();
  quizManager.changeActivePanel();
  quizManager.qIndex++;
  quizManager.frameUpdateStart();
}

// ゲームで用いる無限ループ
setInterval(() => {
  quizManager.frameUpdate();
}, 10);
