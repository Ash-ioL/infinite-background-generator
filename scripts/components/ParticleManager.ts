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

    updateAll(collideBounce: boolean = false) {
        for (const dot of this.particleArray) {
            dot.update();
        }
        if (collideBounce) {
            for (let i = 0; i < this.particleArray.length; i++) {
                for (let j = i + 1; j < this.particleArray.length; j++) {
                    const dot1 = this.particleArray[i];
                    const dot2 = this.particleArray[j];

                    if (dot1 && dot2) {
                        const dx = dot1.x - dot2.x;
                        const dy = dot1.y - dot2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist === 0) continue;
                        if (dist < dot1.rad + dot2.rad) {
                            let overlap = dot1.rad + dot2.rad - dist;
                            let newDx = Math.abs(dx * (overlap / dist));
                            let newDy = Math.abs(dy * (overlap / dist));

                            if (dot1.x > dot2.x) {
                                dot1.x += newDx / 2;
                                dot2.x -= newDx / 2;
                            } else {
                                dot1.x -= newDx / 2;
                                dot2.x += newDx / 2;
                            }

                            if (dot1.y > dot2.y) {
                                dot1.y += newDy / 2;
                                dot2.y -= newDy / 2;
                            } else {
                                dot1.y -= newDy / 2;
                                dot2.y += newDy / 2;
                            }

                            let angle = Math.atan2(dy, dx);

                            let speed1 = Math.sqrt(dot1.vx * dot1.vx + dot1.vy * dot1.vy);
                            let speed2 = Math.sqrt(dot2.vx * dot2.vx + dot2.vy * dot2.vy);

                            let dot1Angle = Math.atan2(dot1.vy, dot1.vx);
                            let dot2Angle = Math.atan2(dot2.vy, dot2.vx);

                            let bounceAngle1 = 2*angle - dot1Angle;
                            let bounceAngle2 = 2*angle - dot2Angle;

                            if (bounceAngle1 > Math.PI) bounceAngle1 -= 2 * Math.PI;
                            if (bounceAngle1 < -Math.PI) bounceAngle1 += 2 * Math.PI;
                            
                            if (bounceAngle2 > Math.PI) bounceAngle2 -= 2 * Math.PI;
                            if (bounceAngle2 < -Math.PI) bounceAngle2 += 2 * Math.PI;

                            dot1.vx = speed1 * Math.cos(bounceAngle1);
                            dot1.vy = speed1 * Math.sin(bounceAngle1);

                            dot2.vx = speed2 * Math.cos(bounceAngle2);
                            dot2.vy = speed2 * Math.sin(bounceAngle2);
                        }
                    }
                }
            }
        }
    }

    drawAll(color: string = getColor(), strokeColor: string | null = getSecondaryColor(), collideBounce: boolean = false) {
        this.updateAll(collideBounce);
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