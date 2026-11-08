import { RNG } from "./rng.js";
let canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
function draw() {
}
for (let i = 0; i < 2; i++) {
    RNG.setSeed(10);
    for (let i = 0; i < 10; i++) {
        console.log(RNG.getRandom());
    }
    console.log("\n");
}
//# sourceMappingURL=perlin.js.map