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
    getNeighbor(dx, dy) {
        let curr = this;
        const stepX = dx > 0 ? "right" : "left";
        for (let i = 0; i < Math.abs(dx); i++) {
            curr = curr?.[stepX] ?? null;
        }
        const stepY = dy > 0 ? "bottom" : "top";
        for (let j = 0; j < Math.abs(dy); j++) {
            curr = curr?.[stepY] ?? null;
        }
        return curr;
    }
    getNearestDistance(x, y) {
        let minDistance = Infinity;
        for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
                if (dx === 0 && dy === 0)
                    continue;
                const neighbor = this.getNeighbor(dx, dy);
                if (neighbor == null || neighbor.coord == null)
                    continue;
                const [nx, ny] = neighbor.coord;
                const dist = Math.hypot(x - (nx + dx), y - (ny + dy));
                minDistance = Math.min(minDistance, dist);
            }
        }
        return minDistance;
    }
    tryPoint(x, y) {
        if (this.hasPoint())
            return false;
        let distance = this.getNearestDistance(x, y);
        if (distance === Infinity || distance > this.width * Math.SQRT2) {
            this.addPoint(x, y);
            return true;
        }
        return false;
    }
}
export class BridcidentBox extends PoissonBox {
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
}
//# sourceMappingURL=PoissonBox.js.map