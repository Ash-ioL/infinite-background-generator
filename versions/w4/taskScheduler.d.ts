export interface LoopSet {
    before?(): void;
    background(): void;
    cursor(): void;
    after?(): void;
}
export declare class task_scheduler {
    static mainLoop(): void;
}
export declare function setMainLoop(newLoop: LoopSet): void;
//# sourceMappingURL=taskScheduler.d.ts.map