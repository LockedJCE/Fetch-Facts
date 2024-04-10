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
    fetchTriviaQuestion();
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
});

// Something I found online to decode HTML since our API is encoded
function decodeHtmlEntities(text) {
    // Create a temporary div element
    var tempDiv = document.createElement("div");
    // Set the encoded HTML as the text of the div
    tempDiv.innerHTML = text;
    // Extract and return the decoded text from the div
    return tempDiv.textContent || tempDiv.innerText || "";
}
