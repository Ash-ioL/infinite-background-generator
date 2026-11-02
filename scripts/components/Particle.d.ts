export default class Particle {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    vx: number;
    vy: number;
    vSize: number;
    rad: number;
    fillColor: string | null;
    prevTime: number;
    bounce: boolean;
    static particleArray: Array<Particle>;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, vx: number | undefined, vy: number | undefined, rad: number, vSize: number | undefined, fillColor: string | null, bounce?: boolean);
    update(): void;
    draw(color?: string): void;
    drawLine(i: number, j: number, color?: string): void;
    static drawAllLines(color?: string): void;
    static updateAll(): void;
    static drawAll(color?: string): void;
    static clearAll(): void;
    static add(dot: any): void;
}
//# sourceMappingURL=Particle.d.ts.map