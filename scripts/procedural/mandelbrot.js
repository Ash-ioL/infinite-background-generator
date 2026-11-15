let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let center = [0, 0];
let zoom = 1;
let k = 50;
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
function requestFrame() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let data = ctx.getImageData(0, 0, width, height);
}
export {};
//# sourceMappingURL=mandelbrot.js.map