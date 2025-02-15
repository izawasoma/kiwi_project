class QuizManager {
  answers = [];
  lastAnswer = "";
  contents = [];
  hintBoxs = [];
  hintStrings = [];
  qIndex = -1;
  qLen = 0;
  state = 0; // 0: パネルクイズ中, 1: メインクイズ中, 2: AllOver
  correctElem = null;
  uncorrectElem = null;
  questionTimer = null;
  inputAnswer = null;
  frame = 0;
  sec = 0;
  timeLimit = 0;
  updateFrameFlag = false; // trueのとき、frameの更新処理を行う。

  constructor(
    answers,
    contents,
    hintBoxs,
    hintStrings,
    lastAnswer,
    correctElem,
    uncorrectElem,
    questionTimer,
    inputAnswer,
    timeLimit
  ) {
    this.answers = answers;
    this.contents = contents;
    this.hintBoxs = hintBoxs;
    this.hintStrings = hintStrings;
    this.qLen = answers.length;
    this.lastAnswer = lastAnswer;
    this.correctElem = correctElem;
    this.uncorrectElem = uncorrectElem;
    this.questionTimer = questionTimer;
    this.inputAnswer = inputAnswer;
    this.timeLimit = timeLimit;
    this.sec = timeLimit;
  }

  // 判定ボタンを押した時の処理
  onClickJudge = async (value) => {
    // フレーム更新の停止
    this.frameUpdateStop();
    // すでにクリア状態の場合何もしない
    if (this.state != 0 && this.state != 1) {
      return;
    }
    // 判定
    const isCorrect = this.judge(value);
    // アニメーション再生
    if (isCorrect) {
      await this.showCorrectAnimation();
    } else {
      await this.showUncorrectAnimation();
    }
    // 次の問題への処理
    if (this.state == 0) {
      // 文字パネルの変更とコンテンツの更新
      if (isCorrect) {
        this.changeCorrectPanel();
      } else {
        this.changeUncorrectPanel();
      }
      if (this.qIndex <= this.qLen - 2) {
        this.updateContents();
        this.changeActivePanel();
        this.qIndex++;
        // タイマーの初期化
        this.initializeTimer();
        // 回答フォームから文字を削除
        this.inputAnswer.value = "";
        // フレーム更新の再開
        this.frameUpdateStart();
      } else if (this.qIndex == this.qLen - 1) {
				this.updateContents();
        // 最後の問題であれば、ステータスを更新
        this.state = 1;
        this.frameUpdateStop();
        // タイマーを削除
        this.hideTimer();
      }
    } else {
      console.log("こっちです。");
    }
  };

  onTimeUp = async () => {
    if (this.state != 0) {
      console.error("タイマーが動作していない状況でonTimeUpを呼び出しました。");
      return;
    }
    // フレーム更新の停止
    this.frameUpdateStop();
    if (this.state != 0) {
      this.frameUpdateStart();
      return;
    }
    // アニメーション再生
    await this.showUncorrectAnimation();
    // 次の問題へ
    this.changeUncorrectPanel();
    if (this.qIndex <= this.qLen - 2) {
      this.updateContents();
      this.changeActivePanel();
      this.qIndex++;
      // タイマーの初期化
      this.initializeTimer();
      // 回答フォームから文字を削除
      this.inputAnswer.value = "";
      // フレーム更新の再開
      this.frameUpdateStart();
    } else if (this.qIndex == this.qLen - 1) {
			this.updateContents();
      // 最後の問題であれば、ステータスを更新
      this.state = 1;
      this.frameUpdateStop();
      // タイマーを削除
      this.hideTimer();
    }
  };

  // 問題の正誤判定
  judge = (value) => {
    if (this.state == 0) {
      return this.answers[this.qIndex] == value;
    } else if (this.state == 1) {
      return this.lastAnswer == value;
    }
  };

  // コンテンツの切り替え
  updateContents = () => {
    if(this.contents[this.qIndex] != null){
      this.contents[this.qIndex].classList.remove("active");
      this.contents[this.qIndex].classList.add("inactive");
    }
    if(this.contents[this.qIndex + 1] != null){
      this.contents[this.qIndex + 1].classList.remove("inactive");
      this.contents[this.qIndex + 1].classList.add("active");
    }
  };
  // ヒントの表示切り替え
  // 「活性」=>「正解」
  changeCorrectPanel = () => {
    if(this.hintBoxs[this.qIndex] != null){
      this.hintBoxs[this.qIndex].classList.remove("active");
      this.hintBoxs[this.qIndex].classList.add("open");
      this.hintBoxs[this.qIndex].textContent = hintStrings[this.qIndex];
    }
  };

  // 「活性」=>「不正解」
  changeUncorrectPanel = () => {
    if(this.hintBoxs[this.qIndex] != null){
      this.hintBoxs[this.qIndex].classList.remove("active");
      this.hintBoxs[this.qIndex].classList.add("unopen");
      this.hintBoxs[this.qIndex].textContent = "×";
    }
  };

  // 「非活性」=>「活性」
  changeActivePanel = () => {
    if(this.hintBoxs[this.qIndex + 1] != null){
      this.hintBoxs[this.qIndex + 1].classList.remove("unactive");
      this.hintBoxs[this.qIndex + 1].classList.add("active");
    }
  };

  // アニメーションを再生する
  showCorrectAnimation = async () => {
    this.correctElem.style.display = "block";
    this.correctElem.classList.add("animate");
    await delay(1500);
    this.correctElem.classList.remove("animate");
    this.correctElem.classList.add("animateRemove");
    await delay(1000);
    this.correctElem.classList.remove("animateRemove");
    this.correctElem.style.display = "none";
  };

  showUncorrectAnimation = async () => {
    this.uncorrectElem.style.display = "block";
    this.uncorrectElem.classList.add("animate");
    await delay(800);
    this.uncorrectElem.classList.remove("animate");
    this.uncorrectElem.style.display = "none";
  };

  // タイマー関連

  // 円形タイマー描写
  timerDraw = () => {
    const deg = (360 / 100) * this.frame;
    questionTimer.style.background = `conic-gradient(transparent ${deg}deg, #3EB3CB ${deg}deg)`;
  };

  // 描画する秒数
  timeSecUpdate = async () => {
    if (this.frame >= 100) {
      this.sec--;
      if (this.sec <= 0) {
        this.questionTimer.textContent = this.sec;
        this.sec = this.timeLimit;
        await quizManager.onTimeUp();
      }
      this.questionTimer.textContent = this.sec;
    }
  };

  frameUpdate = () => {
    if (!this.updateFrameFlag || this.state != 0) {
      return;
    }
    if (this.frame >= 100) {
      this.frame = 0;
    } else {
      this.frame += 1;
    }
    this.timerDraw();
    this.timeSecUpdate();
  };

  frameUpdateStart = () => {
    this.updateFrameFlag = true;
  };

  frameUpdateStop = () => {
    this.updateFrameFlag = false;
  };

  initializeTimer = () => {
    this.sec = this.timeLimit;
    this.frame = 0;
    this.questionTimer.textContent = this.sec;
    this.timerDraw();
  };

  hideTimer = () => {
    this.questionTimer.style.display = "none";
  }
}

// ディレイ処理
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
