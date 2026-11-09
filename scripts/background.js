import { BackgroundMode, ctx, getCtx, getParticleManager } from "./main.js";
import { ColorUtil, DrawUtil, MouseUtil, RandomUtil } from "./util.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
import Particle from "./components/Particle.js";
import ParticleManager from "./components/ParticleManager.js";
import { getPerlinGrid, drawMap, drawCaves, drawIslands, drawRawPerlinGrid } from "../perlin_noise/perlin.js";
import { RNG } from "../perlin_noise/rng.js";
let numCircles = 50;
let backgroundManager = new ParticleManager(getCtx());
let perlinGrid;
let seed = Math.floor(Math.random() * 1000);
export function initBackground(ctx, currentBackgroundMode) {
    backgroundManager.clearAll();
    if (currentBackgroundMode === BackgroundMode.RandomDots) {
        for (let i = 0; i < numCircles; i++) {
            for (let i = 0; i < numCircles; i++) {
                const coords = RandomUtil.windowPosition();
                let particle = new Particle(ctx, coords[0], coords[1], 0, 0, Math.floor(Math.random() * 10 + 5), 0, false);
                backgroundManager.add(particle);
            }
        }
    }
    else if (currentBackgroundMode === BackgroundMode.Particles) {
        for (let i = 0; i < numCircles; i++) {
            const coords = RandomUtil.windowPosition();
            let particle = new Particle(ctx, coords[0], coords[1], RandomUtil.randInt(-10, 10), RandomUtil.randInt(-10, 10), Math.floor(Math.random() * 10 + 5), 0, true);
            backgroundManager.add(particle);
        }
    }
    else if (currentBackgroundMode === BackgroundMode.RandomConstellations) {
        for (let i = 0; i < numCircles; i++) {
            const coords = RandomUtil.windowPosition();
            let particle = new Particle(ctx, coords[0], coords[1], RandomUtil.randInt(-10, 10), RandomUtil.randInt(-10, 10), Math.floor(Math.random() * 10 + 5), 0, true);
            backgroundManager.add(particle);
        }
    }
    else if (currentBackgroundMode === BackgroundMode.ShimmeringStars) {
        for (let i = 0; i < numCircles; i++) {
            const coords = RandomUtil.windowPosition();
            let particle = new Particle(ctx, coords[0], coords[1], RandomUtil.randInt(-0.1, 0.1), RandomUtil.randInt(-0.1, 0.1), Math.floor(Math.random() * 3 + 2), 0, true, RandomUtil.randInt(1, 5) / 100, Math.random() * Math.PI * 2);
            backgroundManager.add(particle);
        }
    }
    else if (currentBackgroundMode === BackgroundMode.ParticleCollisions) {
        for (let i = 0; i < numCircles; i++) {
            const coords = RandomUtil.windowPosition();
            let particle = new Particle(ctx, coords[0], coords[1], RandomUtil.randInt(-25, 25), RandomUtil.randInt(-25, 25), Math.floor(Math.random() * 5 + 15), 0, true);
            backgroundManager.add(particle);
        }
    }
    else if (currentBackgroundMode === BackgroundMode.BFSIslands) {
        seed = Math.floor(Math.random() * 1000);
    }
    else if (currentBackgroundMode === BackgroundMode.PerlinNoise) {
        seed = Math.floor(Math.random() * 1000);
        perlinGrid = getPerlinGrid(4);
    }
    else if (currentBackgroundMode === BackgroundMode.CaveCarving) {
        seed = Math.floor(Math.random() * 1000);
    }
    else if (currentBackgroundMode === BackgroundMode.Map) {
        seed = Math.floor(Math.random() * 1000);
        perlinGrid = getPerlinGrid(4);
    }
}
export function drawBackground(canvas, ctx, currentBackgroundMode) {
    if (currentBackgroundMode === BackgroundMode.Primary) {
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
        backgroundManager.drawAll(getPrimaryColor(), getSecondaryColor());
    }
    else if (currentBackgroundMode === BackgroundMode.Particles) {
        backgroundManager.drawAll(getPrimaryColor(), getSecondaryColor());
    }
    else if (currentBackgroundMode === BackgroundMode.RandomConstellations) {
        backgroundManager.drawAllLines(getSecondaryColor());
        backgroundManager.drawAll(getPrimaryColor());
    }
    else if (currentBackgroundMode === BackgroundMode.ShimmeringStars) {
        backgroundManager.drawAll(getPrimaryColor(), getSecondaryColor());
    }
    else if (currentBackgroundMode === BackgroundMode.ParticleCollisions) {
        backgroundManager.drawAll(getPrimaryColor(), getSecondaryColor(), true);
    }
    else if (currentBackgroundMode === BackgroundMode.BFSIslands) {
        RNG.setSeed(seed);
        drawIslands();
    }
    else if (currentBackgroundMode === BackgroundMode.PerlinNoise) {
        drawRawPerlinGrid(perlinGrid);
    }
    else if (currentBackgroundMode === BackgroundMode.CaveCarving) {
        RNG.setSeed(seed);
        drawCaves();
    }
    else if (currentBackgroundMode === BackgroundMode.Map) {
        drawMap(perlinGrid);
    }
}
//# sourceMappingURL=background.js.map