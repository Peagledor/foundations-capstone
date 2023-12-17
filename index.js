const zipInput = document.querySelector('#zip-input');
const weatherCard = document.querySelector('.card-container');
const form = document.querySelector('form');

const weatherURL = `http://localhost:4004/api/weather`;

const submitHndlr = event => {
    event.preventDefault();

    if (!zipInput.value) {
        alert('you must enter a zip code')
        return;
    } 

    let body = {
        zipCode: zipInput.value,
    }

    axios.post(`${weatherURL}`, body)
    .then(response => {
        console.log("received response:", response)
        const weatherData = response.data.current;

        displayWeather(weatherData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const displayWeather = data => { // takes in response data
    const cardContainer = document.querySelector('.card-container'); // selects html by class
    const weatherCard = document.createElement('div'); // creates html dive inside card container
    const weatherData = data; // assigns data to weatherData variable
    console.log("passed in data:", weatherData) // logs 

    //Need to make function that selects specific data to display. probably outside of this one 
    
    const dataStr = JSON.stringify(weatherData) //takes in the passed in weather data and converts it to a string
    console.log("data string:", dataStr) // logs   

    cardContainer.appendChild(weatherCard); // creates weather card iside the card container
    
}

form.addEventListener('submit', submitHndlr)