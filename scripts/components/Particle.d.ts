export default class Particle {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    vx: number;
    vy: number;
    vSize: number;
    rad: number;
    prevTime: number;
    bounce: boolean;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, vx: number | undefined, vy: number | undefined, rad: number, vSize?: number, bounce?: boolean);
    update(): void;
    draw(color?: string, strokeColor?: string | null): void;
}
//# sourceMappingURL=Particle.d.ts.map