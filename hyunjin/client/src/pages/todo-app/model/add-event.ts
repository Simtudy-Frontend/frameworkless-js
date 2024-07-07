import { Events } from "@shared/types";

export const addEvents = (targetElement: Element, events: Events): void => {
  const inputElement = targetElement.querySelector(".new-todo-input") as HTMLInputElement;
  if (inputElement) {
    inputElement.addEventListener("keypress", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log("inputElement.value", inputElement.value);

        events.addItem(inputElement.value);
        inputElement.value = "";
      }
    });
  }
};
