export interface MouseEvents {
    click(): void;
    move(): void;
    hold(): void;
    scroll(): void;
}

export interface KeyboardEvents {
    keyPressses(e: Event): void;
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

let currentKeyboardEvents: KeyboardEvents = {
    keyPressses(e: Event) {

    }
}

let currentForeverEvent: ForeverEvent = {
    run() {

    },
}

let mouseIsDown = false;
export let scrollY = 0;

export function isMouseDown() {
    return mouseIsDown;
}

export function initMouseEvents(canvas: HTMLCanvasElement) {
    canvas.addEventListener("click", () => {
        currentMouseEvents.click();
    });
    canvas.addEventListener("mousemove", (event) => {
        MouseUtil.setPosition(event.clientX, event.clientY);
        currentMouseEvents.move();
    });
    canvas.addEventListener("mousedown", (event) => {
        MouseUtil.setPosition(event.clientX, event.clientY);
        mouseIsDown = true;
    });
    canvas.addEventListener("mouseup", () => {
        mouseIsDown = false;
    });
    canvas.addEventListener("wheel", () => {
        currentMouseEvents.scroll();
    });
    recordWheel();
}

export function initKeyboardEvents() {
    window.addEventListener("keydown", (e) => {
        currentKeyboardEvents.keyPressses(e);
    });
}

export function mouseTasks() {
    if (mouseIsDown) {
        currentMouseEvents.hold();
    }
    currentForeverEvent.run();
}

function recordWheel() {
    window.addEventListener("wheel", (e) => {
        scrollY += e.deltaY;
    })
}


export function setMouseEvents(newMouseEvents: MouseEvents) {
    currentMouseEvents = newMouseEvents;
}

export function setKeyboardEvents(newKeyboardEvents: KeyboardEvents) {
    currentKeyboardEvents = newKeyboardEvents;
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

export function resetKeyboardEvents() {
    currentKeyboardEvents = {
        keyPressses(e) {
            
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

import { MouseUtil } from "./util.js";
