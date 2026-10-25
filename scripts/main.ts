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

let currentCursorMode: CursorMode = CursorMode.None as CursorMode;
let currentBackgroundMode: BackgroundMode = BackgroundMode.Black as BackgroundMode;

function draw() {
    if (currentCursorMode === CursorMode.None) {
        // Nothing
    } else if (currentCursorMode = CursorMode.ClickDots) {

    }

    if (currentBackgroundMode === BackgroundMode.Black) {
        canvas.style.background = "black";
    } else if (currentBackgroundMode === BackgroundMode.White) {
        canvas.style.background = "white";
    } else if (currentBackgroundMode == BackgroundMode.Checkerboard) {
        const size: number = 100;
        const width: number = window.innerWidth;
        const height: number = window.innerHeight;
        let outerToggle: boolean = false;
        for (let i: number = 0; i < height; i+=size) {
            let innerToggle: boolean = outerToggle ? false : true;
            for (let j: number = 0; j < width; j+=size) {
                if (innerToggle) ctx.fillStyle = "white";
                else ctx.fillStyle = "black";
                innerToggle = !innerToggle;
                ctx.fillRect(j, i, size, size);
            }
            outerToggle = !outerToggle;
        }
    } else if (currentBackgroundMode == BackgroundMode.RandomDots) {
        canvas.style.backgroundColor = "black";
        const numDots = 50;
        const maxDeviation = 2;
        const minDeviation = 5;
        const rad = 10
        const width = window.innerWidth;
        const height = window.innerHeight;

        //let dotColor = "white";

        for (let i: number = 0; i < numDots; i++) {
            const x = Math.floor(Math.random()*width);
            const y = Math.floor(Math.random()*height);

            let radDev = Math.floor(Math.random()*(maxDeviation + minDeviation + 1)) + minDeviation;

            ctx.fillStyle = getRandomDarkHex();
            // ctx.strokeStyle = "white";
            // ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.arc(x, y, rad+radDev, 0, Math.PI*2);
            // ctx.stroke();
            ctx.fill();
        }
    }
}

draw();

function getRandomHex() {
    const randR: number = Math.floor(Math.random() * 256);
    const randG: number = Math.floor(Math.random() * 256);
    const randB: number = Math.floor(Math.random() * 256);
    return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
}
function getRandomLightHex() {
    const randR: number = Math.floor(Math.random() * 100) + 156;
    const randG: number = Math.floor(Math.random() * 100) + 156;
    const randB: number = Math.floor(Math.random() * 100) + 156;
    return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
}
function getRandomDarkHex() {
    const randR: number = Math.floor(Math.random() * 100);
    const randG: number = Math.floor(Math.random() * 100);
    const randB: number = Math.floor(Math.random() * 100);
    return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
}
function getRandomBlackAndWhiteHex(start: number = 0, end: number = 255) {
    const rand: number = Math.floor(Math.random() * (end-start+1)) + start;
    return "#" + rand.toString(16).padStart(2, "0").repeat(3);
}