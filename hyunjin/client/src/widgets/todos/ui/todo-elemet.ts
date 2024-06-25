import { Todo } from "@shared/types";

export const TodoElement = (todo: Todo) => {
  const { text, completed, id } = todo;
  return `
  <li class="todo-item ${completed ? "completed" : ""}" data-id="${id}">
        <div class="display-todo">
          <label for="toggle-todo" class="toggle-todo-label visually-hidden">Toggle Todo</label>
          <input id="toggle-todo" class="toggle-todo-input" type="checkbox" ${completed ? "checked" : ""} />
          <span class="todo-item-text truncate-singleline" tabindex="0">${text}</span>
          <button class="remove-todo-button" title="Remove Todo"></button>
        </div>
        <div class="edit-todo-container">
          <label for="edit-todo" class="edit-todo-label visually-hidden">Edit todo</label>
          <input id="edit-todo" class="edit-todo-input" />
        </div>
      </li>
      `;
};
