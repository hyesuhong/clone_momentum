'use strict';

const clockText = document.querySelector('#clock_text');
const clockMeridiem = document.querySelector('#clock_meridiem');

function clock() {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();

	if (hours > 12) {
		clockText.innerText = `${addZero(hours - 12)}:${addZero(minutes)}:${addZero(
			seconds
		)}`;
		clockMeridiem.innerText = 'PM';
	} else {
		clockText.innerText = `${addZero(hours)}:${addZero(minutes)}:${addZero(
			seconds
		)}`;
		clockMeridiem.innerText = 'AM';
	}
}

function addZero(num) {
	const number = typeof num == 'string' ? num : num.toString();
	return number.padStart(2, '0');
}

clock();
setInterval(clock, 1000);
