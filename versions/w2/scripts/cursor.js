import { CursorMode, ctx, currentCursorMode, getCtx, getParticleManager } from "./main.js";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil } from "./util.js";
import { setForeverEvent, setMouseEvents, resetForeverEvent, resetMouseEvents, isMouseDown } from "./events.js";
import { scrollY } from "./events.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
import Particle from "./components/Particle.js";
import ParticleManager from "./components/ParticleManager.js";
let cursorModeVars = {
    prevScroll: window.scrollY
};
let cursorManager = new ParticleManager(getCtx());
export function initCursor(ctx, currentCursorMode) {
    cursorManager.clearAll();
    //if (currentCursorMode === CursorMode.Debug) {
    if (currentCursorMode === CursorMode.None) {
        // Nothing
    }
    else if (currentCursorMode === CursorMode.ClickDots) {
        const newMouseEvents = {
            click() {
                const dot = new Particle(ctx, MouseUtil.x(), MouseUtil.y(), 0, 0, RandomUtil.randInt(10, 15), 0, false);
                cursorManager.add(dot);
            },
            move() {
            },
            hold() {
            },
            scroll() { },
        };
        setMouseEvents(newMouseEvents);
        resetForeverEvent();
    }
    else if (currentCursorMode === CursorMode.HoldDots) {
        const newMouseEvents = {
            click() {
                const dot = new Particle(ctx, MouseUtil.x(), MouseUtil.y(), 0, 0, RandomUtil.randInt(10, 15), 0, false);
                cursorManager.add(dot);
            },
            move() {
            },
            hold() {
                const dot = new Particle(ctx, MouseUtil.x(), MouseUtil.y(), 0, 0, RandomUtil.randInt(10, 15), 0, false);
                cursorManager.add(dot);
            },
            scroll() { },
        };
        setMouseEvents(newMouseEvents);
        resetForeverEvent();
    }
    else if (currentCursorMode === CursorMode.Flashlight) {
        cursorModeVars.prevScroll = scrollY;
        const newForeverEvent = {
            run() {
                let maxRad = 500;
                let minRad = 10;
                let diff = maxRad - minRad;
                let startRad = minRad + diff / 2;
                let scrollScale = 1000;
                let dScroll = scrollY - cursorModeVars.prevScroll;
                if (dScroll > scrollScale) {
                    cursorModeVars.prevScroll = scrollY - scrollScale;
                    dScroll = scrollScale;
                }
                else if (dScroll < -scrollScale) {
                    cursorModeVars.prevScroll = scrollY + scrollScale;
                    dScroll = -scrollScale;
                }
                dScroll /= scrollScale;
                let rad = startRad + (diff / 2) * dScroll;
                if (MouseUtil.x() !== undefined && MouseUtil.y() !== undefined) {
                    cursorManager.clearAll();
                    const dot = new Particle(ctx, MouseUtil.x(), MouseUtil.y(), 0, 0, rad, 0, false);
                    cursorManager.add(dot);
                }
            }
        };
        resetMouseEvents();
        setForeverEvent(newForeverEvent);
    }
    else if (currentCursorMode === CursorMode.Expel) {
        const newMouseEvents = {
            click() {
            },
            move() {
                if (MouseUtil.x() === undefined || MouseUtil.y() === undefined)
                    return;
                const vx = Math.random() * 30 * (Math.random() < 0.5 ? -1 : 1);
                const vy = Math.random() * 30 * (Math.random() < 0.5 ? -1 : 1);
                const dot = new Particle(ctx, MouseUtil.x(), MouseUtil.y(), vx, vy, RandomUtil.randInt(10, 15), -2, false);
                cursorManager.add(dot);
            },
            hold() {
            },
            scroll() { },
        };
        setMouseEvents(newMouseEvents);
        resetForeverEvent();
    }
    else if (currentCursorMode === CursorMode.SlowDrift) {
        const vx = Math.random() * 10 * (Math.random() < 0.5 ? -1 : 1);
        const vy = Math.random() * 10 * (Math.random() < 0.5 ? -1 : 1);
        const newMouseEvents = {
            click() {
            },
            move() {
                if (MouseUtil.x() === undefined || MouseUtil.y() === undefined)
                    return;
                const dot = new Particle(ctx, MouseUtil.x(), MouseUtil.y(), vx, vy, RandomUtil.randInt(10, 15), -0.5, false);
                cursorManager.add(dot);
            },
            hold() {
            },
            scroll() { },
        };
        setMouseEvents(newMouseEvents);
        resetForeverEvent();
    }
    else if (currentCursorMode === CursorMode.Constellations) {
        const newMouseEvents = {
            click() {
            },
            move() {
                if (MouseUtil.x() === undefined || MouseUtil.y() === undefined)
                    return;
                const vx = Math.random() * 50 * (Math.random() < 0.5 ? -1 : 1);
                const vy = Math.random() * 50 * (Math.random() < 0.5 ? -1 : 1);
                const dot = new Particle(ctx, MouseUtil.x(), MouseUtil.y(), vx, vy, RandomUtil.randInt(10, 15), -5, false);
                cursorManager.add(dot);
            },
            hold() {
            },
            scroll() { },
        };
        setMouseEvents(newMouseEvents);
        resetForeverEvent();
    }
}
export function drawCursor() {
    if (currentCursorMode == CursorMode.Constellations) {
        cursorManager.drawAllLines(getSecondaryColor());
        cursorManager.drawAll(getPrimaryColor(), getSecondaryColor());
    }
    else if (currentCursorMode == CursorMode.Flashlight) {
        cursorManager.drawAll(getSecondaryColor() + "80", null);
    }
    else {
        cursorManager.drawAll(getPrimaryColor());
    }
}
export function switchCursor() {
    cursorModeVars.prevScroll = window.scrollY;
}
//# sourceMappingURL=cursor.js.map