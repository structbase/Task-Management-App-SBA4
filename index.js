// caching DOM elements
const taskForm = document.getElementById("task-form");
const taskName = document.getElementById("task-name");
const category = document.getElementById("category");
const deadline = document.getElementById("deadline");
const status = document.getElementById("select-status");
const addTaskBtn = document.getElementById("add-task-btn");
const tableBody = document.querySelector("#task-table tbody");

const tasks = [];

// Function to render all tasks in the table
function renderTasks() {
    tableBody.innerHTML = ""; // clear table

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.taskName}</td>
            <td>${task.category}</td>
            <td>
                <select data-index="${index}" class="status-select">
                    <option value="in-progress" ${
                        task.status === "in-progress" ? "selected" : ""
                    }>In Progress</option>
                    <option value="completed" ${
                        task.status === "completed" ? "selected" : ""
                    }>Completed</option>
                    <option value="overdue" ${
                        task.status === "overdue" ? "selected" : ""
                    }>Overdue</option>
                </select>
            </td>
            <td>${task.deadline}</td>
            <td><button data-index="${index}" class="delete-btn">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
    // Add listeners for status dropdowns
    document.querySelectorAll(".status-select").forEach((select) => {
        select.addEventListener("change", (e) => {
            const i = e.target.getAttribute("data-index");
            tasks[i].status = e.target.value;
            renderTasks(); // re-render after change
        });
    });

    // Add listeners for delete buttons
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const i = e.target.getAttribute("data-index");
            tasks.splice(i, 1);
            renderTasks();
        });
    });
}

// Function to update overdue tasks
function checkOverdue() {
    const now = new Date();
    tasks.forEach((task) => {
        const taskDeadline = new Date(task.deadline);
        if (taskDeadline < now && task.status !== "completed") {
            task.status = "overdue";
        }
    });
}

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

    // check overdue
    checkOverdue();

    // debug helps
    console.log("New task added:", task);
    console.log("All tasks:", tasks);
});
