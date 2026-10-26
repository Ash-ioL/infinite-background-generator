import { CursorMode, currentBackgroundMode } from "./main.js";
import { drawBackground } from "./background.js";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil } from "./util.js";
import { setForeverEvent, setMouseEvents, resetForeverEvent, resetMouseEvents, isMouseDown } from "./events.js";
import { scrollY } from "./events.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
let cursorModeVars = {
    prevScroll: window.scrollY,
};
export function drawCursor(canvas, ctx, currentCursorMode) {
    if (currentCursorMode === CursorMode.Debug) {
        const newMouseEvents = {
            click() {
            },
            move() {
                //console.log("moving");
                ctx.fillText("" + MouseUtil.speed(), 40, 50);
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                DrawUtil.clearScreen(ctx);
            },
            hold() {
                //console.log("holding");
            },
            scroll() { },
        };
        setMouseEvents(newMouseEvents);
        resetForeverEvent();
    }
    else if (currentCursorMode === CursorMode.None) {
        // Nothing
    }
    else if (currentCursorMode === CursorMode.ClickDots) {
        const newMouseEvents = {
            click() {
                DrawUtil.drawCircle(ctx, MouseUtil.x(), MouseUtil.y(), RandomUtil.randInt(10, 15), getColor());
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
                DrawUtil.drawCircle(ctx, MouseUtil.x(), MouseUtil.y(), 20 - MouseUtil.percentSpeed() * 10, getColor());
            },
            hold() {
                DrawUtil.drawCircle(ctx, MouseUtil.x(), MouseUtil.y(), 20 - MouseUtil.percentSpeed() * 10, getColor());
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
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (MouseUtil.x() !== undefined && MouseUtil.y() !== undefined) {
                    DrawUtil.drawCircle(ctx, MouseUtil.x(), MouseUtil.y(), rad, getPrimaryColor());
                }
            }
        };
        resetMouseEvents();
        setForeverEvent(newForeverEvent);
    }
}
export function switchCursor() {
    cursorModeVars.prevScroll = window.scrollY;
}
//# sourceMappingURL=cursor.js.map