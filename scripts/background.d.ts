import { BackgroundMode } from "./main.js";
import Particle from "./components/Particle.js";
export declare class BackgroundParticle extends Particle {
    static particleArray: Array<Particle>;
}
export declare function drawBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentBackgroundMode: BackgroundMode): void;
//# sourceMappingURL=background.d.ts.map