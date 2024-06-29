import { State } from "@shared/types";

export const Filters = (targetElement: Element, { currentFilter }: State) => {
  const newCounter = targetElement.cloneNode(true) as Element;
  Array.from(newCounter.querySelectorAll(".filter-list")).forEach((aTagElement) => {
    if (aTagElement.textContent === currentFilter) {
      aTagElement.classList.add("selected");
    } else {
      aTagElement.classList.remove("selected");
    }
  });
  return newCounter;
};

export default Filters;
