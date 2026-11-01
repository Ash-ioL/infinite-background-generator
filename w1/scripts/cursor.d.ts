import { CursorMode } from "./main.js";
export declare class CursorDot {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    rad: number;
    fillColor: string | null;
    static dotBoard: Array<CursorDot>;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number, fillColor: string | null);
    draw(): void;
    static drawAll(): void;
    static clearAll(): void;
    static add(dot: CursorDot): void;
}
export declare function initCursor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentCursorMode: CursorMode): void;
export declare function drawCursor(): void;
export declare function switchCursor(): void;
//# sourceMappingURL=cursor.d.ts.map