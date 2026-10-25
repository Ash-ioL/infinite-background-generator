import { ColorUtil } from "./color.js";

export function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fillColor: string | null = null, lineWidth: number = 0, strokeColor: string = 'rgba(0,0,0,0)') {
    if (!fillColor) {
        fillColor = ColorUtil.getRandomHex();
    }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
}