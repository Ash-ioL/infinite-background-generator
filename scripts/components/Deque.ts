export class Deque<T> {
    private items: { [key: number]: T } = {};
    private head: number = 0;
    private tail: number = 0;
    private length: number = 0;

    push(item: T): void {
        this.items[this.tail] = item;
        this.tail++;
        this.length++;
    }

    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        this.tail--;
        const item = this.items[this.tail];
        delete this.items[this.tail];
        this.length--;
        return item;
    }

    pushleft(item: T): void {
        this.head--;
        this.items[this.head] = item;
        this.length++;
    }

    popleft(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        this.length--;
        return item;
    }

    left(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.head];
    }

    right(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.tail - 1];
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    size(): number {
        return this.length;
    }
}