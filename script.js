const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
console.log(canvas);
var CursorMode;
(function (CursorMode) {
    CursorMode[CursorMode["None"] = 0] = "None";
})(CursorMode || (CursorMode = {}));
var BackgroundMode;
(function (BackgroundMode) {
    BackgroundMode[BackgroundMode["Black"] = 0] = "Black";
    BackgroundMode[BackgroundMode["White"] = 1] = "White";
    BackgroundMode[BackgroundMode["Checkerboard"] = 2] = "Checkerboard";
})(BackgroundMode || (BackgroundMode = {}));
let currentCursorMode = CursorMode.None;
let currentBackgroundMode = BackgroundMode.White;
if (currentCursorMode === CursorMode.None) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 100, 100);
}
if (currentBackgroundMode === BackgroundMode.Black) {
    canvas.style.background = "black";
}
else if (currentBackgroundMode === BackgroundMode.White) {
    canvas.style.background = "white";
}
export {};
//# sourceMappingURL=script.js.map