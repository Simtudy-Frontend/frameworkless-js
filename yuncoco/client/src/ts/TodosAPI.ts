import Todo from "../type/Todo";

const localStorageKey = "todosapp-todos";

export default class TodosAPI {
  static getAllTodos() {
    const todos: Todo[] = JSON.parse(
      localStorage.getItem(localStorageKey) || "[]"
    );

    return todos;
  }

  private static saveTodos(todos: Todo[]) {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }

  static saveTodo(todoToSave: Todo) {
    // TODO: static의 역할로 인해서 TodosAPI를 this로 대체할 수 있음
    const todos = TodosAPI.getAllTodos();
    todos.push(todoToSave);
    this.saveTodos(todos);
  }

  static updateTodoContent(props: Omit<Todo, "updatedAt">) {
    const todos = TodosAPI.getAllTodos();
    const existingTodo = todos.find((note) => note.id === props.id);

    if (existingTodo) {
      existingTodo.content = props.content;
      existingTodo.isCompleted = props.isCompleted;
      existingTodo.updatedAt = new Date().toISOString();
      this.saveTodos(todos);
    }
  }

  static updateAllToggles(isCompleted: boolean) {
    const todos = TodosAPI.getAllTodos();
    const newTodos = todos.map((todo) => {
      return { ...todo, isCompleted, updatedAt: new Date().toISOString() };
    });

    this.saveTodos(newTodos);
  }

  static deleteTodos(idList: number[]) {
    const todos = TodosAPI.getAllTodos();
    const newTodos = todos.filter((todo) => !idList.includes(todo.id));

    this.saveTodos(newTodos);
  }
}
