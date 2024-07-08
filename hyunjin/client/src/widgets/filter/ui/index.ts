import { Filter, EVENTS, Todo } from "@shared/types";
import { getTodoCount } from "../model";

export default class TodoFilter extends HTMLElement {
  static get observedAttributes() {
    return ["selected", "todos"];
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

  get selected() {
    return this.getAttribute("selected");
  }

  set selected(value) {
    if (!value) return;
    this.setAttribute("selected", value);
  }

  connectedCallback(): void {
    this.render();
    this.updateFilterLinks();
    this.updateTodoCount();
  }

  attributeChangedCallback(name: string) {
    if (name === "selected") {
      this.updateFilterLinks();
    }

    if (name === "todos") {
      this.updateTodoCount();
    }
  }

  render() {
    if (!this.isConnected) {
      return;
    }

    const template = document.getElementById("todo-filter") as HTMLTemplateElement;

    const content = template.content.firstElementChild?.cloneNode(true);
    if (!content) return;

    this.appendChild(content);

    this.addEventListener("click", (e) => {
      if ((e.target as Element).matches("li a")) {
        const filter = (e.target as Element).textContent;
        this.handleFilterClick(filter as Filter);
      }
    });
  }

  handleFilterClick(currentFilter: Filter) {
    const event = new CustomEvent(EVENTS.SELECT_FILTER, {
      detail: {
        currentFilter,
      },
    });

    this.dispatchEvent(event);
  }

  updateFilterLinks(): void {
    const { selected: selectedFilter } = this;

    this.querySelectorAll("li a").forEach((a) => {
      if (a.textContent === selectedFilter) {
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
