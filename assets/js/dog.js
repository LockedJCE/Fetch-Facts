function fetchDogImage() {
    // Get the selected breed from the dropdown
    const selectedBreed = $('#category-dog').val();
    let apiUrl = 'https://dog.ceo/api/breeds/image/random';

    // Check if a specific breed is selected and change the url
    if (selectedBreed && selectedBreed !== 'any') {
        const breedPath = selectedBreed.replace(' ', '/');
        apiUrl = `https://dog.ceo/api/breed/${breedPath}/images/random`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;
            $('#dog-image').attr('src', imageUrl);
        })
        .catch(error => console.error("Failed to fetch dog image:", error));
}