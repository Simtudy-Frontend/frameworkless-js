import { Todo } from "@shared/types";

let template: HTMLTemplateElement;

const createNewTodoNode = (): HTMLElement => {
  if (!template) {
    template = document.getElementById("todo-item") as HTMLTemplateElement;
  }

  const firstChild = template?.content?.firstElementChild;
  return firstChild?.cloneNode(true) as HTMLElement;
};

export const TodoElement = (todo: Todo, index: number): HTMLElement | null => {
  const { text, completed } = todo;
  const element = createNewTodoNode();

  if (!element) return null;

  const inputEdit = element.querySelector("input.edit") as HTMLInputElement;
  const label = element.querySelector("label");
  const inputToggle = element.querySelector("input.toggle") as HTMLInputElement;
  const buttonDestroy = element.querySelector("button.destroy") as HTMLButtonElement;

  if (inputEdit) inputEdit.value = text;
  if (label) label.textContent = text;

  if (completed) {
    element.classList.add("completed");
    if (inputToggle) inputToggle.checked = true;
  }

  if (buttonDestroy) buttonDestroy.dataset.index = index.toString();

  return element;
};
