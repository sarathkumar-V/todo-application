// select elements
const input = document.querySelector("input");
const addBtn = document.querySelector("button");
const ul = document.querySelector("ul");

// load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// add button click
addBtn.addEventListener("click", addTask);

// enter key add task
input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});


// create task
function addTask(){

    const task = input.value.trim();

    if(!task) return;

    createTaskElement(task);

    saveTask(task);

    input.value = "";
}


// create li element
function createTaskElement(task){

    const li = document.createElement("li");
    const deleteBtn = document.createElement("a");

    li.className = "flex justify-between text-purple-700";
    deleteBtn.href = "#";

    li.innerText = task;
    deleteBtn.innerHTML = `<i class="fa fa-trash text-red-600"></i>`;

    li.appendChild(deleteBtn);
    ul.appendChild(li);
}


// delete task
ul.addEventListener("click", function(e){

    if(e.target.closest("a")){

        const li = e.target.closest("li");
        const taskText = li.firstChild.textContent;

        removeTask(taskText);

        li.remove();
    }

});


// save task
function saveTask(task){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// load tasks
function loadTasks(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task);
    });

}


// remove task
function removeTask(taskText){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(task => task !== taskText);

    localStorage.setItem("tasks", JSON.stringify(tasks));

}