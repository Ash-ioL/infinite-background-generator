import { CursorMode } from "./main.js";
export declare class CursorDot {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    vx: number;
    vy: number;
    vSize: number;
    rad: number;
    fillColor: string | null;
    prevTime: number;
    static dotBoard: Array<CursorDot>;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number, fillColor: string | null, vx?: number, vy?: number, vSize?: number);
    update(): void;
    draw(color?: string): void;
    drawLine(i: number, j: number, color?: string): void;
    static drawAllLines(color?: string): void;
    static updateAll(): void;
    static drawAll(color?: string): void;
    static clearAll(): void;
    static add(dot: CursorDot): void;
}
export declare function initCursor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentCursorMode: CursorMode): void;
export declare function drawCursor(): void;
export declare function switchCursor(): void;
//# sourceMappingURL=cursor.d.ts.map