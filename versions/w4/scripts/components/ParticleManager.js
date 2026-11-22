import { getColor, getSecondaryColor } from "../input.js";
import { DrawUtil } from "../util.js";
export default class ParticleManager {
    particleArray = [];
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
    }
    drawLine(i, j, color = getSecondaryColor()) {
        const dot1 = this.particleArray[i];
        const dot2 = this.particleArray[j];
        if (dot1 && dot2) {
            const dx = dot1.x - dot2.x;
            const dy = dot1.y - dot2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                DrawUtil.drawLine(this.ctx, dot1.x, dot1.y, dot2.x, dot2.y, (dot1.rad + dot2.rad) / 20, color);
            }
        }
    }
    drawAllLines(color = getSecondaryColor()) {
        for (let i = 0; i < this.particleArray.length; i++) {
            for (let j = i + 1; j < this.particleArray.length; j++) {
                this.drawLine(i, j, color);
            }
        }
    }
    updateAll(collideBounce = false) {
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
                        if (dist === 0)
                            continue;
                        if (dist < dot1.rad + dot2.rad) {
                            const overlap = dot1.rad + dot2.rad - dist;
                            const separationX = (dx / dist) * (overlap / 2);
                            const separationY = (dy / dist) * (overlap / 2);
                            dot1.x += separationX;
                            dot1.y += separationY;
                            dot2.x -= separationX;
                            dot2.y -= separationY;
                            let angle = Math.atan2(dy, dx);
                            let speed1 = Math.sqrt(dot1.vx * dot1.vx + dot1.vy * dot1.vy);
                            let speed2 = Math.sqrt(dot2.vx * dot2.vx + dot2.vy * dot2.vy);
                            let dot1Angle = Math.atan2(dot1.vy, dot1.vx);
                            let dot2Angle = Math.atan2(dot2.vy, dot2.vx);
                            let bounceAngle1 = 2 * angle - dot1Angle;
                            let bounceAngle2 = 2 * angle - dot2Angle;
                            if (bounceAngle1 > Math.PI)
                                bounceAngle1 -= 2 * Math.PI;
                            if (bounceAngle1 < -Math.PI)
                                bounceAngle1 += 2 * Math.PI;
                            if (bounceAngle2 > Math.PI)
                                bounceAngle2 -= 2 * Math.PI;
                            if (bounceAngle2 < -Math.PI)
                                bounceAngle2 += 2 * Math.PI;
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
    drawAll(color = getColor(), strokeColor = getSecondaryColor(), collideBounce = false) {
        this.updateAll(collideBounce);
        for (let i = this.particleArray.length - 1; i >= 0; i--) {
            if (this.particleArray[i].rad <= 0) {
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
    add(dot) {
        this.particleArray.push(dot);
    }
}
//# sourceMappingURL=ParticleManager.js.map