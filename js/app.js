fetch("data/questions.json")
  .then(response => response.json())
  .then(questions => {

    console.log(questions);

    const question = questions[0];

    let html = "<h2>" + question.question + "</h2>";

    for (let i = 0; i < question.options.length; i++) {

      html += "<button onclick=\"checkAnswer('" +
        question.options[i] +
        "','" +
        question.correctAnswer +
        "')\">";

      html += question.options[i];
      html += "</button><br><br>";
    }

    html += "<div id='result'></div>";

    document.getElementById("output").innerHTML = html;
  });

function checkAnswer(selected, correct) {

  if (selected === correct) {
    document.getElementById("result").innerHTML =
      "<h3>Correct!</h3>";
  } else {
    document.getElementById("result").innerHTML =
      "<h3>Incorrect!</h3><p>Correct answer: " + correct + "</p>";
  }
}
