import { jest } from '@jest/globals';

export const model = {
  addTodo: jest.fn(),
  getTodos: jest.fn(() => [
    {id: 0, text: "a", completed: true},
    {id: 1, text: "b", completed: false},
    {id: 2, text: "c", completed: false},
  ]),
  toggleTodoCompletedAll: jest.fn(),
  removeTodoById: jest.fn(),
  clearCompleted: jest.fn(),
  editTodoText: jest.fn(),
  getIncompleteCount: jest.fn(),
  hasCompleted: jest.fn(),
  getCount: jest.fn(),
  toggleTodoCompleted: jest.fn(),
};