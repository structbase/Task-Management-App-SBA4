// caching DOM elements
const taskForm = document.getElementById("task-form");
const taskName = document.getElementById("task-name");
const category = document.getElementById("category");
const deadline = document.getElementById("deadline");
const status = document.getElementById("select-status");
const addTaskBtn = document.getElementById("add-task-btn");

const tasks = [];

// Click event listener on the addTaskBtn
addTaskBtn.addEventListener("click", () => {
    // creating object from the value of entered
    const task = {
        taskName: taskName.value.trim(), 
        category: category.value.trim(),
        deadline: deadline.value,
        status: status.value,
    };

    if (!taskForm || !task.category || !task.deadline || !task.status) {
        alert("Please fill out all fields.");
        return;
    }
    // Adding the task object to the tasks arra
    tasks.push(task);

    // debug helps
    console.log("New task added:", task);
    console.log("All tasks:", tasks);
});


