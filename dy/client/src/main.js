import { TodoModel } from "./model.js";
import { TodoRenderer } from "./renderer.js";

document.addEventListener('DOMContentLoaded', () => {
    const todoModel = new TodoModel();
    new TodoRenderer(todoModel);
});
