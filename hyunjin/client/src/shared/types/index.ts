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
  (targetElement: Element, state: State, events: Events): Element;
}

export type RegistryKey = "app" | "todos" | "counter" | "filters";
export type Registry = Record<RegistryKey, Component | null>;

export interface Events {
  deleteItem: (index: number) => void;
  addItem: (text: string) => void;
}
