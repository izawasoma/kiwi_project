const answers = [
  "らいおん",
  "となかい",
  "にわとり",
  "たぬき",
  "かぶとがに",
  "きつね",
  "いのしし",
  "ばった",
  "まぐろ",
  "くじゃく",
  "くも",
  "ちょう",
  "うま",
  "しか",
  "きつね",
];
const lastAnswer = "かたつむり";
const contents = document.querySelectorAll(".question-main .quiz-contents");
if (contents.length != 16) {
  console.error("2st stageに必要な問題のコンテンツが不足しています");
}
const hints = document.querySelectorAll(".hints .hint");
if (hints.length != 15) {
  console.error("2st stageに必要なヒント表示用要素が不足しています");
}
const hint = "選択肢をしりとりで繋いで下さい";
const hintStrings = hint.split("");
const timeLimit = 30;

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
