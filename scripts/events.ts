export interface MouseEvents {
    click(): void;
    move(): void;
    resize(): void;
    hold(): void;
}

let currentMouseEvents: MouseEvents = {
    click() {

    },
    move() {

    },
    resize() {

    },
    hold() {

    },
}

let mouseIsDown = false;

export function initMouseEvents(canvas: HTMLCanvasElement) {
    canvas.addEventListener("click", () => {
        currentMouseEvents.click();
    });
    canvas.addEventListener("mousemove", () => {
        currentMouseEvents.move();
    });
    canvas.addEventListener("resize", () => {
        currentMouseEvents.resize();
    });
    canvas.addEventListener("mousedown", () => {
        mouseIsDown = true;
    });
    canvas.addEventListener("mouseup", () => {
        mouseIsDown = false;
    });
    startEngine
}

function startEngine() {
    if (mouseIsDown) {
        currentMouseEvents.hold();
    }
    requestAnimationFrame(() => {
        startEngine();
    });
}


export function setMouseEvents(newMouseEvents: MouseEvents) {
    currentMouseEvents = newMouseEvents;
}