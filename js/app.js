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

  let message = "";

  if (selected === questions[currentQuestion].correctAnswer) {
    score++;
    message =
      "<h3 style='color:green'>Correct!</h3>";
  } else {
    message =
      "<h3 style='color:red'>Incorrect!</h3>" +
      "<p>Correct answer: " +
      questions[currentQuestion].correctAnswer +
      "</p>";
  }

  document.getElementById("output").innerHTML = message;

  setTimeout(() => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResults();
    }

  }, 3000);
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
