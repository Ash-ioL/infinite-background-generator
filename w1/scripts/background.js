import { BackgroundMode, ctx } from "./main.js";
import { ColorUtil, DrawUtil, MouseUtil, RandomUtil } from "./util.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
export function drawBackground(canvas, ctx, currentBackgroundMode) {
    if (currentBackgroundMode === BackgroundMode.Black) {
        canvas.style.background = "black";
    }
    else if (currentBackgroundMode === BackgroundMode.White) {
        canvas.style.background = "white";
    }
    else if (currentBackgroundMode === BackgroundMode.Primary) {
        canvas.style.background = getPrimaryColor();
    }
    else if (currentBackgroundMode === BackgroundMode.Secondary) {
        canvas.style.background = getSecondaryColor();
    }
    else if (currentBackgroundMode == BackgroundMode.Checkerboard) {
        const size = 100;
        const width = window.innerWidth;
        const height = window.innerHeight;
        let outerToggle = false;
        for (let i = 0; i < height; i += size) {
            let innerToggle = outerToggle ? false : true;
            for (let j = 0; j < width; j += size) {
                if (innerToggle)
                    ctx.fillStyle = getPrimaryColor();
                else
                    ctx.fillStyle = getSecondaryColor();
                innerToggle = !innerToggle;
                ctx.fillRect(j, i, size, size);
            }
            outerToggle = !outerToggle;
        }
    }
    else if (currentBackgroundMode === BackgroundMode.RandomDots) {
        if (Particle.particleArray.length === 0) {
            Particle.initRandomColorStationary();
        }
        Particle.renderParticles(ctx);
    }
    else if (currentBackgroundMode === BackgroundMode.Particles) {
        if (Particle.particleArray.length === 0) {
            Particle.initParticles();
        }
        Particle.renderParticles(ctx);
    }
}
export class Particle {
    x;
    y;
    vx;
    vy;
    rad;
    radDev;
    color;
    static particleArray = [];
    constructor(x, y, vx, vy, rad, radDev, color) {
        this.rad = rad + Math.floor(Math.random() * radDev);
        this.x = Math.max(rad + 5, Math.min(window.innerWidth - (rad + 5), x));
        this.y = Math.max(rad + 5, Math.min(window.innerHeight - (rad + 5), y));
        this.vx = vx;
        this.vy = vy;
        this.radDev = radDev;
        this.color = color;
        Particle.particleArray.push(this);
    }
    update(seconds) {
        this.x += this.vx * seconds;
        this.y += this.vy * seconds;
        if (this.x < 0 + this.rad || this.x > window.innerWidth - this.rad) {
            this.vx *= -1;
        }
        if (this.y < 0 + this.rad || this.y > window.innerHeight - this.rad) {
            this.vy *= -1;
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        ctx.fill();
    }
    static clearParticles() {
        this.particleArray = [];
    }
    static prevTime = -1;
    // static animationFrameId: number | null = null;
    // static stopRendering() {
    //     if (Particle.animationFrameId !== null) {
    //         cancelAnimationFrame(Particle.animationFrameId);
    //         Particle.animationFrameId = null;
    //     }
    //     Particle.prevTime = -1;
    // }
    static renderParticles(ctx) {
        if (!Particle.particleArray)
            return;
        if (Particle.prevTime === -1) {
            Particle.prevTime = Date.now() / 1000;
        }
        else {
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
            new Particle(coords[0], coords[1], (Math.random() * 10 + 2) * (Math.random() > 0.5 ? 1 : -1), (Math.random() * 10 + 2) * (Math.random() > 0.5 ? 1 : -1), rad, radDev, getColor());
        }
    }
    static initRandomColorStationary() {
        Particle.clearParticles();
        const numDots = 50;
        const maxDeviation = 2;
        const minDeviation = 5;
        const rad = 10;
        const width = window.innerWidth;
        const height = window.innerHeight;
        //let dotColor = "white";
        for (let i = 0; i < numDots; i++) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);
            new Particle(x, y, 0, 0, rad, 5, ColorUtil.getRandomHex());
        }
    }
}
//# sourceMappingURL=background.js.map