export class ColorUtil {
    static getRandomHex() {
        const randR = Math.floor(Math.random() * 256);
        const randG = Math.floor(Math.random() * 256);
        const randB = Math.floor(Math.random() * 256);
        return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
    }
    static getRandomLightHex() {
        const randR = Math.floor(Math.random() * 100) + 156;
        const randG = Math.floor(Math.random() * 100) + 156;
        const randB = Math.floor(Math.random() * 100) + 156;
        return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
    }
    static getRandomDarkHex() {
        const randR = Math.floor(Math.random() * 100);
        const randG = Math.floor(Math.random() * 100);
        const randB = Math.floor(Math.random() * 100);
        return "#" + randR.toString(16).padStart(2, "0") + randG.toString(16).padStart(2, "0") + randB.toString(16).padStart(2, "0");
    }
    static getRandomBlackAndWhiteHex(start = 0, end = 255) {
        const rand = Math.floor(Math.random() * (end - start + 1)) + start;
        return "#" + rand.toString(16).padStart(2, "0").repeat(3);
    }
}
export class DrawUtil {
    static drawCircle(ctx, x, y, radius, fillColor = null, lineWidth = 0, strokeColor = 'rgba(0,0,0,0)') {
        if (!x || !y) {
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
    static clearScreen(ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
export class RandomUtil {
    static windowPosition(leftPadding, rightPadding, topPadding, bottomPadding) {
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
    static randInt(start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }
}
export class MouseUtil {
    static #pos = {
        x: undefined,
        y: undefined,
    };
    static #speed = 0; // pixels per second
    static #prevTime = Date.now() / 1000;
    static #idleTimeout = undefined;
    static initMouseListener() {
        window.addEventListener("mousemove", (event) => {
            if (MouseUtil.#idleTimeout !== undefined) {
                clearTimeout(MouseUtil.#idleTimeout);
            }
            MouseUtil.#idleTimeout = window.setTimeout(() => {
                MouseUtil.#speed = 0;
            }, 100);
            const newPosX = event.x;
            const newPosY = event.y;
            const curTime = Date.now() / 1000;
            const dt = curTime - MouseUtil.#prevTime;
            MouseUtil.#prevTime = curTime;
            if (MouseUtil.#pos.x == undefined || MouseUtil.#pos.y == undefined || dt < 0.00005) {
                MouseUtil.#pos.x = newPosX;
                MouseUtil.#pos.y = newPosY;
                return;
            }
            const dx = newPosX - MouseUtil.#pos.x;
            const dy = newPosY - MouseUtil.#pos.y;
            MouseUtil.#pos.x = newPosX;
            MouseUtil.#pos.y = newPosY;
            const vx = dx / dt;
            const vy = dy / dt;
            MouseUtil.#speed = Math.sqrt(vx * vx + vy * vy);
        });
    }
    static x() {
        return MouseUtil.#pos.x;
    }
    static y() {
        return MouseUtil.#pos.y;
    }
    static speed() {
        return MouseUtil.#speed;
    }
    static percentSpeed() {
        // 300 - 2000
        let speed = MouseUtil.#speed;
        speed = Math.max(300, Math.min(speed, 2000));
        speed -= 300;
        return speed / 1700;
    }
}
MouseUtil.initMouseListener();
//# sourceMappingURL=util.js.map