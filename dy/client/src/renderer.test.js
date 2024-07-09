/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { TodoRenderer } from './renderer.js';
import { model } from './__mocks__/model.js';


describe('TodoRenderer', () => {
    let renderer;
    let container;

    beforeEach(() => {
        document.body.innerHTML = `
            <section class="todoapp">
              <header class="header">
                <h1>todos</h1>
                <input type="text" class="new-todo" placeholder="What needs to be done?" autofocus />
              </header>
              <main class="main">
                <div class="toggle-all-container">
                  <input type="checkbox" id="toggle-all">
                  <label for="toggle-all" class="toggle-all-label" style="opacity: 0;">
                    <span>❯</span>
                    <!-- <div class="material-symbols-outlined">done_all</div> -->
                  </label>
                </div>
                <ul class="todo-list"></ul>
              </main>
              <footer class="footer" style="display: none;">
                <span class="todo-count">
                  <strong>0</strong> items left
                </span>
                <ul class="filter">
                  <li><a href="javascript:void(0)" class="selected">All</a></li>
                  <li><a href="javascript:void(0)">Active</a></li>
                  <li><a href="javascript:void(0)">Completed</a></li>
                </ul>
              </footer>
            </section>
        `;

        container = document.querySelector('.todoapp');
        renderer = new TodoRenderer(model);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add a new todo', () => {
        const input = container.querySelector('.new-todo');
        input.value = 'Test Todo';
        const event = new Event('change');
        input.dispatchEvent(event);

        expect(model.addTodo).toHaveBeenCalledWith('Test Todo');
        expect(input.value).toBe('');
    });

    test('should toggle all todos completed', () => {
        const toggleAll = container.querySelector('#toggle-all');
        const event = new Event('change');
        toggleAll.checked = true;
        toggleAll.dispatchEvent(event);

        expect(model.toggleTodoCompletedAll).toHaveBeenCalledWith(true);
    });

    test('should filter todos', () => {
        const filterButtons = container.querySelectorAll('.filter li a');
        const activeButton = filterButtons[1];
        const event = new Event('click');
        activeButton.dispatchEvent(event);

        expect(renderer.filter).toBe('active');
        expect(model.getTodos).toHaveBeenCalledWith('active');
    });

    test('should remove a todo', () => {
        model.getTodos.mockReturnValueOnce([{ id: 1, text: 'Test Todo', completed: false }]);
        renderer.render();

        const deleteButton = container.querySelector('.destroy');
        const event = new Event('click');
        deleteButton.dispatchEvent(event);

        expect(model.removeTodoById).toHaveBeenCalledWith(1);
    });

    test('should edit a todo', () => {
        model.getTodos.mockReturnValueOnce([{ id: 1, text: 'Test Todo', completed: false }]);
        renderer.render();

        const label = container.querySelector('.todo-list label');
        const event = new Event('dblclick');
        label.dispatchEvent(event);

        const input = container.querySelector('.edit');
        input.value = 'Updated Todo';
        const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
        input.dispatchEvent(enterEvent);

        expect(model.editTodoText).toHaveBeenCalledWith(1, 'Updated Todo');
    });

});