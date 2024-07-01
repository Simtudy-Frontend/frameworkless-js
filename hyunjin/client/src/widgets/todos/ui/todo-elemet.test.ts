import { Todo } from "@shared/types";
import { TodoElement } from "./todo-elemet";

describe("TodoElement", () => {
  it("todo-item의 completed, checked, index가 설정되었는지", () => {
    const todo: Todo = { id: 2, text: "Completed Todo", completed: true };
    const newTodoList = document.createElement("div");
    newTodoList.innerHTML = "";
    const element = TodoElement(todo, 0);
    if (element) {
      // "completed" 클래스가 추가되었는지 확인
      expect(element.classList.contains("completed")).toBe(true);

      // "input.toggle"의 "checked" 속성이 true인지 확인
      const inputToggle = element.querySelector("input.toggle") as HTMLInputElement;
      expect(inputToggle.checked).toBe(true);

      //button.destroy의 dataset.index가 index로 설정되었는지 확인
      const buttonDestroy = element.querySelector("button.destroy") as HTMLButtonElement;
      expect(buttonDestroy.dataset.index).toBe("0");
    }
  });
});
