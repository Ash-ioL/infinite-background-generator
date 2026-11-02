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
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, vx: number | undefined, vy: number | undefined, rad: number, vSize: number | undefined, fillColor: string | null, bounce?: boolean);
    update(): void;
    draw(color?: string): void;
}
//# sourceMappingURL=Particle.d.ts.map