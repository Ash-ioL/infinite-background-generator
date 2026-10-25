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