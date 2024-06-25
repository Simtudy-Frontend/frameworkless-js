import { State, Registry, Component } from "@shared/types";

const registry: Registry = {};

const renderWrapper = (component: Component): Component => {
  return (targetElement: Element, state: State): Element => {
    const element = component(targetElement, state);

    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target: Element) => {
      const name = target.getAttribute("data-component") as string;

      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target, state));
    });

    return element;
  };
};

const add = (name: string, component: Component): void => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root: Element, state: State): Element => {
  const cloneComponent = (root: Element): Element => {
    return root.cloneNode(true) as Element;
  };

  return renderWrapper(cloneComponent)(root, state);
};

export default {
  add,
  renderRoot,
};
