import { CursorMode, currentBackgroundMode } from "./main.js";
import { drawBackground } from "./background.js";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil} from "./util.js";
import { setForeverEvent, setMouseEvents, resetForeverEvent, resetMouseEvents, isMouseDown } from "./events.js";
import { scrollY } from "./events.js";
import type { ForeverEvent, MouseEvents } from "./events.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
import { startLoading, stopLoading } from "./loading.js";

export interface LoopSet {
    before?(): void;
    background(): void;
    cursor(): void;
    after?(): void;
};

let curLoop: LoopSet = {
    background() {},
    cursor() {},
}

let animId: number | null = null;

export class task_scheduler {
    static mainLoop() {
        curLoop.background();
        curLoop.cursor();
        curLoop.after?.();
        animId = requestAnimationFrame(() => task_scheduler.mainLoop());
    }
}

export function setMainLoop(newLoop: LoopSet) {
    if (animId !== null) {
        cancelAnimationFrame(animId);
    }

    curLoop = newLoop;
    startLoading();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            curLoop.before?.();
            stopLoading();
            task_scheduler.mainLoop();
        });
    });
}
