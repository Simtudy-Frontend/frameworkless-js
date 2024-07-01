import { createAppElement } from "@pages/todo-app/model";

export const TodoApp = (targetElement: Element) => {
  const newApp = targetElement.cloneNode(true) as Element;

  newApp.innerHTML = "";
  newApp.appendChild(createAppElement());

  return newApp;
};
