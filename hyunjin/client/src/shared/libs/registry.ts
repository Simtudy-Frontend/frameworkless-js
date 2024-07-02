import { State, Registry, Component, RegistryKey, Events } from "@shared/types";

const registry: Registry = {
  app: null,
  todos: null,
  counter: null,
  filters: null,
};

const renderWrapper = (component: Component): Component => {
  return (targetElement: Element, state: State, events: Events): Element => {
    const element = component(targetElement, state, events);

    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target: Element) => {
      const name = target.getAttribute("data-component") as RegistryKey;

      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target, state, events));
    });

    return element;
  };
};

const add = (name: RegistryKey, component: Component): void => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root: Element, state: State, events: Events): Element => {
  const cloneComponent = (root: Element): Element => {
    return root.cloneNode(true) as Element;
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export default {
  add,
  renderRoot,
};
