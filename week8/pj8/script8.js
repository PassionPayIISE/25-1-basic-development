const addBtn = document.getElementById("add-task");
const taskInput = document.getElementById("task-input");
const todosList = document.getElementById("todos-list");
const filters = document.querySelectorAll(".filter");
const itemsLeft = document.getElementById("items-left");
const clearBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");

let todos = [];
let currentFilter = "all";

function setDate() {
  const today = new Date();
  const options = { weekday: "long", month: "short", day: "numeric" };
  dateElement.textContent = today.toLocaleDateString("en-US", options);
}

function renderTodos() {
}

function addTodo(text) {
  if (!text.trim()) return;
  const todo = {
    id: Date.now(),
    text,
    completed: false
  };
  todos.push(todo);
  saveTodos();
  renderTodos();
  taskInput.value = "";
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const stored = localStorage.getItem("todos");
  if (stored) {
    todos = JSON.parse(stored);
    renderTodos();
  }
}

addBtn.addEventListener("click", () => addTodo(taskInput.value));
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo(taskInput.value);
});

clearBtn.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
});

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    currentFilter = filter.getAttribute("data-filter");
    setActiveFilter(currentFilter);
    renderTodos();
  });
});

function setActiveFilter(filter) {
  filters.forEach(f => {
    f.classList.toggle("active", f.getAttribute("data-filter") === filter);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setDate();
  loadTodos();
});