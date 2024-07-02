import { addEvents, createAppElement } from "@pages/todo-app/model";
import { Events, State } from "@shared/types";

export const TodoApp = (targetElement: Element, state: State, events: Events) => {
  const newApp = targetElement.cloneNode(true) as Element;

  newApp.innerHTML = "";
  newApp.appendChild(createAppElement());
  addEvents(newApp, events);

  return newApp;
};
