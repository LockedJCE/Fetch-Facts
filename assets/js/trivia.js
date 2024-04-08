const questionHeader = $("#question");
const unorderedList = $(".quiz-options");
const playButton = $("#play-again");
const checkAnswerButton = $("#check-answer");
const settingsModal = $("#trivia-settings");

// Get initial trivia question
function fetchTriviaQuestion() {
    fetch('https://opentdb.com/api.php?amount=1')
    .then(response => response.json())
    .then(function (data) {
        if (data.response_code !== 0) {
                // 0 - success, 1 - no results, 2 - invalid parameter, 3 - token not found, 4 - token empty, 5 - rate limit
            questionHeader.textContent = "Error from the Trivia API"
            throw new Error('Error from the Trivia API. Response code: ' + data.response_code);
        }
        const question = data.results[0];
        displayQuestion(question);
    });
}

// Display question and answers
function displayQuestion(questionData) {
    questionHeader.text(questionData.question);
    unorderedList.empty(); // Clear previous options

    const options = [questionData.correct_answer, ...questionData.incorrect_answers];
    shuffleArray(options);

    options.forEach(option => {
      // Create a button for each option and append to the quiz-options element
      // Adjust button creation to match Bulma's requirements
      const listItem = $('<li>').addClass('column is-one-quarter');
      const button = $('<button>').addClass('button is-info').text(option);
      listItem.append(button);
      unorderedList.append(listItem);
    });
}


  $(document).ready(function() {
    console.log("ready");
    fetchTriviaQuestion();
});