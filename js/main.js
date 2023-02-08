let weather = {
    "apiKey": "a04f48b1a5ab985c01b0606c6c9a8020",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));

    },
    displayWeather: function (data) {

        const { name } = data;
        const { description } = data.weather[0];
        const { temp, humidity, temp_min } = data.main;
        const { speed } = data.wind;
        const icon = data.weather[0].icon;
        console.log(icon)
        const weatherIcon = document.querySelector('.weatherIcon')

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°F";
        document.querySelector(".lowTemp").innerText = "Low Temp: " + Math.round(temp_min) + "°F"
        document.querySelector(".humidity").innerText = "Humidity: " + Math.round(humidity) + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + Math.round(speed) + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x800/?" + name + "')"
        console.log(data)

        switch (icon) {
            case '01d':
            case '01n':
                weatherIcon.src = "images/sun.svg";
                break;
            case '02d':
            case '02n':
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                weatherIcon.src = "images/cloud-sun.svg";
                break;
            case '09d':
            case '09n':
            case '10d':
            case '10n':
                weatherIcon.src = "images/cloud-showers-heavy.svg";
                break;
            case '13d':
            case '13n':
                weatherIcon.src = "images/snowflake.svg";
                break;
            case '11d':
            case '11n':
                weatherIcon.src = "images/cloud-bolt.svg";
                break;
            case '50d':
            case '50n':
                weatherIcon.src = "images/smog.svg";
                break;
            default:
                weatherIcon.src = "images/sun.svg";
        }

        // Speech synthesis

        speechSynthesis.onvoiceschanged = function () { console.log(speechSynthesis.getVoices()) }

        const speech = new SpeechSynthesisUtterance();
        speech.text = `The current temperature in ${name} is ${Math.round(temp)} degrees with a low of ${Math.round(temp_min)} degrees tonight. You can expect ${description} with ${humidity} percent humidity and winds up to ${Math.round(speed)} miles per hour.`

        const voices = speechSynthesis.getVoices();
        console.log(voices);

        // Select a voice by name
        const voice = voices.find(voice => voice.name === 'Google US English');
        speech.voice = voice;

        speechSynthesis.speak(speech);




    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)

    }
};
document.querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
    });
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Austin");


