var citiesCol = document.getElementById("city__col");
const apiKey = "8e615c825fd43e5fdbc1ce461e5a0a9d";
var testVar = "";
var indexArray = [];
var forecast;

var now = moment();

var date =
	now._d.getFullYear() +
	"-" +
	`${now._d.getMonth() + 1}` +
	"-" +
	now._d.getDay();
var weatherDisplay = document.getElementById("weather__display");
var forecastCards = document.getElementById("forecast__cards");
searchButton = document.getElementById("search__btn");
searchField = document.getElementById("search__field");
searchButton.addEventListener("click", function (e) {
	/*
	Button tags use submit behavior by default. Prevent default needed to keep button from reloading by default 
	*/
	e.preventDefault();
	indexArray = [];
	var searchTerm = searchField.value;
	// console.log("Search button connected term:", searchTerm); // Will spit out what term was put into search for debugging.
	for (var i = 0; i < forecastCards.children.length; i++) {
		forecastCards.children[i].children[0].children[1].innerHTML = "";
	}
	callApi(searchTerm);
});

function init() {
	for (var i = 0; i < citiesCol.children.length; i++) {
		citiesCol.children[i].addEventListener("click", function (e) {
			callApi(e.target.id);
			indexArray = [];
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
			// Fetch runs lat and lon coordinates in order to run another fetch with the values to get UVI data.
			var lat = cityForecast.coord.lat;

			var lon = cityForecast.coord.lon;
			var onecallUrl =
				"https://api.openweathermap.org/data/2.5/onecall?lat=" +
				lat +
				"&lon=" +
				lon +
				"&appid=" +
				apiKey;
			fetch(onecallUrl)
				.then(function (res) {
					return res.json();
				})
				.then(function (data) {
					var uviData = data.current.uvi;
					weatherDisplay.children[4].innerText = "";
					getUvi(uviData);
					// console.log(uvi);
				});

			displayForecast(cityForecast);
		});
	function getUvi(uvi) {
		var uvDisplay = weatherDisplay.children[4];
		var makeButton = document.createElement("button");
		uvDisplay.innerText = "UV Index: ";
		makeButton.innerText = uvi;
		uvDisplay.appendChild(makeButton);
		for (var i = 0; i < forecastCards.children.length; i++) {}
		switch (uvi > 7) {
			case true:
				makeButton.setAttribute("class", "border rounded bg-danger");
				break;
			case false:
				if (uvi >= 5) {
					makeButton.setAttribute("class", "border rounded bg-warning");
				} else {
					makeButton.setAttribute("class", "border rounded bg-success");
				}
		}
	}
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
			// This algorithm takes the full length of the five day forecast, gathers each date in the full array then splits them and checks for each that matches the times for 12noon. IT then pushes those indexes to an array for accessing later.
			for (var i = 0; i < fdforecast.list.length; i++) {
				var listDates = fdforecast.list[i].dt_txt;
				listDates = listDates.split(" ");
				// console.log(listDates);
				if (listDates[1] === "12:00:00") {
					indexArray.push(i);
				}
			}

			fiveDay(fdforecast);
		});
}
function displayForecast(value) {
	// console.log("Call API for: ", value.name); // Will say what API search term is being sent
	weatherDisplay.children[0].innerText = value.name;
	weatherDisplay.children[1].innerText = "Temp: " + value.main.temp + " F";
	weatherDisplay.children[2].innerText = "Wind: " + value.wind.speed;
	weatherDisplay.children[3].innerText = "Humidity: " + value.main.humidity;
}
function fiveDay(fivedaylist) {
	testVar = fivedaylist;

	// console.log("Five Day Forecast", fiveday);
	for (var i = 0; i < forecastCards.children.length; i++) {
		// indexArray = indexArray[i];
		// console.log(indexArray);
		var iconCode = fivedaylist.list[indexArray[i]].weather[0].icon;
		// console.log(fivedaylist.list[indexArray[i]].dt_txt); // Shows indexes of arrays that apply to 12Noon.
		var icon = document.createElement("img");
		icon.setAttribute(
			"src",
			"http://openweathermap.org/img/w/" + iconCode + ".png"
		);
		var formattedDate = fivedaylist.list[indexArray[i]].dt_txt;
		formattedDate = formattedDate.split(" ");
		forecastCards.children[i].children[0].children[0].innerText =
			formattedDate[0];
		forecastCards.children[i].children[0].children[1].appendChild(icon);
		forecastCards.children[i].children[0].children[2].innerText =
			"Temp: " + fivedaylist.list[indexArray[i]].main.temp + " F";
		forecastCards.children[i].children[0].children[3].innerText =
			"Wind: " + fivedaylist.list[indexArray[i]].wind.speed;
		forecastCards.children[i].children[0].children[4].innerText =
			"Humidity: " + fivedaylist.list[indexArray[i]].main.humidity + "%";
	}
}
init();

// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={8e615c825fd43e5fdbc1ce461e5a0a9d}
