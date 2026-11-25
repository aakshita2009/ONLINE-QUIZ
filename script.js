const QUESTIONS_DATA = [
  // Web Development
  {
    topic: "web",
    topicLabel: "Web Development",
    question: "Which HTML5 tag is meant for standalone, self-contained content like a blog post?",
    options: ["<section>", "<article>", "<div>", "<aside>"],
    correctIndex: 1,
    explanation: "<article> represents independent, self-contained content that can be distributed separately."
  },
  {
    topic: "web",
    topicLabel: "Web Development",
    question: "Which CSS layout module is designed specifically for two-dimensional rows and columns?",
    options: ["Flexbox", "CSS Grid", "Float", "Inline-Block"],
    correctIndex: 1,
    explanation: "CSS Grid handles both rows and columns simultaneously, making it two-dimensional."
  },
  {
    topic: "web",
    topicLabel: "Web Development",
    question: "What does `Array.prototype.map()` return in JavaScript?",
    options: [
      "The first matching element",
      "A boolean value",
      "A new array populated with transformed elements",
      "The length of the original array"
    ],
    correctIndex: 2,
    explanation: "map() creates and returns a new array by calling a function on every element in the calling array."
  },
  {
    topic: "web",
    topicLabel: "Web Development",
    question: "Which HTTP status code indicates that a resource was successfully created?",
    options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
    correctIndex: 1,
    explanation: "HTTP 201 Created indicates that the request succeeded and led to the creation of a resource."
  },
  {
    topic: "web",
    topicLabel: "Web Development",
    question: "Which Web Storage object persists data even after the browser window is closed?",
    options: ["sessionStorage", "localStorage", "tempStorage", "cacheMemory"],
    correctIndex: 1,
    explanation: "localStorage stores key-value pairs with no expiration date across browser sessions."
  },

  // Science & Biotech
  {
    topic: "science",
    topicLabel: "Science & Biotech",
    question: "Which thermostable DNA polymerase is standardly used in Polymerase Chain Reaction (PCR)?",
    options: ["DNA Ligase", "Taq Polymerase", "Reverse Transcriptase", "RNA Polymerase II"],
    correctIndex: 1,
    explanation: "Taq polymerase, isolated from Thermus aquaticus, withstands the high denaturation temperatures of PCR."
  },
  {
    topic: "science",
    topicLabel: "Science & Biotech",
    question: "In bacterial genetics, which replication cycle integrates viral DNA into the host genome?",
    options: ["Lytic cycle", "Lysogenic cycle", "Binary fission", "Conjugation"],
    correctIndex: 1,
    explanation: "During the lysogenic cycle, phage DNA integrates into the host chromosome as a prophage."
  },
  {
    topic: "science",
    topicLabel: "Science & Biotech",
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctIndex: 2,
    explanation: "Nitrogen makes up roughly 78% of Earth's atmosphere."
  },
  {
    topic: "science",
    topicLabel: "Science & Biotech",
    question: "Which organelle modifies, sorts, and packages proteins for secretion?",
    options: ["Mitochondria", "Golgi Apparatus", "Lysosome", "Peroxisome"],
    correctIndex: 1,
    explanation: "The Golgi apparatus processes and packages proteins and lipids synthesized in the endoplasmic reticulum."
  },
  {
    topic: "science",
    topicLabel: "Science & Biotech",
    question: "What is the pH of pure water at 25°C?",
    options: ["5.5", "7.0", "8.2", "6.8"],
    correctIndex: 1,
    explanation: "Pure water has an equal concentration of H+ and OH- ions at 25°C, giving a neutral pH of 7.0."
  },

  // General Knowledge
  {
    topic: "general",
    topicLabel: "General Knowledge",
    question: "Which river is the longest in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correctIndex: 1,
    explanation: "The Nile River in northeastern Africa is traditionally recognized as the longest river at ~6,650 km."
  },
  {
    topic: "general",
    topicLabel: "General Knowledge",
    question: "In which year did the World Wide Web become publicly available?",
    options: ["1985", "1991", "1996", "2000"],
    correctIndex: 1,
    explanation: "Tim Berners-Lee made the World Wide Web publicly accessible in August 1991."
  },
  {
    topic: "general",
    topicLabel: "General Knowledge",
    question: "Which country has the largest land area in the world?",
    options: ["Canada", "China", "United States", "Russia"],
    correctIndex: 3,
    explanation: "Russia spans over 17 million square kilometers across Eastern Europe and Northern Asia."
  },
  {
    topic: "general",
    topicLabel: "General Knowledge",
    question: "What is the currency of Japan?",
    options: ["Won", "Yuan", "Yen", "Ringgit"],
    correctIndex: 2,
    explanation: "The Japanese Yen (JPY) is the official currency of Japan."
  },
  {
    topic: "general",
    topicLabel: "General Knowledge",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    correctIndex: 1,
    explanation: "Mars appears reddish due to iron oxide (rust) prevalent on its surface."
  }
];

