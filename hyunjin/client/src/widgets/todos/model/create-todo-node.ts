let template: HTMLTemplateElement;

export const createTodoNode = () => {
  if (!template) {
    template = document.getElementById("todo-item") as HTMLTemplateElement;
  }

  const firstChild = template?.content?.firstElementChild;
  return firstChild?.cloneNode(true) as HTMLElement;
};
