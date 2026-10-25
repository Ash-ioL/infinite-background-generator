import { CursorMode } from "./main";
import { ColorUtil } from "./color";
import { setMouseEvents } from "./events";

export function drawCursor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, currentCursorMode: CursorMode) {
    if (currentCursorMode === CursorMode.None) {
        // Nothing
    } else if (currentCursorMode === CursorMode.ClickDots) {
        
    }
}