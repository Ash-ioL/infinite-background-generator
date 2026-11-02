import { CursorMode, currentBackgroundMode } from "./main.js";
import { drawBackground } from "./background.js";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil } from "./util.js";
import { setForeverEvent, setMouseEvents, resetForeverEvent, resetMouseEvents, isMouseDown } from "./events.js";
import { scrollY } from "./events.js";
import { getColor, getPrimaryColor, getSecondaryColor } from "./input.js";
;
let curLoop = {
    background() { },
    cursor() { },
};
export class task_scheduler {
    static mainLoop() {
        curLoop.before?.();
        curLoop.background();
        curLoop.cursor();
        curLoop.after?.();
        requestAnimationFrame(() => task_scheduler.mainLoop());
    }
}
export function setMainLoop(newLoop) {
    curLoop = newLoop;
    requestAnimationFrame(() => task_scheduler.mainLoop());
}
//# sourceMappingURL=task_scheduler.js.map