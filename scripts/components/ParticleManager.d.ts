import type Particle from "./Particle.ts";
export default class ParticleManager {
    particleArray: Array<Particle>;
    ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D);
    drawLine(i: number, j: number, color?: string): void;
    drawAllLines(color?: string): void;
    updateAll(): void;
    drawAll(color?: string, strokeColor?: string | null): void;
    clearAll(): void;
    add(dot: any): void;
}
//# sourceMappingURL=ParticleManager.d.ts.map