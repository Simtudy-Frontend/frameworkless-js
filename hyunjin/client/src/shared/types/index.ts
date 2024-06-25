export type CurrentFilter = "All" | "Active" | "Completed";
export interface Todo {
  text: string;
  completed: boolean;
  id: number;
}

export interface State {
  todos: Todo[];
  currentFilter: CurrentFilter;
}

export interface Component {
  (targetElement: Element, state: State): Element;
}

export interface Registry {
  [key: string]: Component;
}
