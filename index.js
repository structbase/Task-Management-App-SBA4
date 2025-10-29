document.addEventListener("DOMContentLoaded", () => {
    // caching DOM elements
    const taskForm = document.getElementById("task-form");
    const taskName = document.getElementById("task-name");
    const category = document.getElementById("category");
    const deadline = document.getElementById("deadline");
    const status = document.getElementById("select-status");
    const addTaskBtn = document.getElementById("add-task-btn");
    const tableBody = document.querySelector("#task-table tbody");
    const filterCategory = document.getElementById("filter-category");
    const filterStatus = document.getElementById("filter-status");

    const tasks = [];

    // Update overdue tasks
    function checkOverdue() {
        const now = new Date();
        tasks.forEach((task) => {
            const taskDeadline = new Date(task.deadline);
            if (taskDeadline < now && task.status !== "completed") {
                task.status = "overdue";
            }
        });
    }

    // Populate category filter dynamically
    function updateCategoryFilter() {
        const categories = [...new Set(tasks.map((t) => t.category))];
        filterCategory.innerHTML =
            `<option value="">All Categories</option>` +
            categories
                .map((c) => `<option value="${c}">${c}</option>`)
                .join("");
    }

    // Add event listeners to status dropdowns
    function addStatusListeners() {
        document.querySelectorAll(".status-select").forEach((select) => {
            select.addEventListener("change", (e) => {
                const index = e.target.dataset.index;
                tasks[index].status = e.target.value;
                renderTasks();
            });
        });
    }

    // Add event listeners to delete buttons
    function addDeleteListeners() {
        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                tasks.splice(index, 1);
                updateCategoryFilter();
                renderTasks();
            });
        });
    }

    function renderTasks() {
        tableBody.innerHTML = "";
        checkOverdue();

        const categoryFilterValue = filterCategory.value;
        const statusFilterValue = filterStatus.value;

        tasks.forEach((task, index) => {
            if (
                (categoryFilterValue &&
                    task.category !== categoryFilterValue) ||
                (statusFilterValue && task.status !== statusFilterValue)
            ) {
                return;
            }

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

        addStatusListeners();
        addDeleteListeners();
    }

    // Add new task
    addTaskBtn.addEventListener("click", () => {
        const task = {
            taskName: taskName.value.trim(),
            category: category.value.trim(),
            deadline: deadline.value,
            status: status.value.toLowerCase(), // make lowercase for consistency
        };

        if (
            !task.taskName ||
            !task.category ||
            !task.deadline ||
            !task.status
        ) {
            alert("Please fill out all fields.");
            return;
        }

        tasks.push(task);
        taskForm.reset();
        updateCategoryFilter();
        renderTasks();
    });

    filterCategory.addEventListener("change", renderTasks);
    filterStatus.addEventListener("change", renderTasks);
});
