import { CursorMode, currentBackgroundMode } from "./main.js";
import { drawBackground } from "./background.js";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil } from "./util.js";
import { setForeverEvent, setMouseEvents, resetForeverEvent, resetMouseEvents, isMouseDown } from "./events.js";
import { scrollY } from "./events.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
let cursorModeVars = {
    prevScroll: window.scrollY,
};
export class CursorDot {
    ctx;
    x;
    y;
    rad;
    fillColor;
    static dotBoard = [];
    constructor(ctx, x, y, rad, fillColor) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.fillColor = fillColor;
    }
    draw() {
        DrawUtil.drawCircle(this.ctx, this.x, this.y, this.rad, this.fillColor ?? getColor());
    }
    static drawAll() {
        for (const dot of CursorDot.dotBoard) {
            dot.draw();
        }
    }
    static clearAll() {
        CursorDot.dotBoard = [];
    }
    static add(dot) {
        CursorDot.dotBoard.push(dot);
    }
}
export function initCursor(canvas, ctx, currentCursorMode) {
    CursorDot.clearAll();
    //if (currentCursorMode === CursorMode.Debug) {
    if (currentCursorMode === CursorMode.None) {
        // Nothing
    }
    else if (currentCursorMode === CursorMode.ClickDots) {
        const newMouseEvents = {
            click() {
                const dot = new CursorDot(ctx, MouseUtil.x(), MouseUtil.y(), RandomUtil.randInt(10, 15), getColor());
                CursorDot.add(dot);
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
            },
            move() {
                if (!isMouseDown())
                    return;
                const dot = new CursorDot(ctx, MouseUtil.x(), MouseUtil.y(), 20 - MouseUtil.percentSpeed() * 10, getColor());
                CursorDot.add(dot);
            },
            hold() {
                const dot = new CursorDot(ctx, MouseUtil.x(), MouseUtil.y(), 20 - MouseUtil.percentSpeed() * 10, getColor());
                CursorDot.add(dot);
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
                let maxRad = 100;
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
                    CursorDot.clearAll();
                    const dot = new CursorDot(ctx, MouseUtil.x(), MouseUtil.y(), rad, getPrimaryColor());
                    CursorDot.add(dot);
                }
            }
        };
        resetMouseEvents();
        setForeverEvent(newForeverEvent);
    }
}
export function drawCursor() {
    CursorDot.drawAll();
}
export function switchCursor() {
    cursorModeVars.prevScroll = window.scrollY;
}
//# sourceMappingURL=cursor.js.map