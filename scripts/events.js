let currentMouseEvents = {
    click() {
    },
    move() {
    },
    hold() {
    },
};
let mouseIsDown = false;
export function initMouseEvents(canvas) {
    canvas.addEventListener("click", () => {
        currentMouseEvents.click();
    });
    canvas.addEventListener("mousemove", () => {
        currentMouseEvents.move();
    });
    canvas.addEventListener("mousedown", () => {
        mouseIsDown = true;
    });
    canvas.addEventListener("mouseup", () => {
        mouseIsDown = false;
    });
    startEngine;
}
function startEngine() {
    if (mouseIsDown) {
        currentMouseEvents.hold();
    }
    requestAnimationFrame(() => {
        startEngine();
    });
}
export function setMouseEvents(newMouseEvents) {
    currentMouseEvents = newMouseEvents;
}
//# sourceMappingURL=events.js.map