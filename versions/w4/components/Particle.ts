import { getColor, getSecondaryColor } from "../input.js";
import { DrawUtil } from "../util.js";
import type { Supplier } from "./Supplier.js";

export default class Particle {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    vx: number;
    vy: number;
    vSize: number;
    rad: number;
    bounce: boolean = true;
    occilation: number = 0;
    occilationStart: number = 0;

    prevTime: number = -1;
    bornTime: number = Date.now() / 1000;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, vx: number = 0, vy: number = 0, rad: number, vSize: number = 0, bounce: boolean = true, occilation: number = 0, occilationStart: number = 0) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.vSize = vSize;
        this.rad = rad;
        this.bounce = bounce;
        this.occilation = occilation;
        this.occilationStart = occilationStart;
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

        if (this.bounce) {
            if (this.x < 0 + this.rad || this.x > window.innerWidth - this.rad) {
                if (this.x < 0 + this.rad) {
                    this.x = 0 + this.rad;
                } else if (this.x > window.innerWidth - this.rad) {
                    this.x = window.innerWidth - this.rad;
                }
                
                this.vx *= -1;
            }

            if (this.y < 0 + this.rad || this.y > window.innerHeight - this.rad) {
                if (this.y < 0 + this.rad) {
                    this.y = 0 + this.rad;
                } else if (this.y > window.innerHeight - this.rad) {
                    this.y = window.innerHeight - this.rad;
                }

                this.vy *= -1;
            }

            if (this.occilation > 0) {
                const timeSinceBorn = Date.now() / 1000 - this.bornTime;
                this.rad += this.occilation * Math.sin(timeSinceBorn + this.occilationStart);
                this.rad = Math.max(0, this.rad);
            }
        }
    }
    
    draw(color: string = getColor(), strokeColor: string | null = getSecondaryColor()) {
        if (this.rad <= 0) return;
        if (strokeColor === null) {
            DrawUtil.drawCircle(this.ctx, this.x, this.y, this.rad, color);
        } else {
            DrawUtil.drawCircle(this.ctx, this.x, this.y, this.rad, color, this.rad / 10, strokeColor); 
        }
    }
}