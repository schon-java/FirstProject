// Load tasks from localStorage on page load
window.addEventListener('load', loadTasksFromStorage);

// Add event listener to the "Add Task" button
document.getElementById('add-task').addEventListener('click', addTask);

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    const taskLabel = document.createElement('label');
    const taskCheckbox = document.createElement('input');
    const deleteButton = document.createElement('button');

    taskCheckbox.type = 'checkbox';
    taskCheckbox.addEventListener('change', toggleTaskCompletion);
    taskLabel.textContent = taskText;
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    taskInput.value = '';
    saveTasksToStorage();
  }
}

// Function to toggle task completion
function toggleTaskCompletion() {
  const taskItem = this.parentNode;
  taskItem.classList.toggle('completed');
  saveTasksToStorage();
}

// Function to delete a task
function deleteTask() {
  const taskItem = this.parentNode;
  const taskList = document.getElementById('task-list');
  taskList.removeChild(taskItem);
  saveTasksToStorage();
}

// Function to save tasks to localStorage
function saveTasksToStorage() {
  const taskList = document.querySelectorAll('#task-list li');
  const tasks = [];

  taskList.forEach(item => {
    const taskText = item.querySelector('label').textContent;
    const isCompleted = item.classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromStorage() {
  const taskList = document.getElementById('task-list');
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);

    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      const taskLabel = document.createElement('label');
      const taskCheckbox = document.createElement('input');
      const deleteButton = document.createElement('button');

      taskCheckbox.type = 'checkbox';
      taskCheckbox.checked = task.completed;
      taskCheckbox.addEventListener('change', toggleTaskCompletion);
      taskLabel.textContent = task.text;
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', deleteTask);

      if (task.completed) {
        taskItem.classList.add('completed');
      }

      taskItem.appendChild(taskCheckbox);
      taskItem.appendChild(taskLabel);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    });
  }
}