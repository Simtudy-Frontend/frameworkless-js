import { CurrentFilter, EVENTS, Todo } from "@shared/types";
import { getTodoCount } from "../model";

export default class TodoFilter extends HTMLElement {
  static get observedAttributes() {
    return ["currentFilter", "todos"];
  }

  get todos(): Todo[] {
    if (!this.hasAttribute("todos")) {
      return [];
    }
    const todosAttribute = this.getAttribute("todos") || "[]";
    return JSON.parse(todosAttribute);
  }

  set todos(value) {
    this.setAttribute("todos", JSON.stringify(value));
  }

  get currentFilter() {
    return this.getAttribute("currentFilter");
  }

  set currentFilter(value) {
    if (!value) return;

    this.setAttribute("currentFilter", value);
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.updateFilterLinks();
    this.updateTodoCount();
  }

  private render(): void {
    if (!this.isConnected) {
      return;
    }

    const template = document.getElementById("todo-filter") as HTMLTemplateElement;

    const content = template.content.firstElementChild?.cloneNode(true);
    if (!content) return;

    this.appendChild(content);

    this.addEventListener("click", (e) => {
      if ((e.target as Element).matches("li a")) {
        const currentFilter = (e.target as Element).textContent;
        this.handleFilterClick(currentFilter as CurrentFilter);
      }
    });
  }

  handleFilterClick(currentFilter: CurrentFilter) {
    const event = new CustomEvent(EVENTS.SELECT_FILTER, {
      detail: {
        currentFilter,
      },
    });

    this.dispatchEvent(event);
  }

  updateFilterLinks(): void {
    const { currentFilter } = this;
    console.log(currentFilter);

    this.querySelectorAll("li a").forEach((a) => {
      if (a.textContent === currentFilter) {
        a.classList.add("selected");
      } else {
        a.classList.remove("selected");
      }
    });
  }

  private updateTodoCount(): void {
    const label = getTodoCount(this.todos);
    const todoCountSpan = this.querySelector("span.todo-count");
    if (todoCountSpan) {
      todoCountSpan.textContent = label;
    }
  }
}
