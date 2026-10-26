import { drawBackground } from "./background.js";
import { drawCursor } from "./cursor.js";
import { initMouseEvents } from "./events.js";
export const canvas = document.getElementById("whiteboard");
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});
// console.log(canvas); 
// console.log(ctx);
var CursorMode;
(function (CursorMode) {
    CursorMode[CursorMode["None"] = 0] = "None";
    CursorMode[CursorMode["ClickDots"] = 1] = "ClickDots";
    CursorMode[CursorMode["HoldDots"] = 2] = "HoldDots";
    CursorMode[CursorMode["Debug"] = 3] = "Debug";
    CursorMode[CursorMode["Flashlight"] = 4] = "Flashlight";
})(CursorMode || (CursorMode = {}));
var BackgroundMode;
(function (BackgroundMode) {
    BackgroundMode[BackgroundMode["Black"] = 0] = "Black";
    BackgroundMode[BackgroundMode["White"] = 1] = "White";
    BackgroundMode[BackgroundMode["Primary"] = 2] = "Primary";
    BackgroundMode[BackgroundMode["Secondary"] = 3] = "Secondary";
    BackgroundMode[BackgroundMode["Checkerboard"] = 4] = "Checkerboard";
    BackgroundMode[BackgroundMode["RandomDots"] = 5] = "RandomDots";
    BackgroundMode[BackgroundMode["Particles"] = 6] = "Particles";
})(BackgroundMode || (BackgroundMode = {}));
export let currentCursorMode = CursorMode.Flashlight;
export let currentBackgroundMode = BackgroundMode.Particles;
export function setCurrentModes(cursorMode, backgroundMode) {
    currentCursorMode = cursorMode;
    currentBackgroundMode = backgroundMode;
    console.log(currentCursorMode);
    console.log(currentBackgroundMode);
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
export { BackgroundMode, CursorMode };
//# sourceMappingURL=main.js.map