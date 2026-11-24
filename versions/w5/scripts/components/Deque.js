export class Deque {
    items = {};
    head = 0;
    tail = 0;
    length = 0;
    push(item) {
        this.items[this.tail] = item;
        this.tail++;
        this.length++;
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.tail--;
        const item = this.items[this.tail];
        delete this.items[this.tail];
        this.length--;
        return item;
    }
    pushleft(item) {
        this.head--;
        this.items[this.head] = item;
        this.length++;
    }
    popleft() {
        if (this.isEmpty()) {
            return undefined;
        }
        const item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        this.length--;
        return item;
    }
    left() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.head];
    }
    right() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.tail - 1];
    }
    isEmpty() {
        return this.length === 0;
    }
    size() {
        return this.length;
    }
    clear() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }
}
//# sourceMappingURL=Deque.js.map