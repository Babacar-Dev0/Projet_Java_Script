/*
  Principe de l'application :
  Un quiz à choix multiples. Les questions et réponses sont stockées dans
  un tableau d'objets JavaScript (données statiques). L'utilisateur clique
  sur une réponse : l'application vérifie si elle est correcte (structure
  conditionnelle), met à jour le score, puis affiche la question suivante
  (boucle sur le tableau via un index). À la fin, le score final s'affiche
  avec la possibilité de recommencer.

  Comment l'utiliser :
  Ouvrir index.html dans un navigateur, cliquer sur une réponse pour chaque
  question, puis cliquer sur "Question suivante" jusqu'à la fin du quiz.
*/

// ----- Données statiques : tableau d'objets -----
const questions = [
  {
    question: "Quel langage est utilisé pour manipuler le DOM ?",
    answers: ["HTML", "CSS", "JavaScript", "SQL"],
    correctIndex: 2
  },
  {
    question: "Quelle méthode permet de sélectionner un élément par son id ?",
    answers: [
      "document.getElementById()",
      "document.querySelectorClass()",
      "document.findById()",
      "document.selectId()"
    ],
    correctIndex: 0
  },
  {
    question: "Quel mot-clé permet de déclarer une variable modifiable en JS moderne ?",
    answers: ["const", "var", "let", "def"],
    correctIndex: 2
  },
  {
    question: "Quelle boucle est adaptée pour parcourir un tableau ?",
    answers: ["if...else", "for", "switch", "try...catch"],
    correctIndex: 1
  },
  {
    question: "Quel événement se déclenche lors d'un clic sur un bouton ?",
    answers: ["hover", "submit", "click", "load"],
    correctIndex: 2
  }
];

// ----- État de l'application -----
let currentIndex = 0;
let score = 0;
let answered = false;

// ----- Références DOM -----
const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// ----- Fonctions -----

// Affiche la question courante et génère les boutons de réponse (boucle)
function renderQuestion() {
  answered = false;
  feedback.textContent = "";
  nextBtn.classList.add("hidden");

  const current = questions[currentIndex];
  questionCounter.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  questionText.textContent = current.question;

  answersContainer.innerHTML = ""; // on vide les anciennes réponses

  for (let i = 0; i < current.answers.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = current.answers[i];
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => handleAnswer(i, btn));
    answersContainer.appendChild(btn);
  }
}

// Gère le clic sur une réponse (événement + condition)
function handleAnswer(selectedIndex, btnElement) {
  if (answered) return; // on empêche de répondre plusieurs fois
  answered = true;

  const current = questions[currentIndex];
  const allButtons = answersContainer.querySelectorAll(".answer-btn");

  if (selectedIndex === current.correctIndex) {
    score++;
    btnElement.classList.add("correct");
    feedback.textContent = "Bonne réponse !";
    feedback.style.color = "#34a853";
  } else {
    btnElement.classList.add("incorrect");
    allButtons[current.correctIndex].classList.add("correct");
    feedback.textContent = "Mauvaise réponse.";
    feedback.style.color = "#e74c3c";
  }

  // On désactive tous les boutons après la réponse
  allButtons.forEach(b => b.disabled = true);

  nextBtn.classList.remove("hidden");
}

// Passe à la question suivante ou affiche le score final
function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// Affiche l'écran de résultat final
function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreText.textContent = `Votre score : ${score} / ${questions.length}`;
}

// Réinitialise le quiz
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

// ----- Écouteurs d'événements -----
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

// ----- Démarrage de l'application -----
renderQuestion();