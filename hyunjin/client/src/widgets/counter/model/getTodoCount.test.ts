import { getTodoCount } from "./getTodoCount";
import { Todo } from "@shared/types";

describe("getTodoCount", () => {
  it('완료되지 않은 할 일이 하나만 있는 경우 "1 Item left"을 반환 합니다.', () => {
    const todos: Todo[] = [{ id: 1, text: "Test Todo", completed: false }];
    const result = getTodoCount(todos);
    expect(result).toEqual("1 Item left");
  });

  it('완료되지 않은 할 일이 여러 개 있는 경우 "{n}개 남은 항목"을 반환 합니다.', () => {
    const todos: Todo[] = [
      { id: 1, text: "Test Todo 1", completed: false },
      { id: 2, text: "Test Todo 2", completed: false },
      { id: 3, text: "Test Todo 3", completed: true },
    ];
    const result = getTodoCount(todos);
    expect(result).toEqual("2 Items left");
  });

  it('할 일이 없으면 "0 Items left"를 반환 합니다.', () => {
    const todos: Todo[] = [];
    const result = getTodoCount(todos);
    expect(result).toEqual("0 Items left");
  });

  it('모든 할 일이 완료되면 "0 Items left"를 반환해야 합니다.', () => {
    const todos: Todo[] = [
      { id: 1, text: "Test Todo 1", completed: true },
      { id: 2, text: "Test Todo 2", completed: true },
    ];
    const result = getTodoCount(todos);
    expect(result).toEqual("0 Items left");
  });
});
