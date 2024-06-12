const main = `
.app {
  background: #fff;
  margin: 24px 16px 40px 16px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.main {
  position: relative;
}

/* header 시작 */
.header {
  margin-top: 27px;
}

.title {
  width: 100%;
  font-size: 80px;
  line-height: 80px;
  margin: 0;
  font-weight: 200;
  text-align: center;
  color: #b83f45;
  text-rendering: optimizeLegibility;
}
/* header 끝 */

/* footer 시작 */
.footer {
  margin: 65px auto 0;
  color: #4d4d4d;
  font-size: 11px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
}

.footer-text {
  line-height: 1;
}

.footer-link {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.footer-link:hover {
  text-decoration: underline;
}

/* footer 끝 */

/* todo-topbar 시작 */
.topbar {
  position: relative;
}

.new-todo-input {
  padding: 0 32px 0 60px;
  width: 100%;
  height: 68px;
  font-size: 24px;
  line-height: 1.4em;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.new-todo-input::placeholder {
  font-style: italic;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
}

.toggle-all-container {
  width: 45px;
  height: 68px;
  position: absolute;
  left: 0;
  top: 0;
}

.toggle-all-input {
  width: 45px;
  height: 45px;
  font-size: 0;
  position: absolute;
  top: 11.5px;
  left: 0;
  border: none;
  appearance: none;
  cursor: pointer;
}

.toggle-all-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 68px;
  font-size: 0;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

.toggle-all-label::before {
  content: "❯";
  display: inline-block;
  font-size: 22px;
  color: #949494;
  padding: 10px 27px 10px 27px;
  transform: rotate(90deg);
}

.toggle-all-input:checked + .toggle-all-label::before {
  color: #484848;
}
/* todo-topbar 끝 */

/* todo-list 시작 */
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: block;
  border-top: 1px solid #e6e6e6;
}

.visible {
  display: block;
}

.un-visible {
  display: none;
}
/* todo-list 끝 */

/* todo-item 시작 */
.todo-item {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  height: 60px;
  list-style: none;
}

.todo-item.editing {
  border-bottom: none;
  padding: 0;
}

.edit-todo-container {
  display: none;
}

.todo-item.editing .edit-todo-container {
  display: block;
}

.edit-todo-input {
  padding: 0 16px 0 60px;
  width: 100%;
  height: 60px;
  font-size: 24px;
  line-height: 1.4em;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20%20style%3D%22opacity%3A%200.2%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}

.display-todo {
  position: relative;
}

.todo-item.editing .display-todo {
  display: none;
}

.toggle-todo-input {
  text-align: center;
  width: 40px;

  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 3px;
  margin: auto 0;
  border: none; /* Mobile Safari */
  appearance: none;
  cursor: pointer;
}

.todo-item-text {
  word-break: break-all;
  padding: 0 60px;
  display: block;
  line-height: 60px;
  transition: color 0.4s;
  font-weight: 400;
  color: #484848;

  /*
    Firefox requires \`#\` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
    IE and Edge requires *everything* to be escaped to render, so we do that instead of just the \`#\` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
  */
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}

.toggle-todo-input:checked + .todo-item-text {
  color: #949494;
  text-decoration: line-through;
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E");
}

.remove-todo-button {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #949494;
  transition: color 0.2s ease-out;
  cursor: pointer;
}

.remove-todo-button:hover,
.remove-todo-button:focus {
  color: #c18585;
}

.remove-todo-button::after {
  content: "×";
  display: block;
  height: 100%;
  line-height: 1.1;
}

.todo-item:hover .remove-todo-button {
  display: block;
}

/* todo-item 끝 */

/* todo-bottombar 시작 */
.bottombar {
  padding: 10px 0;
  height: 41px;
  text-align: center;
  font-size: 15px;
  border-top: 1px solid #e6e6e6;
  position: relative;
}

.bottombar::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  pointer-events: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2),
    0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-status {
  text-align: left;
  padding: 3px;
  height: 32px;
  line-height: 26px;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.todo-count {
  font-weight: 300;
}

.filter-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.filter-item {
  display: inline-block;
}

.filter-link {
  color: inherit;
  margin: 3px;
  padding: 0 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  display: block;
  height: 26px;
  line-height: 26px;
}

.filter-link:hover {
  border-color: #db7676;
}

.filter-link.selected {
  border-color: #ce4646;
}

.clear-completed-button,
.clear-completed-button:active {
  text-decoration: none;
  cursor: pointer;
  padding: 3px;
  height: 32px;
  line-height: 26px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.clear-completed-button:hover {
  text-decoration: underline;
}

.visible {
  display: block;
}

.un-visible {
  display: none;
}
`;

export const mainStyleSheet = new CSSStyleSheet();
mainStyleSheet.replaceSync(main);
