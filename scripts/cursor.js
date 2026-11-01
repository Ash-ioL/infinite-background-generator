import { CursorMode, currentBackgroundMode, currentCursorMode } from "./main.js";
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
    vx;
    vy;
    vSize;
    rad;
    fillColor;
    prevTime = -1;
    static dotBoard = [];
    constructor(ctx, x, y, rad, fillColor, vx = 0, vy = 0, vSize = 0) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.vSize = vSize;
        this.rad = rad;
        this.fillColor = fillColor;
    }
    update() {
        if (this.prevTime === -1) {
            this.prevTime = Date.now() / 1000;
            return;
        }
        let dt = Date.now() / 1000 - this.prevTime;
        this.prevTime = Date.now() / 1000;
        let seconds = dt;
        this.rad += this.vSize * seconds;
        this.x += this.vx * seconds;
        this.y += this.vy * seconds;
        this.rad += this.vSize * seconds;
    }
    draw(color = getColor()) {
        if (this.rad <= 0)
            return;
        DrawUtil.drawCircle(this.ctx, this.x, this.y, this.rad, this.fillColor ?? color);
    }
    drawLine(i, j, color = getSecondaryColor()) {
        const dot1 = CursorDot.dotBoard[i];
        const dot2 = CursorDot.dotBoard[j];
        if (dot1 && dot2) {
            const dx = dot1.x - dot2.x;
            const dy = dot1.y - dot2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                DrawUtil.drawLine(this.ctx, dot1.x, dot1.y, dot2.x, dot2.y, (dot1.vSize + dot2.vSize) / 20, color);
            }
        }
    }
    static drawAllLines(color = getSecondaryColor()) {
        for (let i = 0; i < CursorDot.dotBoard.length; i++) {
            for (let j = i + 1; j < CursorDot.dotBoard.length; j++) {
                CursorDot.dotBoard[i].drawLine(i, j, color);
            }
        }
    }
    static updateAll() {
        for (const dot of CursorDot.dotBoard) {
            dot.update();
        }
    }
    static drawAll(color = getColor()) {
        CursorDot.updateAll();
        for (let i = CursorDot.dotBoard.length - 1; i >= 0; i--) {
            if (CursorDot.dotBoard[i].rad <= 0) {
                CursorDot.dotBoard.splice(i, 1);
            }
        }
        for (const dot of CursorDot.dotBoard) {
            dot.draw(color);
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
    else if (currentCursorMode === CursorMode.Expel) {
        const newMouseEvents = {
            click() {
            },
            move() {
                if (MouseUtil.x() === undefined || MouseUtil.y() === undefined)
                    return;
                const vx = Math.random() * 30 * (Math.random() < 0.5 ? -1 : 1);
                const vy = Math.random() * 30 * (Math.random() < 0.5 ? -1 : 1);
                const dot = new CursorDot(ctx, MouseUtil.x(), MouseUtil.y(), RandomUtil.randInt(10, 15), getColor(), vx, vy, -5);
                CursorDot.add(dot);
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
                const dot = new CursorDot(ctx, MouseUtil.x(), MouseUtil.y(), RandomUtil.randInt(10, 15), getColor(), vx, vy, -0.5);
                CursorDot.add(dot);
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
                const dot = new CursorDot(ctx, MouseUtil.x(), MouseUtil.y(), RandomUtil.randInt(10, 15), getPrimaryColor(), vx, vy, -1);
                CursorDot.add(dot);
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
        CursorDot.drawAllLines(getSecondaryColor());
        CursorDot.drawAll(getPrimaryColor());
    }
    else {
        CursorDot.drawAllLines();
        CursorDot.drawAll();
    }
}
export function switchCursor() {
    cursorModeVars.prevScroll = window.scrollY;
}
//# sourceMappingURL=cursor.js.map