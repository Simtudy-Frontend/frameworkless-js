export type CurrentFilter = "All" | "Active" | "Completed";

export interface Todo {
  text: string;
  completed: boolean;
  id?: number;
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

export enum EVENTS {
  DELETE_ITEM = "DELETE_ITEM",
  SELECT_FILTER = "SELECT_FILTER",
}

export interface TodoFilterElement extends Omit<HTMLUListElement, "addEventListener"> {
  todos: Todo[];
  currentFilter: CurrentFilter;
  addEventListener(type: typeof EVENTS.SELECT_FILTER, listener: (e: CustomEvent) => void): void;
}

export interface TodoListElement extends Omit<HTMLUListElement, "addEventListener"> {
  todos: Todo[];
  addEventListener(type: typeof EVENTS.DELETE_ITEM | "click", listener: (e: CustomEvent) => void): void;
}
