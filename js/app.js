fetch("data/questions.json")
  .then(response => response.json())
  .then(questions => {

    const question = questions[0];

    let html = "<h2>" + question.question + "</h2>";

    question.options.forEach(option => {
      html +=
        "<button onclick=\"checkAnswer('" +
        option +
        "')\">" +
        option +
        "</button><br><br>";
    });

    html += "<div id='result'></div>";

    document.getElementById("output").innerHTML = html;

    window.correctAnswer = question.correctAnswer;
  });

function checkAnswer(selected) {

  if (selected === window.correctAnswer) {
    document.getElementById("result").innerHTML =
      "<h3 style='color:green'>Correct!</h3>";
  } else {
    document.getElementById("result").innerHTML =
      "<h3 style='color:red'>Incorrect!</h3>" +
      "<p>Correct answer: " + window.correctAnswer + "</p>";
  }
}
