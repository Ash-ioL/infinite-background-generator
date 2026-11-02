import { getColor, getSecondaryColor } from "../input.js";
import { DrawUtil } from "../util.js";
import type Particle from "./Particle.ts";

export default class ParticleManager {
    particleArray: Array<Particle> = [];
    ctx: CanvasRenderingContext2D;
    collideBounce: boolean;

    constructor(ctx: CanvasRenderingContext2D, collideBounce: boolean = false) {
        this.ctx = ctx;
        this.collideBounce = collideBounce;
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
        if (this.collideBounce) {
            for (let i = 0; i < this.particleArray.length; i++) {
                for (let j = i + 1; j < this.particleArray.length; j++) {
                    const dot1 = this.particleArray[i];
                    const dot2 = this.particleArray[j];

                    if (dot1 && dot2) {
                        const dx = dot1.x - dot2.x;
                        const dy = dot1.y - dot2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist === 0) return;
                        if (dist < dot1.rad + dot2.rad) {
                            let overlap = dot1.rad + dot2.rad - dist;
                            let newDx = dx * (overlap / dist);
                            let newDy = dy * (overlap / dist);

                            if (dot1.x > dot2.x) {
                                dot1.x += newDx / 2;
                                dot2.x -= newDx / 2;
                            } else {
                                dot1.x += newDx / 2;
                                dot2.x -= newDx / 2;
                            }

                            if (dot1.y > dot2.y) {
                                dot1.y += newDy / 2;
                                dot2.y -= newDy / 2;
                            } else {
                                dot1.y += newDy / 2;
                                dot2.y -= newDy / 2;
                            }

                            
                        }
                    }
                }
            }
        }
    }

    drawAll(color: string = getColor(), strokeColor: string | null = getSecondaryColor()) {
        this.updateAll();
        for (let i = this.particleArray.length - 1; i >= 0; i--) {
            if (this.particleArray[i]!.rad <= 0) {
                this.particleArray.splice(i, 1);
            }
        }
        for (const dot of this.particleArray) {
            dot.draw(color, strokeColor);
        }
    }

    clearAll() {
        this.particleArray = [];
    }

    add(dot: any) {
        this.particleArray.push(dot);
    }

}