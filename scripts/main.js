import { drawBackground } from "./background.js";
import { drawCursor } from "./cursor.js";
import { initMouseEvents } from "./events.js";
const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});
console.log(canvas);
console.log(ctx);
var CursorMode;
(function (CursorMode) {
    CursorMode[CursorMode["None"] = 0] = "None";
    CursorMode[CursorMode["ClickDots"] = 1] = "ClickDots";
    CursorMode[CursorMode["HoldDots"] = 2] = "HoldDots";
    CursorMode[CursorMode["Debug"] = 3] = "Debug";
})(CursorMode || (CursorMode = {}));
var BackgroundMode;
(function (BackgroundMode) {
    BackgroundMode[BackgroundMode["Black"] = 0] = "Black";
    BackgroundMode[BackgroundMode["White"] = 1] = "White";
    BackgroundMode[BackgroundMode["Checkerboard"] = 2] = "Checkerboard";
    BackgroundMode[BackgroundMode["RandomDots"] = 3] = "RandomDots";
})(BackgroundMode || (BackgroundMode = {}));
let currentCursorMode = CursorMode.Debug;
let currentBackgroundMode = BackgroundMode.Black;
function draw() {
    drawBackground(canvas, ctx, currentBackgroundMode);
    drawCursor(canvas, ctx, currentCursorMode);
}
initMouseEvents(canvas);
draw();
export { BackgroundMode, CursorMode };
//# sourceMappingURL=main.js.map