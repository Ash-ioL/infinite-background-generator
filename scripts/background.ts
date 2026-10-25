import { BackgroundMode } from "./main.js";
import { ColorUtil, MouseUtil } from "./util.js";

export function drawBackground(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentBackgroundMode: BackgroundMode) {
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
    } else if (currentBackgroundMode === BackgroundMode.RandomDots) {
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

            ctx.fillStyle = ColorUtil.getRandomDarkHex();
            // ctx.strokeStyle = "white";
            // ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.arc(x, y, rad+radDev, 0, Math.PI*2);
            // ctx.stroke();
            ctx.fill();
        }
    }
}