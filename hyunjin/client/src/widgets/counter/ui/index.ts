import { State } from "@shared/types";
import { getTodoCount } from "../model";

export const Counter = (targetElement: Element, { todos }: State) => {
  const newCounter = targetElement.cloneNode(true) as Element;
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};

export default Counter;
