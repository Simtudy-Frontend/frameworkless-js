class TodoItem {
    constructor(text) {
        this.text = text;
        this.is_completed = false;
    }

    toggleCompleted() {
        this.is_completed = !this.is_completed;
    }

    updateText(newText) {
        this.text = newText

    }

}

class ItemManager {
    constructor() {
        this.items = [];
    }

    addItem(text) {
        const newItem = new TodoItem(text);
        this.items.push(newItem);
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        } else {
            console.error("Invalid index");
        }
    }

    getItems(filter = 'all') {
        if (filter === 'active') {
            return this.items.filter(item => !item.is_completed);
        } else if (filter === 'completed') {
            return this.items.filter(item => item.is_completed);
        }
        return this.items;
    }
    toggleItemCompleted(index) {
        if (index >= 0 && index < this.items.length) {
            this.items[index].toggleCompleted();
        }
    }

    updateItemText(index, newText) {
        if (index >= 0 && index < this.items.length) {
            this.items[index].updateText(newText)
        }
    }

    clearCompletedItems() {
        this.items = this.items.filter(item => !item.is_completed);
    }
}

class TodoView {
  constructor(manager) {
    this.manager = manager;
    this.todoList = document.getElementById('todoList');
    this.statusBar = document.getElementById('status-bar');
    this.itemCount = document.getElementById('item-count');
    this.statusBar.style.display = 'none'; // 초기에는 상태 바를 숨깁니다.
    this.filter = 'all';

    document.getElementById('filter-all').addEventListener('click', () => this.setFilter('all'));
    document.getElementById('filter-active').addEventListener('click', () => this.setFilter('active'));
    document.getElementById('filter-completed').addEventListener('click', () => this.setFilter('completed'));
    document.getElementById('clear-completed').addEventListener('click', () => {
      this.manager.clearCompletedItems();
      this.updateTodoList();
    });

  }

  setFilter(filter) {
    this.filter = filter;
    this.updateTodoList();
    // 버튼 스타일 업데이트
    document.getElementById('filter-all').classList.toggle('selected', filter === 'all');
    document.getElementById('filter-active').classList.toggle('selected', filter === 'active');
    document.getElementById('filter-completed').classList.toggle('selected', filter === 'completed');
  }

  updateTodoList() {
    this.todoList.innerHTML = '';
    this.manager.getItems(this.filter).forEach((item, index) => {
      const listItem = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.is_completed;
      checkbox.addEventListener('change', () => {
        this.manager.toggleItemCompleted(index);
        this.updateTodoList();
      });

      const text = document.createElement('span');
      text.textContent = item.text;
      text.contentEditable = true;
      // 엔터 키를 누르면 업데이트가 되도록 설정
      text.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // 기본 엔터 키 동작 방지 (줄바꿈 방지)
          text.blur(); // 포커스를 잃게 하여 blur 이벤트 트리거
        }
      });

      // blur 이벤트에서 텍스트 업데이트
      text.addEventListener('blur', () => {
        this.manager.updateItemText(index, text.textContent);
        this.updateTodoList();
      });

      if (item.is_completed) {
        text.style.color = 'gray';
        text.style.textDecoration = 'line-through';
      }
      listItem.appendChild(checkbox);
      listItem.appendChild(text);
      this.todoList.appendChild(listItem);
    });

    // 상태 바 업데이트 및 표시
    this.updateStatusBar();
  }

  updateStatusBar() {
    const totalItems = this.manager.getItems().length;
    this.itemCount.textContent = `Total items: ${totalItems}`;
    this.statusBar.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

const manager = new ItemManager();
const view = new TodoView(manager);


document.addEventListener('DOMContentLoaded', (event) => {
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const todoText = todoInput.value.trim();
            manager.addItem(todoText);
            view.updateTodoList();
            todoInput.value = '';
        }
    });
});