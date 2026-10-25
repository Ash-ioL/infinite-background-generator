export declare class ColorUtil {
    static getRandomHex(): string;
    static getRandomLightHex(): string;
    static getRandomDarkHex(): string;
    static getRandomBlackAndWhiteHex(start?: number, end?: number): string;
}
export declare class DrawUtil {
    static drawCircle(ctx: CanvasRenderingContext2D, x: number | undefined, y: number | undefined, radius: number, fillColor?: string | null, lineWidth?: number, strokeColor?: string): void;
}
export declare class RandomUtil {
    static windowPosition(leftPadding: number, rightPadding: number, topPadding: number, bottomPadding: number): number[];
    static randInt(start: number, end: number): number;
}
export declare class MouseUtil {
    #private;
    static initMouseListener(): void;
    static x(): number | undefined;
    static y(): number | undefined;
}
//# sourceMappingURL=util.d.ts.map