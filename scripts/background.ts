import { BackgroundMode, ctx, getCtx, getParticleManager } from "./main.js";
import { ColorUtil, DrawUtil, MouseUtil, RandomUtil } from "./util.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
import Particle from "./components/Particle.js";
import ParticleManager from "./components/ParticleManager.js";

let numCircles: number = 50;

let backgroundManager = new ParticleManager(getCtx());

export function initBackground(ctx: CanvasRenderingContext2D, currentBackgroundMode: BackgroundMode) {
    backgroundManager.clearAll();
    if (currentBackgroundMode === BackgroundMode.RandomDots) {
        for (let i: number = 0; i < numCircles; i++) {
            for (let i: number = 0; i < numCircles; i++) {
                const coords = RandomUtil.windowPosition();
                let particle: Particle = new Particle(
                    ctx,
                    coords[0]!,
                    coords[1]!,
                    0,
                    0,
                    Math.floor(Math.random() * 10 + 5),
                    0,
                    false
                );
                backgroundManager.add(particle);
            }
        }
    } else if (currentBackgroundMode === BackgroundMode.Particles) {
        for (let i: number = 0; i < numCircles; i++) {
            const coords = RandomUtil.windowPosition();
            let particle: Particle = new Particle(
                ctx,
                coords[0]!,
                coords[1]!,
                RandomUtil.randInt(-10, 10),
                RandomUtil.randInt(-10, 10),
                Math.floor(Math.random() * 10 + 5),
                0,
                true
            );
            backgroundManager.add(particle);
        }
    } else if (currentBackgroundMode === BackgroundMode.RandomConstellations) {
        for (let i: number = 0; i < numCircles; i++) {
            const coords = RandomUtil.windowPosition();
            let particle: Particle = new Particle(
                ctx,
                coords[0]!,
                coords[1]!,
                RandomUtil.randInt(-10, 10),
                RandomUtil.randInt(-10, 10),
                Math.floor(Math.random() * 10 + 5),
                0,
                true
            );
            backgroundManager.add(particle);
        }
    }
}

export function drawBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentBackgroundMode: BackgroundMode) {
    if (currentBackgroundMode === BackgroundMode.Primary) {
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
        backgroundManager.drawAll(getPrimaryColor(), getSecondaryColor());
    } else if (currentBackgroundMode === BackgroundMode.Particles) {
        backgroundManager.drawAll(getPrimaryColor(), getSecondaryColor());
    } else if (currentBackgroundMode === BackgroundMode.RandomConstellations) {
        backgroundManager.drawAllLines(getSecondaryColor());
        backgroundManager.drawAll(getPrimaryColor(), null);
    }
}