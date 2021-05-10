const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  pendingList = document.querySelector('.js-pending'),
  finishedList = document.querySelector('.js-finished');

const PENDING = 'PENDING',
  FINISHED = 'FINISHED';

let pendingArr = [];
finishedArr = [];

const getToDoObj = (text) => {
  return {
    id: String(Date.now()),
    text,
  };
};

function savePendingToDos(task) {
  pendingArr.push(task);
}

function findInPending(taskId) {
  return pendingArr.find((task) => task.id === taskId);
}

function findInFinished(taskId) {
  return finishedArr.find((task) => task.id === taskId);
}

function removeFromPending(taskId) {
  pendingArr = pendingArr.filter((task) => task.id !== taskId);
}

function removeFromFinished(taskId) {
  finishedArr = finishedArr.filter((task) => task.id !== taskId);
}

function addToPending(task) {
  pendingArr.push(task);
}

function addToFinished(task) {
  finishedArr.push(task);
}

function handleDelBtn(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromPending(li.id);
  removeFromFinished(li.id);
  saveLS();
}

function handleBackBtn(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  addToPending(task);
  removeFromFinished(li.id);
  paintPendingToDos(task);
  saveLS();
}

function handleFinishBtn(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  paintFinishedToDos(task);
  saveLS();
}

function buildToDoLi(task) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('button');
  span.innerText = task.text;
  deleteBtn.innerText = '❌';
  deleteBtn.addEventListener('click', handleDelBtn);
  li.append(span, deleteBtn);
  li.id = task.id;
  return li;
}

function paintPendingToDos(toDo) {
  const toDoLi = buildToDoLi(toDo);
  const completeBtn = document.createElement('button');
  completeBtn.innerText = '✅';
  completeBtn.addEventListener('click', handleFinishBtn);
  toDoLi.append(completeBtn);
  pendingList.append(toDoLi);
}

function paintFinishedToDos(task) {
  const toDoLi = buildToDoLi(task);
  const backBtn = document.createElement('button');
  backBtn.innerText = '⏪';
  backBtn.addEventListener('click', handleBackBtn);
  toDoLi.append(backBtn);
  finishedList.append(toDoLi);
}

function saveLS() {
  localStorage.setItem(PENDING, JSON.stringify(pendingArr));
  localStorage.setItem(FINISHED, JSON.stringify(finishedArr));
}

function loadToDos() {
  pendingArr = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedArr = JSON.parse(localStorage.getItem(FINISHED)) || [];
  pendingArr.forEach((task) => paintPendingToDos(task));
  finishedArr.forEach((task) => paintFinishedToDos(task));
}

function handleFormSubmit(e) {
  e.preventDefault();
  const toDoObj = getToDoObj(toDoInput.value);
  toDoInput.value = '';
  paintPendingToDos(toDoObj);
  savePendingToDos(toDoObj);
  saveLS();
}

function toDoInit() {
  toDoForm.addEventListener('submit', handleFormSubmit);
  loadToDos();
}

toDoInit();
