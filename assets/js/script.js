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
	for (var i = 0; i < forecastCards.children.length; i++) {
		forecastCards.children[i].children[0].children[1].innerHTML = "";
	}
	callApi(searchTerm);
});
function init() {
	for (var i = 0; i < citiesCol.children.length; i++) {
		citiesCol.children[i].addEventListener("click", function (e) {
			callApi(e.target.id);
			for (var i = 0; i < forecastCards.children.length; i++) {
				forecastCards.children[i].children[0].children[1].innerHTML = "";
			}
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

	fetch(
		"http://api.openweathermap.org/data/2.5/forecast?q=" +
			value +
			"&units=imperial&appid=" +
			apiKey
	)
		.then(function (res) {
			return res.json();
		})
		.then(function (fdforecast) {
			console.log(fdforecast);
			fiveDay(fdforecast);
		});
}
function displayForecast(value) {
	console.log("Call API for: ", value.name);
	weatherDisplay.children[0].innerText = value.name;
	weatherDisplay.children[1].innerText = "Temp: " + value.main.temp + " F";
	weatherDisplay.children[2].innerText = "Wind: " + value.wind.speed;
	weatherDisplay.children[3].innerText = "Humidity: " + value.main.humidity;
	weatherDisplay.children[4].innerText = "UV Index: " + value.main.humidity;
}
function fiveDay(fivedaylist) {
	// console.log("Five Day Forecast", fiveday);
	for (var i = 0; i < forecastCards.children.length; i++) {
		forecastCards.children[i].children[0].children[0].innerText = `${
			now._d.getMonth() + 1
		}/${now._d.getDate() + i}/${now._d.getFullYear()}`;
		// get Icon code
		var iconCode = fivedaylist.list[i].weather[0].icon;
		console.log(iconCode);
		var icon = document.createElement("img");
		console.log(icon);
		icon.setAttribute(
			"src",
			"http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
		);

		forecastCards.children[i].children[0].children[1].appendChild(icon);
		forecastCards.children[i].children[0].children[2].innerText =
			"Temp: " + fivedaylist.list[i].main.temp + " F";
		forecastCards.children[i].children[0].children[3].innerText =
			"Wind: " + fivedaylist.list[i].wind.speed;
		forecastCards.children[i].children[0].children[4].innerText =
			"Humidity: " + fivedaylist.list[i].main.humidity + "%";
		forecastCards.children[i].children[0].children[5].innerText =
			"UV Index: " + fivedaylist.list[i].main.humidity + "%";
	}
}
init();

// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={8e615c825fd43e5fdbc1ce461e5a0a9d}
