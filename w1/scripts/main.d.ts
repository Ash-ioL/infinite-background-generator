export declare const canvas: HTMLCanvasElement;
export declare const ctx: CanvasRenderingContext2D;
declare enum CursorMode {
    None = "none",
    ClickDots = "click-dots",
    HoldDots = "hold-dots",
    Flashlight = "flashlight"
}
declare enum BackgroundMode {
    Black = "black",
    White = "white",
    Primary = "primary",
    Secondary = "secondary",
    Checkerboard = "checkerboard",
    RandomDots = "random-dots",
    Particles = "particles"
}
export declare let currentCursorMode: CursorMode;
export declare let currentBackgroundMode: BackgroundMode;
export declare function setCurrentModes(cursorMode: CursorMode, backgroundMode: BackgroundMode): void;
export declare function resetBackground(): void;
export { BackgroundMode, CursorMode };
//# sourceMappingURL=main.d.ts.map