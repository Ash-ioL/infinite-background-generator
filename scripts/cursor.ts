import { CursorMode, currentBackgroundMode, currentCursorMode } from "./main.js";
import { drawBackground } from "./background.js";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil} from "./util.js";
import { setForeverEvent, setMouseEvents, resetForeverEvent, resetMouseEvents, isMouseDown } from "./events.js";
import { scrollY } from "./events.js";
import type { ForeverEvent, MouseEvents } from "./events.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
import Particle from "./components/Particle.js";

let cursorModeVars = {
    prevScroll: window.scrollY
}
export class CursorParticle extends Particle {

}

export function initCursor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentCursorMode: CursorMode) {
    CursorParticle.clearAll();

    //if (currentCursorMode === CursorMode.Debug) {
        
    if (currentCursorMode === CursorMode.None) {
        // Nothing
    } else if (currentCursorMode === CursorMode.ClickDots) {
        const newMouseEvents: MouseEvents = {
            click() {
                const dot = new CursorParticle(ctx, MouseUtil.x()!, MouseUtil.y()!, 0, 0, RandomUtil.randInt(10, 15), 0,getColor(), false);
                CursorParticle.add(dot);
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
                const dot = new CursorParticle(ctx, MouseUtil.x()!, MouseUtil.y()!, 0, 0, RandomUtil.randInt(10, 15), 0,getColor(), false);
                CursorParticle.add(dot);
            },
            move() {
               
            },
            hold() {
                const dot = new CursorParticle(ctx, MouseUtil.x()!, MouseUtil.y()!, 0, 0, RandomUtil.randInt(10, 15), 0,getColor(), false);
                CursorParticle.add(dot);
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
                    CursorParticle.clearAll();   
                    const dot = new CursorParticle(ctx, MouseUtil.x()!, MouseUtil.y()!, 0, 0, rad, 0, getPrimaryColor(), false);
                    CursorParticle.add(dot);
                }
            }
        }
        resetMouseEvents();
        setForeverEvent (
            newForeverEvent
        );
    } else if (currentCursorMode === CursorMode.Expel) {
        const newMouseEvents: MouseEvents = {
            click() {
                
            },
            move() {
                if (MouseUtil.x() === undefined || MouseUtil.y() === undefined) return;
                const vx = Math.random() * 30 * (Math.random() < 0.5 ? -1 : 1);
                const vy = Math.random() * 30 * (Math.random() < 0.5 ? -1 : 1);
                const dot = new CursorParticle(ctx, MouseUtil.x()!, MouseUtil.y()!, 0, 0, RandomUtil.randInt(10, 15), 0, getColor(), false);
                CursorParticle.add(dot);
            },
            hold() {

            },
            scroll() {},
        };
        setMouseEvents(
            newMouseEvents
        );
        resetForeverEvent();
    } else if (currentCursorMode === CursorMode.SlowDrift) {
        const vx = Math.random() * 10 * (Math.random() < 0.5 ? -1 : 1);
        const vy = Math.random() * 10 * (Math.random() < 0.5 ? -1 : 1);
        const newMouseEvents: MouseEvents = {
            click() {
                
            },
            move() {
                if (MouseUtil.x() === undefined || MouseUtil.y() === undefined) return;
                const dot = new CursorParticle(ctx, MouseUtil.x()!, MouseUtil.y()!, 0, 0, RandomUtil.randInt(10, 15), 0, getColor(), false);
                CursorParticle.add(dot);
            },
            hold() {

            },
            scroll() {},
        };
        setMouseEvents(
            newMouseEvents
        );
        resetForeverEvent();
    } else if (currentCursorMode === CursorMode.Constellations) {
        const newMouseEvents: MouseEvents = {
            click() {
                
            },
            move() {
                if (MouseUtil.x() === undefined || MouseUtil.y() === undefined) return;
                const vx = Math.random() * 50 * (Math.random() < 0.5 ? -1 : 1);
                const vy = Math.random() * 50 * (Math.random() < 0.5 ? -1 : 1);
                const dot = new CursorParticle(ctx, MouseUtil.x()!, MouseUtil.y()!, 0, 0, RandomUtil.randInt(10, 15), 0, getPrimaryColor(), false);
                CursorParticle.add(dot);
            },
            hold() {

            },
            scroll() {},
        };
        setMouseEvents(
            newMouseEvents
        );
        resetForeverEvent();   
    }
}

export function drawCursor() {
    if (currentCursorMode == CursorMode.Constellations) {
        CursorParticle.drawAllLines(getSecondaryColor());
        CursorParticle.drawAll(getPrimaryColor());
    } else {
        CursorParticle.drawAllLines();
        CursorParticle.drawAll();
    }
}

export function switchCursor() {
    cursorModeVars.prevScroll = window.scrollY;
}