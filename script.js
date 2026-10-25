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
let currentBackgroundMode = BackgroundMode.Checkerboard;
function draw() {
    if (currentCursorMode === CursorMode.None) {
    }
    if (currentBackgroundMode === BackgroundMode.Black) {
        canvas.style.background = "black";
    }
    else if (currentBackgroundMode === BackgroundMode.White) {
        canvas.style.background = "white";
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
                    ctx.fillStyle = "white";
                else
                    ctx.fillStyle = "black";
                innerToggle = !innerToggle;
                ctx.fillRect(j, i, size, size);
            }
            outerToggle = !outerToggle;
        }
    }
}
draw();
export {};
//# sourceMappingURL=script.js.map