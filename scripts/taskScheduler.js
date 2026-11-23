import { CursorMode, currentBackgroundMode } from "./main.js";
import { drawBackground } from "./background.js";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil } from "./util.js";
import { setForeverEvent, setMouseEvents, resetForeverEvent, resetMouseEvents, isMouseDown } from "./events.js";
import { scrollY } from "./events.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
import { startLoading, stopLoading } from "./loading.js";
;
let curLoop = {
    background() { },
    cursor() { },
};
let animId = null;
export class task_scheduler {
    static mainLoop() {
        curLoop.background();
        curLoop.cursor();
        curLoop.after?.();
        animId = requestAnimationFrame(() => task_scheduler.mainLoop());
    }
}
export function setMainLoop(newLoop) {
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
//# sourceMappingURL=taskScheduler.js.map