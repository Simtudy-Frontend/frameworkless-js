import { State } from "@shared/types";
import { TodoElement } from "./todo-elemet";

export const Todos = (targetElement: Element, { todos }: State) => {
  const newTodoList = targetElement.cloneNode(true) as Element;
  const todosElements = todos.map(TodoElement).join("");
  newTodoList.innerHTML = todosElements;
  return newTodoList;
};

export default Todos;
