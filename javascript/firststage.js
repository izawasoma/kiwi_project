const answers = [
  "67",
  "45",
  "345",
  "278",
  "2456",
  "123",
  "158",
  "12456",
  "4567",
  "129",
];
const lastAnswer = "12345";
const contents = document.querySelectorAll(".question-main .quiz-contents");
if (contents.length != 11) {
  console.error("1st stageに必要な問題のコンテンツが不足しています");
}
const hints = document.querySelectorAll(".hints .hint");
if (hints.length != 10) {
  console.error("1st stageに必要なヒント表示用要素が不足しています");
}
const hint = "さいせいボタンつくれ";
const hintStrings = hint.split("");
const timeLimit = 15;

const quizManager = new QuizManager(
  answers,
  contents,
  hints,
  hintStrings,
  lastAnswer,
  correctElem,
  uncorrectElem,
  questionTimer,
	inputAnswer,
  timeLimit,
);
