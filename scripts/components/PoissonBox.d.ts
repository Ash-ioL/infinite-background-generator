export declare class PoissonBox {
    width: number;
    top: PoissonBox | null;
    right: PoissonBox | null;
    bottom: PoissonBox | null;
    left: PoissonBox | null;
    coord: Array<number> | null;
    constructor(top: PoissonBox | null, right: PoissonBox | null, bottom: PoissonBox | null, left: PoissonBox | null);
    hasPoint(): boolean;
    addPoint(x: number, y: number): void;
    getNearestDistance(x: number, y: number): number;
    tryPoint(x: number, y: number): boolean;
}
//# sourceMappingURL=PoissonBox.d.ts.map