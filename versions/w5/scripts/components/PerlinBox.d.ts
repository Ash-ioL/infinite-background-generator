export declare class PerlinBox {
    cornerVectors: Array<Array<number>>;
    width: number;
    constructor(top?: PerlinBox | null, left?: PerlinBox | null);
    getNoise(x: number, y: number): number;
    static getWeight(dx: number): number;
    static getDotProduct(v1x: number, v1y: number, v2x: number, v2y: number): number;
    static getLerp(a: number, b: number, w: number): number;
    static getGrid(width: number): (PerlinBox | null)[][];
}
//# sourceMappingURL=PerlinBox.d.ts.map