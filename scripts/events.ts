export interface MouseEvents {
    click(): void;
    move(): void;
    hold(): void;
    scroll(): void;
}

export interface ForeverEvent {
    run(): void;
}

let currentMouseEvents: MouseEvents = {
    click() {

    },
    move() {

    },
    hold() {

    },
    scroll() {

    },
}

let currentForeverEvent: ForeverEvent = {
    run() {

    },
}

let mouseIsDown = false;
export let scrollY = 0;

export function initMouseEvents(canvas: HTMLCanvasElement) {
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
    canvas.addEventListener("wheel", () => {
        currentMouseEvents.scroll();
    });
    startEngine();
    recordWheel();
}

function startEngine() {
    if (mouseIsDown) {
        currentMouseEvents.hold();
    }
    currentForeverEvent.run();
    requestAnimationFrame(() => {
        startEngine();
    });
}

function recordWheel() {
    window.addEventListener("wheel", (e) => {
        scrollY += e.deltaY;
    })
}


export function setMouseEvents(newMouseEvents: MouseEvents) {
    currentMouseEvents = newMouseEvents;
}
export function resetMouseEvents() {
    currentMouseEvents = {
        click() {

        },
        move() {

        },
        hold() {

        },
        scroll() {

        },
    }
}

export function setForeverEvent(newForeverEvent: ForeverEvent) {
    currentForeverEvent = newForeverEvent;
}
export function resetForeverEvent() {
    currentForeverEvent = {
        run() {},
    }
}