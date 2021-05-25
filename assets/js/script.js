var citiesCol = document.getElementById("city__col");
const apiKey = "8e615c825fd43e5fdbc1ce461e5a0a9d";
var forecast;
var weatherDisplay = document.getElementById("weather__display");
var buttonStore = {
	searchButton: document.getElementById("search__btn"),
};
buttonStore.searchButton.addEventListener("click", function (e) {
	/*
	Button tags use submit behavior by default. Prevent default needed to keep button from reloading by default 
	*/
	e.preventDefault();
	console.log("Search button connected");
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
		"http://api.openweathermap.org/data/2.5/onecall?q=" +
			value +
			"&units=imperial&appid=" +
			apiKey
	)
		.then(function (res) {
			return res.json();
		})
		.then(function (cityForecast) {
			console.log(cityForecast);
			weatherDisplay.children[0].innerText = cityForecast.name;
			weatherDisplay.children[1].innerText =
				"Temp: " + cityForecast.main.temp + " F";
			weatherDisplay.children[2].innerText = "Wind: " + cityForecast.wind.speed;
			weatherDisplay.children[3].innerText =
				"Humidity: " + cityForecast.main.humidity;
		});
	console.log("Call API for: ", value);
}
init();

// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={8e615c825fd43e5fdbc1ce461e5a0a9d}
