let questions = [];
let currentQuestion = 0;
let score = 0;

fetch("data/questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {

  const question = questions[currentQuestion];

  let html =
    "<h2>Question " +
    (currentQuestion + 1) +
    " of " +
    questions.length +
    "</h2>";

  html += "<p>" + question.question + "</p>";

  question.options.forEach(option => {
    html +=
      "<button onclick=\"checkAnswer('" +
      option +
      "')\">" +
      option +
      "</button><br><br>";
  });

  html += "<p>Score: " + score + "</p>";

  document.getElementById("output").innerHTML = html;
}

function checkAnswer(selected) {

  if (selected === questions[currentQuestion].correctAnswer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {

  document.getElementById("output").innerHTML =
    "<h2>Assessment Complete</h2>" +
    "<p>Your score: " +
    score +
    " / " +
    questions.length +
    "</p>";
}
