import Todo from "../type/Todo";
import TodosAPI from "./TodosAPI";

type Handlers = {
  onTodoSave?: (todo: Todo) => void;
  onTodoUpdate?: (props: Omit<Todo, "updatedAt">) => void;
  onAllTogglesUpdate?: (isCompleted: boolean) => void;
  onTodoDelete?: (idList: number[]) => void;
};

export default class TodosView {
  // TODO: 선언부(?), 타입정의 잘 모르겠다.
  root: HTMLElement | null;
  // TODO: 더 나은 타입은 없을까?
  onTodoSave: Handlers["onTodoSave"];
  onTodoUpdate: Handlers["onTodoUpdate"];
  onAllTogglesUpdate: Handlers["onAllTogglesUpdate"];
  onTodoDelete: Handlers["onTodoDelete"];

  constructor(root: HTMLElement | null, handlers: Handlers) {
    this.root = root;
    Object.assign(this, handlers); // 객체 비구조화 할당을 통해 반복 줄이기

    if (this.root) {
      this.initializeView();
    }
  }

  private initializeView() {
    // TODO: submit 버튼 추가
    this.root!.innerHTML = `
      <h1 class="page__title">todos</h1>
      <div class="page__body">
        <input class="todos__input" type="text" placeholder="todo를 입력하세요" />
        <div class="todos__board">
          <div class="todos__menu">
            <div class="todos__check-all">
              <label for="todos__check-all">check all</label>
              <input id="todos__check-all" class="todos__check-all__input" type="checkbox" />
            </div>
            <button class="todos__delete-completed" type="button">Clear Completed</button>
          </div>
          <div class="todos__list"></div>
        </div>
      </div>
    `;

    const inpTodo = this.root?.querySelector<HTMLInputElement>(".todos__input");
    const toggleCheckAll = this.root?.querySelector<HTMLInputElement>(
      ".todos__check-all__input"
    );
    const btnDeleteCompleted = this.root?.querySelector<HTMLInputElement>(
      ".todos__delete-completed"
    );

    inpTodo?.addEventListener("keypress", this.handleTodoSave.bind(this));
    toggleCheckAll?.addEventListener(
      "click",
      this.handleAllTogglesUpdate.bind(this)
    );
    btnDeleteCompleted?.addEventListener(
      "click",
      this.handleDeleteCompleted.bind(this)
    );
  }

  private handleTodoSave(event: KeyboardEvent) {
    const inpTodo = event.target as HTMLInputElement;
    if (event.key === "Enter" && this.onTodoSave) {
      const newTodo: Todo = {
        id: Math.floor(Math.random() * 1000000),
        content: inpTodo.value.trim(),
        isCompleted: false,
        updatedAt: new Date().toISOString(),
      };

      this.onTodoSave(newTodo);
      inpTodo.value = "";
    }
  }

  private handleAllTogglesUpdate() {
    const toggleCheckAll = this.root?.querySelector<HTMLInputElement>(
      ".todos__check-all__input"
    );
    if (this.onAllTogglesUpdate && toggleCheckAll) {
      this.onAllTogglesUpdate(toggleCheckAll.checked);
    }
  }

  private handleDeleteCompleted() {
    const doDelete = confirm("완료된 todo를 모두 삭제합니다");

    if (doDelete && this.onTodoDelete) {
      const todos = TodosAPI.getAllTodos();
      const idList = todos.reduce((acc: number[], todo) => {
        if (todo.isCompleted) {
          acc.push(todo.id);
        }
        return acc;
      }, []);

      this.onTodoDelete(idList);
    }
  }

  updateCheckAllToggle() {
    const todos = TodosAPI.getAllTodos();
    const allCompleted =
      todos.length > 0 && todos.every((todo) => todo.isCompleted);

    const toggleCheckAll = this.root?.querySelector<HTMLInputElement>(
      ".todos__check-all__input"
    );

    if (toggleCheckAll) {
      toggleCheckAll.checked = allCompleted;
    }
  }

  _createListItemHTML(props: Omit<Todo, "updatedAt">) {
    return `
        <div class="todos__list-item" data-todo-id="${props.id}">
            <div class="todos__list-item__view">
              <input type="checkbox" class="todos__list-item__toggle" ${
                props.isCompleted ? "checked" : ""
              }  />
              <div class="todos__list-item__content">${props.content}</div>
              <button class="todos__list-item__delete">삭제</button>
            </div>
            <input type="text" class="todos__list-item__edit" value="${
              props.content
            }"/>
        </div>
    `;
  }

  updateTodosList(todos: Todo[]) {
    const todosListContainer = this.root?.querySelector(".todos__list");

    if (!this.root || !todosListContainer) {
      return;
    }

    todosListContainer.innerHTML = "";

    for (const { id, content, isCompleted } of todos) {
      const html = this._createListItemHTML({ id, content, isCompleted });
      todosListContainer.insertAdjacentHTML("beforeend", html);
    }

    todosListContainer
      .querySelectorAll(".todos__list-item")
      .forEach((todoItem) => {
        this.attachTodoItemListeners(todoItem);
      });
  }

  private attachTodoItemListeners(todoItem: Element) {
    const toggleElement = todoItem.querySelector<HTMLInputElement>(
      ".todos__list-item__toggle"
    );
    const viewElement = todoItem.querySelector<HTMLElement>(
      ".todos__list-item__view"
    );
    const editElement = todoItem.querySelector<HTMLInputElement>(
      ".todos__list-item__edit"
    );
    const deleteElement = todoItem.querySelector<HTMLButtonElement>(
      ".todos__list-item__delete"
    );
    const todoId = (todoItem as HTMLElement).dataset.todoId;

    if (
      !toggleElement ||
      !viewElement ||
      !editElement ||
      !deleteElement ||
      !todoId
    ) {
      return;
    }

    const parsedId = parseInt(todoId, 10);
    const originalContent = editElement.value;
    const originalToggle = toggleElement.checked;

    const editContent = () => {
      if (
        this.onTodoUpdate &&
        (originalContent !== editElement.value ||
          originalToggle !== toggleElement.checked)
      ) {
        this.onTodoUpdate({
          id: parsedId,
          content: editElement.value,
          isCompleted: toggleElement.checked,
        });
      }
    };
    const exitEditMode = () => {
      viewElement.style.display = "flex";
      editElement.style.display = "none";
    };

    toggleElement.addEventListener("click", editContent);

    todoItem.addEventListener("dblclick", () => {
      viewElement.style.display = "none";
      editElement.style.display = "block";
      editElement.focus();
      const length = editElement.value.length;
      editElement.setSelectionRange(length, length);
    });

    editElement.addEventListener("blur", () => {
      editContent();
      exitEditMode();
    });

    editElement.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        editContent();
        exitEditMode();
      }
    });

    deleteElement.addEventListener("click", () => {
      const doDelete = confirm("정말 삭제하시겠습니까?");

      if (doDelete && this.onTodoDelete) {
        this.onTodoDelete([parsedId]);
      }
    });
  }
}
