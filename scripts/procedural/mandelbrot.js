let canvas = document.getElementById("whiteboard");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw = true;
});
let center = [0, 0];
let stepSize = 0.05;
let zoom = 2.25;
let k = 50;
let color = Array.from({ length: k }, () => [0, 0, 0]);
for (let i = 0; i < k; i++) {
    let ratio = i / k;
    color[i][0] = Math.floor(9 * (1 - ratio) * ratio * ratio * ratio * 255);
    color[i][1] = Math.floor(15 * (1 - ratio) * (1 - ratio) * ratio * ratio * 255);
    color[i][2] = Math.floor(8.5 * (1 - ratio) * (1 - ratio) * (1 - ratio) * ratio * 255);
}
function nextTerm(val, iVal) {
    // val ** 2 + ival
    let valVal = val[0];
    let valIVal = val[1];
    let iValVal = iVal[0];
    let iValIVal = iVal[1];
    let resVal = valVal * valVal - valIVal * valIVal + iValVal;
    let resIVal = valVal * valIVal * 2 + iValIVal;
    return [resVal, resIVal];
}
function toComplex(x, y, width, height) {
    return [
        (x - (width / 2) + center[0]) * zoom / 1000,
        (y - (height / 2) + center[1]) * zoom / 1000
    ];
}
function requestFrame() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let data = ctx.createImageData(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let c0 = (x - (width / 2)) * zoom / 1000 + center[0];
            let c1 = (y - (height / 2)) * zoom / 1000 + center[1];
            let prev0 = 0;
            let prev1 = 0;
            let exitIter = -1;
            for (let i = 0; i < k; i++) {
                //nextterm
                let valVal = prev0;
                let valIVal = prev1;
                let iValVal = c0;
                let iValIVal = c1;
                let resVal = valVal * valVal - valIVal * valIVal + iValVal;
                let resIVal = valVal * valIVal * 2 + iValIVal;
                prev0 = resVal;
                prev1 = resIVal;
                //nextterm
                if (prev0 * prev0 + prev1 * prev1 > 4) { // dis is cuz if a point is over 2 units away fromt he origin then its mathematically impossible to not be infnity
                    exitIter = i;
                    break;
                }
            }
            let r, g, b;
            if (exitIter != -1) {
                r = color[exitIter][0];
                g = color[exitIter][1];
                b = color[exitIter][2];
            }
            else {
                r = 0;
                g = 0;
                b = 0;
            }
            let idx = (y * width + x) * 4;
            data.data[idx] = r;
            data.data[idx + 1] = g;
            data.data[idx + 2] = b;
            data.data[idx + 3] = 255;
        }
    }
    return data;
}
function draw() {
    ctx.putImageData(requestFrame(), 0, 0);
}
let redraw = true;
function loop() {
    if (redraw) {
        draw();
        redraw = false;
    }
    requestAnimationFrame(() => {
        loop();
    });
}
loop();
window.addEventListener("keydown", (e) => {
    if (e.key === "w")
        center[1] -= stepSize / zoom;
    if (e.key === "a")
        center[0] -= stepSize / zoom;
    if (e.key === "s")
        center[1] += stepSize / zoom;
    if (e.key === "d")
        center[0] += stepSize / zoom;
    if (e.key === "e")
        zoom *= 0.99;
    if (e.key === "q")
        zoom *= 1.01;
    redraw = true;
});
export {};
//# sourceMappingURL=mandelbrot.js.map