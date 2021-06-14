const questions = [
  {
    question: "Who created JavaScript programming language?",
    answers: [
      { text: "Anders Hejlsberg", correct: false },
      { text: "Rasmus Lerdorf", correct: false },
      { text: "Brendan Eich", correct: true },
      { text: "Guido van Rossum", correct: false },
    ],
  },
  {
    question: "What does NaN === NaN return in the console?",
    answers: [
      { text: "false", correct: true },
      { text: "true", correct: false },
      { text: "undefined", correct: false },
      { text: "null", correct: false },
    ],
  },
  {
    question: "What does Math.max() > Math.min() return in the console?",
    answers: [
      { text: "Infinity", correct: false },
      { text: "-Infinity", correct: false },
      { text: "true", correct: false },
      { text: "false", correct: true },
    ],
  },
  {
    question: "What does the following code return? [1, 5, 10, 20].sort()",
    answers: [
      { text: "[1, 5, 10, 20]", correct: false },
      { text: "[1, 10, 5, 20]", correct: false },
      { text: "[1, 10, 5, 20]", correct: false },
      { text: "[1, 10, 20, 5]", correct: true },
    ],
  },
  {
    question: "What does the following code return in console? '1' + 2 + 3",
    answers: [
      { text: "6", correct: false },
      { text: "123", correct: true },
      { text: "15", correct: false },
      { text: "error", correct: false },
    ],
  },
];

const timerElement = document.querySelector("#setTimer");
const questionElement = document.querySelector("#question-content");
const answerButtons = document.querySelector("#answer-btns");
const scoreElement = document.querySelector("#setScore");
let shuffledQuestions;
let currentQuestionIndex;
let score = 0;
let finalScore = 0;
let timeLeft = 30;
const playBtn = document.querySelector("#play-btn");

function setTimer() {
  let timeInterval = setInterval(function () {
    timerElement.innerHTML = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      timeLeft = 0;
      timerElement.innerHTML = timeLeft;
      clearInterval(timeInterval);
      finaliseGame();
    }
  }, 1000);
}

function shuffleQuestions(questions) {
  let clonedQuestions = JSON.parse(JSON.stringify(questions));
  let result = [];
  for (let i = questions.length - 1; i >= 0; i--) {
    let chosenIndex = Math.floor(Math.random() * i);
    let chosenQuestion = clonedQuestions[chosenIndex];
    result.push(chosenQuestion);
    clonedQuestions.splice(chosenIndex, 1);
  }
  return result;
}

function setNextQuestion() {
  resetPage();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerHTML = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", matchAnswer, { once: true });
    answerButtons.appendChild(button);
  });
}

function resetPage() {
  answerButtons.innerHTML = "";
  questionElement.innerHTML = "";
}

function matchAnswer(e) {
  const buttonPressed = e.target;
  if (buttonPressed.dataset.correct) {
    scoreManager("add");
  } else {
    scoreManager("subtract");
  }
}

function scoreManager(message) {
  if (message === "add") {
    score += 5;
    scoreElement.innerHTML = score;
  } else {
    timeLeft -= 10;
    if (timeLeft <= 0) {
      timeLeft = 0;
    }
  }
  setQuestionAction();
}

function setQuestionAction() {
  if (currentQuestionIndex < 4) {
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    finaliseGame();
  }
}

function finaliseGame() {
  finalScore = score + timeLeft * 5;
  localStorage.setItem("javaScrizzPlayer", finalScore);
  window.location.assign("./leader.html");
}

function gameInit() {
  playBtn.classList.add("hide");
  shuffledQuestions = shuffleQuestions(questions);
  currentQuestionIndex = 0;
  setTimer();
  setNextQuestion();
}
playBtn.addEventListener("click", gameInit);
