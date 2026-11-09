import { drawBackground } from "./background.js";
import ParticleManager from "./components/ParticleManager.js";
import { drawCursor } from "./cursor.js";
import { initMouseEvents, mouseTasks } from "./events.js";
import { readBackground, readCursor, resetBackgroundAndCursor } from "./input.js";
import { setMainLoop } from "./taskScheduler.js";
import { DrawUtil } from "./util.js";
export const canvas = document.getElementById("whiteboard");
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resetBackgroundAndCursor(currentBackgroundMode, currentCursorMode);
});
// console.log(canvas); 
// console.log(ctx)
var CursorMode;
(function (CursorMode) {
    CursorMode["None"] = "none";
    CursorMode["ClickDots"] = "click-dots";
    CursorMode["HoldDots"] = "hold-dots";
    //Debug = "debug",
    CursorMode["Flashlight"] = "flashlight";
    CursorMode["Expel"] = "expel";
    CursorMode["SlowDrift"] = "slow-drift";
    CursorMode["Constellations"] = "constellations";
})(CursorMode || (CursorMode = {}));
var BackgroundMode;
(function (BackgroundMode) {
    BackgroundMode["None"] = "none";
    BackgroundMode["Primary"] = "primary";
    BackgroundMode["Secondary"] = "secondary";
    BackgroundMode["Checkerboard"] = "checkerboard";
    BackgroundMode["RandomDots"] = "random-dots";
    BackgroundMode["Particles"] = "particles";
    BackgroundMode["RandomConstellations"] = "random-constellations";
    BackgroundMode["ShimmeringStars"] = "shimmering-stars";
    BackgroundMode["ParticleCollisions"] = "particle-collisions";
    BackgroundMode["BFSIslands"] = "bfs-islands";
    BackgroundMode["PerlinNoise"] = "perlin-noise";
    BackgroundMode["CaveCarving"] = "cave-carving";
    BackgroundMode["Map"] = "map";
})(BackgroundMode || (BackgroundMode = {}));
export let currentCursorMode = CursorMode.Flashlight;
export let currentBackgroundMode = BackgroundMode.Particles;
export function setCurrentModes(cursorMode, backgroundMode) {
    currentCursorMode = cursorMode;
    currentBackgroundMode = backgroundMode;
    console.log(currentCursorMode);
    console.log(currentBackgroundMode);
}
// function draw() {
//     drawBackground(canvas, ctx, currentBackgroundMode);
//     drawCursor(canvas, ctx, currentCursorMode);
// }
export function resetBackground() {
    drawBackground(canvas, ctx, currentBackgroundMode);
}
export function getParticleManager() {
    return new ParticleManager(ctx);
}
let newLoop = {
    before() {
        DrawUtil.clearScreen(ctx);
    },
    background() {
        drawBackground(canvas, ctx, currentBackgroundMode);
    },
    cursor() {
        drawCursor();
    },
    after() {
        mouseTasks();
    },
};
setMainLoop(newLoop);
readCursor();
readBackground();
initMouseEvents(canvas);
export function getCtx() {
    return document.getElementById("whiteboard").getContext("2d");
}
// draw();
export { BackgroundMode, CursorMode };
//# sourceMappingURL=main.js.map