// DOM References
const setupForm = document.getElementById("quiz-setup-form");
const playerNameInput = document.getElementById("player-name");
const topicSelect = document.getElementById("topic-select");
const timeSelect = document.getElementById("time-select");

const setupPanel = document.getElementById("setup-panel");
const activeQuizPanel = document.getElementById("active-quiz-panel");
const resultsPanel = document.getElementById("results-panel");

const qProgressText = document.getElementById("q-progress-text");
const qTopicTag = document.getElementById("q-topic-tag");
const timerDisplay = document.getElementById("timer-display");
const progressFill = document.getElementById("progress-fill");
const questionTitle = document.getElementById("question-title");
const choicesList = document.getElementById("choices-list");
const answerExplanation = document.getElementById("answer-explanation");
const scoreCounter = document.getElementById("score-counter");
const nextQuestionBtn = document.getElementById("next-question-btn");

const medalIcon = document.getElementById("medal-icon");
const congratsHeading = document.getElementById("congrats-heading");
const summarySubtitle = document.getElementById("summary-subtitle");
const resScore = document.getElementById("res-score");
const resAccuracy = document.getElementById("res-accuracy");
const resDuration = document.getElementById("res-duration");
const reviewContainer = document.getElementById("review-container");
const retakeBtn = document.getElementById("retake-btn");
const newSetupBtn = document.getElementById("new-setup-btn");
const leaderboardBody = document.getElementById("leaderboard-body");

// State
let currentQuestions = [];
let questionIdx = 0;
let currentScore = 0;
let secondsPerQuestion = 25;
let secondsLeft = 25;
let countdownTimer = null;
let startTimestamp = 0;
let participantName = "Guest";
let selectedTopicLabel = "All Subjects";
let attemptLog = [];

const STORAGE_KEY = "quizverse_leaderboard_v1";

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function launchQuiz() {
  participantName = playerNameInput.value.trim() || "Guest";
  const topicValue = topicSelect.value;
  secondsPerQuestion = parseInt(timeSelect.value, 10);

  if (topicValue === "all") {
    currentQuestions = shuffle(QUESTIONS_DATA).slice(0, 10);
    selectedTopicLabel = "All Subjects";
  } else {
    currentQuestions = shuffle(QUESTIONS_DATA.filter((item) => item.topic === topicValue));
    selectedTopicLabel = currentQuestions[0]?.topicLabel || topicValue;
  }

  questionIdx = 0;
  currentScore = 0;
  attemptLog = [];
  startTimestamp = Date.now();
  scoreCounter.textContent = "0";

  setupPanel.classList.add("hidden");
  resultsPanel.classList.add("hidden");
  activeQuizPanel.classList.remove("hidden");

  loadCurrentQuestion();
}

function loadCurrentQuestion() {
  clearInterval(countdownTimer);
  answerExplanation.classList.add("hidden");
  nextQuestionBtn.disabled = true;

  const item = currentQuestions[questionIdx];
  const total = currentQuestions.length;

  qProgressText.textContent = `Question ${questionIdx + 1} of ${total}`;
  qTopicTag.textContent = item.topicLabel;
  questionTitle.textContent = item.question;
  progressFill.style.width = `${((questionIdx + 1) / total) * 100}%`;
  nextQuestionBtn.textContent = questionIdx === total - 1 ? "Submit Quiz ✓" : "Next Question →";

  choicesList.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  item.options.forEach((choiceText, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.innerHTML = `<span class="choice-letter">${letters[index]}</span><span>${escapeHtml(choiceText)}</span>`;
    button.addEventListener("click", () => selectChoice(index));
    choicesList.appendChild(button);
  });

  beginCountdown();
}

function beginCountdown() {
  secondsLeft = secondsPerQuestion;
  timerDisplay.textContent = `⏱ ${secondsLeft}s`;
  timerDisplay.classList.remove("low-time");

  countdownTimer = setInterval(() => {
    secondsLeft--;
    timerDisplay.textContent = `⏱ ${secondsLeft}s`;

    if (secondsLeft <= 5) {
      timerDisplay.classList.add("low-time");
    }

    if (secondsLeft <= 0) {
      clearInterval(countdownTimer);
      handleTimeExpired();
    }
  }, 1000);
}

