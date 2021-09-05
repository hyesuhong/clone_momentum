'use strict';

const weatherArea = document.querySelector('#weather_area');
const weatherDegree = document.querySelector(
	'#weather_area > h4 > span:first-child'
);
const weatherText = document.querySelector(
	'#weather_area > h4 > span:last-child'
);
const weatherGeo = document.querySelector('#weather_area > p > span');

const API_KEY = '52d6d90f28befa7b5b731389c5388b81';

function onGeoSuccess(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
			weatherDegree.innerText = data.main.temp;
			weatherText.innerText = data.weather[0].main;
			weatherGeo.innerText = data.name;

			weatherArea.style.visibility = 'visible';
			weatherArea.style.opacity = 1;
		});
}

function onGeoError() {
	console.log(`can't find you`);
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
