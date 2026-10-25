import { drawBackground } from "./background.js";
import { drawCursor } from "./cursor.js";
import { initMouseEvents } from "./events.js";

const canvas: HTMLCanvasElement = document.getElementById("whiteboard") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
})


console.log(canvas); 
console.log(ctx);

enum CursorMode {
    None,
    ClickDots,
}

enum BackgroundMode {
    Black,
    White,
    Checkerboard,
    RandomDots,
    
}

let currentCursorMode: CursorMode = CursorMode.ClickDots as CursorMode;
let currentBackgroundMode: BackgroundMode = BackgroundMode.Black as BackgroundMode;

function draw() {
    drawBackground(canvas, ctx, currentBackgroundMode);
    drawCursor(canvas, ctx, currentCursorMode);
}

initMouseEvents(canvas);

draw();

export { BackgroundMode, CursorMode }