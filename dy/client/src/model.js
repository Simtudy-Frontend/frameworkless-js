export class TodoModel {
    constructor() {
        this.todos = [];
        this.todoIdCounter = 0;
    }

    addTodo(text) {
        const todoItem = {
            text: text,
            completed: false,
            id: this.todoIdCounter++,
        };
        this.todos.push(todoItem);
        return todoItem;
    }

    removeTodoById(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    clearCompleted() {
        this.todos = this.getTodos('active');
    }

    toggleTodoCompleted(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    toggleTodoCompletedAll(completed) {
        this.todos.forEach(todo => {
            todo.completed = completed;
        });
    }

    editTodoText(id, newText) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.text = newText;
        }
    }

    getTodos(filter = 'all') {
        if (filter === 'all') {
            return this.todos;
        } else if (filter === 'active') {
            return this.todos.filter(todo => !todo.completed);
        } else if (filter === 'completed') {
            return this.todos.filter(todo => todo.completed);
        }
    }

    getIncompleteCount() {
        return this.getTodos('active').length;
    }

    getCount() {
        return this.todos.length;
    }

    allCompleted() {
        return this.getTodos('completed') === this.getCount()
    }

    hasCompleted() {
        return this.getTodos('completed').length > 0
    }

    empty() {
        return this.getCount() === 0
    }
}