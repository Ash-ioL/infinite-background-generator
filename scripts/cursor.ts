import { CursorMode, currentBackgroundMode } from "./main.js";
import { drawBackground } from "./background.js";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil} from "./util.js";
import { setForeverEvent, setMouseEvents, resetForeverEvent, resetMouseEvents, isMouseDown } from "./events.js";
import { scrollY } from "./events.js";
import type { ForeverEvent, MouseEvents } from "./events.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";

let cursorModeVars = {
    prevScroll: window.scrollY,
}

class CursorDot {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    rad: number;
    fillColor: string | null;

    static dotBoard: Array<CursorDot> = [];

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number, fillColor: string | null) {
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

    static add(dot: CursorDot) {
        CursorDot.dotBoard.push(dot);
    }
}

export function initCursor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentCursorMode: CursorMode) {
    CursorDot.clearAll();

    if (currentCursorMode === CursorMode.Debug) {
        
    } else if (currentCursorMode === CursorMode.None) {
        // Nothing
    } else if (currentCursorMode === CursorMode.ClickDots) {
        const newMouseEvents: MouseEvents = {
            click() {
                const dot = new CursorDot(ctx, MouseUtil.x()!, MouseUtil.y()!, RandomUtil.randInt(10, 15), getColor());
                CursorDot.add(dot);
            },
            move() {

            },
            hold() {

            },
            scroll() {},
        };
        setMouseEvents(
            newMouseEvents
        );
        resetForeverEvent();
    } else if (currentCursorMode === CursorMode.HoldDots) {
        const newMouseEvents: MouseEvents = {
            click() {
                
            },
            move() {
                if (!isMouseDown()) return;
                const dot = new CursorDot(ctx, MouseUtil.x()!, MouseUtil.y()!, 20 - MouseUtil.percentSpeed()*10, getColor());
                CursorDot.add(dot);
            },
            hold() {
                const dot = new CursorDot(ctx, MouseUtil.x()!, MouseUtil.y()!, 20 - MouseUtil.percentSpeed()*10, getColor());
                CursorDot.add(dot);
            },
            scroll() {},
        };
        setMouseEvents(
            newMouseEvents
        );
        resetForeverEvent();
    } else if (currentCursorMode === CursorMode.Flashlight) {
        cursorModeVars.prevScroll = scrollY;
        const newForeverEvent: ForeverEvent = {
            run() {
                let maxRad: number = 100;
                let minRad: number = 10;
                let diff: number = maxRad - minRad;
                let startRad = minRad + diff/2;
                let scrollScale = 1000;

                let dScroll = scrollY - cursorModeVars.prevScroll;
                
                if (dScroll > scrollScale) {
                    cursorModeVars.prevScroll = scrollY - scrollScale;
                    dScroll = scrollScale;
                } else if (dScroll < -scrollScale) {
                    cursorModeVars.prevScroll = scrollY + scrollScale;
                    dScroll = -scrollScale;
                }

                dScroll /= scrollScale;
                let rad = startRad + (diff / 2)*dScroll;

                if (MouseUtil.x() !== undefined && MouseUtil.y() !== undefined) {
                    CursorDot.clearAll();
                    const dot = new CursorDot(ctx, MouseUtil.x()!, MouseUtil.y()!, rad, getPrimaryColor());
                    CursorDot.add(dot);
                }
            }
        }
        resetMouseEvents();
        setForeverEvent (
            newForeverEvent
        );
    } 
}

export function drawCursor() {
    CursorDot.drawAll();
}

export function switchCursor() {
    cursorModeVars.prevScroll = window.scrollY;
}
