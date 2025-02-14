function getCookie(name) {
    let cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    console.log('Cookie not found');
    return "";
}

function setCookie(name, value) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); 
    document.cookie = name + "=" + JSON.stringify(value) + "; expires=" + expires.toUTCString() + "; path=/";
    console.log('Cookie set:', name + "=" + JSON.stringify(value));
}


function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    console.log('Cookie set:', name + "=" + JSON.stringify(value));
}


function loadTasks() {
    let tasks = getCookie('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];  
    console.log('Loaded Tasks:', tasks);

    const ftList = document.getElementById('ft_list');
    ftList.innerHTML = '';  

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.textContent = task;
        taskDiv.onclick = () => removeTask(index);  
        ftList.appendChild(taskDiv);  
    });
}


function addTask(task) {
    let tasks = getCookie('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];  
    tasks.unshift(task);  
    setCookie('tasks', tasks); 
    console.log('Updated tasks after adding:', tasks);
    loadTasks();  
}

function removeTask(index) {
    let tasks = getCookie('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    if (confirm('Do you want to remove this task?')) {
        tasks.splice(index, 1); 
        setCookie('tasks', tasks);  
        loadTasks(); 
    }
}


document.getElementById('newTaskBtn').addEventListener('click', () => {
    const newTask = prompt("Enter your new task:");
    if (newTask && newTask.trim() !== '') {
        addTask(newTask);
    } else {
        alert("Task cannot be empty!");
    }
});

window.onload = loadTasks;