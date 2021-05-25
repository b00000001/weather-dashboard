var citiesCol = document.getElementById("city__col");
const apiKey = "8e615c825fd43e5fdbc1ce461e5a0a9d";
var forecast;
var now = moment();
var weatherDisplay = document.getElementById("weather__display");
var forecastCards = document.getElementById("forecast__cards");
searchButton = document.getElementById("search__btn");
searchField = document.getElementById("search__field");
searchButton.addEventListener("click", function (e) {
	/*
	Button tags use submit behavior by default. Prevent default needed to keep button from reloading by default 
	*/
	e.preventDefault();
	var searchTerm = searchField.value;
	console.log("Search button connected term:", searchTerm);
	callApi(searchTerm);
});
function init() {
	for (var i = 0; i < citiesCol.children.length; i++) {
		citiesCol.children[i].addEventListener("click", function (e) {
			callApi(e.target.id);
		});
	}
}
function callApi(value) {
	fetch(
		"http://api.openweathermap.org/data/2.5/weather?q=" +
			value +
			"&units=imperial&appid=" +
			apiKey
	)
		.then(function (res) {
			return res.json();
		})
		.then(function (cityForecast) {
			displayForecast(cityForecast);
		});
}
function displayForecast(value) {
	console.log("Call API for: ", value);
	weatherDisplay.children[0].innerText = value.name;
	weatherDisplay.children[1].innerText = "Temp: " + value.main.temp + " F";
	weatherDisplay.children[2].innerText = "Wind: " + value.wind.speed;
	weatherDisplay.children[3].innerText = "Humidity: " + value.main.humidity;
	fiveDay(value);
}
function fiveDay(value) {
	console.log("Five Day Forecast for: ", value);
	for (var i = 0; i < forecastCards.children.length; i++) {
		var cardChildren = forecastCards.children[i];
	}
}
init();

// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={8e615c825fd43e5fdbc1ce461e5a0a9d}
