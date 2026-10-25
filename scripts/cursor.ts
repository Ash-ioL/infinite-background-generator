import { CursorMode } from "./main";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil} from "./util";
import { setMouseEvents } from "./events";
import type { MouseEvents } from "./events";

export function drawCursor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentCursorMode: CursorMode) {
    if (currentCursorMode === CursorMode.None) {
        // Nothing
    } else if (currentCursorMode === CursorMode.ClickDots) {
        const newMouseEvents: MouseEvents = {
            click() {
                DrawUtil.drawCircle(ctx, MouseUtil.x(), MouseUtil.y(), RandomUtil.randInt(10, 15));
            },
            move() {

            },
            hold() {

            },
        };
        setMouseEvents(
            newMouseEvents
        );
    }
}