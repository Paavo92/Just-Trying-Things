fetch("data/questions.json")
  .then(response => response.json())
  .then(questions => {

    const question = questions[0];

    let html = "<h2>" + question.question + "</h2>";

    question.options.forEach(option => {
      html += "<button>" + option + "</button><br><br>";
    });

    document.getElementById("output").innerHTML = html;
  });
``
