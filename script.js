// 获取DOM元素
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// 初始化待办事项数组
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 更新统计信息
function updateStats() {
    const completedTasks = todos.filter(todo => todo.completed).length;
    totalTasksSpan.textContent = todos.length;
    completedTasksSpan.textContent = completedTasks;
}

// 保存到本地存储
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateStats();
}

// 创建待办事项元素
function createTodoElement(todo) {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    todoItem.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${todo.text}</span>
        <button class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    `;

    // 复选框事件监听
    const checkbox = todoItem.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        todoItem.classList.toggle('completed');
        saveTodos();
    });

    // 删除按钮事件监听
    const deleteBtn = todoItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        todos = todos.filter(t => t !== todo);
        todoItem.remove();
        saveTodos();
    });

    return todoItem;
}

// 添加新的待办事项
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        const todo = {
            text,
            completed: false
        };
        todos.push(todo);
        todoList.appendChild(createTodoElement(todo));
        todoInput.value = '';
        saveTodos();
    }
}

// 渲染所有待办事项
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });
    updateStats();
}

// 事件监听
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 初始��渲染
renderTodos(); 