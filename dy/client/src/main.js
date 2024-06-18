import { TodoModel } from "./model.js";

const todoModel = new TodoModel();
let filterOption = document.querySelector('.filter .selected').textContent.toLowerCase();

const newTodoEl = document.querySelector('.new-todo');
newTodoEl.addEventListener('change', function() {
    const todoText = newTodoEl.value.trim();
    if (todoText) {
        todoModel.addTodo(todoText);
        newTodoEl.value = "";
        refresh();
    }
});

const filterBtns = document.querySelectorAll('.filter li a');
filterBtns.forEach(function(filterBtn) {
    filterBtn.addEventListener('click', function() {
        filterOption = this.textContent.toLowerCase();
        refresh();
    });
});

const toggleAll = document.querySelector('#toggle-all');
toggleAll.addEventListener('change', function() {
    todoModel.toggleTodoCompletedAll(this.checked)
    refresh();
});


function refresh() {
    const todoListEl = document.querySelector('.todo-list');
    todoListEl.innerHTML = '';

    const filteredTodos = todoModel.getTodos(filterOption);

    filteredTodos.forEach(todoItem => {
        const newTodoItem = document.createElement('li');
        newTodoItem.setAttribute('data-id', todoItem.id);

        if (todoItem.completed) {
            newTodoItem.classList.add('completed');
        } else {
            newTodoItem.classList.remove('completed');
        }

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add('toggle');
        checkbox.checked = todoItem.completed
        checkbox.addEventListener('change', function() {
            const todoId = +this.parentElement.getAttribute('data-id');
            todoModel.toggleTodoCompleted(todoId);
            refresh();
        });
        newTodoItem.appendChild(checkbox);

        const label = document.createElement("label");
        label.textContent = todoItem.text;
        label.setAttribute('for', 'toggle')
        label.addEventListener('dblclick', function() {
            const input = document.createElement('input');
            input.classList.add('edit');
            input.type = 'text';
            input.value = todoItem.text;
            const originalValue = todoItem.text;

            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    todoModel.editTodoText(todoItem.id, input.value);
                    refresh();
                }
            })
            input.addEventListener('blur', function() {
                if (input.value !== originalValue) {
                    todoModel.editTodoText(todoItem.id, input.value);
                }
                refresh();
            });
            input.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    input.value = originalValue;
                    input.blur();
                }
            });
            
            newTodoItem.replaceChild(input, label);
            input.focus();
        });
        newTodoItem.appendChild(label);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("destroy");
        deleteBtn.addEventListener('click', function() {
            const todoId = +this.parentElement.getAttribute('data-id');
            todoModel.removeTodoById(todoId)
            refresh();
        });
        newTodoItem.appendChild(deleteBtn);

        todoListEl.appendChild(newTodoItem);
    });
    
    // Update Todo Count
    const itemsLeftCountEl = document.querySelector('.todo-count strong');
    itemsLeftCountEl.textContent = todoModel.getIncompleteCount();

    // Update Filter Buttons
    filterBtns.forEach(filterBtn => {
        if (filterBtn.textContent.toLowerCase() === filterOption) {
            filterBtn.classList.add('selected');
        } else {
            filterBtn.classList.remove('selected');
        }
    });

    const toggleAllLabel = document.querySelector('.toggle-all-label');
    if (toggleAll.checked) {
        toggleAllLabel.classList.add('checked');
    } else {
        toggleAllLabel.classList.remove('checked');
    }

    const footer = document.querySelector('.todoapp .footer');
    const clearCompletedBtn = document.querySelector('.todoapp .footer>a');
    if (clearCompletedBtn && !todoModel.hasCompleted()) {
        footer.removeChild(clearCompletedBtn);
    } else if (!clearCompletedBtn && todoModel.hasCompleted()) {
        const clearCompletedBtn = document.createElement('a');
        clearCompletedBtn.text = "Clear completed";
        clearCompletedBtn.addEventListener('click', function() {
            todoModel.clearCompleted();
            refresh();
        });
        footer.appendChild(clearCompletedBtn);
    }

    if (todoModel.getCount() === 0) {
        footer.style.display = "none";
        toggleAllLabel.style.opacity = "0";
    } else {
        footer.style.display = "block";
        toggleAllLabel.style.opacity = "1";
    }
}