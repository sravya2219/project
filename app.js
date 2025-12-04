const questions = [
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<p>"],
    answer: 1
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: 2
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string", "num"],
    answer: 0
  }
];

let index = 0;
let score = 0;

function loadQuestion() {
  const q = questions[index];
  const questionEl = document.getElementById("question");
  const optionsList = document.getElementById("options-list");

  questionEl.textContent = q.question;
  optionsList.innerHTML = "";  // clear old options

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");

    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = i;

    label.appendChild(input);

    const span = document.createTextNode(opt);
    label.appendChild(span);

    li.appendChild(label);
    optionsList.appendChild(li);
  });
}

document.getElementById("next-btn").addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  if (parseInt(selected.value) === questions[index].answer) {
    score++;
  }

  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");

  document.getElementById("score").textContent = score;
  let highScore = Number(localStorage.getItem("highScore")) || 0;
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = score;
  }
  document.getElementById("high-score").textContent = highScore;
}

document.getElementById("restart-btn").addEventListener("click", () => {
  index = 0;
  score = 0;
  document.getElementById("result-box").classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  loadQuestion();
});

// Ensure quiz loads after DOM is ready
window.addEventListener("DOMContentLoaded", loadQuestion);
