'use strict';

const clockText = document.querySelector('#clock_text');
const clockMeridiem = document.querySelector('#clock_meridiem');
const greetingTime = document.querySelector('#greeting .greeting_time');

function clock() {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	// const seconds = now.getSeconds();

	if (hours > 12) {
		clockText.innerText = `${addZero(hours - 12)}:${addZero(minutes)}`;
		clockMeridiem.innerText = 'PM';
	} else {
		clockText.innerText = `${addZero(hours)}:${addZero(minutes)}`;
		clockMeridiem.innerText = 'AM';
	}

	let greetingText;
	if (hours >= 4 && hours < 12) {
		greetingText = 'Good morning';
	} else if (hours >= 12 && hours < 18) {
		greetingText = 'Good afternoon';
	} else if (hours >= 18 && hours < 22) {
		greetingText = 'Good evening';
	} else {
		greetingText = 'Good night';
	}
	greetingTime.innerText = greetingText;
}

function addZero(num) {
	const number = typeof num == 'string' ? num : num.toString();
	return number.padStart(2, '0');
}

clock();
setInterval(clock, 1000);
