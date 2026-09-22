fetch("data/questions.json")
  .then(response => response.json())
  .then(questions => {
    document.getElementById("output").innerHTML =
      `<h2>${questions[0].question}</h2>`;
  });
