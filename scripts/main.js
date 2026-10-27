import { drawBackground } from "./background.js";
import { drawCursor } from "./cursor.js";
import { initMouseEvents, mouseTasks } from "./events.js";
import { resetBackgroundAndCursor } from "./input.js";
import { setMainLoop } from "./task_scheduler.js";
import { DrawUtil } from "./util.js";
export const canvas = document.getElementById("whiteboard");
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resetBackgroundAndCursor(currentBackgroundMode, currentCursorMode);
});
// console.log(canvas); 
// console.log(ctx);
var CursorMode;
(function (CursorMode) {
    CursorMode["None"] = "none";
    CursorMode["ClickDots"] = "click-dots";
    CursorMode["HoldDots"] = "hold-dots";
    //Debug = "debug",
    CursorMode["Flashlight"] = "flashlight";
})(CursorMode || (CursorMode = {}));
var BackgroundMode;
(function (BackgroundMode) {
    BackgroundMode["Black"] = "black";
    BackgroundMode["White"] = "white";
    BackgroundMode["Primary"] = "primary";
    BackgroundMode["Secondary"] = "secondary";
    BackgroundMode["Checkerboard"] = "checkerboard";
    BackgroundMode["RandomDots"] = "random-dots";
    BackgroundMode["Particles"] = "particles";
})(BackgroundMode || (BackgroundMode = {}));
export let currentCursorMode = CursorMode.Flashlight;
export let currentBackgroundMode = BackgroundMode.Particles;
export function setCurrentModes(cursorMode, backgroundMode) {
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
let newLoop = {
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
};
setMainLoop(newLoop);
initMouseEvents(canvas);
// draw();
export { BackgroundMode, CursorMode };
//# sourceMappingURL=main.js.map