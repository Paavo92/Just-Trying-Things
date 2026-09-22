let questions = [];
let currentQuestion = 0;
let score = 0;
let nextQuestionTimeout;

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
      "<h3 style='color:green'>✅ Correct</h3>";
  }
  else {

    html +=
      "<h3 style='color:red'>❌ Incorrect</h3>";
  }

  html +=
    "<p><strong>Explanation:</strong> " +
    question.explanation +
    "</p>";

  html +=
    "<hr>" +
    "<p>Was this question useful?</p>" +
    "<button onclick='thumbsUp()'>👍 Helpful</button> " +
    "<button onclick='thumbsDown()'>👎 Needs Review</button>";

  document.getElementById("output").innerHTML = html;

  nextQuestionTimeout = setTimeout(moveToNextQuestion, 5000);
}

function moveToNextQuestion() {

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  }
  else {
    showResults();
  }
}

function thumbsUp() {

  clearTimeout(nextQuestionTimeout);

  document.getElementById("output").innerHTML +=
    "<p>👍 Feedback recorded.</p>";

  setTimeout(moveToNextQuestion, 1000);
}

function thumbsDown() {

  clearTimeout(nextQuestionTimeout);

  document.getElementById("output").innerHTML +=
    "<hr>" +
    "<p>Why does this question need review?</p>" +

    "<button onclick=\"submitIssue('Question unclear')\">Question unclear</button><br><br>" +

    "<button onclick=\"submitIssue('Multiple answers seem correct')\">Multiple answers seem correct</button><br><br>" +

    "<button onclick=\"submitIssue('Material did not cover this')\">Material did not cover this</button><br><br>" +

    "<button onclick=\"submitIssue('Typo or factual error')\">Typo or factual error</button><br><br>" +

    "<button onclick=\"submitIssue('Too difficult')\">Too difficult</button>";
}

function submitIssue(reason) {

  console.log(
    "Question Review Requested:",
    questions[currentQuestion].id,
    reason
  );

  document.getElementById("output").innerHTML +=
    "<p>👎 Feedback recorded: " + reason + "</p>";

  setTimeout(moveToNextQuestion, 2000);
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
