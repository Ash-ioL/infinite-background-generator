import { RNG } from "../util.js";

export class PoissonBox {
    width: number = 0.70710678;
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

    getNearestDistance(x: number, y: number) {
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

    tryPoint(x: number, y: number): boolean {
        let distance: number = this.getNearestDistance(x, y);
        if (distance === Infinity || distance > 1) {
            this.addPoint(x, y);
            return true;
        }
        return false;
    }
}