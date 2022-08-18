const createTaskButton = document.getElementById('criar-tarefa');
const inputCreateTask = document.getElementById('texto-tarefa');
const ol = document.getElementById('lista-tarefas');
const clearListButton = document.getElementById('apaga-tudo');
const clearCompletedButton = document.getElementById('remover-finalizados');
const saveListButton = document.getElementById('salvar-tarefas');
const removeSelectedButton = document.getElementById('remover-selecionado');
const moveUpButton = document.getElementById('mover-cima');
const moveDownButton = document.getElementById('mover-baixo');

function moveUp() {
  moveUpButton.addEventListener('click', () => {
    let selectedTask;
    const tasksList = document.querySelectorAll('.task');
    for (let i = 0; i < tasksList.length; i += 1) {
      if (tasksList[i].style.backgroundColor === 'gray'
      && tasksList[i] !== ol.firstElementChild) {
        selectedTask = tasksList[i];
        const aux = selectedTask.previousSibling;
        ol.replaceChild(selectedTask, selectedTask.previousSibling);
        selectedTask.after(aux);
        saveListButton.disabled = false;
      }
    }
  });
}
moveUp();

function moveDown() {
  moveDownButton.addEventListener('click', () => {
    let selectedTask;
    const tasksList = document.querySelectorAll('.task');
    for (let i = 0; i < tasksList.length; i += 1) {
      if (tasksList[i].style.backgroundColor === 'gray' && tasksList[i] !== ol.lastElementChild) {
        selectedTask = tasksList[i];
        const aux = selectedTask.nextSibling;
        ol.replaceChild(selectedTask, selectedTask.nextSibling);
        selectedTask.before(aux);
        saveListButton.disabled = false;
      }
    }
  });
}
moveDown();

function removeSelected() {
  removeSelectedButton.addEventListener('click', () => {
    const tasksList = document.querySelectorAll('.task');
    for (let i = 0; i < tasksList.length; i += 1) {
      if (tasksList[i].style.backgroundColor === 'gray') {
        tasksList[i].remove();
      }
    }
    saveListButton.disabled = false;
  });
}
removeSelected();

function createTask() {
  createTaskButton.addEventListener('click', () => {
    const li = document.createElement('li');
    li.classList.add('task', 'list-group-item');
    li.innerText = inputCreateTask.value;
    ol.appendChild(li);
    inputCreateTask.value = '';
    saveListButton.disabled = false;
  });
}
createTask();

function changeColor() {
  ol.addEventListener('click', (e) => {
    const tasksList = document.querySelectorAll('.task');
    for (let i = 0; i < tasksList.length; i += 1) {
      tasksList[i].style.backgroundColor = '';
    }
    ol.style.backgroundColor = '';
    e.target.style.backgroundColor = 'gray';
    if (e.target === ol) {
      ol.style.backgroundColor = '';
    }
  });
}
changeColor();

function completedTask() {
  ol.addEventListener('dblclick', (e) => {
    if (e.target === ol) {
      e.target.classList.remove('completed');
    } else {
      e.target.classList.toggle('completed');
      saveListButton.disabled = false;
    }
  });
}
completedTask();

function clearList() {
  clearListButton.addEventListener('click', () => {
    ol.innerHTML = '';
    saveListButton.disabled = false;
  });
}
clearList();

function removeCompleted() {
  clearCompletedButton.addEventListener('click', () => {
    const tasksList = document.querySelectorAll('.completed');
    for (let i = 0; i < tasksList.length; i += 1) {
      tasksList[i].remove();
    }
    saveListButton.disabled = false;
  });
}
removeCompleted();

function saveListInLocalStorage() {
  saveListButton.addEventListener('click', () => {
    const taskItem = document.querySelectorAll('.task');
    localStorage.removeItem('savedList');
    const storageList = [];
    for (let i = 0; i < taskItem.length; i += 1) {
      const obj = {
        text: taskItem[i].innerText,
        class: taskItem[i].classList,
      };
      storageList.push(obj);
    }
    localStorage.setItem('savedList', JSON.stringify(storageList));
    saveListButton.disabled = true;
  });
}
saveListInLocalStorage();

function localStorageNotNull() {
  const savedList = JSON.parse(localStorage.getItem('savedList'));
  for (let index = 0; index < savedList.length; index += 1) {
    const li = document.createElement('li');
    li.innerText = savedList[index].text;
    const classesValues = Object.values(savedList[index].class);
    console.log(classesValues);
    for (let index2 = 0; index2 < classesValues.length; index2 += 1) {
      li.classList.add(classesValues[index2]);
    }
    ol.appendChild(li);
  }
}

window.onload = function firstRenderization() {
  if (localStorage.getItem('savedList') === null) {
    localStorage.setItem('savedList', []);
  } else {
    localStorageNotNull();
  }
};
