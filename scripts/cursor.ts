import { CursorMode } from "./main.js";
import { ColorUtil, DrawUtil, RandomUtil, MouseUtil} from "./util.js";
import { setMouseEvents } from "./events.js";
import type { MouseEvents } from "./events.js";

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
    } else if (currentCursorMode === CursorMode.HoldDots) {
        const newMouseEvents: MouseEvents = {
            click() {
                
            },
            move() {
                
            },
            hold() {
                DrawUtil.drawCircle(ctx, MouseUtil.x(), MouseUtil.y(), 20 - MouseUtil.percentSpeed()*10, "white");
            },
        };
        setMouseEvents(
            newMouseEvents
        );
    } else if (currentCursorMode === CursorMode.Debug) {
        const newMouseEvents: MouseEvents = {
            click() {

            },
            move() {
                console.log("moving");
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";

                DrawUtil.clearScreen(ctx);

                ctx.fillText("" + MouseUtil.speed(), 40, 50);
            },
            hold() {

            },
        }
        setMouseEvents(newMouseEvents);
    }
}