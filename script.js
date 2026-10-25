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
})(CursorMode || (CursorMode = {}));
var BackgroundMode;
(function (BackgroundMode) {
    BackgroundMode[BackgroundMode["Black"] = 0] = "Black";
    BackgroundMode[BackgroundMode["White"] = 1] = "White";
    BackgroundMode[BackgroundMode["Checkerboard"] = 2] = "Checkerboard";
    BackgroundMode[BackgroundMode["RandomDots"] = 3] = "RandomDots";
})(BackgroundMode || (BackgroundMode = {}));
let currentCursorMode = CursorMode.None;
let currentBackgroundMode = BackgroundMode.RandomDots;
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
    else if (currentBackgroundMode == BackgroundMode.RandomDots) {
        canvas.style.backgroundColor = "black";
        const numDots = 50;
        const maxDeviation = 2;
        const minDeviation = 5;
        const rad = 10;
        const width = window.innerWidth;
        const height = window.innerHeight;
        //let dotColor = "white";
        for (let i = 0; i < numDots; i++) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);
            let radDev = Math.floor(Math.random() * (maxDeviation + minDeviation + 1)) + minDeviation;
            ctx.fillStyle = getRandomDarkHex(100);
            // ctx.strokeStyle = "white";
            // ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.arc(x, y, rad + radDev, 0, Math.PI * 2);
            // ctx.stroke();
            ctx.fill();
        }
    }
}
draw();
function getRandomHex() {
    const randR = Math.floor(Math.random() * 256);
    const randG = Math.floor(Math.random() * 256);
    const randB = Math.floor(Math.random() * 256);
    return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
}
function getRandomLightHex() {
    const randR = Math.floor(Math.random() * 100) + 156;
    const randG = Math.floor(Math.random() * 100) + 156;
    const randB = Math.floor(Math.random() * 100) + 156;
    return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
}
function getRandomDarkHex() {
    const randR = Math.floor(Math.random() * 100);
    const randG = Math.floor(Math.random() * 100);
    const randB = Math.floor(Math.random() * 100);
    return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
}
function getRandomBlackAndWhiteHex(start = 0, end = 255) {
    const rand = Math.floor(Math.random() * (end - start + 1)) + start;
    return "#" + rand.toString(16).padStart(2, "0").repeat(3);
}
export {};
//# sourceMappingURL=script.js.map