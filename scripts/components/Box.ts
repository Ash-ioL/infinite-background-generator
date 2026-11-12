import { RNG } from "../util.js";

export class Box {
    cornerVectors: Array<Array<number>> = [];
    width: number = 1;
    
    constructor(top?: Box | null, left?: Box | null) {
        for (let i = 0; i < 4; i++) {
            let rangle: number = RNG.getRandom() * 2 * Math.PI;
            let vec: Array<number> = [Math.cos(rangle), Math.sin(rangle)];
            this.cornerVectors.push(vec);
        }
        if (top) {
            this.cornerVectors[0] = top.cornerVectors[2]!;
            this.cornerVectors[1] = top.cornerVectors[3]!;
        }
        if (left) {
            this.cornerVectors[0] = left.cornerVectors[1]!;
            this.cornerVectors[2] = left.cornerVectors[3]!;
        }
    }

    getNoise(x: number, y: number) {
        let dotProducts: Array<number> = [];
        for (let i = 0; i < 4; i++) {
            let [xComponent, yComponent] = this.cornerVectors[i]!;
            let distanceXComponent, distanceYComponent;
            if (i == 0) {
                distanceXComponent = x;
                distanceYComponent = y;
            } else if (i == 1) {
                distanceXComponent = x - this.width;
                distanceYComponent = y;
            } else if (i == 2) {
                distanceXComponent = x;
                distanceYComponent = y - this.width;
            } else {
                distanceXComponent = x - this.width;
                distanceYComponent = y - this.width; 
            }
            dotProducts.push(Box.getDotProduct(xComponent!, yComponent!, distanceXComponent, distanceYComponent));
        }
        let xWeight = Box.getWeight(x);
        let yWeight = Box.getWeight(y);
        let topLerp = Box.getLerp(dotProducts[0]!, dotProducts[1]!, xWeight); 
        let bottomLerp = Box.getLerp(dotProducts[2]!, dotProducts[3]!, xWeight);
        let totalValue = Box.getLerp(topLerp, bottomLerp, yWeight);
        return totalValue;
    }

    static getWeight(dx: number) {
        return 6 * Math.pow(dx, 5) - 15 * Math.pow(dx, 4) + 10 * Math.pow(dx, 3);
    }
    static getDotProduct(v1x: number, v1y: number, v2x: number, v2y: number) {
        return v1x * v2x + v1y * v2y;
    }
    static getLerp(a: number, b: number, w: number) {
        return a + w * (b - a);
    }
    static getGrid(width: number) {
        let boxGrid: Array<Array<Box | null>> = [];
        for (let i = 0; i < width; i++) {
            let row: Array<Box | null> = [];
            for (let j = 0; j < width; j++) {
                row.push(null);
            }
            boxGrid.push(row);
        }
        boxGrid[0]![0] = new Box();
        for (let j = 1; j < width; j++) {
            boxGrid[0]![j] = new Box(null, boxGrid[0]![j-1]);
        }
        for (let i = 1; i < width; i++) {
            boxGrid[i]![0] = new Box(boxGrid[i-1]![0]);
        }
        for (let i = 1; i < width; i++) {
            for (let j = 1; j < width; j++) {
                boxGrid[i]![j] = new Box(boxGrid[i-1]![j], boxGrid[i]![j-1]);
            }
        }
        return boxGrid;
    }
}