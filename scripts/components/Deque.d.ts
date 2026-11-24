export declare class Deque<T> {
    private items;
    private head;
    private tail;
    private length;
    push(item: T): void;
    pop(): T | undefined;
    pushleft(item: T): void;
    popleft(): T | undefined;
    left(): T | undefined;
    right(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
}
//# sourceMappingURL=Deque.d.ts.map