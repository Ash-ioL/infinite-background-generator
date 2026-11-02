import { getColor, getSecondaryColor } from "../input.js";
import { DrawUtil } from "../util.js";
import type Particle from "./Particle.ts";

export default class ParticleManager {
    particleArray: Array<Particle> = [];
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    drawLine(i: number, j: number, color: string = getSecondaryColor()) {
        const dot1 = this.particleArray[i];
        const dot2 = this.particleArray[j];
        if (dot1 && dot2) {
            const dx = dot1.x - dot2.x;
            const dy = dot1.y - dot2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                DrawUtil.drawLine(this.ctx, dot1.x, dot1.y, dot2.x, dot2.y, (dot1.vSize + dot2.vSize) / 20, color);
            }
        }
    }
    
    drawAllLines(color: string = getSecondaryColor()) {
        for (let i = 0; i < this.particleArray.length; i++) {
            for (let j = i + 1; j < this.particleArray.length; j++) {
                this.drawLine(i, j, color);
            }
        }
    }

    updateAll() {
        for (const dot of this.particleArray) {
            dot.update();
        }
    }

    drawAll(color: string = getColor()) {
        this.updateAll();
        for (let i = this.particleArray.length - 1; i >= 0; i--) {
            if (this.particleArray[i]!.rad <= 0) {
                this.particleArray.splice(i, 1);
            }
        }
        for (const dot of this.particleArray) {
            dot.draw(color);
        }
    }

    clearAll() {
        this.particleArray = [];
    }

    add(dot: any) {
        this.particleArray.push(dot);
    }

}