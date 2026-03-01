// --- VIDEO INITIALIZATION ---
// This part ensures your video starts playing correctly on page load
window.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.querySelector('.project-img');
    
    // Replace the HTML inside .project-img with the proper video tag
    videoContainer.innerHTML = `
        <video autoplay muted loop playsinline width="100%" id="project-video">
            <source src="img/video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
    
    // Explicitly play to bypass some browser restrictions
    const video = document.getElementById('project-video');
    video.play().catch(error => {
        console.log("Autoplay was prevented. Click anywhere to play.");
    });
});

// --- EXISTING TASK LIST LOGIC ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let editingTask = null;

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((taskText) => addTask(taskText));
}

function saveTasks() {
  const taskItems = taskList.querySelectorAll('li');
  const tasks = Array.from(taskItems).map(taskItem => taskItem.querySelector('.task-text').textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(taskText) {
  const taskItem = document.createElement('li');

  taskItem.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  const editBtn = taskItem.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => {
    taskInput.value = taskText;
    editingTask = taskItem;
    addTaskBtn.textContent = 'Save Changes';
  });

  const deleteBtn = taskItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasks();
  });

  taskList.appendChild(taskItem);
  saveTasks();
}

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    if (editingTask) {
      editingTask.querySelector('.task-text').textContent = taskText;
      addTaskBtn.textContent = 'Add Task';
      editingTask = null;
    } else {
      addTask(taskText);
    }
    taskInput.value = '';
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});

window.addEventListener('load', loadTasks);
