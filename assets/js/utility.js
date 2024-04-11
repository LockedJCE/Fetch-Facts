const playButton = $("#play-again");
const resetButton = $("#reset-score");


// Shuffling array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

// Play again button
playButton.on('click', function() {
    // Begin timeout to prevent being rate limited
    $(this).prop('disabled', true);
    // setTimeout
    setTimeout(function() {
        playButton.prop('disabled', false);
    }, 6000);

    fetchTriviaQuestion();
    fetchDogImage();
});

resetButton.on('click', function() {
    localStorage.setItem('quizScore', toString(0));
    displayScore();
}); 

// When document finishes loading
$(document).ready(function() {
    fetchTriviaQuestion();
    fetchDogImage();
    displayScore();
    triviaTimeout();
});

// Something I found online to decode HTML since our API is encoded
function decodeHtmlEntities(text) {
    // Temporary div element
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    // Rreturn the decoded text from the div
    return tempDiv.textContent || tempDiv.innerText || "";
}
