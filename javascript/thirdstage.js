const answers = [
  "すないぱー",
  "たいやき",
  "つくりたて",
  "ちらしずし",
  "はんこうき",
  "くしかつ",
  "わくちん",
  "れいぞうこ",
  "たまいれ",
  "えいかいわ",
  "ねつききゅう",
  "たんすいかぶつ",
  "はんどめいど",
  "かいてんとびら",
  "こしたんたん",
];
const lastAnswer = "ねくすと";
const contents = document.querySelectorAll(".question-main .quiz-contents");
if (contents.length != 16) {
  console.error("2st stageに必要な問題のコンテンツが不足しています");
}
const hints = document.querySelectorAll(".hints .hint");
if (hints.length != 15) {
  console.error("2st stageに必要なヒント表示用要素が不足しています");
}
const hint = "赤が紅を指す時青が指す言葉は何";
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
