const questionHeader = $("#question");
const quizOptions = $(".quiz-options");
const settingsModal = $("#trivia-settings");
const resultDiv = $("#result");
let score = parseInt(localStorage.getItem('quizScore')) || 0;

// Get initial trivia question
function fetchTriviaQuestion() {
    $('.quiz-option-button').prop('disabled', false).removeClass('is-disabled');
    fetch('https://opentdb.com/api.php?amount=1')
    .then(response => response.json())
    .then(function (data) {
        if (data.response_code !== 0) {
                // 0 - success, 1 - no results, 2 - invalid parameter, 3 - token not found, 4 - token empty, 5 - rate limit
            questionHeader.textContent = "Error from the Trivia API";
            throw new Error('Error from the Trivia API. Response code: ' + data.response_code);
        }
        // Decode all the text
        const questionData = data.results[0];
        questionData.question = decodeHtmlEntities(questionData.question);
        questionData.correct_answer = decodeHtmlEntities(questionData.correct_answer);
        questionData.incorrect_answers = questionData.incorrect_answers.map(answer => decodeHtmlEntities(answer));
        displayQuestion(questionData);
    });
}

// Display question and answers
function displayQuestion(questionData) {
    questionHeader.text(questionData.question);
    quizOptions.empty();
    resultDiv.empty(); // Clear the result

    const options = [questionData.correct_answer, ...questionData.incorrect_answers];
    shuffleArray(options);

    options.forEach(option => {
        
        const listItem = $('<li>').addClass('column is-one-quarter');
        const button = $('<button>').addClass('quiz-option-button button is-info').text(option);
        
        // Event listener for answer checking
        button.on('click', function() {
            checkAnswer(option, questionData.correct_answer);
            disableOptions();
        });
        
        listItem.append(button);
        quizOptions.append(listItem);
    });
}

// Disable all option buttons
function disableOptions() {
    $('.quiz-option-button').prop('disabled', true).addClass('is-disabled');
}

// Check if the answer is correct or not
function checkAnswer(selectedOption, correctAnswer) {
    resultDiv.empty();
    const resultHeader = $('<h2>').addClass('result-header');

    if (selectedOption === correctAnswer) {
        resultHeader.text('Good job!').addClass('has-text-success');
        score++;
    } else {
        resultHeader.text(`Incorrect. The correct answer was: ${correctAnswer}`).addClass('has-text-danger');
        score--;
    }

    // Set and get score
    localStorage.setItem('quizScore', score);
    displayScore();

    resultDiv.append(resultHeader);
}

function displayScore() {
    $("#total-score").text(`Score: ${score}`);
}