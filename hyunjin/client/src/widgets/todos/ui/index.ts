import { State } from "@shared/types";
import { TodoElement } from "./todo-elemet";

export const Todos = (targetElement: Element, { todos }: State) => {
  const newTodoList = targetElement.cloneNode(true) as Element;
  newTodoList.innerHTML = "";

  todos.map(TodoElement).forEach((element) => {
    if (element) {
      newTodoList.appendChild(element);
    }
  });

  return newTodoList;
};

export default Todos;
