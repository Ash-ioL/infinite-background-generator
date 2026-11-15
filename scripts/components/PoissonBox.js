import { RNG } from "../util.js";
export class PoissonBox {
    width = 1;
    top;
    right;
    bottom;
    left;
    coord = null;
    constructor(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    hasPoint() {
        return this.coord != null;
    }
    addPoint(x, y) {
        this.coord = [x, y];
    }
    getNearestDistance(x, y) {
        let current = Infinity;
        if (this.top != null && this.top.coord != null) {
            let xDist = Math.abs(this.top.coord[0] - x);
            let yDist = Math.abs(this.top.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.left != null && this.left.coord != null) {
            let xDist = Math.abs(this.left.coord[0] - x);
            let yDist = Math.abs(this.left.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.bottom != null && this.bottom.coord != null) {
            let xDist = Math.abs(this.bottom.coord[0] - x);
            let yDist = Math.abs(this.bottom.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.right != null && this.right.coord != null) {
            let xDist = Math.abs(this.right.coord[0] - x);
            let yDist = Math.abs(this.right.coord[1] - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        return current;
    }
    tryPoint(x, y) {
        let distance = this.getNearestDistance(x, y);
        if (distance === Infinity || distance > this.width * Math.SQRT2) {
            this.addPoint(x, y);
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=PoissonBox.js.map