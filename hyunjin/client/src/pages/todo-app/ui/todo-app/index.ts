import { EVENTS, TodoFilterElement, State, TodoListElement, CurrentFilter } from "@shared/types";

export default class TodoApp extends HTMLElement {
  private state: State;
  private template: HTMLTemplateElement | null;
  private filter!: TodoFilterElement;
  private list!: TodoListElement;

  constructor() {
    super();
    this.state = {
      todos: [],
      currentFilter: "All",
    };

    this.template = document.getElementById("todo-app") as HTMLTemplateElement;
  }

  deleteItem(index: number) {
    this.state.todos.splice(index, 1);
    this.syncAttributes();
  }

  addItem(text: string) {
    this.state.todos.push({
      text,
      completed: false,
    });
    this.syncAttributes();
  }

  selectFilter(currentFilter: CurrentFilter) {
    console.log(currentFilter);

    this.state.currentFilter = currentFilter;
    this.syncAttributes();
  }

  syncAttributes() {
    this.list.todos = this.state.todos;
    this.filter.todos = this.state.todos;
    this.filter.currentFilter = this.state.currentFilter;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      const content = this.template!.content.firstElementChild!.cloneNode(true);

      this.appendChild(content);

      const inputElement = this.querySelector(".new-todo-input") as HTMLInputElement;
      inputElement!.addEventListener("keypress", (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement; // 타입 단언
        if (e.key === "Enter") {
          this.addItem(target.value);
          target.value = "";
        }
      });

      this.filter = this.querySelector("todo-filter") as TodoFilterElement;
      this.filter.addEventListener(EVENTS.SELECT_FILTER, (e: CustomEvent) => {
        this.selectFilter(e.detail.currentFilter);
      });

      this.list = this.querySelector("todo-list") as TodoListElement;
      this.list.addEventListener(EVENTS.DELETE_ITEM, (e: CustomEvent) => {
        this.deleteItem(e.detail.index);
      });

      this.syncAttributes();
    });
  }
}
