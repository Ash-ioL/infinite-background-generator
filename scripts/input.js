import { DrawUtil } from "./util.js";
import { ctx, canvas, currentBackgroundMode, currentCursorMode } from "./main.js";
import { BackgroundMode, CursorMode, setCurrentModes } from "./main.js";
import { drawBackground, initBackground } from "./background.js";
import { drawCursor, initCursor } from "./cursor.js";
import { resetForeverEvent, resetMouseEvents } from "./events.js";
let sidePanel = document.getElementById("side-panel");
let arrow = document.getElementById("arrow");
arrow.addEventListener("click", () => {
    sidePanel.classList.toggle("out");
});
// readColor();
// readBackground();
let cursorSelect = document.getElementById("cursor");
let backgroundSelect = document.getElementById("background");
let primaryColor = document.getElementById("primary-color");
let secondaryColor = document.getElementById("secondary-color");
let backgroundColor = document.getElementById("background-color");
cursorSelect.addEventListener("change", () => {
    readCursor();
});
backgroundSelect.addEventListener("change", () => {
    readBackground();
});
export function readCursor() {
    let newCursorMode = CursorMode.None;
    let curVal = cursorSelect.value;
    if (curVal === "none") {
        // Nothing
    }
    else if (curVal === "random") {
        const enumValues = Object.values(CursorMode);
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        newCursorMode = enumValues[randomIndex];
    }
    else if (curVal === "click-dots") {
        newCursorMode = CursorMode.ClickDots;
    }
    else if (curVal === "hold-dots") {
        newCursorMode = CursorMode.HoldDots;
    }
    else if (curVal === "flashlight") {
        newCursorMode = CursorMode.Flashlight;
    }
    else if (curVal === "expel") {
        newCursorMode = CursorMode.Expel;
    }
    else if (curVal === "slow-drift") {
        newCursorMode = CursorMode.SlowDrift;
    }
    else if (curVal === "constellations") {
        newCursorMode = CursorMode.Constellations;
    }
    resetBackgroundAndCursor(currentBackgroundMode, newCursorMode);
}
export function readBackground() {
    let newBackgroundMode = BackgroundMode.Primary;
    let curVal = backgroundSelect.value;
    if (curVal === "random") {
        const enumValues = Object.values(BackgroundMode);
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        newBackgroundMode = enumValues[randomIndex];
        console.log(newBackgroundMode);
    }
    else if (curVal === "primary") {
        newBackgroundMode = BackgroundMode.Primary;
    }
    else if (curVal === "secondary") {
        newBackgroundMode = BackgroundMode.Secondary;
    }
    else if (curVal === "checkerboard") {
        newBackgroundMode = BackgroundMode.Checkerboard;
    }
    else if (curVal === "random-dots") {
        newBackgroundMode = BackgroundMode.RandomDots;
    }
    else if (curVal === "particles") {
        newBackgroundMode = BackgroundMode.Particles;
    }
    else if (curVal === "random-constellations") {
        newBackgroundMode = BackgroundMode.RandomConstellations;
    }
    else if (curVal === "shimmering-stars") {
        newBackgroundMode = BackgroundMode.ShimmeringStars;
    }
    else if (curVal == "particle-collisions") {
        newBackgroundMode = BackgroundMode.ParticleCollisions;
    }
    else if (curVal == "bfs-islands") {
        newBackgroundMode = BackgroundMode.BFSIslands;
    }
    else if (curVal == "perlin-noise") {
        newBackgroundMode = BackgroundMode.PerlinNoise;
    }
    else if (curVal == "cave-carving") {
        newBackgroundMode = BackgroundMode.CaveCarving;
    }
    else if (curVal == "map") {
        newBackgroundMode = BackgroundMode.Map;
    }
    else {
        newBackgroundMode = BackgroundMode.None;
    }
    resetBackgroundAndCursor(newBackgroundMode, currentCursorMode);
}
// primaryColor!.addEventListener("input", (event) => {
//     resetBackgroundAndCursor(currentBackgroundMode, currentCursorMode);
// });
// secondaryColor!.addEventListener("input", (event) => {
//     resetBackgroundAndCursor(currentBackgroundMode, currentCursorMode);
// });
backgroundColor.addEventListener("input", (event) => {
    setBackgroundColor(backgroundColor.value);
});
export function getColor() {
    if (Math.random() < 0.3) {
        return secondaryColor.value;
    }
    else {
        return primaryColor.value;
    }
}
export function getPrimaryColor() {
    return primaryColor.value;
}
export function getSecondaryColor() {
    return secondaryColor.value;
}
export function getBackgroundColor() {
    return backgroundColor.value;
}
export function resetBackgroundAndCursor(newBackgroundMode, newCursorMode) {
    DrawUtil.clearScreen(ctx);
    resetForeverEvent();
    resetMouseEvents();
    setCurrentModes(newCursorMode, newBackgroundMode);
    setBackgroundColor(getBackgroundColor());
    initCursor(ctx, newCursorMode);
    initBackground(ctx, newBackgroundMode);
}
function setBackgroundColor(color) {
    document.getElementById("whiteboard").style.background = color;
}
//# sourceMappingURL=input.js.map