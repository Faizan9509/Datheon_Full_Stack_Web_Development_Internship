
document.addEventListener("DOMContentLoaded", function () {

    // HTML Elements
    const taskForm = document.getElementById("task-form");
    const taskTitle = document.getElementById("task-title");
    const taskCategory = document.getElementById("task-category");
    const taskDate = document.getElementById("task-date");
    const taskList = document.getElementById("task-list");
    const emptyState = document.getElementById("empty-state");

    const totalCount = document.getElementById("total-count");
    const activeCount = document.getElementById("active-count");
    const completedCount = document.getElementById("completed-count");

    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("filter-category");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("taskflow-tasks")) || [];
    let currentFilter = "All";

    // Save tasks
    function saveTasks() {
        localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
    }

    // Update dashboard statistics
    function updateStats() {
        const completed = tasks.filter(task => task.completed).length;
        const active = tasks.length - completed;

        totalCount.textContent = tasks.length;
        activeCount.textContent = active;
        completedCount.textContent = completed;
    }

    // Display tasks
    function displayTasks() {

        taskList.innerHTML = "";

        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredTasks = tasks.filter(task => {

            const matchesStatus =
                currentFilter === "All" ||
                (currentFilter === "Active" && !task.completed) ||
                (currentFilter === "Completed" && task.completed);

            const matchesCategory =
                selectedCategory === "All" ||
                task.category === selectedCategory;

            const matchesSearch =
                task.title.toLowerCase().includes(searchText);

            return matchesStatus && matchesCategory && matchesSearch;
        });

        emptyState.style.display =
            filteredTasks.length === 0 ? "block" : "none";

        filteredTasks.forEach(task => {

            const card = document.createElement("div");
            card.className = "task-item";

            if (task.completed) {
                card.classList.add("completed");
            }

            const info = document.createElement("div");
            info.className = "task-info";

            const title = document.createElement("h3");
            title.textContent = task.title;

            const details = document.createElement("p");
            details.textContent =
                `${task.category} | Due: ${task.date}`;

            info.appendChild(title);
            info.appendChild(details);

            const actions = document.createElement("div");
            actions.className = "task-actions";

            // Complete button
            const completeBtn = document.createElement("button");
            completeBtn.textContent = task.completed ? "Undo" : "Complete";

            completeBtn.addEventListener("click", function () {
                task.completed = !task.completed;
                saveTasks();
                displayTasks();
            });

            // Edit button
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";

            editBtn.addEventListener("click", function () {
                const updatedTitle = prompt("Edit task title:", task.title);

                if (updatedTitle !== null && updatedTitle.trim() !== "") {
                    task.title = updatedTitle.trim();
                    saveTasks();
                    displayTasks();
                }
            });

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";

            deleteBtn.addEventListener("click", function () {
                if (confirm("Delete this task?")) {
                    tasks = tasks.filter(item => item.id !== task.id);
                    saveTasks();
                    displayTasks();
                }
            });

            actions.append(completeBtn, editBtn, deleteBtn);
            card.append(info, actions);
            taskList.appendChild(card);
        });

        updateStats();
    }

    // Add new task
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = taskTitle.value.trim();

        if (!title || !taskDate.value) {
            alert("Please enter a task title and due date.");
            return;
        }

        const newTask = {
            id: Date.now(),
            title: title,
            category: taskCategory.value,
            date: taskDate.value,
            completed: false
        };

        tasks.push(newTask);

        saveTasks();
        taskForm.reset();
        displayTasks();

        alert("Task added successfully!");
    });

    // Status filters
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {

            currentFilter = button.dataset.filter;

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            displayTasks();
        });
    });

    // Search tasks
    searchInput.addEventListener("input", displayTasks);

    // Filter by category
    categoryFilter.addEventListener("change", displayTasks);

    // Current date and year
    document.getElementById("current-date").textContent =
        new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    document.getElementById("current-year").textContent =
        new Date().getFullYear();

    // Initial display
    displayTasks();

});
