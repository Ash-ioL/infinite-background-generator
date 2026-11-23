import { BackgroundMode, ctx, getCtx, getParticleManager } from "./main.js";
import { ColorUtil, DrawUtil, MouseUtil, RandomUtil } from "./util.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
import Particle from "./components/Particle.js";
import ParticleManager from "./components/ParticleManager.js";
import { getPerlinGrid, drawMap, drawCaves, drawIslands, drawRawPerlinGrid } from "./algorithms/perlin.js";
import { RNG } from "./util.js";
import type { KeyboardEvents } from "./events.js";
import { setKeyboardEvents } from "./events.js";
import { requestFrame, type BrotVars } from "./algorithms/mandelbrot.js";
import { drawPoints, getPoints } from "./algorithms/poissonDiskSampling.js";
import { drawGrid, updateGridIfTime } from "./algorithms/conways.js";
import { drawMaze, getMaze } from "./algorithms/maze.js";
import type { MazeBox } from "./components/MazeBox.js";

let numCircles: number = 50;

let backgroundManager = new ParticleManager(getCtx());

let perlinGrid: Array<Array<number>>;
let seed: number = Math.floor(Math.random() * 1000);
let mandelbrotVars: BrotVars = {
    center: [0, 0],
    stepSize: 0.05,
    zoom: 2.25,
    k: 50,
}
let bridsonPoints: Array<Array<number>> = [];
let maze: Array<Array<MazeBox>> = [];

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
    } else if (currentBackgroundMode === BackgroundMode.ShimmeringStars) {
        for (let i: number = 0; i < numCircles; i++) {
            const coords = RandomUtil.windowPosition();
            let particle: Particle = new Particle(
                ctx,
                coords[0]!,
                coords[1]!,
                RandomUtil.randInt(-0.1, 0.1),
                RandomUtil.randInt(-0.1, 0.1),
                Math.floor(Math.random() * 3 + 2),
                0,
                true,
                RandomUtil.randInt(1, 5) / 100,
                Math.random() * Math.PI * 2
            );
            backgroundManager.add(particle);
        }
    } else if (currentBackgroundMode === BackgroundMode.ParticleCollisions) {
        for (let i: number = 0; i < numCircles; i++) {
            const coords = RandomUtil.windowPosition();
            let particle: Particle = new Particle(
                ctx, coords[0]!, coords[1]!, RandomUtil.randInt(-25, 25), RandomUtil.randInt(-25, 25), Math.floor(Math.random() * 5 + 15), 0, true
            );
            backgroundManager.add(particle);
        }
    } else if (currentBackgroundMode === BackgroundMode.BFSIslands) {
        seed = Math.floor(Math.random() * 1000);
    } else if (currentBackgroundMode === BackgroundMode.PerlinNoise) {
        seed = Math.floor(Math.random() * 1000);
        RNG.setSeed(seed);
        perlinGrid = getPerlinGrid(4);
    } else if (currentBackgroundMode === BackgroundMode.CaveCarving) {
        seed = Math.floor(Math.random() * 1000);
    } else if (currentBackgroundMode === BackgroundMode.Map) {
        seed = Math.floor(Math.random() * 1000);
        RNG.setSeed(seed);
        perlinGrid = getPerlinGrid(4);
    } else if (currentBackgroundMode === BackgroundMode.Mandelbrot) {

        const newKeyboardEvents: KeyboardEvents = {
            keyPressses(e: KeyboardEvent) {
                if (e.key === "w") mandelbrotVars.center[1]! -= mandelbrotVars.stepSize * mandelbrotVars.zoom; 
                if (e.key === "a") mandelbrotVars.center[0]! -= mandelbrotVars.stepSize * mandelbrotVars.zoom;
                if (e.key === "s") mandelbrotVars.center[1]! += mandelbrotVars.stepSize * mandelbrotVars.zoom;
                if (e.key === "d") mandelbrotVars.center[0]! += mandelbrotVars.stepSize * mandelbrotVars.zoom;
                if (e.key === "e") mandelbrotVars.zoom *= 0.99;
                if (e.key === "q") mandelbrotVars.zoom *= 1.01;
            }
        }
        setKeyboardEvents(
            newKeyboardEvents
        );
    } else if (currentBackgroundMode === BackgroundMode.Bridson) {
        seed = Math.floor(Math.random() * 1000);
        bridsonPoints = getPoints();
    } else if (currentBackgroundMode === BackgroundMode.Conways) {
        seed = Math.floor(Math.random() * 1000);
    } else if (currentBackgroundMode === BackgroundMode.Maze) {
        seed = Math.floor(Math.random() * 1000);
        maze = getMaze();
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
        backgroundManager.drawAll(getPrimaryColor());
    } else if (currentBackgroundMode === BackgroundMode.ShimmeringStars) {
        backgroundManager.drawAll(getPrimaryColor(), getSecondaryColor());
    } else if (currentBackgroundMode === BackgroundMode.ParticleCollisions) {
        backgroundManager.drawAll(getPrimaryColor(), getSecondaryColor(), true);
    } else if (currentBackgroundMode === BackgroundMode.BFSIslands) {
        RNG.setSeed(seed);
        drawIslands();
    } else if (currentBackgroundMode === BackgroundMode.PerlinNoise) {
        RNG.setSeed(seed);
        drawRawPerlinGrid(perlinGrid);
    } else if (currentBackgroundMode === BackgroundMode.CaveCarving) {
        RNG.setSeed(seed);
        drawCaves();
    } else if (currentBackgroundMode === BackgroundMode.Map) {
        drawMap(perlinGrid);
    } else if (currentBackgroundMode === BackgroundMode.Mandelbrot) {
        ctx.putImageData(requestFrame(), 0, 0);
    } else if (currentBackgroundMode === BackgroundMode.Bridson) {
        drawPoints(bridsonPoints, 1, getPrimaryColor());
    } else if (currentBackgroundMode === BackgroundMode.Conways) {
        updateGridIfTime();
        drawGrid(canvas, ctx, getPrimaryColor(), getSecondaryColor());
    } else if (currentBackgroundMode === BackgroundMode.Maze) {
        RNG.setSeed(seed);
        drawMaze(canvas, ctx, maze, getPrimaryColor());
    }
}