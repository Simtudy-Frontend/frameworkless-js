import { TodoAppTemplate } from "@pages/todo-app";
import { mainStyleSheet, globalStyleSheet, resetStyleSheet } from "@app/styles";
import { Todo } from "@shared/types";

export class TodoAppComponent extends HTMLElement {
  private todos: Todo[] = [];
  private nextId: number = 1;
  newTodoInput: HTMLInputElement;
  clearCompletedButton: HTMLButtonElement;
  toggleAllCheckbox: HTMLInputElement;
  todoBottomBar: HTMLElement;

  constructor() {
    super();
    document.adoptedStyleSheets = [globalStyleSheet, resetStyleSheet];
    const node = document.importNode(TodoAppTemplate.content, true);
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(node);
    shadowRoot.adoptedStyleSheets = [globalStyleSheet, resetStyleSheet, mainStyleSheet];
    this.newTodoInput = this.shadowRoot!.querySelector<HTMLInputElement>("#new-todo")!;
    this.clearCompletedButton = this.shadowRoot!.querySelector<HTMLButtonElement>("#clear-completed")!;
    this.toggleAllCheckbox = this.shadowRoot!.querySelector<HTMLInputElement>("#toggle-all")!;
    this.todoBottomBar = this.shadowRoot!.querySelector<HTMLElement>(".bottombar")!;
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  private addEventListeners() {
    this.newTodoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && this.newTodoInput.value.trim() !== "") {
        this.addTodo(this.newTodoInput.value.trim());
        this.newTodoInput.value = "";
      }
    });

    this.clearCompletedButton.addEventListener("click", () => this.clearCompletedTodos());

    this.toggleAllCheckbox.addEventListener("click", () => this.toggleAllTodos());

    window.addEventListener("hashchange", () => this.render());
  }

  private addTodo(text: string) {
    this.todos.push({ id: this.nextId++, text, completed: false });
    this.render();
  }

  private removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.render();
  }

  private toggleTodoCompletion(id: number) {
    this.todos = this.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    this.render();
  }

  private clearCompletedTodos() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.render();
  }

  private toggleAllTodos() {
    const allCompleted = this.todos.every((todo) => todo.completed);
    this.todos = this.todos.map((todo) => ({ ...todo, completed: !allCompleted }));
    this.render();
  }

  private visibleTodoBottomBar() {
    if (this.todos.length > 0) {
      this.todoBottomBar.style.display = "block";
    } else {
      this.todoBottomBar.style.display = "none";
    }
  }

  private visibleClearCompletedButton() {
    if (this.todos.some((todo) => todo.completed)) {
      this.clearCompletedButton.style.display = "block";
    } else {
      this.clearCompletedButton.style.display = "none";
    }
  }

  private visibleToggleAllCheckbox() {
    if (this.todos.length > 0) {
      this.toggleAllCheckbox.parentElement!.style.display = "block";
    } else {
      this.toggleAllCheckbox.parentElement!.style.display = "none";
    }
  }

  private updateToggleAllCheckbox() {
    const allCompleted = this.todos.every((todo) => todo.completed);
    if (allCompleted) {
      this.toggleAllCheckbox.checked = true;
    } else {
      this.toggleAllCheckbox.checked = false;
    }
  }

  private todoFilter() {
    const filter = window.location.hash.slice(2);
    if (filter === "active") {
      return this.todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      return this.todos.filter((todo) => todo.completed);
    } else {
      return this.todos;
    }
  }

  private filterLinkSelected() {
    const filterLinks = this.shadowRoot!.querySelectorAll<HTMLAnchorElement>(".filter-link");
    filterLinks.forEach((link) => {
      link.classList.remove("selected");
      if (link.getAttribute("data-route") === window.location.hash.slice(2)) {
        link.classList.add("selected");
      }
    });
  }

  private render() {
    this.visibleToggleAllCheckbox();
    this.updateToggleAllCheckbox();
    this.visibleTodoBottomBar();
    this.visibleClearCompletedButton();
    this.filterLinkSelected();

    const todoList = this.shadowRoot!.querySelector<HTMLUListElement>(".todo-list")!;
    const todoCount = this.shadowRoot!.querySelector<HTMLSpanElement>(".todo-count")!;

    todoList.innerHTML = this.todoFilter()
      .map(
        (todo) => `
      <li class="todo-item ${todo.completed ? "completed" : ""}" data-id="${todo.id}">
        <div class="display-todo">
          <label for="toggle-todo" class="toggle-todo-label visually-hidden">Toggle Todo</label>
          <input id="toggle-todo" class="toggle-todo-input" type="checkbox" ${todo.completed ? "checked" : ""} />
          <span class="todo-item-text truncate-singleline" tabindex="0">${todo.text}</span>
          <button class="remove-todo-button" title="Remove Todo"></button>
        </div>
        <div class="edit-todo-container">
          <label for="edit-todo" class="edit-todo-label visually-hidden">Edit todo</label>
          <input id="edit-todo" class="edit-todo-input" />
        </div>
      </li>
    `
      )
      .join("");

    todoCount.textContent = `${this.todos.filter((todo) => !todo.completed).length} item${
      this.todos.filter((todo) => !todo.completed).length !== 1 ? "s" : ""
    } left`;

    todoList.querySelectorAll<HTMLButtonElement>(".remove-todo-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt((e.target as HTMLElement).closest("li")!.getAttribute("data-id")!);
        this.removeTodo(id);
      });
    });

    todoList.querySelectorAll<HTMLInputElement>(".toggle-todo-input").forEach((input) => {
      input.addEventListener("click", (e) => {
        const id = parseInt((e.target as HTMLElement).closest("li")!.getAttribute("data-id")!);
        this.toggleTodoCompletion(id);
      });
    });

    todoList.querySelectorAll<HTMLLIElement>(".todo-item").forEach((item) => {
      item.addEventListener("dblclick", () => {
        const text = item.querySelector(".todo-item-text")!.textContent!;
        item.classList.add("editing");
        const editInput = item.querySelector<HTMLInputElement>(".edit-todo-input")!;
        editInput.value = text;
        editInput.focus();
      });

      item.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const id = parseInt(item.getAttribute("data-id")!);
          this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, text: item.querySelector<HTMLInputElement>(".edit-todo-input")!.value } : todo
          );
          this.render();
        }
      });
    });
  }
}

customElements.define("todo-app", TodoAppComponent);
