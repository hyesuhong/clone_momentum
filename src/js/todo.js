'use strict';

const toDoArea = document.querySelector('#todo_area');
const toDoForm = document.querySelector('#todo_form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('#todo_list');
const toDoBtn = document.querySelector('#todo_btn');

const TODOS_KEY = 'todos';
let toDos = [];

function todoFormSubmit(e) {
	e.preventDefault();
	const newToDo = toDoInput.value;

	if (newToDo !== '') {
		toDoInput.value = '';
		const newToDoObj = { id: new Date().getTime(), text: newToDo, done: 0 };
		toDos.push(newToDoObj);
		paintToDo(newToDoObj);
		saveToDo();
	}
}

function paintToDo(toDoObj) {
	const list = document.createElement('li');
	list.setAttribute('id', toDoObj.id);
	list.innerHTML = `
  <input type="checkbox" id="todo_${toDoObj.id}"/>
  <label for="todo_${toDoObj.id}"><span>${toDoObj.text}</span></label>
  <button class="delete_btn"></button>
  `;
	toDoList.appendChild(list);
	list.querySelector('input[type="checkbox"]').checked =
		toDoObj.done == 0 ? false : true;
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
	} else if (e.target.nodeName === 'INPUT' && e.target.type === 'checkbox') {
		const toDoId = e.target.id.split('_')[1];
		const findIndex = toDos.findIndex((todo) => todo.id == toDoId);
		toDos[findIndex].done = e.target.checked ? 1 : 0;
		saveToDo();
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

toDoBtn.addEventListener('click', function (e) {
	toDoArea.classList.toggle('show');
});
