import { RNG } from "./rng.js";

let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function draw() {

}

for (let i = 0; i < 2; i++) {
    RNG.setSeed(10);
    for (let i: number = 0; i < 10; i++) {
        console.log(RNG.getRandom());
    }
    console.log("\n");
}