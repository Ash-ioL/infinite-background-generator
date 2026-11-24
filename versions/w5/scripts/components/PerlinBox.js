import { RNG } from "../util.js";
export class PerlinBox {
    cornerVectors = [];
    width = 1;
    constructor(top, left) {
        for (let i = 0; i < 4; i++) {
            let rangle = RNG.getRandom() * 2 * Math.PI;
            let vec = [Math.cos(rangle), Math.sin(rangle)];
            this.cornerVectors.push(vec);
        }
        if (top) {
            this.cornerVectors[0] = top.cornerVectors[2];
            this.cornerVectors[1] = top.cornerVectors[3];
        }
        if (left) {
            this.cornerVectors[0] = left.cornerVectors[1];
            this.cornerVectors[2] = left.cornerVectors[3];
        }
    }
    getNoise(x, y) {
        let dotProducts = [];
        for (let i = 0; i < 4; i++) {
            let [xComponent, yComponent] = this.cornerVectors[i];
            let distanceXComponent, distanceYComponent;
            if (i == 0) {
                distanceXComponent = x;
                distanceYComponent = y;
            }
            else if (i == 1) {
                distanceXComponent = x - this.width;
                distanceYComponent = y;
            }
            else if (i == 2) {
                distanceXComponent = x;
                distanceYComponent = y - this.width;
            }
            else {
                distanceXComponent = x - this.width;
                distanceYComponent = y - this.width;
            }
            dotProducts.push(PerlinBox.getDotProduct(xComponent, yComponent, distanceXComponent, distanceYComponent));
        }
        let xWeight = PerlinBox.getWeight(x);
        let yWeight = PerlinBox.getWeight(y);
        let topLerp = PerlinBox.getLerp(dotProducts[0], dotProducts[1], xWeight);
        let bottomLerp = PerlinBox.getLerp(dotProducts[2], dotProducts[3], xWeight);
        let totalValue = PerlinBox.getLerp(topLerp, bottomLerp, yWeight);
        return totalValue;
    }
    static getWeight(dx) {
        return 6 * Math.pow(dx, 5) - 15 * Math.pow(dx, 4) + 10 * Math.pow(dx, 3);
    }
    static getDotProduct(v1x, v1y, v2x, v2y) {
        return v1x * v2x + v1y * v2y;
    }
    static getLerp(a, b, w) {
        return a + w * (b - a);
    }
    static getGrid(width) {
        let boxGrid = [];
        for (let i = 0; i < width; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push(null);
            }
            boxGrid.push(row);
        }
        boxGrid[0][0] = new PerlinBox();
        for (let j = 1; j < width; j++) {
            boxGrid[0][j] = new PerlinBox(null, boxGrid[0][j - 1]);
        }
        for (let i = 1; i < width; i++) {
            boxGrid[i][0] = new PerlinBox(boxGrid[i - 1][0]);
        }
        for (let i = 1; i < width; i++) {
            for (let j = 1; j < width; j++) {
                boxGrid[i][j] = new PerlinBox(boxGrid[i - 1][j], boxGrid[i][j - 1]);
            }
        }
        return boxGrid;
    }
}
//# sourceMappingURL=PerlinBox.js.map