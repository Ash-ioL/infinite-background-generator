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
                DrawUtil.drawLine(this.ctx, dot1.x, dot1.y, dot2.x, dot2.y, (dot1.vSize + dot2.vSize) / 20, color);
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
    updateAll() {
        for (const dot of this.particleArray) {
            dot.update();
        }
    }
    drawAll(color = getColor()) {
        this.updateAll();
        for (let i = this.particleArray.length - 1; i >= 0; i--) {
            if (this.particleArray[i].rad <= 0) {
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
    add(dot) {
        this.particleArray.push(dot);
    }
}
//# sourceMappingURL=ParticleManager.js.map