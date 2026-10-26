import { BackgroundMode } from "./main.js";
export declare function drawBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentBackgroundMode: BackgroundMode): void;
export declare class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rad: number;
    radDev: number;
    color: string;
    static particleArray: Array<Particle>;
    constructor(x: number, y: number, vx: number, vy: number, rad: number, radDev: number, color: string);
    update(seconds: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    static clearParticles(): void;
    static prevTime: number;
    static animationFrameId: number | null;
    static stopRendering(): void;
    static renderParticles(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=background.d.ts.map