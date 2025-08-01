// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

//questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  //console.log("working debug test");
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //reset the state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex]
  currentQuestionSpan.textContent = currentQuestionIndex + 1

  //update the progress bar

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100
  progressBar.style.width = progressPercent + "%"

  questionText.textContent = currentQuestion.question

  //this answersContainer.innerHTML = ""; avoids the chopices to overflow
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button")
    button.textContent = answer.text
    button.classList.add("answer-btn")

    //dataset is a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct
    button.addEventListener("click", selectAnswer)

    answersContainer.appendChild(button)
  })
}

function selectAnswer(event) {
  //optimization check
  if (answersDisabled) return

  answersDisabled = true

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true"


  //Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the nodelist is not an array that is why wer needed to used the for each method.
  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score
  }

  setTimeout(() => {
    currentQuestionIndex++;
    //check if there are another questions or there are no longer questions in query
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults()
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active")
  resultScreen.classList.add("active")

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You are genuis!"
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great Job! You did well!"
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning ahead!"
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!"
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!"
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active")

  startQuiz();
}