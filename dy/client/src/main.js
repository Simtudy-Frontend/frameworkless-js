import { TodoModel } from "./model.js";
import { TodoRenderer } from "./renderer.js";
import stats from "./stats.js";

stats.init();

document.addEventListener('DOMContentLoaded', () => {
    const todoModel = new TodoModel();
    new TodoRenderer(todoModel);
});