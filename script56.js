// DOM Elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const restartBtn = document.querySelector(".buttons .restart");
const quitBtn = document.querySelector(".buttons .quit");
const nextBtn = document.querySelector(".next_btn");
const queText = document.querySelector(".que_text");
const optionList = document.querySelector(".option_list");
const timerSec = document.querySelector(".timer_sec");
const totalQue = document.querySelector(".total_que span");
const scoreText = document.querySelector(".score_text span p");
const timeoutSound = document.getElementById("timeoutSound");
const bg = document.getElementById("bgMusic");

let currentQue = 0;
let score = 0;
let counter;
let timeValue = 15;

// Questions Array
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS",
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django",
  },
  {
    question: "Which is used for Connect To Database?",
    options: ["PHP", "HTML", "JS", "All"],
    answer: "PHP",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
];

// Start Quiz
startBtn.onclick = () => {
  infoBox.style.opacity = "1";
  infoBox.style.pointerEvents = "auto";
  bg.currentTime = 0;
  bg.play();
  bg.volume = 0.5;
};

// Continue Quiz
restartBtn.onclick = () => {
  infoBox.style.opacity = "0";
  infoBox.style.pointerEvents = "none";
  //  resultBox.style.opacity = "0";
  // resultBox.style.pointerEvents = "none";
  quizBox.style.opacity = "1";
  quizBox.style.pointerEvents = "auto";
  currentQue = 0;
  score = 0;
  showQuestion(currentQue);
  startTimer(timeValue);
  nextBtn.style.display = "none";
};
// Quit Quiz
quitBtn.onclick = () => {
  window.location.reload();
};

// Show Question
function showQuestion(index) {
  queText.innerHTML = `<span>${questions[index].question}</span>`;
  optionList.innerHTML = "";
  questions[index].options.forEach((option) => {
    let opt = document.createElement("div");
    opt.className = "option";
    opt.innerHTML = `<span>${option}</span>`;
    opt.onclick = () => optionSelected(opt);
    optionList.appendChild(opt);
  });
  totalQue.innerHTML = `<p>${index + 1}</p>of<p>${
    questions.length
  }</p>Questions`;
}

// Option Selected
function optionSelected(answer) {
  clearInterval(counter);
  let userAns = answer.textContent.trim();
  let correctAns = questions[currentQue].answer;
  if (userAns === correctAns) {
    score++;
    answer.style.backgroundColor = "#6eee8cff";
    answer.style.borderColor = "#078324ff";
  } else {
    answer.style.backgroundColor = "#f8d7da";
    answer.style.borderColor = "#dc3545";
  }

  // Disable all options
  let allOptions = optionList.children;
  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].style.pointerEvents = "none";
    if (allOptions[i].textContent.trim() === correctAns) {
      allOptions[i].style.backgroundColor = "#6eee8cff";
      allOptions[i].style.borderColor = "#078324ff";
    }
  }

  nextBtn.style.display = "block";
}

// Next Question
nextBtn.onclick = () => {
  currentQue++;
  if (currentQue < questions.length) {
    showQuestion(currentQue);
    clearInterval(counter);
    startTimer(timeValue);
    nextBtn.style.display = "none";
  } else {
    // clearInterval(counter);
    showResult();
  }
  console.log("Current Question Index:", currentQue);
  console.log("Score:", score);
};

// Timer Function
function startTimer(time) {
  timerSec.textContent = time;
  counter = setInterval(() => {
    time--;
    timerSec.textContent = time;
    //play tick sound
    /* tickSound.currentTime = 0;
    tickSound.play();

    if (time > 0) {
      tickSound.currentTime = 0;
      tickSound.play();
    }*/

    if (time <= 0) {
      clearInterval(counter);
      timerSec.textContent = "0";
      //timeout sound
      timeoutSound.currentTime = 0;
      timeoutSound.play();
      //tickSound.pause();
      //tickSound.currentTime = 0;

      //timeoutSound.currentTime = 0;
      //timeoutSound.play();

      autoSelect();
    }
  }, 1000);
}

// Auto Select when time runs out
function autoSelect() {
  let correctAns = questions[currentQue].answer;
  let allOptions = optionList.children;
  for (let i = 0; i < allOptions.length; i++) {
    if (allOptions[i].textContent.trim() === correctAns) {
      allOptions[i].style.backgroundColor = "#6eee8cff";
      allOptions[i].style.borderColor = "#078324ff";
    }
    allOptions[i].style.pointerEvents = "none";
  }
  nextBtn.style.display = "block";
}

// Show Result
function showResult() {
  quizBox.style.opacity = "0";
  quizBox.style.pointerEvents = "none";
  resultBox.style.opacity = "1";
  resultBox.style.pointerEvents = "auto";
  scoreText.textContent = `${score}`;
  resultBox.querySelector(
    ".score_text span"
  ).innerHTML = `You got <p>${score}</p>out of <p>${questions.length}</p>`;
}
