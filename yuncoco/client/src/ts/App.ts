import Todo from "../type/Todo";
import TodosAPI from "./TodosAPI";
import TodosView from "./TodosView";

export default class App {
  todos: Todo[];
  view: TodosView;

  constructor(root: HTMLElement | null) {
    this.todos = [];
    this.view = new TodosView(root, this._handlers());

    this._refreshTodos();
  }

  _refreshTodos() {
    const todos = TodosAPI.getAllTodos();
    this._setTodos(todos);
    this.view.updateCheckAllToggle();
  }

  _setTodos(todos: Todo[]) {
    this.todos = todos;
    this.view.updateTodosList(todos);
  }

  _handlers() {
    return {
      onTodoSave: (todo: Todo) => {
        TodosAPI.saveTodo(todo);
        this._refreshTodos();
      },
      onTodoUpdate: (props: Omit<Todo, "updatedAt">) => {
        TodosAPI.updateTodoContent(props);
        this._refreshTodos();
      },
      onAllTogglesUpdate: (isCompleted: boolean) => {
        TodosAPI.updateAllToggles(isCompleted);
        this._refreshTodos();
      },
      onTodoDelete: (idList: number[]) => {
        TodosAPI.deleteTodos(idList);
        this._refreshTodos();
      },
    };
  }
}
