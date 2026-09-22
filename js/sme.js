fetch("data/analytics.json")
.then(response => response.json())
.then(data => {

    let html = "";

    html += "<h2>Question Health Overview</h2>";

    html +=
    "<table border='1' cellpadding='8'>" +
    "<tr>" +
    "<th>Question</th>" +
    "<th>Success %</th>" +
    "<th>Avg Time</th>" +
    "<th>👍</th>" +
    "<th>👎</th>" +
    "<th>Health</th>" +
    "</tr>";

    data.forEach(question => {

        const successRate =
            Math.round(
                (question.correctResponses /
                question.attempts) * 100
            );

        const health =
            Math.round(
                (question.thumbsUp /
                (question.thumbsUp + question.thumbsDown))
                * 100
            );

        let status = "🟢 Healthy";

        if (health < 70 || successRate < 50) {
            status = "🔴 Review";
        }

        html +=
        "<tr>" +
        "<td>" + question.question + "</td>" +
        "<td>" + successRate + "%</td>" +
        "<td>" + question.averageTime + " s</td>" +
        "<td>" + question.thumbsUp + "</td>" +
        "<td>" + question.thumbsDown + "</td>" +
        "<td>" + status + "</td>" +
        "</tr>";
    });

    html += "</table>";

    document.getElementById("dashboard").innerHTML = html;
});
