let currentMouseEvents = {
    click() {
    },
    move() {
    },
    hold() {
    },
    scroll() {
    },
};
let currentForeverEvent = {
    run() {
    },
};
let mouseIsDown = false;
export let scrollY = 0;
export function isMouseDown() {
    return mouseIsDown;
}
export function initMouseEvents(canvas) {
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
    });
}
export function setMouseEvents(newMouseEvents) {
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
    };
}
export function setForeverEvent(newForeverEvent) {
    currentForeverEvent = newForeverEvent;
}
export function resetForeverEvent() {
    currentForeverEvent = {
        run() { },
    };
}
import { MouseUtil } from "./util.js";
//# sourceMappingURL=events.js.map