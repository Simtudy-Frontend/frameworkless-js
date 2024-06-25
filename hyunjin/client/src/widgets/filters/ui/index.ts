import { State } from "@shared/types";

export const Filters = (targetElement: Element, { currentFilter }: State) => {
  const newCounter = targetElement.cloneNode(true) as Element;
  Array.from(newCounter.querySelectorAll(".filter-list")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });
  return newCounter;
};

export default Filters;
