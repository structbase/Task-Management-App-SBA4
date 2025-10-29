// caching DOM elements
const taskForm = document.getElementById("task-form");
const taskName = document.getElementById("task-name");
const category = document.getElementById("category");
const deadline = document.getElementById("deadline");
const status = document.getElementById("select-status");
const addTaskBtn = document.getElementById("add-task-btn");
const tableBody = document.querySelector("#task-table tbody");

const tasks = [];

// Click event listener on the addTaskBtn
addTaskBtn.addEventListener("click", () => {
    // Create a task object
    const task = {
        taskName: taskName.value.trim(),
        category: category.value.trim(),
        deadline: deadline.value,
        status: status.value,
    };

    // Simple validation
    if (!task.taskName || !task.category || !task.deadline || !task.status) {
        alert("Please fill out all fields.");
        return;
    }

    // Add to tasks array
    tasks.push(task);

    // Reset form
    taskForm.reset();

    // Re-render table
    renderTasks();

    // debug helps
    console.log("New task added:", task);
    console.log("All tasks:", tasks);
});

// Function to render all tasks in the table
function renderTasks() {
    tableBody.innerHTML = ""; // clear table

    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.taskName}</td>
            <td>${task.category}</td>
            <td>${task.status}</td>
            <td>${task.deadline}</td>
        `;
        tableBody.appendChild(row);
    });
}
