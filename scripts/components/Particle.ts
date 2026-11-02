import { getColor, getSecondaryColor } from "../input.js";
import { DrawUtil } from "../util.js";

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
}