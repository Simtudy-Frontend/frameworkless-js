import { EVENTS, Todo, TodoListElement } from "@shared/types";
import { getTodoElement } from "./todo-elemet";

const TEMPLATE = '<ul class="todo-list"></ul>';

export default class TodoList extends HTMLElement {
  private itemTemplate: HTMLTemplateElement | undefined;
  private list!: TodoListElement;

  static get observedAttributes() {
    return ["todos"];
  }

  get todos(): Todo[] {
    if (!this.hasAttribute("todos")) {
      return [];
    }

    const todosAttribute = this.getAttribute("todos") || "[]";
    return JSON.parse(todosAttribute);
  }

  set todos(value: Todo[]) {
    this.setAttribute("todos", JSON.stringify(value));
  }

  onDeleteClick(index: number) {
    const event = new CustomEvent(EVENTS.DELETE_ITEM, {
      detail: {
        index,
      },
    });

    this.dispatchEvent(event);
  }

  createNewTodoNode(): Element {
    return this.itemTemplate!.content!.firstElementChild!.cloneNode(true) as Element;
  }

  updateList() {
    this.list!.innerHTML = "";

    this.todos.map(getTodoElement).forEach((element) => {
      this.list!.appendChild(element as HTMLElement);
    });
  }

  connectedCallback() {
    this.innerHTML = TEMPLATE;
    this.itemTemplate = document.getElementById("todo-item") as HTMLTemplateElement;

    this.list = this.querySelector("ul") as TodoListElement;

    this.list.addEventListener("click", (e) => {
      if ((e.target as Element).matches("button.remove-todo-button")) {
        this.onDeleteClick(parseInt((e.target as HTMLElement).dataset.index!));
      }
    });

    this.updateList();
  }

  attributeChangedCallback() {
    this.updateList();
  }
}
