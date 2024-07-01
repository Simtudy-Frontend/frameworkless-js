import { Todo } from "@shared/types";
import { createTodo } from "../model";

export const TodoElement = (todo: Todo, index: number) => {
  const { text, completed } = todo;
  const element = createTodo();
  if (element) {
    const inputEdit = element.querySelector("input.edit-todo-input") as HTMLInputElement;
    const label = element.querySelector("toggle-todo-label");
    const inputToggle = element.querySelector("input.toggle-todo-input") as HTMLInputElement;
    const buttonDestroy = element.querySelector("button.remove-todo-button") as HTMLButtonElement;
    const spanText = element.querySelector("span.todo-item-text ") as HTMLButtonElement;
    spanText.textContent = text;
    if (inputEdit) inputEdit.value = text;
    if (label) label.textContent = text;

    if (completed) {
      element.classList.add("completed");
      if (inputToggle) inputToggle.checked = true;
    }

    if (buttonDestroy) buttonDestroy.dataset.index = index.toString();

    return element;
  }
};