function selectChoice(chosenIndex) {
  clearInterval(countdownTimer);
  const item = currentQuestions[questionIdx];
  const buttons = choicesList.querySelectorAll(".choice-btn");
  const isRight = chosenIndex === item.correctIndex;

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === item.correctIndex) {
      btn.classList.add("correct");
    } else if (idx === chosenIndex && !isRight) {
      btn.classList.add("incorrect");
    }
  });

  if (isRight) {
    currentScore++;
    scoreCounter.textContent = currentScore;
    displayExplanation(`Correct! ${item.explanation}`, "success");
  } else {
    displayExplanation(`Incorrect. ${item.explanation}`, "error");
  }

  attemptLog.push({
    question: item.question,
    chosen: item.options[chosenIndex],
    correct: item.options[item.correctIndex],
    passed: isRight
  });

  nextQuestionBtn.disabled = false;
}

function handleTimeExpired() {
  const item = currentQuestions[questionIdx];
  const buttons = choicesList.querySelectorAll(".choice-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === item.correctIndex) {
      btn.classList.add("correct");
    }
  });

  displayExplanation(`Time expired! Correct answer: ${item.options[item.correctIndex]}.`, "error");

  attemptLog.push({
    question: item.question,
    chosen: "No response (Time expired)",
    correct: item.options[item.correctIndex],
    passed: false
  });

  nextQuestionBtn.disabled = false;
}

function displayExplanation(text, variant) {
  answerExplanation.textContent = text;
  answerExplanation.className = `explanation-box ${variant}`;
}

function advanceQuiz() {
  questionIdx++;
  if (questionIdx < currentQuestions.length) {
    loadCurrentQuestion();
  } else {
    finalizeQuiz();
  }
}

function finalizeQuiz() {
  clearInterval(countdownTimer);
  activeQuizPanel.classList.add("hidden");
  resultsPanel.classList.remove("hidden");

  const total = currentQuestions.length;
  const accuracy = Math.round((currentScore / total) * 100);
  const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTimestamp) / 1000));

  resScore.textContent = `${currentScore} / ${total}`;
  resAccuracy.textContent = `${accuracy}%`;
  resDuration.textContent = `${elapsedSeconds}s`;

  if (accuracy >= 80) {
    medalIcon.textContent = "🏆";
    congratsHeading.textContent = `Outstanding work, ${participantName}!`;
    summarySubtitle.textContent = "You achieved a top score on this quiz.";
  } else if (accuracy >= 50) {
    medalIcon.textContent = "🎯";
    congratsHeading.textContent = `Well done, ${participantName}!`;
    summarySubtitle.textContent = "Review the missed questions below to aim for 100%.";
  } else {
    medalIcon.textContent = "📘";
    congratsHeading.textContent = `Good effort, ${participantName}!`;
    summarySubtitle.textContent = "Check the explanations below and try again.";
  }

  reviewContainer.innerHTML = "";
  attemptLog.forEach((entry, idx) => {
    const card = document.createElement("div");
    card.className = `review-card ${entry.passed ? "pass" : "fail"}`;
    card.innerHTML = `
      <div><strong>${idx + 1}. ${escapeHtml(entry.question)}</strong></div>
      <div>Your response: ${escapeHtml(entry.chosen)} ${
      entry.passed ? "✓" : `| Correct: <strong>${escapeHtml(entry.correct)}</strong>`
    }</div>
    `;
    reviewContainer.appendChild(card);
  });

  saveToLeaderboard({
    name: participantName,
    subject: selectedTopicLabel,
    scoreText: `${currentScore}/${total}`,
    accuracy
  });
}

function saveToLeaderboard(record) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  existing.push(record);
  existing.sort((a, b) => b.accuracy - a.accuracy);
  const topFive = existing.slice(0, 5);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topFive));
  renderLeaderboard();
}

function renderLeaderboard() {
  const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (records.length === 0) {
    leaderboardBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-row">No quiz attempts recorded yet. Complete a quiz to appear here!</td>
      </tr>
    `;
    return;
  }

  leaderboardBody.innerHTML = records
    .map(
      (row, idx) => `
      <tr>
        <td>#${idx + 1}</td>
        <td><strong>${escapeHtml(row.name)}</strong></td>
        <td>${escapeHtml(row.subject)}</td>
        <td>${escapeHtml(row.scoreText)}</td>
        <td>${row.accuracy}%</td>
      </tr>
    `
    )
    .join("");
}

// Event Listeners
setupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  launchQuiz();
});

nextQuestionBtn.addEventListener("click", advanceQuiz);

retakeBtn.addEventListener("click", launchQuiz);

newSetupBtn.addEventListener("click", () => {
  resultsPanel.classList.add("hidden");
  setupPanel.classList.remove("hidden");
});

document.querySelectorAll(".select-topic-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    topicSelect.value = btn.dataset.topic;
    document.getElementById("quiz-portal").scrollIntoView({ behavior: "smooth" });
    playerNameInput.focus();
  });
});

// Initialize Leaderboard on Page Load
renderLeaderboard();
