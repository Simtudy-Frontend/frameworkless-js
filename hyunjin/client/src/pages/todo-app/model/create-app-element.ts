let template: HTMLTemplateElement;

export const createAppElement = (): HTMLElement => {
  if (!template) {
    template = document.getElementById("todo-app") as HTMLTemplateElement;
  }

  const firstChild = template?.content?.firstElementChild;
  return firstChild?.cloneNode(true) as HTMLElement;
};
