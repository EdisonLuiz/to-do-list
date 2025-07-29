const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const toggleThemeBtn = document.getElementById('toggleTheme');

//Carrega tarefa salvas
let tasks= JSON.parse(localStorage.getItem('tasks')) || []; renderTasks();

// Aplica tema escuro se já estiver salvo no navegador
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleThemeBtn.textContent = '☀️ Alternar Tema';
}
// Alterna o tema
toggleThemeBtn.addEventListener('click' , () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');
    toggleThemeBtn.textContent = isDark ? '☀️ Alternar Tema' : '🌙 Alternar Tema';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

//Adiciona tarefa
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task !== '') {
        tasks.push(task);
        taskInput.value = '';
        saveAndRender();
    }
});

// Renderiza lista
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        ${task}
        <button onclick="removeTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
       });
}

// Remove tarefa
function removeTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

// Salva no localStorage
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}