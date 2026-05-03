const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const remaining = document.getElementById('remaining');
const clearDone = document.getElementById('clear-done');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateFooter() {
  const count = todos.filter(t => !t.done).length;
  remaining.textContent = `${count}件残っています`;
}

function render() {
  list.innerHTML = '';
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.done ? ' done' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todos[i].done = checkbox.checked;
      save();
      render();
    });

    const span = document.createElement('span');
    span.textContent = todo.text;

    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = '✕';
    btn.addEventListener('click', () => {
      todos.splice(i, 1);
      save();
      render();
    });

    li.append(checkbox, span, btn);
    list.appendChild(li);
  });
  updateFooter();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = '';
  save();
  render();
});

clearDone.addEventListener('click', () => {
  todos = todos.filter(t => !t.done);
  save();
  render();
});

render();
