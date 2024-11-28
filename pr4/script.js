document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task');
  const taskList = document.getElementById('list');

  loadTasks();
  taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && taskInput.value.trim()) {
          addTask(taskInput.value.trim());
          taskInput.value = '';
      }
  });

  function addTask(taskText) {
      const item = createTask(taskText, new Date().toLocaleString());
      taskList.appendChild(item);
      saveTasks();
  }

  function createTask(text, date) {
      const item = document.createElement('li');
      item.innerHTML = `
          <span class="task-text">${text}</span>
          <span class="task-date">${date}</span>
          <input type="checkbox" class="complete-task">
          <span class="delete-task">&#10006;</span>
      `;
      item.querySelector('.complete-task').addEventListener('click', () => completeTask(item));
      item.querySelector('.delete-task').addEventListener('click', () => deleteTask(item));
      item.querySelector('.task-text').addEventListener('dblclick', () => editTask(item));
      return item;
  }

  function completeTask(item) {
      item.classList.add('completed');
      item.querySelector('.complete-task').remove();
      saveTasks();
  }

  function deleteTask(item) {
      item.remove();
      saveTasks();
  }

  function editTask(item) {
      const taskText = item.querySelector('.task-text');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = taskText.textContent;
      item.replaceChild(input, taskText);
      input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && input.value.trim()) {
              taskText.textContent = input.value.trim();
              item.replaceChild(taskText, input);
              saveTasks();
          }
      });
      input.addEventListener('blur', () => item.replaceChild(taskText, input));
  }

  function saveTasks() {
      const tasks = Array.from(taskList.querySelectorAll('li')).map(item => ({
          text: item.querySelector('.task-text').textContent,
          date: item.querySelector('.task-date').textContent,
          completed: item.classList.contains('completed')
      }));
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.forEach(task => {
          const item = createTask(task.text, task.date);
          if (task.completed) {
              item.classList.add('completed');
              item.querySelector('.complete-task').remove();
          }
          taskList.appendChild(item);
      });
  }
});
