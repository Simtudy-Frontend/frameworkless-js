import { registry, applyDiff } from "@shared/libs";
import { State } from "@shared/types/index.js";
import { getTodos } from "@shared/utils";
import { Counter } from "@widgets/counter";
import { Filters } from "@widgets/filters";
import { Todos } from "@widgets/todos";

registry.add("todos", Todos);
registry.add("counter", Counter);
registry.add("filters", Filters);

const state: State = {
  todos: getTodos(),
  currentFilter: "All",
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(".app") as Element;
    const newMain = registry.renderRoot(main, state);
    applyDiff(document.body, main, newMain);
  });
};

render();
