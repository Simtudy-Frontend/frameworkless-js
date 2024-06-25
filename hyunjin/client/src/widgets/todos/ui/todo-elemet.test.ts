import { Todo } from "@shared/types";
import { TodoElement } from "./todo-elemet";

describe("TodoElement", () => {
  it('완료된 할 일에 대해 "completed" class 및 "checked" 속성을 포함해야 합니다.', () => {
    const todo: Todo = { id: 2, text: "Completed Todo", completed: true };
    const result = TodoElement(todo);
    expect(result).toContain("todo-item completed");
    expect(result).toContain("checked");
  });
});
