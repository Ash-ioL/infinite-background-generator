import { resetBackground } from "./main.js";
export class ColorUtil {
    static getRandomHex() {
        const randR: number = Math.floor(Math.random() * 256);
        const randG: number = Math.floor(Math.random() * 256);
        const randB: number = Math.floor(Math.random() * 256);
        return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
    }
    static getRandomLightHex() {
        const randR: number = Math.floor(Math.random() * 100) + 156;
        const randG: number = Math.floor(Math.random() * 100) + 156;
        const randB: number = Math.floor(Math.random() * 100) + 156;
        return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
    }
    static getRandomDarkHex() {
        const randR: number = Math.floor(Math.random() * 100);
        const randG: number = Math.floor(Math.random() * 100);
        const randB: number = Math.floor(Math.random() * 100);
        return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
    }
    static getRandomBlackAndWhiteHex(start: number = 0, end: number = 255) {
        const rand: number = Math.floor(Math.random() * (end-start+1)) + start;
        return "#" + rand.toString(16).padStart(2, "0").repeat(3);
    }
}

export class DrawUtil {
    static drawCircle(ctx: CanvasRenderingContext2D, x: number | undefined, y: number | undefined, radius: number, fillColor: string | null = null, lineWidth: number = 0, strokeColor: string = 'rgba(0,0,0,0)') {
        if (x === undefined || y === undefined) {
            return;
        }
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
    static clearScreen(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}

export class RandomUtil {
    static windowPosition(leftPadding: number = 0, rightPadding: number = 0, topPadding: number = 0, bottomPadding: number = 0) {
        let xStart = leftPadding;
        let xEnd = Math.max(0, window.innerWidth - rightPadding);
        if (xStart > xEnd) {
            xStart = xEnd;
        }

        let yStart = topPadding;
        let yEnd = Math.max(0, window.innerHeight - bottomPadding);
        if (yStart > yEnd) {
            yStart = yEnd;
        }

        return [
            Math.floor(Math.random() * (xEnd - xStart + 1)) + xStart, 
            Math.floor(Math.random() * (yEnd - yStart + 1)) + yStart
        ];
    }

    static randInt(start: number, end: number) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }
}

export class MouseUtil {
    static #pos: { x: number | undefined; y: number | undefined } = {
        x: undefined,
        y: undefined,
    }
    static #speed: number = 0; // pixels per second
    static #prevTime: number = Date.now() / 1000;
    static #idleTimeout: number | undefined = undefined;

    static initMouseListener() {
        window.addEventListener("mousemove", (event) => {
            if (MouseUtil.#idleTimeout !== undefined) {
                clearTimeout(MouseUtil.#idleTimeout);
            }

            MouseUtil.#idleTimeout = window.setTimeout(() => {
                MouseUtil.#speed = 0;
            }, 100);

            const newPosX: number = event.x;
            const newPosY: number = event.y;

            const curTime = Date.now() / 1000;
            const dt = curTime - MouseUtil.#prevTime;
            MouseUtil.#prevTime = curTime;

            if (MouseUtil.#pos.x == undefined || MouseUtil.#pos.y == undefined || dt < 0.00005) {
                MouseUtil.#pos.x = newPosX;
                MouseUtil.#pos.y = newPosY;
                return;
            }

            const dx: number = newPosX - MouseUtil.#pos.x!;
            const dy: number = newPosY - MouseUtil.#pos.y;

            MouseUtil.#pos.x = newPosX;
            MouseUtil.#pos.y = newPosY; 

            const vx = dx/dt;
            const vy = dy/dt;

            MouseUtil.#speed = Math.sqrt(vx*vx + vy*vy);
        });
    }
    static x() {
        return MouseUtil.#pos.x;
    }
    static y() {
        return MouseUtil.#pos.y;
    }
    static setPosition(x: number, y: number) {
        MouseUtil.#pos.x = x;
        MouseUtil.#pos.y = y;
    }
    static speed() {
        return MouseUtil.#speed;
    }
    static percentSpeed(): number {
        // 300 - 2000
        let speed = MouseUtil.#speed;
        speed = Math.max(300, Math.min(speed, 2000));
        speed -= 300;
        return speed / 1700;
    }
}
MouseUtil.initMouseListener();
