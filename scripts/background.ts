import { BackgroundMode, ctx } from "./main.js";
import { ColorUtil, DrawUtil, MouseUtil, RandomUtil } from "./util.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";

export function drawBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentBackgroundMode: BackgroundMode) {
    if (currentBackgroundMode === BackgroundMode.Black) {
        canvas.style.background = "black";
    } else if (currentBackgroundMode === BackgroundMode.White) {
        canvas.style.background = "white";
    } else if (currentBackgroundMode === BackgroundMode.Primary) {
        canvas.style.background = getPrimaryColor();
    } else if (currentBackgroundMode === BackgroundMode.Secondary) {
        canvas.style.background = getSecondaryColor();
    } else if (currentBackgroundMode == BackgroundMode.Checkerboard) {
        const size: number = 100;
        const width: number = window.innerWidth;
        const height: number = window.innerHeight;
        let outerToggle: boolean = false;
        for (let i: number = 0; i < height; i+=size) {
            let innerToggle: boolean = outerToggle ? false : true;
            for (let j: number = 0; j < width; j+=size) {
                if (innerToggle) ctx.fillStyle = getPrimaryColor();
                else ctx.fillStyle = getSecondaryColor();
                innerToggle = !innerToggle;
                ctx.fillRect(j, i, size, size);
            }
            outerToggle = !outerToggle;
        }
    } else if (currentBackgroundMode === BackgroundMode.RandomDots) {
        canvas.style.backgroundColor = "black";
        
    } else if (currentBackgroundMode === BackgroundMode.Particles) {
        if (Particle.particleArray.length === 0) {
            Particle.initParticles();
        }
        Particle.renderParticles(ctx);
    }
}

export class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rad: number;
    radDev: number;
    color: string;

    static particleArray: Array<Particle> = [];
    
    constructor(x: number, y: number, vx: number, vy: number, rad: number, radDev: number, color: string) {
        this.rad = rad + Math.floor(Math.random() * radDev);
        this.x = Math.max(rad+5, Math.min(window.innerWidth-(rad+5), x));
        this.y = Math.max(rad+5, Math.min(window.innerHeight-(rad+5), y));
        this.vx = vx;
        this.vy = vy;
        this.radDev = radDev;
        this.color = color;
        Particle.particleArray.push(this);
    }

    update(seconds: number) {
        this.x += this.vx * seconds;
        this.y += this.vy * seconds;

        if (this.x < 0 + this.rad || this.x > window.innerWidth - this.rad) {
            this.vx *= -1;
        }

        if (this.y < 0 + this.rad || this.y > window.innerHeight - this.rad) {
            this.vy *= -1;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        ctx.fill();
    }

    static clearParticles() {
        this.particleArray = [];
    }

    static prevTime: number = -1;
    // static animationFrameId: number | null = null;
    // static stopRendering() {
    //     if (Particle.animationFrameId !== null) {
    //         cancelAnimationFrame(Particle.animationFrameId);
    //         Particle.animationFrameId = null;
    //     }
    //     Particle.prevTime = -1;
    // }
    static renderParticles(ctx: CanvasRenderingContext2D) {
        if (!Particle.particleArray) return;
        if (Particle.prevTime === -1) {
            Particle.prevTime = Date.now() /  1000;
        } else {
            let curTime = Date.now() / 1000;
            let dt = curTime - Particle.prevTime;
            Particle.prevTime = curTime;
            DrawUtil.clearScreen(ctx);
            for (let p of Particle.particleArray) {
                p.update(dt);
                p.draw(ctx);
            }
        }
        // Particle.animationFrameId = requestAnimationFrame(() => {
        //     Particle.renderParticles(ctx);
        // });
    }

    static initParticles() {
        Particle.clearParticles();
        const numParticles = 50;
        const rad = 10;
        const radDev = 5;

        for (let i = 0; i < numParticles; i++) {
            const coords = RandomUtil.windowPosition();
            new Particle(
                coords[0]!,
                coords[1]!,
                (Math.random() * 10 + 2) * (Math.random() > 0.5 ? 1 : -1),
                (Math.random() * 10 + 2) * (Math.random() > 0.5 ? 1 : -1),
                rad,
                radDev,
                getColor(),
            );
        }
    }
}
