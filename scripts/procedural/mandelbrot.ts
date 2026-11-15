let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let center: Array<number> = [0, 0];
let zoom = 1;
let k = 50;

function nextTerm(val: Array<number>, iVal: Array<number>): Array<number> {
    // val ** 2 + ival
    let valVal: number = val[0]!;
    let valIVal: number = val[1]!;
    let iValVal: number = iVal[0]!;
    let iValIVal: number = iVal[1]!;
    let resVal = valVal * valVal - valIVal * valIVal + iValVal;
    let resIVal = valVal * valIVal * 2 + iValIVal;
    return [resVal, resIVal];
}
fsa
function requestFrame() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    let data: ImageData = ctx.getImageData(0, 0, width, height);
    
}