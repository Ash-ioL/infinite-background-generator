import { CursorMode } from "./main";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil } from "./util";
import { setMouseEvents } from "./events";
export function drawCursor(canvas, ctx, currentCursorMode) {
    if (currentCursorMode === CursorMode.None) {
        // Nothing
    }
    else if (currentCursorMode === CursorMode.ClickDots) {
        const newMouseEvents = {
            click() {
                DrawUtil.drawCircle(ctx, MouseUtil.x(), MouseUtil.y(), RandomUtil.randInt(10, 15));
            },
            move() {
            },
            hold() {
            },
        };
        setMouseEvents(newMouseEvents);
    }
}
//# sourceMappingURL=cursor.js.map