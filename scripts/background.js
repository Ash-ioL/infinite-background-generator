import { BackgroundMode, ctx } from "./main.js";
import { ColorUtil, DrawUtil, MouseUtil, RandomUtil } from "./util.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
import Particle from "./components/Particle.js";
let numCircles = 50;
export class BackgroundParticle extends Particle {
    static particleArray = [];
}
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
        if (BackgroundParticle.particleArray.length === 0) {
            for (let i = 0; i < numCircles; i++) {
                const coords = RandomUtil.windowPosition();
                let particle = new BackgroundParticle(ctx, coords[0], coords[1], 0, 0, Math.floor(Math.random() * 10 + 5), Math.floor(Math.random() * 10 + 5), getColor(), false);
                console.log("bere add" + BackgroundParticle.particleArray.length);
                BackgroundParticle.add(particle);
                console.log("after add" + BackgroundParticle.particleArray.length);
            }
        }
        BackgroundParticle.drawAll();
    }
    else if (currentBackgroundMode === BackgroundMode.Particles) {
        if (BackgroundParticle.particleArray.length === 0) {
            if (Particle.particleArray.length === 0) {
                for (let i = 0; i < numCircles; i++) {
                    const coords = RandomUtil.windowPosition();
                    let particle = new BackgroundParticle(ctx, coords[0], coords[1], 0, 0, Math.floor(Math.random() * 10 + 5), Math.floor(Math.random() * 10 + 5), getColor(), true);
                    BackgroundParticle.add(particle);
                }
            }
        }
        BackgroundParticle.drawAll();
    }
    else if (currentBackgroundMode === BackgroundMode.RandomConstellations) {
        if (BackgroundParticle.particleArray.length === 0) {
            for (let i = 0; i < numCircles; i++) {
                const coords = RandomUtil.windowPosition();
                let particle = new BackgroundParticle(ctx, coords[0], coords[1], RandomUtil.randInt(-10, 10), RandomUtil.randInt(-10, 10), Math.floor(Math.random() * 10 + 5), Math.floor(Math.random() * 10 + 5), getColor(), true);
                BackgroundParticle.add(particle);
            }
        }
        BackgroundParticle.drawAll();
    }
}
//# sourceMappingURL=background.js.map