// document.addEventListener('DOMContentLoaded', () => {
//   loadTasks();
// });

// function addTask() {
//   const input = document.getElementById('new-task');
//   const task = input.value.trim();
//   if (task === '') return;

//   const ul = document.getElementById('todo-list');
//   const li = document.createElement('li');
//   li.innerHTML = `
//       <span>${task}</span>
//       <button onclick="editTask(this)">Edit</button>
//       <button onclick="deleteTask(this)">Delete</button>
//   `;
//   ul.appendChild(li);
//   input.value = '';
//   saveTasks();
// }

// function editTask(button) {
//   const li = button.parentElement;
//   const span = li.querySelector('span');
//   const newTask = prompt('Edit task:', span.innerText);
//   if (newTask !== null) {
//       span.innerText = newTask.trim();
//       saveTasks();
//   }
// }

// function deleteTask(button) {
//   const li = button.parentElement;
//   li.remove();
//   saveTasks();
// }

// function saveTasks() {
//   const ul = document.getElementById('todo-list');
//   const tasks = [];
//   ul.querySelectorAll('li').forEach((li) => {
//       const task = li.querySelector('span').innerText;
//       tasks.push(task);
//   });
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function loadTasks() {
//   const ul = document.getElementById('todo-list');
//   const storedTasks = localStorage.getItem('tasks');
//   if (storedTasks) {
//       const tasks = JSON.parse(storedTasks);
//       tasks.forEach((task) => {
//           const li = document.createElement('li');
//           li.innerHTML = `
//               <span>${task}</span>
//               <button onclick="editTask(this)">Edit</button>
//               <button onclick="deleteTask(this)">Delete</button>
//           `;
//           ul.appendChild(li);
//       });
//   }
// }


document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

function addTask() {
  const input = document.getElementById('new-task');
  const task = input.value.trim();
  if (task === '') return;

  const ul = document.getElementById('todo-list');
  const li = document.createElement('li');
  li.innerHTML = `
      <input type="checkbox" onchange="toggleTaskCompletion(this)">
      <span>${task}</span>
      <button onclick="editTask(this)">Edit</button>
      <button onclick="deleteTask(this)">Delete</button>
  `;
  ul.appendChild(li);
  input.value = '';
  saveTasks();
}

function toggleTaskCompletion(checkbox) {
  const span = checkbox.nextElementSibling;
  span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
  saveTasks();
}

function editTask(button) {
  const li = button.parentElement;
  const span = li.querySelector('span');
  const newTask = prompt('Edit task:', span.innerText);
  if (newTask !== null) {
      span.innerText = newTask.trim();
      saveTasks();
  }
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks();
}

function saveTasks() {
  const ul = document.getElementById('todo-list');
  const tasks = [];
  ul.querySelectorAll('li').forEach((li) => {
      const task = li.querySelector('span').innerText;
      tasks.push({
          task: task,
          completed: li.querySelector('input').checked
      });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const ul = document.getElementById('todo-list');
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      tasks.forEach((taskObj) => {
          const li = document.createElement('li');
          li.innerHTML = `
              <input type="checkbox" ${taskObj.completed ? 'checked' : ''} onchange="toggleTaskCompletion(this)">
              <span style="text-decoration: ${taskObj.completed ? 'line-through' : 'none'}">${taskObj.task}</span>
              <button onclick="editTask(this)">Edit</button>
              <button onclick="deleteTask(this)">Delete</button>
          `;
          ul.appendChild(li);
      });
  }
}
