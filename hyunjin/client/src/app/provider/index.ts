import { TodoApp } from "@pages/todo-app";
import { TodoFilter } from "@widgets/filter";
import { TodoList } from "@widgets/todos";

window.customElements.define("todo-app", TodoApp);
window.customElements.define("todo-filter", TodoFilter);
window.customElements.define("todo-list", TodoList);

// registry.add("app", TodoApp);
// registry.add("todos", Todos);
// registry.add("counter", Counter);
// registry.add("filters", Filters);

// const state: State = {
//   // todos: getTodos(),
//   todos: [],
//   currentFilter: "All",
// };

// const events: Events = {
//   deleteItem: (index: number) => {
//     state.todos.splice(index, 1);
//     render();
//   },
//   addItem: (text: string) => {
//     state.todos.push({
//       text,
//       completed: false,
//       id: state.todos.length + 1,
//     });
//     render();
//   },
// };

// const render = () => {
//   window.requestAnimationFrame(() => {
//     const main = document.querySelector("#root") as Element;
//     const newMain = registry.renderRoot(main, state, events);
//     applyDiff(document.body, main, newMain);
//   });
// };

// render();
