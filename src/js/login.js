'use strict';

const loginForm = document.querySelector('#login_form');
const loginInput = document.querySelector('#login_input');
const afterLogin = document.querySelector('#after_login');
const greeting = document.querySelector('#greeting');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'userName';

function loginSubmit(event) {
	event.preventDefault();

	const name = loginInput.value;
	localStorage.setItem(USERNAME_KEY, name);
	checkUserName(name);
}

loginForm.addEventListener('submit', loginSubmit);

const savedUserName = localStorage.getItem(USERNAME_KEY);

function checkUserName(name) {
	if (name === null || typeof name == undefined || name === '') {
		loginForm.classList.remove(HIDDEN_CLASSNAME);
		afterLogin.classList.add(HIDDEN_CLASSNAME);
	} else {
		loginForm.classList.add(HIDDEN_CLASSNAME);
		greeting.innerText = `Hello, ${name}`;
		afterLogin.classList.remove(HIDDEN_CLASSNAME);
	}
}
window.addEventListener('load', checkUserName(savedUserName));
