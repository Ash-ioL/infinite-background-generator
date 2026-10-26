import { drawBackground } from "./background.js";
import { drawCursor } from "./cursor.js";
import { initMouseEvents } from "./events.js";

export const canvas: HTMLCanvasElement = document.getElementById("whiteboard") as HTMLCanvasElement;
export const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
})


// console.log(canvas); 
// console.log(ctx);

enum CursorMode {
    None,
    ClickDots,
    HoldDots,
    Debug,
    Flashlight
}

enum BackgroundMode {
    Black,
    White,
    Primary,
    Secondary,
    Checkerboard,
    RandomDots,
    Particles,
}

export let currentCursorMode: CursorMode = CursorMode.Flashlight as CursorMode;
export let currentBackgroundMode: BackgroundMode = BackgroundMode.Particles as BackgroundMode;

export function setCurrentModes(cursorMode: CursorMode, backgroundMode: BackgroundMode) {
    currentCursorMode = cursorMode;
    currentBackgroundMode = backgroundMode;
}

function draw() {
    drawBackground(canvas, ctx, currentBackgroundMode);
    drawCursor(canvas, ctx, currentCursorMode);
}

export function resetBackground() {
    drawBackground(canvas, ctx, currentBackgroundMode);
}

initMouseEvents(canvas);

draw();

export { BackgroundMode, CursorMode }

