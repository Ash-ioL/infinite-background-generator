import { BackgroundMode, ctx } from "./main.js";
import { ColorUtil, DrawUtil, MouseUtil, RandomUtil } from "./util.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
import Particle from "./components/Particle.js";

let numCircles: number = 50;
export class BackgroundParticle extends Particle {

}

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
        if (BackgroundParticle.particleArray.length === 0) {
            for (let i: number = 0; i < numCircles; i++) {
                const coords = RandomUtil.windowPosition();
                let particle: BackgroundParticle = new BackgroundParticle(
                    ctx,
                    coords[0]!,
                    coords[1]!,
                    0,
                    0,
                    Math.floor(Math.random() * 10 + 5),
                    Math.floor(Math.random() * 10 + 5),
                    getColor(),
                    true
                );
                BackgroundParticle.add(particle);
            }
        }
        BackgroundParticle.drawAll();
    } else if (currentBackgroundMode === BackgroundMode.Particles) {
        if (BackgroundParticle.particleArray.length === 0) {
            if (Particle.particleArray.length === 0) {
                for (let i: number = 0; i < numCircles; i++) {
                    const coords = RandomUtil.windowPosition();
                    let particle: BackgroundParticle = new BackgroundParticle(
                        ctx,
                        coords[0]!,
                        coords[1]!,
                        0,
                        0,
                        Math.floor(Math.random() * 10 + 5),
                        Math.floor(Math.random() * 10 + 5),
                        getColor(),
                        true
                    );
                    BackgroundParticle.add(particle);
                }
            }
        }
        BackgroundParticle.drawAll();
    } else if (currentBackgroundMode === BackgroundMode.RandomConstellations) {
        if (BackgroundParticle.particleArray.length === 0) {
            for (let i: number = 0; i < numCircles; i++) {
                const coords = RandomUtil.windowPosition();
                let particle: BackgroundParticle = new BackgroundParticle(
                    ctx,
                    coords[0]!,
                    coords[1]!,
                    RandomUtil.randInt(-10, 10),
                    RandomUtil.randInt(-10, 10),
                    Math.floor(Math.random() * 10 + 5),
                    Math.floor(Math.random() * 10 + 5),
                    getColor(),
                    true
                );
                BackgroundParticle.add(particle);
            }
        }
        BackgroundParticle.drawAll();
    }
}