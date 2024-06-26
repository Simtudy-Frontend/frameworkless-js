import TodoItems from "./model.js";

export default class TodoApp {
    constructor(todos = null) {
        this.items = new TodoItems(todos);
        this.$addTodo = document.querySelector('.add-todo');
        this.$toggleAllBox = document.querySelector('.toggle-all-box');
        this.$toggleAll = document.querySelector('.toggle-all');
        this.$todoList = document.querySelector('.todo-list');
        this.$itemLeftCnt = document.querySelector('.todo-count #left-item-cnt');
        this.$filters = document.querySelector('.filters');
        this.$controlBox = document.querySelector('.control-box');
        this.$clearCompleted = document.querySelector('.control-box .clear-completed');
        this.currentFilter = this.$filters.querySelector('.selected').textContent;
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.$addTodo.addEventListener('change', this.handleAddInput);

        const btns = this.$filters.querySelectorAll('a');
        btns.forEach(btn => {
            btn.addEventListener('click', this.handleFilter);
        });

        this.items.addEventListener('modelupdated', (e) => { this.render(); });

        this.$clearCompleted.addEventListener('click', this.handleClearCompleted);

        this.$toggleAllBox.addEventListener('click', this.handleToggleAll);

        /* todo-list는 event delegation 적용 */
        this.$todoList.addEventListener('dblclick', this.handleEnterToEdit);
        this.$todoList.addEventListener('click', this.handleDestroy);
        this.$todoList.addEventListener('change', this.handleToggle);
        this.$todoList.addEventListener('keypress', this.handleEditKeypress);
        this.$todoList.addEventListener('keyup', this.handleEditKeyup);
        /* NOTE: blur event는 버블링되지 않음 */
        this.$todoList.addEventListener('focusout', this.handleEditBlur);
    }

    /* addTodo */
    handleAddInput = (e) => {
        const name = e.target.value;
        this.items.create({ name: name });
        e.target.value = '';
    };

    /* filter button */
    handleFilter = (e) => {
        this.currentFilter = e.target.textContent;
        this.render();
    };

    /* clearCompleted */
    handleClearCompleted = (e) => {
        this.items.deleteCompleted();
    };

    /* toggleAll */
    handleToggleAll = (e) => {
        this.items.toggleAll();
    };

    /* todoList */
    handleEnterToEdit = (e) => {
        if (e.target.matches('[data-todo="name"]')) {
            const $item = e.target.closest("[data-id]");
            const todoItem = this.items.get($item.dataset.id);
            const $input = document.createElement('input');
            $input.type = 'text';
            $input.value = todoItem.name;
            $input.classList.add('edit-todo');
            $item.replaceChild($input, e.target);
            $input.focus();
        }
    };

    handleDestroy = (e) => {
        if (e.target.classList.contains('destroy')) {
            const $item = e.target.closest("[data-id]");
            const todoItem = this.items.get($item.dataset.id);
            this.items.delete(todoItem);
        }
    };

    handleToggle = (e) => {
        if (e.target.classList.contains('toggle-box')) {
            const $item = e.target.closest("[data-id]");
            const todoItem = this.items.get($item.dataset.id);
            this.items.toggle(todoItem);
        }
    };

    handleEditKeypress = (e) => {
        if (e.target.classList.contains('edit-todo')) {
            if (e.code === "Enter") {
                e.target.blur();
            }
        }
    };

    handleEditKeyup = (e) => {
        if (e.target.classList.contains('edit-todo')) {
            if (e.code === "Escape") {
                e.target.dataset.iscanceled = true;
                e.target.blur();
            }
        }
    };

    handleEditBlur = (e) => {
        if (e.target.classList.contains('edit-todo')) {
            const $item = e.target.closest("[data-id]");
            const todoItem = this.items.get($item.dataset.id);
            /* escape된 경우에는 값을 업데이트하지 않음 */
            if (!e.target.dataset.iscanceled) {
                todoItem.name = e.target.value;
            }
            if (todoItem.name === "") {
                /* item 이름이 empty string이면 삭제함 */
                this.items.delete(todoItem);
            } else {
                this.items.update(todoItem);
            }
        }
    };

    /* render */
    render() {
        window.requestAnimationFrame(() => {
            const filteredItems = this.items.getFilteredItems(this.currentFilter);
            this.renderTodoList(filteredItems);
            this.renderControlBox();
        });
    }

    renderTodoList(items) {
        this.$todoList.innerHTML = '';
        items.forEach(item => {
            const $newItem = this.createTodoItem({
                id: item.id,
                name: item.name,
                completed: item.completed,
                /* TODO:
                    지금은 list render가
                    editing 중간에 일어날 일이 없어서
                    false로 둠
                */
                editing: false
            });
            this.$todoList.appendChild($newItem);
        });
    }

    renderControlBox() {
        /* control box */
        if (this.items.count() === 0) {
            this.$controlBox.classList.add('hidden');
        } else {
            this.$controlBox.classList.remove('hidden');
        }
        /* filter buttons */
        const btns = this.$filters.querySelectorAll('a');
        btns.forEach(btn => {
            if (btn.textContent === this.currentFilter) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
        /* toggle all */
        if (this.items.hasActive()) {
            this.$toggleAllBox.checked = false;
            this.$toggleAll.classList.remove('hidden');
        } else if (this.items.hasCompleted()) {
            this.$toggleAllBox.checked = true;
            this.$toggleAll.classList.remove('hidden');
        } else {
            this.$toggleAll.classList.add('hidden');
        }
        /* clearCompleted */
        if (this.items.hasCompleted()) {
            this.$clearCompleted.classList.remove('hidden');
        } else {
            this.$clearCompleted.classList.add('hidden');
        }
        /* item count */;
        this.$itemLeftCnt.textContent = this.items.leftCount();
    }

    createTodoItem({ id, name, completed, editing }) {
        const $newTodoItem = document.createElement('li');
        $newTodoItem.setAttribute('data-id', id);

        if (completed) {
            $newTodoItem.classList.add('completed');
        }
        const template = `
            <input type="checkbox" ${completed ?
                'checked=true' : ''} class="toggle-box">
            <span class="toggle"></span>
            ${editing ?
                `<input class="edit-todo" value="${name}" />` :
                `<label data-todo="name">${name}</label>`
            }<button class="destroy"></button>
        `;
        $newTodoItem.innerHTML = template;
        return $newTodoItem;
    }
}