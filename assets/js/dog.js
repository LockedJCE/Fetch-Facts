function fetchDogImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;
            $('#dog-image').attr('src', imageUrl);
        })
        .catch(error => console.error("Failed to fetch dog image:", error));
}
