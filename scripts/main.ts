import { drawBackground } from "./background.js";
import ParticleManager from "./components/ParticleManager.js";
import { drawCursor } from "./cursor.js";
import { initMouseEvents, mouseTasks } from "./events.js";
import { readBackground, readCursor, resetBackgroundAndCursor } from "./input.js";
import { setMainLoop, type LoopSet } from "./taskScheduler.js";
import { DrawUtil } from "./util.js";

export const canvas: HTMLCanvasElement = document.getElementById("whiteboard") as HTMLCanvasElement;
export const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resetBackgroundAndCursor(currentBackgroundMode, currentCursorMode);
})

// console.log(canvas); 
// console.log(ctx)

enum CursorMode {
    None = "none",
    ClickDots = "click-dots",
    HoldDots = "hold-dots",
    //Debug = "debug",
    Flashlight = "flashlight",
    Expel = "expel",
    SlowDrift = "slow-drift",
    Constellations = "constellations"
}

enum BackgroundMode {
    Primary = "primary",
    Secondary = "secondary",
    Checkerboard = "checkerboard",
    RandomDots = "random-dots",
    Particles = "particles",
    RandomConstellations = "random-constellations",
    ShimmeringStars = "shimmering-stars"
}

export let currentCursorMode: CursorMode = CursorMode.Flashlight as CursorMode;
export let currentBackgroundMode: BackgroundMode = BackgroundMode.Particles as BackgroundMode;

export function setCurrentModes(cursorMode: CursorMode, backgroundMode: BackgroundMode) {
    currentCursorMode = cursorMode;
    currentBackgroundMode = backgroundMode;
    console.log(currentCursorMode);
    console.log(currentBackgroundMode);
}

// function draw() {
//     drawBackground(canvas, ctx, currentBackgroundMode);
//     drawCursor(canvas, ctx, currentCursorMode);
// }

export function resetBackground() {
    drawBackground(canvas, ctx, currentBackgroundMode);
}

export function getParticleManager() {
    return new ParticleManager(ctx);
}

let newLoop: LoopSet = {
    before() {
        DrawUtil.clearScreen(ctx);
    },
    background() {
        drawBackground(canvas, ctx, currentBackgroundMode);
    },
    cursor() {
        drawCursor();
    },
    after() {
        mouseTasks();
    },
}
setMainLoop(
    newLoop
)

readCursor();
readBackground();

initMouseEvents(canvas);


export function getCtx() {
    return (document.getElementById("whiteboard") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
}

// draw();

export { BackgroundMode, CursorMode }
