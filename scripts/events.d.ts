export interface MouseEvents {
    click(): void;
    move(): void;
    hold(): void;
    scroll(): void;
}
export interface ForeverEvent {
    run(): void;
}
export declare let scrollY: number;
export declare function isMouseDown(): boolean;
export declare function initMouseEvents(canvas: HTMLCanvasElement): void;
export declare function setMouseEvents(newMouseEvents: MouseEvents): void;
export declare function resetMouseEvents(): void;
export declare function setForeverEvent(newForeverEvent: ForeverEvent): void;
export declare function resetForeverEvent(): void;
//# sourceMappingURL=events.d.ts.map