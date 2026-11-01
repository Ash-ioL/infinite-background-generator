import { CursorParticle } from "../cursor";
import { getColor, getSecondaryColor } from "../input";
import { DrawUtil } from "../util";

export default class Particle {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    vx: number;
    vy: number;
    vSize: number;
    rad: number;
    fillColor: string | null;
    prevTime: number = -1;
    bounce: boolean = true;

    static particleArray: Array<Particle> = [];

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, vx: number = 0, vy: number = 0, rad: number, vSize: number = 0, fillColor: string | null, bounce: boolean = true) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.vSize = vSize;
        this.rad = rad;
        this.fillColor = fillColor;
        this.bounce = bounce;
    }

    update() {
        if (this.prevTime === -1) {
            this.prevTime = Date.now() / 1000;
            return;
        }
        let dt = Date.now() / 1000 - this.prevTime;
        this.prevTime = Date.now() / 1000;

        let seconds = dt;


        this.rad += this.vSize * seconds;
        this.x += this.vx * seconds;
        this.y += this.vy * seconds;
        this.rad += this.vSize * seconds;

        if (this.bounce) {
            if (this.x < 0 + this.rad || this.x > window.innerWidth - this.rad) {
                this.vx *= -1;
            }

            if (this.y < 0 + this.rad || this.y > window.innerHeight - this.rad) {
                this.vy *= -1;
            }
        }
    }

    draw(color: string = getColor()) {
        if (this.rad <= 0) return;
        DrawUtil.drawCircle(this.ctx, this.x, this.y, this.rad, this.fillColor ?? color); 
    }

    drawLine(i: number, j: number, color: string = getSecondaryColor()) {
        const dot1 = CursorParticle.particleArray[i];
        const dot2 = CursorParticle.particleArray[j];
        if (dot1 && dot2) {
            const dx = dot1.x - dot2.x;
            const dy = dot1.y - dot2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                DrawUtil.drawLine(this.ctx, dot1.x, dot1.y, dot2.x, dot2.y, (dot1.vSize + dot2.vSize) / 20, color);
            }
        }
    }

    static drawAllLines(color: string = getSecondaryColor()) {
        for (let i = 0; i < CursorParticle.particleArray.length; i++) {
            for (let j = i + 1; j < CursorParticle.particleArray.length; j++) {
                CursorParticle.particleArray[i]!.drawLine(i, j, color);
            }
        }
    }

    static updateAll() {
        for (const dot of CursorParticle.particleArray) {
            dot.update();
        }
    }

    static drawAll(color: string = getColor()) {
        CursorParticle.updateAll();
        for (let i = CursorParticle.particleArray.length - 1; i >= 0; i--) {
            if (CursorParticle.particleArray[i]!.rad <= 0) {
                CursorParticle.particleArray.splice(i, 1);
            }
        }
        for (const dot of CursorParticle.particleArray) {
            dot.draw(color);
        }
    }

    static clearAll() {
        CursorParticle.particleArray = [];
    }

    static add(dot: CursorParticle) {
        CursorParticle.particleArray.push(dot);
    }
}