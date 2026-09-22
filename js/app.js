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

  let question = questions[currentQuestion];

  let html =
    "<h2>Question " +
    (currentQuestion + 1) +
    " of " +
    questions.length +
    "</h2>";

  html += "<p>" + question.question + "</p>";

  question.options.forEach(option => {

    let color = "";

    if (option === question.correctAnswer) {
      color = "background-color: lightgreen;";
    }

    if (
      option === selected &&
      selected !== question.correctAnswer
    ) {
      color = "background-color: salmon;";
    }

    html +=
      "<button style='" +
      color +
      "' disabled>" +
      option +
      "</button><br><br>";
  });

  if (selected === question.correctAnswer) {

    score++;

    html +=
      "<h3 style='color:green'>Correct!</h3>";
  }
  else {

    html +=
      "<h3 style='color:red'>Incorrect!</h3>";
  }

  html +=
    "<p><strong>Explanation:</strong> " +
    question.explanation +
    "</p>";

  html +=
    "<p>Next question in 3 seconds...</p>";

  document.getElementById("output").innerHTML = html;

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
