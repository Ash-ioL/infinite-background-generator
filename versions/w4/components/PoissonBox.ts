import { RNG } from "../util.js";


export class PoissonBox {
    width: number = 1;
    top: PoissonBox | null;
    right: PoissonBox | null;
    bottom: PoissonBox | null;
    left: PoissonBox | null;
    coord: Array<number> | null = null;
    constructor(top: PoissonBox | null, right: PoissonBox | null, bottom: PoissonBox | null, left: PoissonBox | null) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    hasPoint(): boolean {
        return this.coord != null;
    }
    
    addPoint(x: number, y: number) {
        this.coord = [x, y];
    }

    private getNeighbor(dx: number, dy: number): PoissonBox | null {
        let curr: PoissonBox | null = this;

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

    getNearestDistance(x: number, y: number): number {
        let minDistance = Infinity;

        for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
                if (dx === 0 && dy === 0) continue;

                const neighbor = this.getNeighbor(dx, dy);
                if (neighbor == null || neighbor.coord == null) continue;

                const [nx, ny] = neighbor.coord;
                const dist = Math.hypot(x - (nx! + dx), y - (ny! + dy));
                minDistance = Math.min(minDistance, dist);
            }
        }

        return minDistance;
    }

    tryPoint(x: number, y: number): boolean {
        if (this.hasPoint()) return false;
        let distance: number = this.getNearestDistance(x, y);
        if (distance === Infinity || distance > this.width * Math.SQRT2) {
            this.addPoint(x, y);
            return true;
        }
        return false;
    }
}

export class BridcidentBox extends PoissonBox {
    override getNearestDistance(x: number, y: number) {
        let current: number = Infinity;
        if (this.top != null && this.top.coord != null) {
            let xDist = Math.abs(this.top.coord![0]! - x);
            let yDist = Math.abs(this.top.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.left != null && this.left.coord != null) {
            let xDist = Math.abs(this.left.coord![0]! - x);
            let yDist = Math.abs(this.left.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.bottom != null && this.bottom.coord != null) {
            let xDist = Math.abs(this.bottom.coord![0]! - x);
            let yDist = Math.abs(this.bottom.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        if (this.right != null && this.right.coord != null) {
            let xDist = Math.abs(this.right.coord![0]! - x);
            let yDist = Math.abs(this.right.coord![1]! - y);
            let hypot = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            current = Math.min(current, hypot);
        }
        return current;
    }
}