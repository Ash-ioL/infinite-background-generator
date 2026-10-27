import { Particle } from "./background.js";
import { DrawUtil } from "./util.js";
import { ctx, canvas, currentBackgroundMode, currentCursorMode } from "./main.js";
import { BackgroundMode, CursorMode, setCurrentModes } from "./main.js";
import { drawBackground } from "./background.js";
import { CursorDot, drawCursor, initCursor } from "./cursor.js";
import { resetForeverEvent, resetMouseEvents } from "./events.js";
let sidePanel = document.getElementById("side-panel");
let arrow = document.getElementById("arrow");
arrow.addEventListener("click", () => {
    sidePanel.classList.toggle("out");
});
let cursorSelect = document.getElementById("cursor");
let backgroundSelect = document.getElementById("background");
let primaryColor = document.getElementById("primary-color");
let secondaryColor = document.getElementById("secondary-color");
cursorSelect.addEventListener("change", () => {
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
    resetBackgroundAndCursor(currentBackgroundMode, newCursorMode);
});
backgroundSelect.addEventListener("change", () => {
    let newBackgroundMode = BackgroundMode.Black;
    let curVal = backgroundSelect.value;
    if (curVal === "random") {
        const enumValues = Object.values(BackgroundMode);
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        newBackgroundMode = enumValues[randomIndex];
        console.log(newBackgroundMode);
    }
    else if (curVal === "black") {
        newBackgroundMode = BackgroundMode.Black;
    }
    else if (curVal === "white") {
        newBackgroundMode = BackgroundMode.White;
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
    resetBackgroundAndCursor(newBackgroundMode, currentCursorMode);
});
primaryColor.addEventListener("input", (event) => {
    resetBackgroundAndCursor(currentBackgroundMode, currentCursorMode);
});
secondaryColor.addEventListener("input", (event) => {
    resetBackgroundAndCursor(currentBackgroundMode, currentCursorMode);
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
export function resetBackgroundAndCursor(newBackgroundMode, newCursorMode) {
    Particle.clearParticles();
    DrawUtil.clearScreen(ctx);
    CursorDot.clearAll();
    resetForeverEvent();
    resetMouseEvents();
    setCurrentModes(newCursorMode, newBackgroundMode);
    initCursor(canvas, ctx, newCursorMode);
    console.log("runnin");
}
//# sourceMappingURL=input.js.map