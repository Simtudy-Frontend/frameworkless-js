import { TodoApp } from "@pages/todo-app";
import { registry, applyDiff } from "@shared/libs";
import { Events, State } from "@shared/types/index.js";
import { getTodos } from "@shared/utils";
import { Counter } from "@widgets/counter";
import { Filters } from "@widgets/filters";
import { Todos } from "@widgets/todos";

registry.add("app", TodoApp);
registry.add("todos", Todos);
registry.add("counter", Counter);
registry.add("filters", Filters);

const state: State = {
  todos: getTodos(),
  currentFilter: "All",
};

const events: Events = {
  deleteItem: (index: number) => {
    state.todos.splice(index, 1);
    render();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false,
      id: state.todos.length + 1,
    });
    render();
  },
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root") as Element;
    const newMain = registry.renderRoot(main, state, events);
    applyDiff(document.body, main, newMain);
  });
};

render();
