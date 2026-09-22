fetch("data/questions.json")
  .then(response => response.json())
  .then(questions => {

    const question = questions[0];

    let html = `
      <h2>${question.question}</h2>
    `;

    question.options.forEach(option => {
      html += `
        <button onclick="checkAnswer('${option}', '${question.correctAnswer}')">
          ${option}
        </button>
        <br><br>
      `;
    });

    html += `
      <div id="result"></div>
    `;

    document.getElementById("output").innerHTML = html;
  });

function checkAnswer(selected, correct) {

  const result = document.getElementById("result");

  if (selected === correct) {
    result.innerHTML = "<h3 style='color:green;'>Correct!</h3>";
  } else {
    result.innerHTML = `
      <h3 style='color:red;'>Incorrect!</h3>
      <p>Correct answer: ${correct}</p>
    `;
  }
}
