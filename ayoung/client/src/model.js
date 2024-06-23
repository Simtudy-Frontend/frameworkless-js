let itemId = 1;

/* NOTE: EventTarget
    EventTarget 인터페이스는 이벤트를 수신할 수 있고,
    수신한 이벤트에 대한 수신기를 가질 수 있는 객체가 구현하는 인터페이스.
    즉, 이벤트의 대상이 될 수 있는 객체는 EventTarget의 세 메서드를 구현함
    https://developer.mozilla.org/ko/docs/Web/API/EventTarget
*/

/* NOTE: 클래스나 함수를 내보낼 땐 세미콜론을 붙이지 마세요.
    https://ko.javascript.info/import-export#ref-4122
*/

export default class TodoItems extends EventTarget {
    constructor(todos = null) {
        super();
        this.items = todos || [];
        /*
            [
                {
                    id: <int, item id>,
                    name: <str, item name>,
                    completed: <boolean>
                }
            ]
        */
    }

    create({ name }) {
        const newItem = {
            id: itemId,
            name: name,
            completed: false,
        };

        itemId++;

        this.items.unshift(newItem);
        this.dispatchUpdated();
    }

    get(id) {
        const item = this.items.find(
            (todo) => todo.id == id
        );
        return { ...item };
    }

    gets(filter = "All") {
        if (filter === "All") {
            return this.items.map(todo => ({ ...todo }));
        }
        if (filter === "Active") {
            return this.items.filter(
                (todo) => !todo.completed
            ).map(todo => ({ ...todo }));
        }
        if (filter === "Completed") {
            return this.items.filter(
                (todo) => todo.completed
            ).map(todo => ({ ...todo }));
        }
        /* 정의 안된 filter 값.. 굳이 error까진..? */
        return this.items.map(todo => ({ ...todo }));
    }

    update(item) {
        const target = this.items.find(
            (todo) => todo.id == item.id
        );
        if (!target) return;
        for (const key in item) {
            target[key] = item[key];
        }
        this.dispatchUpdated();
    }

    delete({ id }) {
        const targetIndex = this.items.findIndex(
            (todo) => todo.id == id
        );
        if (targetIndex < 0) {
            throw "ItemNotFoundError";
        }
        this.items.splice(targetIndex, 1);
        this.dispatchUpdated();
    }

    hasCompleted() {
        return this.items.some(
            (todo) => todo.completed
        );
    }

    hasActive() {
        return this.items.some(
            (todo) => !todo.completed
        );
    }

    count() {
        return this.items.length;
    }

    leftCount() {
        return this.items.filter(
            (todo) => !todo.completed
        ).length;
    }

    toggle({ id }) {
        const item = this.items.find(
            (todo) => todo.id == id
        );
        if (item === undefined) {
            throw "ItemNotFoundError";
        }
        /* TODO:
            원래 if/else문 대신에,

            item.completed = !item.completed;

            로 썼는데, 값이 안바뀌어서 코드를 바꿈.
            왜인지는 이해하지 못함..
        */
        if (item.completed) {
            item.completed = false;
        } else {
            item.completed = true;
        }
        this.dispatchUpdated();
    }

    toggleAll() {
        if (this.hasActive()) {
            this.items.forEach(todo => {
                todo.completed = true;
            });
        } else if (this.hasCompleted()) {
            this.items.forEach(todo => {
                todo.completed = false;
            });
        }
        this.dispatchUpdated();
    }

    deleteCompleted() {
        this.items = this.items.filter(
            (todo) => !todo.completed
        );
        this.dispatchUpdated();
    }

    dispatchUpdated() {
        this.dispatchEvent(new CustomEvent("modelupdated"));
    }
}
