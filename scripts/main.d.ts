export declare const canvas: HTMLCanvasElement;
export declare const ctx: CanvasRenderingContext2D;
declare enum CursorMode {
    None = 0,
    ClickDots = 1,
    HoldDots = 2,
    Debug = 3,
    Flashlight = 4
}
declare enum BackgroundMode {
    Black = 0,
    White = 1,
    Primary = 2,
    Secondary = 3,
    Checkerboard = 4,
    RandomDots = 5,
    Particles = 6
}
export declare let currentCursorMode: CursorMode;
export declare let currentBackgroundMode: BackgroundMode;
export declare function setCurrentModes(cursorMode: CursorMode, backgroundMode: BackgroundMode): void;
export declare function resetBackground(): void;
export { BackgroundMode, CursorMode };
//# sourceMappingURL=main.d.ts.map