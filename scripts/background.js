import { BackgroundMode } from "./main.js";
import { ColorUtil, DrawUtil, MouseUtil, RandomUtil } from "./util.js";
export function drawBackground(canvas, ctx, currentBackgroundMode) {
    if (currentBackgroundMode === BackgroundMode.Black) {
        canvas.style.background = "black";
    }
    else if (currentBackgroundMode === BackgroundMode.White) {
        canvas.style.background = "white";
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
                    ctx.fillStyle = "white";
                else
                    ctx.fillStyle = "black";
                innerToggle = !innerToggle;
                ctx.fillRect(j, i, size, size);
            }
            outerToggle = !outerToggle;
        }
    }
    else if (currentBackgroundMode === BackgroundMode.RandomDots) {
        canvas.style.backgroundColor = "black";
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
            let radDev = Math.floor(Math.random() * (maxDeviation + minDeviation + 1)) + minDeviation;
            ctx.fillStyle = ColorUtil.getRandomDarkHex();
            // ctx.strokeStyle = "white";
            // ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.arc(x, y, rad + radDev, 0, Math.PI * 2);
            // ctx.stroke();
            ctx.fill();
        }
    }
    else if (currentBackgroundMode === BackgroundMode.Particles) {
        canvas.style.backgroundColor = "black";
        const numParticles = 50;
        const deviation = 5;
        const rad = 10;
        const width = window.innerWidth;
        const height = window.innerHeight;
        Particle.clearParticles();
        for (let i = 0; i < numParticles; i++) {
            const coords = RandomUtil.windowPosition();
            new Particle(coords[0], coords[1], (Math.random() * 10 + 2) * (Math.random() > 0.5 ? 1 : -1), (Math.random() * 10 + 2) * (Math.random() > 0.5 ? 1 : -1), rad, deviation, ColorUtil.getRandomHex());
        }
        Particle.renderParticles(ctx);
    }
}
class Particle {
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
        requestAnimationFrame(() => {
            Particle.renderParticles(ctx);
        });
    }
}
//# sourceMappingURL=background.js.map