/* JS comes here */
function runSpeechRecognition() {
  // get output div reference
  const output = document.querySelector(".search input");
  //   var output = document.getElementById("output");
  // get action element reference
  var action = document.getElementById("action");
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    action.innerHTML = "<small>listening, please speak...</small>";
  };

  recognition.onspeechend = function () {
    action.innerHTML = "<small>stopped listening, hope you are done...</small>";
    recognition.stop();
  };

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    output.innerHTML =
      "<b>Text:</b> " +
      transcript +
      "<br/> <b>Confidence:</b> " +
      confidence * 100 +
      "%";
    // output.classList.remove("hide");
  };

  // start recognition
  action.innerHTML = "Tap to speak";
  recognition.start();
}

const apiKey = "12220ce0f0939550cff1d4f23c0d3ea9";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "Images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "Images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "Images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "Images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "Images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
