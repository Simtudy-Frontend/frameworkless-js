export class TodoRenderer {
    constructor(model) {
        this.model = model;
        this.filter = 'all';

        this.newTodo = document.querySelector('.new-todo');
        this.filterBtns = document.querySelectorAll('.filter li a');
        this.toggleAll = document.querySelector('#toggle-all');
        this.todoList = document.querySelector('.todo-list');
        this.itemsLeftCount = document.querySelector('.todo-count strong');
        this.toggleAllLabel = document.querySelector('.toggle-all-label');
        this.footer = document.querySelector('.todoapp .footer');
        
        this.newTodo.addEventListener('change', () => this.addTodoHandler());
        this.filterBtns.forEach(button => button.addEventListener('click', (event) => this.filterHandler(event)))
        this.toggleAll.addEventListener('change', (event) => this.toggleAllHandler(event))

        this.render();
    }

    addTodoHandler() {
        const todoText = this.newTodo.value.trim();
        if (todoText) {
            this.model.addTodo(todoText);
            this.newTodo.value = "";
            this.render();
        }
    }

    filterHandler(event) {
        this.filter = event.target.textContent.toLowerCase();
        this.render();
    }

    toggleAllHandler(event) {
        this.model.toggleTodoCompletedAll(event.target.checked)
        this.render();
    }

    toggleCompletedHandler(id) {
        this.model.toggleTodoCompleted(id);
        this.render();
    }

    editTodoHandler(id, label) {
        const input = document.createElement('input');
        input.classList.add('edit');
        input.type = 'text';
        input.value = label.textContent;
        const originalValue = label.textContent;

        // input.addEventListener('keypress', function(event) {
        //     console.log(this);  // input
        //     if (event.key === 'Enter') {
        //         this.model.editTodoText(id, input.value);
        //         this.refresh();
        //     }
        // })
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.model.editTodoText(id, input.value);
                this.render();
            }
        })
        input.addEventListener('blur', () => {
            if (input.value !== originalValue) {
                this.model.editTodoText(id, input.value);
            }
            this.render();
        });
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                input.value = originalValue;
                input.blur();
            }
        });
        
        label.parentNode.replaceChild(input, label);
        input.focus();
    }

    removeTodoHandler(id) {
        this.model.removeTodoById(id);
        this.render();
    }

    clearCompletedHandler() {
        this.model.clearCompleted();
        this.render();
    }

    render() {
        this.todoList.innerHTML = '';

        const filteredTodos = this.model.getTodos(this.filter);

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
            checkbox.addEventListener('change', () => this.toggleCompletedHandler(todoItem.id));
            newTodoItem.appendChild(checkbox);

            const label = document.createElement("label");
            label.textContent = todoItem.text;
            label.setAttribute('for', 'toggle')
            label.addEventListener('dblclick', () => this.editTodoHandler(todoItem.id, label));
            newTodoItem.appendChild(label);

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("destroy");
            deleteBtn.addEventListener('click', () => this.removeTodoHandler(todoItem.id));
            newTodoItem.appendChild(deleteBtn);
    
            this.todoList.appendChild(newTodoItem);
        });

        // Update Todo Count
        this.itemsLeftCount.textContent = this.model.getIncompleteCount();

        // Update Filter Buttons
        this.filterBtns.forEach(filterBtn => {
            if (filterBtn.textContent.toLowerCase() === this.filter) {
                filterBtn.classList.add('selected');
            } else {
                filterBtn.classList.remove('selected');
            }
        });

        if (this.toggleAll.checked) {
            this.toggleAllLabel.classList.add('checked');
        } else {
            this.toggleAllLabel.classList.remove('checked');
        }

        const clearCompletedBtn = document.querySelector('.todoapp .footer>a');
        if (clearCompletedBtn && !this.model.hasCompleted()) {
            this.footer.removeChild(clearCompletedBtn);
        } else if (!clearCompletedBtn && this.model.hasCompleted()) {
            const clearCompletedBtn = document.createElement('a');
            clearCompletedBtn.text = "Clear completed";
            clearCompletedBtn.addEventListener('click', () => this.clearCompletedHandler());
            this.footer.appendChild(clearCompletedBtn);
        }

        if (this.model.getCount() === 0) {
            this.footer.style.display = "none";
            this.toggleAllLabel.style.opacity = "0";
        } else {
            this.footer.style.display = "block";
            this.toggleAllLabel.style.opacity = "1";
        }
    }
}