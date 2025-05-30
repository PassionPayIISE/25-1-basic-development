* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #7749f8;
  --primary-light: #b8aefc;
  --dark: #333;
  --gray: #888;
  --border: #eee;
  --danger: #f44336;
  --success: #4caf50;
}

body {
  font-family: sans-serif;
  background-color: #f1f3f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: var(--dark);
}

.app {
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

header {
  background-color: var(--primary);
  color: white;
  padding: 20px 25px;
}

header h1 {
  font-size: 24px;
  margin-bottom: 5px;
  font-weight: 600;
}

header p {
  font-size: 14px;
  opacity: 0.9;
}

.todo-input {
  padding: 20px 25px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid var(--border);
}

.todo-input input {
  flex: 1;
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
  transition: all 0.2s;
}

.todo-input input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px #e0d8fc;
}

.todo-input button {
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s;
}

.todo-input button:hover {
  background-color: var(--primary-light);
}

.filters {
  display: flex;
  gap: 15px;
  border-bottom: 1px solid var(--border);
  padding: 15px 25px;
}

.filter {
  cursor: pointer;
  color: var(--gray);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.filter:hover {
  color: var(--primary);
}

.filter.active {
  color: var(--primary);
  border-bottom: 2px solid var(--primary);
  font-weight: 500;
}

.todos-container {
  padding: 15px 0;
  max-height: 300px;
  overflow-y: auto;
}

#todos-list {
  list-style-type: none;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  transition: background-color 0.2s;
}

.todo-item:hover {
  background-color: #f9f9f9;
}

.checkbox-container {
  margin-right: 15px;
  position: relative;
}

.todo-checkbox {
  opacity: 0;
  position: absolute;
}

.check-mark {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.todo-checkbox:checked + .check-mark {
  background-color: var(--success);
  border-color: var(--success);
}

.todo-checkbox:checked + .check-mark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.todo-item-text {
  flex: 1;
  font-size: 1rem;
  transition: all 0.2s;
}

.todo-item.completed .todo-item-text {
  text-decoration: line-through;
  color: var(--gray);
}

.delete-button {
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
}

.todo-item:hover .delete-button {
  opacity: 1;
}

.delete-button:hover {
  color: var(--danger);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: var(--gray);
}

.empty-state i {
  font-size: 40px;
  margin-bottom: 10px;
  opacity: 0.7;
}

.hidden {
  display: none;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  border-top: 1px solid var(--border);
  font-size: 0.9rem;
  background-color: #fafafa;
}

#clear-completed {
  cursor: pointer;
  background: none;
  border: none;
  color: var(--gray);
  transition: color 0.2s;
}

#clear-completed:hover {
  color: var(--danger);
}
