'use strict';

const toDoForm = document.querySelector('#todo_form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('#todo_list');

const TODOS_KEY = 'todos';
let toDos = [];

function todoFormSubmit(e) {
	e.preventDefault();
	const newToDo = toDoInput.value;

	if (newToDo !== '') {
		toDoInput.value = '';
		const newToDoObj = { id: new Date().getTime(), text: newToDo };
		toDos.push(newToDoObj);
		paintToDo(newToDoObj);
		saveToDo();
	}
}

function paintToDo(toDoObj) {
	const list = document.createElement('li');
	list.setAttribute('id', toDoObj.id);
	list.innerHTML = `
  <span>${toDoObj.text}</span>
  <button>X</button>
  `;
	toDoList.appendChild(list);
}

function saveToDo() {
	localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function clickList(e) {
	if (e.target.nodeName === 'BUTTON') {
		const list = e.target.parentNode;
		toDos = toDos.filter((item) => item.id !== parseInt(list.id));
		saveToDo();
		list.remove();
	}
}

toDoForm.addEventListener('submit', todoFormSubmit);

toDoList.addEventListener('click', clickList);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
	const parsedToDos = JSON.parse(savedToDos);
	parsedToDos.forEach(paintToDo);
	toDos = parsedToDos;
}
