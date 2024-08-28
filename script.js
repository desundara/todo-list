let tasks = [];

const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        updateTasksList();
        updatestats();
    }
};

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updatestats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updatestats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updatestats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
};

const updatestats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (totalTasks === 0) ? 0 : (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerText = `${completeTasks} / ${totalTasks}`;

    if (tasks.length && completeTasks === totalTasks) {
        blowConfetti();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : "" 
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})" />
                <img src="./img/bin.png" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;
        
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById("submit").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});

window.onload = loadTasks;

// Confetti effect
const blowConfetti = () => {
    const numberOfConfetti = 100;
    const colors = ['#FFC107', '#FF5722', '#4CAF50', '#2196F3', '#9C27B0', '#24feee'];

    for (let i = 0; i < numberOfConfetti; i++) {
        const confetto = document.createElement('div');
        confetto.style.position = 'fixed';
        confetto.style.width = '10px';
        confetto.style.height = '10px';
        confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetto.style.left = `${Math.random() * window.innerWidth}px`;
        confetto.style.top = `${Math.random() * window.innerHeight}px`;
        confetto.style.opacity = '0.8';
        confetto.style.borderRadius = '50%';
        confetto.style.pointerEvents = 'none';
        confetto.style.zIndex = '9999';

        document.body.appendChild(confetto);

        setTimeout(() => {
            confetto.style.transform = `translateY(${window.innerHeight}px)`;
            confetto.style.transition = 'transform 2s linear, opacity 2s ease-out';
            confetto.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            document.body.removeChild(confetto);
        }, 2100);
    }
};
