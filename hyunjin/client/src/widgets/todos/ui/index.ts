import { Events, State } from "@shared/types";
import { TodoElement } from "./todo-elemet";

export const Todos = (targetElement: Element, { todos }: State, { deleteItem }: Events) => {
  const newTodoList = targetElement.cloneNode(true) as HTMLUListElement;
  newTodoList.innerHTML = "";

  todos.map(TodoElement)!.forEach((element) => {
    if (element) newTodoList.appendChild(element);
  });

  newTodoList.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.matches("button.remove-todo-button")) {
      deleteItem(Number(target.dataset.index));
    }
  });
  return newTodoList;
};

export default Todos;
